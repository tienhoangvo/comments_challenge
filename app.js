const express = require("express");
const cors = require("cors");

const errorHandler = require("./controllers/errorHandler");

const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use(errorHandler);

module.exports = app;
