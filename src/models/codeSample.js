import mongoose from "mongoose";

const codeSampleSchema = new mongoose.Schema(
  {
    userId: String,
    username: String,
    title: String,
    codeSample: String,
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

const CodeSample = mongoose.model("CodeSample", codeSampleSchema);

export default CodeSample;
