const { Router } = require("express");

const {
  listComments,
  createComment,
  extractPostId,
} = require("./../controllers/commentController");

const commentRouter = Router({ mergeParams: true });

commentRouter.use(extractPostId);

commentRouter.route("/").get(listComments).post(createComment);

module.exports = commentRouter;
