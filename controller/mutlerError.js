import multer from "multer";

const MulterError = (error, req, res, next) => {
  if(error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File should not above 5MB."});
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ message: "File limit is one."});
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "File must be an image."});
    }
  }
}

export default MulterError

