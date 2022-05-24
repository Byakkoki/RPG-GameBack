import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Rarity } from '../enums/rarity.enum';

@Entity()
export class Armor {
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
  health: number;

  @Column('varchar')
  defense: number;

  @Column('varchar')
  durability: number;
}
