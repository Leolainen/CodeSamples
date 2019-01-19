import mongoose from "mongoose";

const codeSampleSchema = new mongoose.Schema(
  {
    userId: String,
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

codeSampleSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const CodeSample = mongoose.model("CodeSample", codeSampleSchema);

export default CodeSample;
