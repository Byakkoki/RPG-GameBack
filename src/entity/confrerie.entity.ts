import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Confrerie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  tag: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', default: 0 })
  level: number;

  @Column({ type: 'varchar' })
  logo: string;

  @OneToMany(() => User, user => user.confrerie)
  members: User[];
}
