const Post = require("../models/Post");
const APIFeatures = require("../utils/APIFeatures");
const catchAsync = require("../utils/catchAsync");
const { HttpNotFoundError } = require("../utils/HttpErrors");

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = { title: req.body.title, content: req.body.content };

  const post = await Post.create(newPost);

  res.status(201).json(post);
});

exports.listPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({});

  res.status(200).json(posts);
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return next(new HttpNotFoundError("No POST found with that given ID"));

  res.status(200).json(post);
});
