import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RequestWithUser from './request/requestWithUser.interface';
import { Response } from 'express';
import JwtAuthentificationGuard from './guard/jwtAuthentication.guard';
import JwtAuthenticationGuard from './guard/jwtAuthentication.guard';
import {CreateUserDTO} from "../dto/user.dto";
import {LocalAuthentificationGuard} from "./guard/localAuthentication.guard";

@Controller('authentication')
export class AuthenticationController {
  private logger: Logger = new Logger('AuthenticationController');

  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() data: CreateUserDTO) {
    return this.authenticationService.register(data);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthentificationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.getJwtToken(user.id);
    //response.setHeader('Set-Cookie', cookie)
    user.password = undefined;
    return response.send({ user: user, token: cookie });
    /*return response.send({
            "token": cookie
        })*/
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthentificationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
