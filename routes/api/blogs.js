const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Blog = require("../../models/Blog");

router.get("/test", (req, res) => res.json({ msg: "Blogs works!" }));

router.post("/", (req, res) => {
  const newBlog = new Blog({
    user: req.body.user,
    user_name: req.body.user_name,
    title: req.body.title,
    text: req.body.text,
    image_url: req.body.image_url,
    likes: 0,
    watches: 0,
    followers: [],
    created_at: req.body.date,
  });

  newBlog.save().then((_blog) => res.json(_blog));
});

router.put("/", (req, res) => {
  Blog.update(
    { _id: req.body.blog_id },
    {
      $set: {
        title: req.body.title,
        text: req.body.text,
        image_url: req.body.image_url,
      },
    }
  ).then((blog) => {});
  Blog.find().then((blogs) => res.json(blogs));
});

router.get("/all", (req, res) => {
  Blog.find()
    .then((blogs) => {
      if (!blogs) {
        error.noblog = "There are no blogs";
        return res.status(404).json(errors);
      }
      res.json(blogs);
    })
    .catch((err) => res.status(404).json({ blog: "There are no blogs" }));
});

router.get("/latest", (req, res) => {
  Blog.find()
    .sort({ created_at: -1 })
    .then((blogs) => {
      if (!blogs) {
        error.noblog = "There are no blogs";
        return res.status(404).json(errors);
      }
      res.json(blogs);
    })
    .catch((err) => res.status(404).json({ blog: "There are no blogs" }));
});

router.get("/likes", (req, res) => {
  Blog.find()
    .sort({ likes: -1 })
    .then((blogs) => {
      if (!blogs) {
        error.noblog = "There are no blogs";
        return res.status(404).json(errors);
      }
      res.json(blogs);
    })
    .catch((err) => res.status(404).json({ blog: "There are no blogs" }));
});

router.get("/watches", (req, res) => {
  Blog.find()
    .sort({ watches: -1 })
    .then((blogs) => {
      if (!blogs) {
        error.noblog = "There are no blogs";
        return res.status(404).json(errors);
      }
      res.json(blogs);
    })
    .catch((err) => res.status(404).json({ blog: "There are no blogs" }));
});

router.get("/speci/:id", (req, res) => {
  Blog.findOne({ _id: req.params.id })
    .then((blog) => {
      if (!blog) {
        error.noblog = "There is no blog";
        return res.status(404).json(errors);
      }
      res.json(blog);
    })
    .catch((err) => res.status(404).json(err));
});

router.put("/LikesUp", (req, res) => {
  Blog.update(
    { _id: req.body.blog_id },
    { $inc: { likes: 1 }, $push: { followers: req.body.user_id } }
  ).then((blog) => res.json(blog));
});

router.put("/WatchesUp/:id", (req, res) => {
  Blog.update({ _id: req.params.id }, { $inc: { watches: 1 } }).then(
    (blog) => {}
  );
  Blog.findOne({ _id: req.params.id }).then((_blog) => res.json(_blog));
});

module.exports = router;
