import { HttpException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdir, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import uuidRandom from './uuidRandom';

export const multerSkillsOptions: MulterOptions = {
  fileFilter(req, file, callback) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|svg\+xml)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException('지원하지 않는 이미지 형식입니다.', 400),
        false,
      );
    }
  },

  storage: diskStorage({
    destination(req, file, callback) {
      const uploadPath: string = 'public/skills';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename(req, file, callback) {
      callback(null, uuidRandom(file));
    },
  }),
};

export const multerLearningOptions: MulterOptions = {
  fileFilter(req, file, callback) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|svg\+xml)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException('지원하지 않는 이미지 형식입니다.', 400),
        false,
      );
    }
  },

  storage: diskStorage({
    destination(req, file, callback) {
      const uploadPath: string = 'public/learning';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename(req, file, callback) {
      callback(null, uuidRandom(file));
    },
  }),
};

export const multerLinkOptions: MulterOptions = {
  fileFilter(req, file, callback) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|svg\+xml)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException('지원하지 않는 이미지 형식입니다.', 400),
        false,
      );
    }
  },

  storage: diskStorage({
    destination(req, file, callback) {
      const uploadPath: string = 'public/link';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename(req, file, callback) {
      callback(null, uuidRandom(file));
    },
  }),
};

export const multerProjectOptions: MulterOptions = {
  fileFilter(req, file, callback) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|svg\+xml|pdf)$/)) {
      callback(null, true);
    } else {
      callback(new HttpException('지원하지 않는 파일 형식입니다.', 400), false);
    }
  },

  storage: diskStorage({
    destination(req, file, callback) {
      const uploadPath: string = 'public/project';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename(req, file, callback) {
      callback(null, uuidRandom(file));
    },
  }),
};

export const createFileURL = (file, category): string => {
  const serverAddress = process.env.SERVER_ADDRESS;

  return `${serverAddress}public/${category}/${file.filename}`;
};
