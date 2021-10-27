const { Schema, model, models } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Post must have a title!"],
    },

    content: {
      type: String,
      required: [true, "Post must have its content!"],
    },
  },
  { timestamps: true }
);

module.exports = models.Post || model("Post", PostSchema);
