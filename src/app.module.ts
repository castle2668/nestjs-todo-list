import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { TodoModule } from './features/todo/todo.module';
import secretConfig from './configs/secret.config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, secretConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongo.uri'),
      }),
    }),
    AuthorizationModule.register({
      modelPath: join(__dirname, '../casbin/model.conf'),
      policyAdapter: join(__dirname, '../casbin/policy.csv'),
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true,
          transform: true,
        });
      },
    },
  ],
})
export class AppModule {}
