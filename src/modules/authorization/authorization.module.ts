import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationOptions } from './models/option.model';
import { CASBIN_ENFORCER } from './constants/token.const';
import { newEnforcer } from 'casbin';

@Module({})
export class AuthorizationModule {
  static register(options: AuthorizationOptions): DynamicModule {
    const { modelPath, policyAdapter, isGlobal } = options;
    const enforcerProvider: Provider = {
      provide: CASBIN_ENFORCER,
      useFactory: async () => {
        const enforcer = await newEnforcer(modelPath, policyAdapter);
        return enforcer;
      },
    };

    return {
      global: isGlobal,
      module: AuthorizationModule,
      providers: [enforcerProvider, AuthorizationService],
      exports: [AuthorizationService],
    };
  }
}
