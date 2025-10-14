import { RoleGuard } from './role.guard';
import { AuthorizationService } from 'src/modules/authorization';

describe('RoleGuard', () => {
  it('should be defined', () => {
    const mockAuthService = {} as AuthorizationService;
    expect(new RoleGuard(mockAuthService)).toBeDefined();
  });
});
