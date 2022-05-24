import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {ConfrerieModule} from "../confrerie/confrerie.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfrerieModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
