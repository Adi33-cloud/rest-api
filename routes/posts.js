const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verify = require("../validation/verifyToken");

//GET request: all the posts in schema from logged in user
router.get("/", verify, async (req, res) => {
  try {
    const allPosts = await Post.find({ user_id: req.user });
    res.json(allPosts);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET request: recives posts based on post id
router.get("/:postID", async (req, res) => {
  try {
    const postFound = await Post.findById(req.params.postID);
    res.json(postFound);
  } catch (err) {
    res.json({ message: err });
  }
});

//POST request: creates a new post in DB
router.post("/", verify, async (req, res) => {
  const post = new Post({
    user_id: req.user,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE request: deletes post based on post ID
router.delete("/:postID", async (req, res) => {
  try {
    const postRemoved = await Post.remove({ _id: req.params.postID });
    res.json(postRemoved);
  } catch (err) {
    res.json({ message: err });
  }
});

//PATCH request: update a post
router.patch("/:postID", async (req, res) => {
  try {
    const postUpdated = await Post.updateOne(
      { _id: req.params.postID },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    const postFound = await Post.findById(req.params.postID);
    res.json(postFound);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
