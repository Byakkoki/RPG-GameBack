import { Confrerie } from '../entity/confrerie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {ConfrerieController} from "./confrerie.controller";
import {ConfrerieService} from "./confrerie.service";
import {User} from "../entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Confrerie, User])],
  controllers: [ConfrerieController],
  providers: [ConfrerieService],
  exports: [ConfrerieService],
})
export class ConfrerieModule {}
