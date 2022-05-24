import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UserEmail } from '../dto/user.dto';
import { RoleEnum } from '../enums/role.enum';
import { Rank } from '../enums/rank.enum';
import { ConfrerieService } from '../confrerie/confrerie.service';

@Injectable()
export class UserService {
  private logger: Logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly confrerieService: ConfrerieService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['confrerie'] });
  }

  async getUser(id: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userRepository.findOneBy({ id: id });

      if (user != null) {
        resolve(user);
      } else {
        reject(null);
        throw new HttpException(
          'User with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
    });
  }

  async addRole(idUser: string, roleName: string) {
    const user = await this.getUser(idUser);
    console.log(user.role);

    if (roleName !== RoleEnum[roleName]) {
      throw new HttpException('ROLE NOT FOUND', HttpStatus.NOT_FOUND);
    }
    user.role = RoleEnum[roleName];
    await this.userRepository.save(user);
    return user;
  }

  async setConfrerie(idUser: string, idConfrerie: string) {
    const user = await this.getUser(idUser);
    user.confrerie = await this.confrerieService.find(idConfrerie);

    await this.userRepository.save(user);
    return user;
  }

  async changeRank(idUser: string, rankName: string) {
    const user = await this.getUser(idUser);
    console.log(user.rank);

    if (rankName !== RoleEnum[rankName]) {
      throw new HttpException('RANK NOT FOUND', HttpStatus.NOT_FOUND);
    }
    user.rank = Rank[rankName];
    await this.userRepository.save(user);
    return user;
  }

  async changeLevel(idUser: string, level: number) {
    const user = await this.getUser(idUser);
    user.level = level;

    await this.userRepository.save(user);
    return user;
  }

  async changeCoins(idUser: string, coins: number) {
    const user = await this.getUser(idUser);
    user.coins = coins;

    await this.userRepository.save(user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = this.userRepository.findOneBy({ email: email });
    if (user) {
      return user;
    }
  }

  async getUserByPseudo(pseudo: string): Promise<User> {
    const user = this.userRepository.findOneBy({ pseudo: pseudo });
    if (user) {
      return user;
    }
  }

  async createUser(user: CreateUserDTO) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save<User>(newUser);
    return newUser;
  }
}
