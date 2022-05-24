import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Rarity } from '../enums/rarity.enum';
import { Type } from '../enums/type.enum';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column({
    type: 'enum',
    enum: Type,
    default: [Type.NULL],
  })
  type: Type;

  @Column({
    type: 'enum',
    enum: Rarity,
    default: [Rarity.COMMUN],
  })
  rarity: Rarity;

  @Column('varchar')
  buy: number;

  @Column('varchar')
  sell: number;
}
