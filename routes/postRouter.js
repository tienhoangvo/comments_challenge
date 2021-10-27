const { Router } = require("express");

const {
  listPosts,
  createPost,
  getPost,
} = require("./../controllers/postController");

const commentRouter = require("./commentRouter");

const postRouter = Router();

postRouter.use("/:postId/comments", commentRouter);
postRouter.route("/").get(listPosts).post(createPost);

postRouter.route("/:id").get(getPost);
module.exports = postRouter;
