import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  @UseInterceptors(FileInterceptor('fieldname'))
  @Post('single')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.originalname;
  }

  @UseInterceptors(AnyFilesInterceptor())
  @Post('multiple')
  uploadMultipleFiles(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const array = files.map((file) => file.originalname);
    return array;
  }
}
