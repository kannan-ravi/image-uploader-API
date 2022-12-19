import mutllerController from '../controller/mutlerController.js';
import upload from '../middleware/mutler.js';
import express from 'express';
const router = express.Router();


router.route('/')
  .get(mutllerController.getImage)
  .post(upload.single('images'), mutllerController.uploadImage)


export default router