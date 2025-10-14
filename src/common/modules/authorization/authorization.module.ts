import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { IAuthorizationOptions } from './models/option.model';

import { newEnforcer } from 'casbin';
import { CASBIN_ENFORCER } from './constants/token.const';

@Module({})
export class AuthorizationModule {
  static register(options: IAuthorizationOptions): DynamicModule {
    const { modelPath, policyAdapter, global = false } = options;
    const enforcer: Provider = {
      provide: CASBIN_ENFORCER,
      useFactory: async () => {
        const instance = await newEnforcer(modelPath, policyAdapter);
        return instance;
      },
    };

    return {
      module: AuthorizationModule,
      global,
      providers: [enforcer, AuthorizationService],
      exports: [AuthorizationService],
    };
  }
}
