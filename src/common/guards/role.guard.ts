import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../modules/authorization';
import { IUserPayload } from 'src/features/auth/models/payload.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly authorizationService: AuthorizationService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { user, method, path } = request;
    const { role } = user as IUserPayload;
    const action = this.authorizationService.mappingAction(method);
    return this.authorizationService.checkPermission(
      `role:${role}`,
      path,
      action,
    );
  }
}
