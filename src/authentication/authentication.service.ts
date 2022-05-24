import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {CreateUserDTO} from "../dto/user.dto";
import {UserTokenPayload} from "../dto/userTokenPayload.dto";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(userData: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    try {
      const newUser = await this.userService.createUser({
        ...userData,
        password: hashedPassword,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      if (error.sqlState === '23000' || error.code === '23505') {
        throw new HttpException(
          'User with that email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: UserTokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public getJwtToken(userId: string) {
    const payload: UserTokenPayload = { userId };
    return this.jwtService.sign(payload);
  }
}
