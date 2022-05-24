import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Confrerie } from '../entity/confrerie.entity';
import JwtAuthenticationGuard from '../authentication/guard/jwtAuthentication.guard';
import {
  CreateConfrerieDTO,
  UpdateConfrerieDTO,
  UpdateLevelConfrerie,
} from '../dto/confrerie.dto';
import { ConfrerieService } from './confrerie.service';
import { UserChangeLevel } from '../dto/user.dto';
import { User } from '../entity/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('confrerie')
export class ConfrerieController {
  constructor(private confrerieService: ConfrerieService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  index(): Promise<Confrerie[]> {
    return this.confrerieService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(201)
  @Post()
  create(@Body() data: CreateConfrerieDTO) {
    return this.confrerieService.createConfrerie(data);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/:id')
  show(@Param('id') id: string): Promise<Confrerie> {
    return this.confrerieService.find(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/change_level/:id')
  changeLevel(
    @Param('id') idUser: string,
    @Body() body: UpdateLevelConfrerie,
  ): Promise<Confrerie> {
    return this.confrerieService.updateLevelConfrerie(idUser, body.level);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateConfrerieDTO,
  ): Promise<Confrerie> {
    return this.confrerieService.updateConfrerie(id, data);
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.confrerieService.deleteConfrerie(id);
  }
}
