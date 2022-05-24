import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from '../../enums/role.enum';
import { User } from '../../entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger: Logger = new Logger('RolesGuard');

  constructor(private roles: RoleEnum) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log(this.roles);
    if (!this.roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user === undefined || user === null) {
      return false;
    }

    return this.matchRoles(user, this.roles);
  }

  matchRoles(user: User, roles: RoleEnum) {
    let hasRole = true;
    if (user.role.includes(roles) == false) {
      hasRole = false;
    }
    return hasRole;
  }
}
