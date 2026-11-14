
import mongoose from 'mongoose';
import Post from '../models/post.js';

// CREATE a new post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (typeof title !== 'string' || !title.trim() ||
            typeof content !== 'string' || !content.trim()) {
            return res.status(400).json({
                message: 'Title and content are required'
            });
        }

        const post = await Post.create({
            title: title.trim(),
            content: content.trim(),
            author: req.session.userId
        });

        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// READ all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('author', 'name email');

        res.status(200).json({
            count: posts.length,
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// READ one post by ID
export const getPost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid post ID'
            });
        }

        const post = await Post.findById(id)
            .populate('author', 'name email');

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// UPDATE an existing post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid post ID'
            });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        // Only the author can edit the post
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).json({
                message: 'You can only edit your own posts'
            });
        }

        const { title, content } = req.body;

        if (title === undefined && content === undefined) {
            return res.status(400).json({
                message: 'Provide title or content to update'
            });
        }

        if (title !== undefined) {
            if (typeof title !== 'string' || !title.trim()) {
                return res.status(400).json({
                    message: 'Title cannot be empty'
                });
            }
            post.title = title.trim();
        }

        if (content !== undefined) {
            if (typeof content !== 'string' || !content.trim()) {
                return res.status(400).json({
                    message: 'Content cannot be empty'
                });
            }
            post.content = content.trim();
        }

        await post.save();

        res.status(200).json({
            message: 'Post updated successfully',
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE a post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid post ID'
            });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        // Only the author can delete the post
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).json({
                message: 'You can only delete your own posts'
            });
        }

        await post.deleteOne();

        res.status(200).json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
