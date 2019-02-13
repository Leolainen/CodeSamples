import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: String,
    username: String,
    codeSampleId: String,
    comment: String,
    likes: Array,
    edited: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
