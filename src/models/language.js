import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  codeSampleId: Array,
  languages: String
});

const language = mongoose.model("Language", languageSchema);

export default language;
