import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weapon } from '../entity/weapon.entity';
import { Confrerie } from '../entity/confrerie.entity';
import { CreateConfrerieDTO } from '../dto/confrerie.dto';
import {CreateWeaponDTO, WeaponChange, WeaponChangeStats} from '../dto/weapon.dto';
import { RoleEnum } from '../enums/role.enum';
import { Rank } from '../enums/rank.enum';
import { Rarity } from '../enums/rarity.enum';

@Injectable()
export class WeaponService {
  constructor(
    @InjectRepository(Weapon)
    private weaponRepositoty: Repository<Weapon>,
  ) {}

  findAll(): Promise<Weapon[]> {
    return this.weaponRepositoty.find();
  }

  async find(id: string): Promise<Weapon> {
    const weapon = await this.weaponRepositoty.findOneBy({ id: id });
    if (weapon) {
      return weapon;
    }
    throw new HttpException('WEAPON NOT FOUND', HttpStatus.NOT_FOUND);
  }

  async create(data: CreateWeaponDTO) {
    const newWeapon = this.weaponRepositoty.create(data);
    await this.weaponRepositoty.save<Weapon>(newWeapon);
    return newWeapon;
  }

  async changeAll(id: string, stats: WeaponChange) {
    const weapon = await this.find(id);
    weapon.image = stats.image;
    weapon.name = stats.name;
    weapon.description = stats.description;

    await this.weaponRepositoty.save(weapon);
    return weapon;
  }

  async changeLevel(id: string, level: number) {
    const weapon = await this.find(id);
    weapon.level = level;

    await this.weaponRepositoty.save(weapon);
    return weapon;
  }

  async changeRarity(id: string, rarityName: string) {
    const weapon = await this.find(id);
    console.log(weapon.rarity);

    if (rarityName !== Rarity[rarityName]) {
      throw new HttpException('RARITY NOT FOUND', HttpStatus.NOT_FOUND);
    }
    weapon.rarity = Rarity[rarityName];
    await this.weaponRepositoty.save(weapon);
    return weapon;
  }

  async changeStats(id: string, stats: WeaponChangeStats) {
    const weapon = await this.find(id);
    weapon.damage = stats.damage;
    weapon.crit_damage = stats.crit_damage;
    weapon.crit_chance = stats.crit_chance;
    weapon.durability = stats.durability;

    await this.weaponRepositoty.save(weapon);
    return weapon;
  }

  async deleteWeapon(id: string) {
    const deleteWeapon = await this.weaponRepositoty.delete(id);
    if (!deleteWeapon.affected) {
      throw new HttpException('WEAPON NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
