import express from 'express'
import { getAllPosts,createPost,updatePost,deletePost } from '../controllers/postControllers.js'
import authMiddleware from '../middleware/auth.js';

const PostRouter = express.Router();

//Public Routes
PostRouter.get('/',getAllPosts);

//Protected Routes
PostRouter.post('/create',authMiddleware,createPost);
PostRouter.put('/:id',authMiddleware,updatePost);
PostRouter.delete('/:id',authMiddleware,deletePost);

export default PostRouter;