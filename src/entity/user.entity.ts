import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Rank } from '../enums/rank.enum';
import {RoleEnum} from "../enums/role.enum";
import {Max, MaxLength} from "class-validator";
import {Confrerie} from "./confrerie.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  pseudo: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @Column({ type: 'varchar', default: 0 })
  level: number;

  @Column({ type: 'varchar', default: 1000 })
  coins: number;

  @Column({
    type: 'enum',
    enum: Rank,
    default: [Rank.F],
  })
  rank: Rank;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: [RoleEnum.PLAYER],
  })
  role: RoleEnum;

  @ManyToOne(() => Confrerie, confrerie => confrerie.members)
  confrerie: Confrerie;

}
