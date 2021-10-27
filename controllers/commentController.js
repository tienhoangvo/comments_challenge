const Comment = require("../models/Comment");
const Post = require("../models/Post");
const APIFeatures = require("../utils/APIFeatures");
const catchAsync = require("../utils/catchAsync");
const { HttpBadRequestError } = require("../utils/HttpErrors");

exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = {
    comment: req.body.comment,
    post: req.body.postId,
  };

  const comment = await Comment.create(newComment);

  res.status(201).json(comment);
});

exports.listComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({
    post: req.body.postId,
  });

  res.status(200).json(comments);
});

exports.extractPostId = catchAsync(async (req, res, next) => {
  const postId = req.params.postId || req.body.postId;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new HttpBadRequestError("No POST found with that given ID"));
  }

  req.body.postId = postId;

  next();
});
