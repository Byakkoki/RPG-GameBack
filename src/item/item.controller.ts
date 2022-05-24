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
import { CreateItemDTO, ItemChange, ItemPrice } from '../dto/item.dto';
import { Item } from '../entity/item.entity';
import {ItemService} from "./item.service";

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('')
  getAllItems(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/:id')
  getOneItem(@Param('id') id: string): Promise<Item> {
    return this.itemService.find(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() data: CreateItemDTO): Promise<Item> {
    return this.itemService.create(data);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change/:id')
  changeAll(@Param('id') id: string, @Body() body: ItemChange): Promise<Item> {
    return this.itemService.changeAll(id, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_rarity/:id')
  changeRarity(
    @Param('id') id: string,
    @Body() body: { rarity: string },
  ): Promise<Item> {
    return this.itemService.changeRarity(id, body.rarity);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_type/:id')
  changeType(
    @Param('id') id: string,
    @Body() body: { type: string },
  ): Promise<Item> {
    return this.itemService.changeType(id, body.type);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_price/:id')
  changePrice(@Param('id') id: string, @Body() body: ItemPrice): Promise<Item> {
    return this.itemService.changePrice(id, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.itemService.deleteItem(id);
  }
}
