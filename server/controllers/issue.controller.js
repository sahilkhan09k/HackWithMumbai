import mongoose from "mongoose";
import { Issue } from "../models/issue.model.js";
import { User } from "../models/user.model.js";
import { BannedEmail } from "../models/bannedEmail.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { aiAnalyzeIssue } from "../utils/aiAnalyzeIssue.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getPriorityLabel = (score) => {
    if (score >= 70) return "High";
    if (score >= 45) return "Medium";
    return "Low";
};

const calculateBaseScore = ({
    severity,
    frequency,
    locationImpact,
    timePending
}) => {
    // Increased severity weight to 50% to ensure dangerous issues get HIGH priority
    // Severity is the most critical factor for priority calculation
    return Math.round(
        severity * 0.50 +        // 50% - Primary factor
        locationImpact * 0.30 +  // 30% - High-impact locations
        frequency * 0.10 +       // 10% - Issue frequency
        timePending * 0.10       // 10% - Time pending
    );
};

const getLocationImpact = (text = "") => {
    const lower = text.toLowerCase();
    if (lower.includes("hospital") || lower.includes("school")) return 90;
    if (lower.includes("station") || lower.includes("main road")) return 75;
    if (lower.includes("market")) return 65;
    return 40;
};

const getFrequencyScore = (count) => {
    if (count >= 7) return 100;
    if (count >= 4) return 75;
    if (count >= 2) return 50;
    return 20;
};

const getTimeScore = () => 10;


export const createIssue = asyncHandler(async (req, res) => {

    /* ===== ADDITION 1: USER ID ===== */
    const userId = req.user._id;

    /* ===== ADDITION 2: 30-MIN COOLDOWN ===== */
    const lastIssue = await Issue.findOne({ reportedBy: userId })
        .sort({ createdAt: -1 });

    if (lastIssue) {
        const diffInMinutes =
            (Date.now() - new Date(lastIssue.createdAt).getTime()) / (1000 * 60);

        if (diffInMinutes < 30) {
            const remaining = Math.ceil(30 - diffInMinutes);
            throw new apiError(
                429,
                `Please wait ${remaining} minutes before reporting another issue`
            );
        }
    }

    /* ===== ADDITION 3: DAILY LIMIT (5/DAY) ===== */
    const todayCount = await Issue.countDocuments({
        reportedBy: userId,
        createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
    });

    if (todayCount >= 5) {
        throw new apiError(429, "Daily issue limit reached");
    }

    /* ===== ORIGINAL CODE (UNCHANGED) ===== */
    const { title, description, lat, lng } = req.body;

    if (!title || !description || !lat || !lng) {
        throw new apiError(400, "All required fields must be provided");
    }

    if (!req.file?.path) {
        throw new apiError(400, "Image is required");
    }

    const uploadedImage = await uploadOnCloudinary(req.file.path);
    if (!uploadedImage) {
        throw new apiError(500, "Image upload failed");
    }

    const location = {
        lat: Number(lat),
        lng: Number(lng)
    };

    /* ===== ADDITION 4: NEARBY LOCATION DEDUP (8 ISSUES) ===== */
    const RADIUS_IN_METERS = 50;
    const METERS_TO_DEGREES = 0.00045;

    const latRange = RADIUS_IN_METERS * METERS_TO_DEGREES;
    const lngRange = RADIUS_IN_METERS * METERS_TO_DEGREES;

    const nearbyIssuesCount = await Issue.countDocuments({
        "location.lat": {
            $gte: location.lat - latRange,
            $lte: location.lat + latRange
        },
        "location.lng": {
            $gte: location.lng - lngRange,
            $lte: location.lng + lngRange
        }
    });

    if (nearbyIssuesCount >= 8) {
        throw new apiError(
            409,
            "Multiple issues already reported at this location. Please support existing reports."
        );
    }

    /* ===== ORIGINAL CODE (UNCHANGED) ===== */
    const existingCount = await Issue.countDocuments({
        status: { $ne: "Resolved" }
    });

    const frequencyScore = getFrequencyScore(existingCount);
    const locationImpact = getLocationImpact(description);
    const timeScore = getTimeScore();

    /* ===== FIXED TEMPLATE STRING BUG ===== */
    const aiResult = await aiAnalyzeIssue(`${title}. ${description}`);
    const severityScore = (aiResult?.severity || 5) * 10;
    const aiBoost = aiResult?.urgencyBoost || 0;

    const baseScore = calculateBaseScore({
        severity: severityScore,
        frequency: frequencyScore,
        locationImpact,
        timePending: timeScore
    });

    const finalScore = Math.min(100, baseScore + aiBoost);
    const priority = getPriorityLabel(finalScore);

    const issue = await Issue.create({
        title,
        description,
        imageUrl: uploadedImage.secure_url,
        location,
        priorityScore: finalScore,
        priority,
        scoreBreakdown: {
            severity: severityScore,
            frequency: frequencyScore,
            locationImpact,
            timePending: timeScore,
            aiAdjustment: aiBoost
        },
        reportedBy: userId
    });

    return res
        .status(201)
        .json(new apiResponse(201, issue, "Issue created successfully"));
});

export const getAllIssues = asyncHandler(async (req, res) => {
    const issues = await Issue.find()
        .populate("reportedBy", "name email")
        .sort({ priorityScore: -1, createdAt: -1 });

    return res
        .status(200)
        .json(new apiResponse(200, issues, "Issues fetched successfully"));
});


export const getIssueById = asyncHandler(async (req, res) => {
    const { issueId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(issueId)) {
        throw new apiError(400, "Invalid issue ID");
    }

    const issue = await Issue.findById(issueId)
        .populate("reportedBy", "name email");

    if (!issue) {
        throw new apiError(404, "Issue not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, issue, "Issue fetched successfully"));
});


export const updateIssueStatus = asyncHandler(async (req, res) => {
    const { issueId } = req.params;
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
        throw new apiError(400, "Invalid status value");
    }

    const issue = await Issue.findByIdAndUpdate(
        issueId,
        { status },
        { new: true }
    );

    if (!issue) {
        throw new apiError(404, "Issue not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, issue, "Issue status updated"));
});


export const getIssuesByPriority = asyncHandler(async (req, res) => {
    const issues = await Issue.find({
        status: { $ne: "Resolved" }
    })
        .populate("reportedBy", "name email")
        .sort({ priorityScore: -1, createdAt: -1 });

    return res
        .status(200)
        .json(
            new apiResponse(200, issues, "Issues fetched in priority order")
        );
});


export const getAdminIssueStats = asyncHandler(async (req, res) => {
    const stats = await Issue.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    return res
        .status(200)
        .json(new apiResponse(200, stats, "Admin stats fetched"));
});


export const reportIssueAsFake = asyncHandler(async (req, res) => {
    const { issueId } = req.params;

    // Verify admin role
    if (req.user.role !== 'admin') {
        throw new apiError(403, "Only admins can report issues as fake");
    }

    if (!mongoose.Types.ObjectId.isValid(issueId)) {
        throw new apiError(400, "Invalid issue ID");
    }

    // Find the issue
    const issue = await Issue.findById(issueId).populate("reportedBy");

    if (!issue) {
        throw new apiError(404, "Issue not found");
    }

    // Check if already reported as fake
    if (issue.reportedAsFake) {
        throw new apiError(400, "This issue has already been reported as fake");
    }

    // Mark issue as fake
    issue.reportedAsFake = true;
    issue.reportedAsFakeBy = req.user._id;
    issue.reportedAsFakeAt = new Date();
    await issue.save();

    // Get the user who reported this issue
    const reportingUser = issue.reportedBy;

    if (!reportingUser) {
        throw new apiError(404, "User who reported this issue not found");
    }

    // Reduce trust score by 25
    reportingUser.trustScore = Math.max(0, reportingUser.trustScore - 25);

    let userDeleted = false;
    let emailBanned = false;

    // Ban and delete user if trust score reaches 0
    if (reportingUser.trustScore === 0) {
        // Add email to banned list
        try {
            await BannedEmail.create({
                email: reportingUser.email,
                userId: reportingUser._id,
                userName: reportingUser.name,
                reason: 'Multiple fake reports (Trust score reached 0)',
                bannedBy: req.user._id,
                bannedAt: new Date()
            });
            emailBanned = true;
        } catch (err) {
            // Email might already be in banned list
            console.error('Error adding to banned list:', err);
        }

        // Delete user from database
        await User.findByIdAndDelete(reportingUser._id);
        userDeleted = true;

        return res
            .status(200)
            .json(new apiResponse(200, {
                issue,
                user: {
                    _id: reportingUser._id,
                    name: reportingUser.name,
                    email: reportingUser.email,
                    trustScore: 0,
                    deleted: true,
                    emailBanned: true
                }
            }, `Issue reported as fake. User's trust score reduced to 0. User has been permanently banned and deleted from the system. Email ${reportingUser.email} is now blacklisted.`));
    }

    // If not banned, just save the updated trust score
    await reportingUser.save();

    return res
        .status(200)
        .json(new apiResponse(200, {
            issue,
            user: {
                _id: reportingUser._id,
                name: reportingUser.name,
                email: reportingUser.email,
                trustScore: reportingUser.trustScore,
                isBanned: false
            }
        }, `Issue reported as fake. User's trust score reduced to ${reportingUser.trustScore}`));
});
