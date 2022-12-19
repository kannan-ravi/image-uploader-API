// import upload from "../middleware/mutler.js"
import imageModel from '../model/uploadSchema.js';
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const getImage = async (req, res) => {
  const images = await imageModel.find().sort({ _id: -1 }).limit(1);
  if (!images) return res.status(204).json({ 'message': 'No images found.' });
  res.json(images);
}

const uploadImage = async (req, res) => {

  console.log(path.join(__dirname, '..', req.file.path))

  let obj = {
    filename: req.file.filename,
    desc: req.file.destination,
    path: path.join(__dirname, '..', req.file.path)
  }

  const result = await imageModel.create(obj)
  res.status(201).json({result});
}

export default { uploadImage, getImage }