import mongoose from "mongoose";

const likesSchema = new mongoose.Schema(
  {
    userId: String,
    codeSampleId: String
  },
  {
    timestamps: true
  }
);

const Likes = mongoose.model("Likes", likesSchema);

export default Likes;
