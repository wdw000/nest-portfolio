import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createFileURL } from './multerOptions';

export default (file): string => {
  const uuidPath: string = `${uuidv4()}${extname(file.originalname)}`;
  return uuidPath;
};

export function getFileURL(
  files: Array<Express.Multer.File>,
  category: string,
): string[] {
  const generatedFiles: string[] = [];

  for (const file of files) {
    generatedFiles.push(createFileURL(file, category));
  }

  return generatedFiles;
}
