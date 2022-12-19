import mongoose from "mongoose";
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  path: {
    type: String,
    require: true
  }
})

const imageModel = mongoose.model('Image', imageSchema);

export default imageModel