import mongoose from "mongoose";

const frameworkSchema = new mongoose.Schema({
  codeSampleId: Array,
  framework: String
});

const Framework = mongoose.model("Framework", frameworkSchema);

export default Framework;
