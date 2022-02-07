import multer from "multer";
import path from "path";

const fileUpload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1280 * 1280 },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext === ".jpg" ||
      ext === ".jpeg" ||
      ext === ".png" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
  },
});

export default fileUpload;
