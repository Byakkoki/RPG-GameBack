import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import {User} from "../../entity/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authenticatonService: AuthenticationService) {
    super({
      name: 'LocalStrategy',
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authenticatonService.getAuthenticatedUser(email, password);
  }
}
