import Post from '../models/Post.js'

export const createPost = async (req,res) => {
    try {
        const {author,title,content,tags} = req.body;
        const newPost = new Post({author,title,content,tags});
        await newPost.save();
        res.status(201).json({message:"Post created successfully"});
    } catch (error) {
        res.status(500).json({message: "Post creation failed"});
        console.log(error);
    }
};

export const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1}).lean()
        if(!posts.length) return res.status(404).json({message: "No posts present"});
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to load posts"});

    }
};

export const getPostById = async (req,res) => {
    try {
    const postId = req.params.id;
    const post = await Post.findById(postId)

    if(!post) {
        return res.status(404).json({message: 'Post not found'});
    }

    res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch post'})
    }
}

export const updatePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message: "Post does not exist"});

        if(post.author.toString() !== req.user.id) return res.status(403).json({message: "Unauthorized"});

        const updatedPost = await Post.findByIdAndUpdate(postId,{$set: req.body},{new : true}); 

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({message: "Update failed"});
        console.log(error);
    }
}

export const deletePost = async (req,res) => {
    try {
        if(!req.user) return res.status(401).json({message: "Authentication required"})
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message: "Post not found"});

        if(post.author.toString() !== req.user.id) return res.status(403).json({message: "Unauthorized"});

        await Post.findByIdAndDelete(postId);
        res.status(200).json({message: "Post deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Could not delete post"});
        console.log(error);
    }
}