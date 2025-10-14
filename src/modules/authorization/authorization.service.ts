import { Inject, Injectable } from '@nestjs/common';
import { CASBIN_ENFORCER } from './constants/token.const';
import { Enforcer } from 'casbin';
import { ActionType } from './types/action.type';

@Injectable()
export class AuthorizationService {
  constructor(@Inject(CASBIN_ENFORCER) private readonly enforcer: Enforcer) {}

  public async checkPermission(...args: string[]) {
    return this.enforcer.enforce(...args);
  }

  public mappingAction(method: string) {
    const table: Record<string, ActionType> = {
      GET: ActionType.Read,
      POST: ActionType.Create,
      PUT: ActionType.Update,
      PATCH: ActionType.Update,
      DELETE: ActionType.Delete,
    };
    return table[method.toUpperCase()];
  }
}
