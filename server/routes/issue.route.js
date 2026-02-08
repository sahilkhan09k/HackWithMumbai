import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../utils/requireAdmin.js";
import {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssueStatus,
    getAdminIssueStats,
    getIssuesByPriority,
    reportIssueAsFake,
    getHomeStats
} from "../controllers/issue.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
    "/postIssue",
    verifyJWT,
    upload.single("imageUrl"),
    createIssue
);

router.get("/getAllIssue", getAllIssues); // Public - no auth required for transparency

router.get("/homeStats", getHomeStats); // Public - for homepage statistics

router.get("/getIssue/:issueId", verifyJWT, getIssueById);

router.put(
    "/updateStatus/:issueId",
    verifyJWT,
    requireAdmin,
    updateIssueStatus
);

router.get(
    "/adminStats",
    verifyJWT,
    requireAdmin,
    getAdminIssueStats
);

router.get(
    "/getIssuesByPriority",
    verifyJWT,
    requireAdmin,
    getIssuesByPriority
);

router.put(
    "/reportAsFake/:issueId",
    verifyJWT,
    requireAdmin,
    reportIssueAsFake
);

export default router;
