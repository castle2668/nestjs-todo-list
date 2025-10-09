import { Request } from 'express';
import { join } from 'path';

export class MotorHelper {
  public static destination(
    request: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    callback(null, join(__dirname, '../../upload'));
  }

  public static filenameHandler(
    request: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    const timestamp = new Date().toISOString();
    const { originalname } = file;
    const filename = `${timestamp}-${originalname}`;
    callback(null, filename);
  }
}
