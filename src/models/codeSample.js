import mongoose from "mongoose";

const codeSampleSchema = new mongoose.Schema(
  {
    userId: String,
    title: {
      type: String,
      validate: {
        validator: title => CodeSample.doesntExist(title),
        message: ({ value }) => `The title "${value}" is already taken`
      }
    },
    langauge: Array,
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
    date: Date
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
