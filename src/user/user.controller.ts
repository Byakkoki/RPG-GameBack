import {
  Body, ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { UserChangeLevel, UserChangeMoney } from '../dto/user.dto';
import RequestWithUser from '../authentication/request/requestWithUser.interface';
import JwtAuthenticationGuard from "../authentication/guard/jwtAuthentication.guard";
import {RolesGuard} from "../authentication/guard/role.guard";
import {RoleEnum} from "../enums/role.enum";

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  private logger: Logger = new Logger('UserController');

  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('')
  getAllUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/me')
  getOneUser(@Req() req: RequestWithUser): User {
    return req.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/:email')
  getOneUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/pseudo/:pseudo')
  getOneUserByPseudo(@Param('pseudo') pseudo: string): Promise<User> {
    return this.userService.getUserByPseudo(pseudo);
  }

  @UseGuards(JwtAuthenticationGuard, new RolesGuard([RoleEnum.ADMIN]))
  @Put('/change_role/:id')
  changeRole(
    @Param('id') idUser: string,
    @Body() body: { role: string },
  ): Promise<User> {
    return this.userService.addRole(idUser, body.role);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_level/:id')
  changeLevel(
    @Param('id') idUser: string,
    @Body() body: UserChangeLevel,
  ): Promise<User> {
    return this.userService.changeLevel(idUser, body.level);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_coins/:id')
  changeCoins(
    @Param('id') idUser: string,
    @Body() body: UserChangeMoney,
  ): Promise<User> {
    return this.userService.changeCoins(idUser, body.coins);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_rank/:id')
  changeRank(
    @Param('id') idUser: string,
    @Body() body: { rank: string },
  ): Promise<User> {
    return this.userService.changeRank(idUser, body.rank);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('/:id/confrerie')
  setConfrerieToUser(@Req()req: RequestWithUser, @Param('id') idUser: string, @Body() body: { confrerie: string}): Promise<User>{
    return this.userService.setConfrerie(idUser, body.confrerie)
  }

}
