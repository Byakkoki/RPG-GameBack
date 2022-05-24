import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Rank } from '../enums/rank.enum';
import { Rarity } from '../enums/rarity.enum';

@Entity()
export class Weapon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  level: number;

  @Column({
    type: 'enum',
    enum: Rarity,
    default: [Rarity.COMMUN],
  })
  rarity: Rarity;

  @Column('varchar')
  damage: number;

  @Column('varchar')
  crit_damage: number;

  @Column('varchar')
  crit_chance: number;

  @Column('varchar')
  durability: number;

  @Column('varchar')
  buy: number;

  @Column('varchar')
  sell: number;
}
