import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from '../entity/weapon.entity';
import {WeaponController} from "./weapon.controller";
import {WeaponService} from "./weapon.service";

@Module({
  imports: [TypeOrmModule.forFeature([Weapon])],
  controllers: [WeaponController],
  providers: [WeaponService],
  exports: [WeaponService],
})
export class WeaponModule {}
