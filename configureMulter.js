import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

function configureMulter(destinationFolder, fields) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
      const uniqueFilename = `${uuidv4()}${getFileExtension(file.originalname)}`;
      cb(null, uniqueFilename);
    }
  });

  const upload = multer({ storage: storage }).fields(fields);

  return function (req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: 'Multer error', error: err });
      } else if (err) {
        return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
      }
      next();
    });
  };
}

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 1);
}

export default configureMulter;
