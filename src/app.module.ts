import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfrerieModule } from './confrerie/confrerie.module';
import { WeaponModule } from './weapon/weapon.module';
import {ArmorModule} from "./armor/armor.module";
import {ItemModule} from "./item/item.module";

@Module({
  imports: [
    DataBaseModule,
    UserModule,
    AuthenticationModule,
    ConfrerieModule,
    WeaponModule,
    ArmorModule,
    ItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
