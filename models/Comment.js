const { models, model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Comment must belong to a post"],
  },

  comment: {
    type: String,
    trim: true,
    required: [true, "Comment cannot be left blank!"],
  },
});

module.exports = models.Comment || model("Comment", CommentSchema);
