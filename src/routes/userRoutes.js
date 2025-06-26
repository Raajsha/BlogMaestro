import express from 'express';
import {getUserPosts, getUserProfile} from '../controllers/userControllers.js';
import authMiddleware from '../middleware/auth.js';

const UserRouter = express.Router();

UserRouter.get('/:id',authMiddleware, getUserProfile);
UserRouter.get('/:id/posts',authMiddleware, getUserPosts);

export default UserRouter;