import Post from '../models/Post.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const getUserProfile = async (req,res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({message: "User not found", id : `${req.params.id}`});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

export const getUserPosts = async (req,res) => {
    try {
        const posts = await Post.find({author: req.params.id}).sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: "Failed to get posts"});
    }
}