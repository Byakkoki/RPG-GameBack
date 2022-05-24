import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Armor } from '../entity/armor.entity';
import { ArmorController } from './armor.controller';
import { ArmorService } from './ArmorService';

@Module({
  imports: [TypeOrmModule.forFeature([Armor])],
  controllers: [ArmorController],
  providers: [ArmorService],
  exports: [ArmorService],
})
export class ArmorModule {}
