import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MotorHelper } from './helpers/motor.helper';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: MotorHelper.destination,
        filename: MotorHelper.filenameHandler,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
