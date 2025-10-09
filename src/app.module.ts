import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './features/todo/todo.module';
import databaseConfig from './configs/database.config';
import serverConfig from './configs/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['development.local.env', 'development.env'],
      load: [databaseConfig, serverConfig],
      expandVariables: true,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const domain = this.configService.get('APP_DOMAIN');
    const redirectUrl = this.configService.get('APP_REDIRECT_URL');
    console.log(domain, redirectUrl);
  }
}
