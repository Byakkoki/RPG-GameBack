import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "../entity/user.entity";
import {Confrerie} from "../entity/confrerie.entity";
import {Weapon} from "../entity/weapon.entity";
import {Armor} from "../entity/armor.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Confrerie, Weapon, Armor],
        synchronize: true,
        migrations: ['dist/src/db/migrations.ts'],
        cli: { migrationsDir: 'src/db/migrations' },
      }),
    }),
  ],
})
export class DataBaseModule {}
