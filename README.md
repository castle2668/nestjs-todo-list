# NestJS Practice

## 建立專案

```bash
# 安裝
npm install -g @nestjs/cli
nest --help
nest new nestjs-practice

# 啟動
npm run start:dev
```

## 常用套件

- class-validator、class-transformer
- @nestjs/mapped-types
- @nestjs/config
- @types/multer
- @nestjs/axios

```bash
# 安裝 Pipe 相關套件
npm install --save class-validator class-transformer
npm install --save @nestjs/mapped-types

# 安裝 Configuration 套件
npm install @nestjs/config

# 安裝 File Upload 定義檔
npm install @types/multer -D

# 安裝 Axios 套件
npm install @nestjs/axios

# 安裝 EventEmitter2 套件
npm install @nestjs/event-emitter
```

## 常用 Nest CLI 指令

```bash
# 產生 Controller <CONTROLLER_NAME>
nest generate controller features/todo

# 產生 Module <MODULE_NAME>
nest generate module features/todo

# 產生 Service <SERVICE_NAME>
nest generate service features/todo

# 產生 Filter <FILTER_NAME>
nest generate filter filters/http

# 產生 Pipe <PIPE_NAME>
nest generate pipe pipes/parse-int

# 產生 Class Middleware <MIDDLEWARE_NAME>
nest generate middleware middlewares/logger

# 產生 Interceptor <INTERCEPTOR_NAME>
nest generate interceptor interceptors/response

# 產生 Guard <GUARD_NAME>
nest generate guard guards/auth

# 產生 Decorator <DECORATOR_NAME>
nest generate decorator decorators/roles
```
