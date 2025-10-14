import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import {
  GLOBAL_VALIDATION_PIPE,
  GLOBAL_RESPONSE_INTERCEPTOR,
} from './common/providers';
import { AuthModule } from './features/auth/auth.module';
import { AuthorizationModule } from './common/modules/authorization';
import { TodoModule } from './features/todo/todo.module';
import secretConfig from './configs/secret.config';
import { join } from 'path';
import adminConfig from './configs/admin.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, secretConfig, adminConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.uri'),
      }),
    }),
    AuthorizationModule.register({
      global: true,
      modelPath: join(__dirname, '../casbin/model.conf'),
      policyAdapter: join(__dirname, '../casbin/policy.csv'),
    }),
    UserModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService, GLOBAL_VALIDATION_PIPE, GLOBAL_RESPONSE_INTERCEPTOR],
})
export class AppModule {}
