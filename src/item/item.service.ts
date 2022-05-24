import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weapon } from '../entity/weapon.entity';
import { Confrerie } from '../entity/confrerie.entity';
import { CreateConfrerieDTO } from '../dto/confrerie.dto';
import {
  CreateWeaponDTO,
  WeaponChange,
  WeaponChangeStats,
  WeaponPrice,
} from '../dto/weapon.dto';
import { RoleEnum } from '../enums/role.enum';
import { Rank } from '../enums/rank.enum';
import { Rarity } from '../enums/rarity.enum';
import { Item } from '../entity/item.entity';
import { CreateItemDTO, ItemChange, ItemPrice } from '../dto/item.dto';
import { Type } from '../enums/type.enum';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async find(id: string): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id: id });
    if (item) {
      return item;
    }
    throw new HttpException('WEAPON NOT FOUND', HttpStatus.NOT_FOUND);
  }

  async create(data: CreateItemDTO) {
    const newItem = this.itemRepository.create(data);
    await this.itemRepository.save<Item>(newItem);
    return newItem;
  }

  async changeAll(id: string, stats: ItemChange) {
    const item = await this.find(id);
    item.image = stats.image;
    item.name = stats.name;
    item.description = stats.description;

    await this.itemRepository.save(item);
    return item;
  }

  async changeRarity(id: string, rarityName: string) {
    const item = await this.find(id);
    console.log(item.rarity);

    if (rarityName !== Rarity[rarityName]) {
      throw new HttpException('RARITY NOT FOUND', HttpStatus.NOT_FOUND);
    }
    item.rarity = Rarity[rarityName];
    await this.itemRepository.save(item);
    return item;
  }

  async changeType(id: string, typeName: string) {
    const item = await this.find(id);
    console.log(item.type);

    if (typeName !== Type[typeName]) {
      throw new HttpException('TYPE NOT FOUND', HttpStatus.NOT_FOUND);
    }
    item.type = Type[typeName];
    await this.itemRepository.save(item);
    return item;
  }

  async changePrice(id: string, stats: ItemPrice) {
    const item = await this.find(id);
    item.buy = stats.buy;
    item.sell = stats.sell;

    await this.itemRepository.save(item);
    return item;
  }

  async deleteItem(id: string) {
    const deleteItem = await this.itemRepository.delete(id);
    if (!deleteItem.affected) {
      throw new HttpException('ITEM NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
