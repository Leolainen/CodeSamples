import mongoose from "mongoose";

const codeSampleSchema = new mongoose.Schema(
  {
    userId: String,
    username: String,
    title: String,
    language: Array,
    framework: Array,
    codeSample: String,
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
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
