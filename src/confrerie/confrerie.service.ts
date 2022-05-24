import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Confrerie } from '../entity/confrerie.entity';
import {CreateConfrerieDTO, UpdateConfrerieDTO, UpdateLevelConfrerie} from "../dto/confrerie.dto";

@Injectable()
export class ConfrerieService {
  constructor(
    @InjectRepository(Confrerie)
    private confrerieRepository: Repository<Confrerie>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Confrerie[]> {
    return this.confrerieRepository.find({ relations: ['members'] });
  }

  async find(id: string): Promise<Confrerie> {
    const confrerie = await this.confrerieRepository.findOneBy({ id: id });
    if (confrerie) {
      return confrerie;
    }
    throw new HttpException('CONFRERIE NOT FOUND', HttpStatus.NOT_FOUND);
  }

  async createConfrerie(data: CreateConfrerieDTO) {
    const newConfrerie = this.confrerieRepository.create(data);
    await this.confrerieRepository.save<Confrerie>(newConfrerie);
    return newConfrerie;
  }

  async updateLevelConfrerie(id: string, level: number) {
    const confrerie = await this.find(id);
    confrerie.level = level;

    await this.userRepository.save(confrerie);
    return confrerie;
  }

  async updateConfrerie(id: string, data: UpdateConfrerieDTO) {
    const confrerie = await this.find(id);
    confrerie.name = data.name;
    confrerie.description = data.description;
    confrerie.logo = data.logo;

    await this.confrerieRepository.save(confrerie);
    return confrerie;
  }

  async deleteConfrerie(id: string) {
    const deleteConfrerie = await this.confrerieRepository.delete(id);
    if (!deleteConfrerie.affected) {
      throw new HttpException('CONFRERIE NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }

}
