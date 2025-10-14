import { Provider } from '@nestjs/common';
import { ResponseInterceptor } from '../interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';

export const GLOBAL_RESPONSE_INTERCEPTOR: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: ResponseInterceptor,
};
