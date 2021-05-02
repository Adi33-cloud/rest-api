const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GET request: all the posts in schema 
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (err) {
        res.json({ message: err });
    }
});

//GET request: specific post based on post ID
router.get('/:postID', async (req, res) => {
    try {
        const postFound = await Post.findById(req.params.postID);
        res.json(postFound);
    } catch (err) {
        res.json({ message: err });
    }
});

//POST request: creates a new post in DB
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE request: deletes post based on post ID
router.delete('/:postID', async (req, res) => {
    try {
        const postRemoved = await Post.remove({ _id: req.params.postID });
        res.json(postRemoved);
    } catch (err) {
        res.json({ message: err });
    }
});

//PATCH request: update a post
router.patch('/:postID', async (req, res) => {
    try {
        const postUpdated = await Post.updateOne({ _id: req.params.postID },
            { $set: { title: req.body.title } });
        res.json(postUpdated);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;