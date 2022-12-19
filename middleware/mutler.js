import multer from "multer";

// *|| Mutler diskstorage implementation
const storage = multer.diskStorage({

  // *|| Destination decides the path to store the file
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },

  // *|| Filename - we can customize the file name
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${Date.now()}-${originalname}`)
  }
})

// *|| Filter the file 
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb (new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
}

// *|| pass the storage method in mutler function as object.
const upload = multer({ storage, fileFilter, 
  limits: { fileSize: 1000000000, files: 2 } })

export default upload