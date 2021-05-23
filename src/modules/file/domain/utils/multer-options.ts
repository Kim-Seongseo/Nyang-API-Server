import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import encryptFileName from './encrypt-file-name';

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          'Only image files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = './images';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },

    filename: (request, file, callback) => {
      callback(null, encryptFileName(file));
    },
  }),
};
