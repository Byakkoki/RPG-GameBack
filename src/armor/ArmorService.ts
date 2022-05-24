import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rarity } from '../enums/rarity.enum';
import { Armor } from '../entity/armor.entity';
import {ArmorChange, ArmorChangeStats, CreateArmorDTO} from "../dto/armor.dto";

@Injectable()
export class ArmorService {
  constructor(
    @InjectRepository(Armor)
    private armorRepository: Repository<Armor>,
  ) {}

  findAll(): Promise<Armor[]> {
    return this.armorRepository.find();
  }

  async find(id: string): Promise<Armor> {
    const armor = await this.armorRepository.findOneBy({ id: id });
    if (armor) {
      return armor;
    }
    throw new HttpException('ARMOR NOT FOUND', HttpStatus.NOT_FOUND);
  }

  async create(data: CreateArmorDTO) {
    const newArmor = this.armorRepository.create(data);
    await this.armorRepository.save<Armor>(newArmor);
    return newArmor;
  }

  async changeAll(id: string, stats: ArmorChange) {
    const armor = await this.find(id);
    armor.image = stats.image;
    armor.name = stats.name;
    armor.description = stats.description;

    await this.armorRepository.save(armor);
    return armor;
  }

  async changeLevel(id: string, level: number) {
    const armor = await this.find(id);
    armor.level = level;

    await this.armorRepository.save(armor);
    return armor;
  }

  async changeRarity(id: string, rarityName: string) {
    const armor = await this.find(id);
    console.log(armor.rarity);

    if (rarityName !== Rarity[rarityName]) {
      throw new HttpException('ARMOR NOT FOUND', HttpStatus.NOT_FOUND);
    }
    armor.rarity = Rarity[rarityName];
    await this.armorRepository.save(armor);
    return armor;
  }

  async changeStats(id: string, stats: ArmorChangeStats) {
    const armor = await this.find(id);
    armor.health = stats.health;
    armor.defense = stats.defense;
    armor.durability = stats.durability;

    await this.armorRepository.save(armor);
    return armor;
  }

  async deleteArmor(id: string) {
    const deleteArmor = await this.armorRepository.delete(id);
    if (!deleteArmor.affected) {
      throw new HttpException('ARMOR NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
