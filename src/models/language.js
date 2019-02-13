import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  codeSampleId: Array,
  language: String
});

const language = mongoose.model("Language", languageSchema);

export default language;
