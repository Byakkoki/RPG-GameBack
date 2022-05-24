import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/guard/jwtAuthentication.guard';
import { Armor } from '../entity/armor.entity';
import {
  ArmorChange,
  ArmorChangeLevel,
  ArmorChangeStats,
  ArmorPrice,
  CreateArmorDTO,
} from '../dto/armor.dto';
import { ArmorService } from './ArmorService';
import { RolesGuard } from '../authentication/guard/role.guard';
import { RoleEnum } from '../enums/role.enum';
import { WeaponPrice } from '../dto/weapon.dto';
import { Weapon } from '../entity/weapon.entity';

@Controller('armor')
export class ArmorController {
  constructor(private armorService: ArmorService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('')
  getAllArmors(): Promise<Armor[]> {
    return this.armorService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/:id')
  getOneArmor(@Param('id') id: string): Promise<Armor> {
    return this.armorService.find(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() data: CreateArmorDTO): Promise<Armor> {
    return this.armorService.create(data);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change/:id')
  changeAll(
    @Param('id') id: string,
    @Body() body: ArmorChange,
  ): Promise<Armor> {
    return this.armorService.changeAll(id, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_level/:id')
  changeLevel(
    @Param('id') id: string,
    @Body() body: ArmorChangeLevel,
  ): Promise<Armor> {
    return this.armorService.changeLevel(id, body.level);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_rarity/:id')
  changeRarity(
    @Param('id') id: string,
    @Body() body: { rarity: string },
  ): Promise<Armor> {
    return this.armorService.changeRarity(id, body.rarity);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_stats/:id')
  changeStats(
    @Param('id') id: string,
    @Body() body: ArmorChangeStats,
  ): Promise<Armor> {
    return this.armorService.changeStats(id, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_price/:id')
  changePrice(
    @Param('id') id: string,
    @Body() body: ArmorPrice,
  ): Promise<Armor> {
    return this.armorService.changePrice(id, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.armorService.deleteArmor(id);
  }
}
