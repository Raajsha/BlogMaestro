import {addComment, deleteComment, updateComment, getCommentsByPost} from '../controllers/commentControllers.js';
import express from 'express';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/post/:postId',getCommentsByPost)
router.post('/create',authMiddleware, addComment);
router.put('/:id',authMiddleware, updateComment);
router.delete('/:id',authMiddleware, deleteComment);

export default router;