import mongoose from "mongoose";

const codeSampleSchema = new mongoose.Schema(
  {
    userId: String,
    username: String,
    title: String,
    codeSample: String,
    frameworks: Array,
    languages: Array,
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

const frameworkSchema = new mongoose.Schema({
  framework: String
});

const languageSchema = new mongoose.Schema({
  language: String
});

export const CodeSample = mongoose.model("CodeSample", codeSampleSchema);
export const Framework = mongoose.model("Framework", frameworkSchema);
export const Language = mongoose.model("Language", languageSchema);
