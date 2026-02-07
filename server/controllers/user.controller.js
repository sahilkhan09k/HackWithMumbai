import { Issue } from "../models/issue.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const getUserProfile = asyncHandler(async (req, res) => {
    const user = req?.user;

    if(!user) {
        throw new apiError(401, "Unauthorized request");
    }

    return res.status(200)
    .json(new apiResponse(200, user, "User profile fetched successfully"))
});

const getUserIssues = asyncHandler(async (req, res) => {
    const userId = req?.user?._id;

    if(!userId) {
        throw new apiError(401, "Unauthorized request");
    }

    const issues = await Issue.find({reportedBy: userId})
    .sort({createdAt: -1});

    return res.status(200)
    .json(new apiResponse(200, issues, "User issues fetched successfully"))
})


export {getUserProfile, getUserIssues};