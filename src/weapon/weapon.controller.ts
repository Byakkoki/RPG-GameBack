import {
  Body,
  Controller, Delete,
  Get, HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/guard/jwtAuthentication.guard';
import { Weapon } from '../entity/weapon.entity';
import { WeaponService } from './weapon.service';
import {
  CreateWeaponDTO, WeaponChange,
  WeaponChangeLevel,
  WeaponChangeStats,
} from '../dto/weapon.dto';
import { UserChangeLevel } from '../dto/user.dto';
import { User } from '../entity/user.entity';

@Controller('weapon')
export class WeaponController {
  constructor(private weaponService: WeaponService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('')
  getAllWeapons(): Promise<Weapon[]> {
    return this.weaponService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/:id')
  getOneUserByEmail(@Param('id') id: string): Promise<Weapon> {
    return this.weaponService.find(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() data: CreateWeaponDTO): Promise<Weapon> {
    return this.weaponService.create(data);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change/:id')
  changeAll(
      @Param('id') id: string,
      @Body() body: WeaponChange,
  ): Promise<Weapon> {
    return this.weaponService.changeAll(id, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_level/:id')
  changeLevel(
    @Param('id') id: string,
    @Body() body: WeaponChangeLevel,
  ): Promise<Weapon> {
    return this.weaponService.changeLevel(id, body.level);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_rarity/:id')
  changeRarity(
    @Param('id') id: string,
    @Body() body: { rarity: string },
  ): Promise<Weapon> {
    return this.weaponService.changeRarity(id, body.rarity);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_stats/:id')
  changeStats(
    @Param('id') id: string,
    @Body() body: WeaponChangeStats,
  ): Promise<Weapon> {
    return this.weaponService.changeStats(id, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.weaponService.deleteWeapon(id);
  }
}
