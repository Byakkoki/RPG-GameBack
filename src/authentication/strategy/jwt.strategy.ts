import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserTokenPayload } from '../../dto/userTokenPayload.dto';
import { User } from '../../entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger: Logger = new Logger('JwtStrategy');

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      name: 'JwtStrategy',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          this.logger.log(request?.headers['x-auth-rpg-game']);
          return request?.headers['x-auth-rpg-game'] as string;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: UserTokenPayload): Promise<User> {
    this.logger.log(payload.userId);
    return this.userService.getUser(payload.userId);
  }
}
