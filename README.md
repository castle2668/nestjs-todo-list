# Maple Shop Backend

## Nest CLI 相關指令

```bash
安裝
npm install -g @nestjs/cli
nest --help
nest new maple-shop-backend

啟動
npm run start:dev

產生 Controller <CONTROLLER_NAME>
nest generate controller features/todo

產生 Module <MODULE_NAME>
nest generate module features/todo

產生 Service <SERVICE_NAME>
nest generate service features/todo

產生 Filter <FILTER_NAME>
nest generate filter filters/http

產生 Pipe <PIPE_NAME>
nest generate pipe pipes/parse-int

安裝 Pipe 相關套件
npm install --save class-validator class-transformer
npm install --save @nestjs/mapped-types

產生 Class Middleware <MIDDLEWARE_NAME>
nest generate middleware middlewares/logger

產生 Interceptor <INTERCEPTOR_NAME>
nest generate interceptor interceptors/response

產生 Guard <GUARD_NAME>
nest generate guard guards/auth

產生 Decorator <DECORATOR_NAME>
nest generate decorator decorators/roles
```
