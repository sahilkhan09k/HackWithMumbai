import mongoose from "mongoose";
import { Issue } from "../models/issue.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { aiAnalyzeIssue } from "../utils/aiAnalyzeIssue.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getPriorityLabel = (score) => {
    if (score >= 70) return "High";
    if (score >= 40) return "Medium";
    return "Low";
};

const calculateBaseScore = ({
    severity,
    frequency,
    locationImpact,
    timePending
}) => {
    return Math.round(
        severity * 0.35 +
        frequency * 0.20 +
        locationImpact * 0.25 +
        timePending * 0.20
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

    const userId = req.user._id;

    const existingCount = await Issue.countDocuments({
        status: { $ne: "Resolved" }
    });

    const frequencyScore = getFrequencyScore(existingCount);
    const locationImpact = getLocationImpact(description);
    const timeScore = getTimeScore();

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
