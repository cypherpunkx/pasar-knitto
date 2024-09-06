import type { Request } from 'express';
import path from 'path';
import multer, { type FileFilterCallback } from 'multer';
import fs from 'fs';
import { BadRequest } from 'http-errors';
import configurations from '@configs/index';
import logger from './logger';

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    const now = new Date().toISOString();
    const dirName = now.split('T')[0];

    const dirPath = path.join(process.cwd(), 'uploads', dirName);

    fs.mkdir(dirPath, { recursive: true }, (err, path) => {
      if (err) {
        console.error(err);
        logger.error({ err });
      }

      if (path) {
        logger.info(`${path} is storage`);
      }

      logger.info(`${dirName} has been created`);
    });

    cb(null, dirPath);
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Validasi File
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|bmp|tiff|webp/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedFileTypes.test(file.mimetype);
  console.log(extname);
  console.log(mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      new BadRequest(
        'File type not supported. Ensure the file has an extension matching one of the following formats: jpeg, jpg, png, gif, bmp, tiff, webp.'
      )
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: configurations.FILE_SIZE_LIMITS }, // Limitasi ukuran file 5MB
  fileFilter: fileFilter,
});

export default upload;
