import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
    try {
        const { postId, text } = req.body;
        const userId = req.user && req.user.id;

        if (!userId) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        if (!postId || !text) {
            return res.status(400).json({ message: 'postId and text are required' });
        }

        const newComment = new Comment({ postId, userId, text });
        await newComment.save();

        const populatedComment = await Comment.findById(newComment._id).populate('userId','username');
        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

// Delete a comment (only by the writer)
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user && req.user.id;

        if (!userId) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }
        
        await Comment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};

// Update a comment (only by the writer)
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.user && req.user.id;

        if (!userId) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this comment' });
        }

        comment.text = text;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const postId  = req.params.postId;
        if (!postId) {
            return res.status(400).json({ message: 'postId is required' });
        }
        const comments = await Comment.find({ postId }).populate('userId','username').sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
        console.log(error);
    }
};