const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { protect, restrictTo } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Get all posts
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all posts for everyone');
        const posts = await Post.find()
            .populate('author', 'username')
            .sort('-createdAt');
            
        console.log(`Found ${posts.length} posts`);
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create new post (admin only)
router.post('/', protect, restrictTo('admin'), async (req, res) => {
    try {
        console.log('Received post creation request:', req.body);
        console.log('User creating post:', req.user);
        
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }
        
        const post = await Post.create({
            ...req.body,
            author: req.user.id
        });
        
        console.log('Post created successfully:', post);
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update post (admin only)
router.put('/:id', protect, restrictTo('admin'), async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete post (admin only)
router.delete('/:id', protect, restrictTo('admin'), async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 