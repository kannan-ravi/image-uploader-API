// import upload from "../middleware/mutler.js"
import imageModel from '../model/uploadSchema.js';
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const getImage = async (req, res) => {
  const images = await imageModel.find().sort({ _id: -1 }).limit(1);
  if (!images) return res.status(204).json({ 'message': 'No images found.' });
  res.json(images);
}

const uploadImage = async (req, res) => {

  const s3Uploadv3 = async (file) => {
    const s3client = new S3Client();
    let keyId = `${uuid()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${keyId}`,
      Body: file.buffer
    }

    let obj = {
      filename: keyId,
      desc: 'uploads',
      path: `https://aws-s3-devchallenges-image-upload.s3.ap-northeast-1.amazonaws.com/uploads/${keyId}`
    }
    
    const result = await imageModel.create(obj)
    return s3client.send(new PutObjectCommand(params))
  }

  const result = await s3Uploadv3(req.file);

  res.status(201).json({message: 'Image Uploaded Successfully'});
}

export default { uploadImage, getImage }