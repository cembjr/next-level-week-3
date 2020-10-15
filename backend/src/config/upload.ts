import multer from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname.replace(/ /g,'').replace(/[^A-Za-z.]/g,'')}`;
      cb(null, fileName);
    },
  }),
};
