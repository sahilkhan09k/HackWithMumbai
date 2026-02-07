import {Router} from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getUserProfile, getUserIssues } from '../controllers/user.controller.js';

const router = Router();

router.route('/getUser').get(verifyJWT, getUserProfile);
router.route('/getUserIssues').get(verifyJWT, getUserIssues);

export default router;