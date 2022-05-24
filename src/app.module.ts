import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfrerieModule } from './confrerie/confrerie.module';
import { WeaponModule } from './weapon/weapon.module';
import {ArmorModule} from "./armor/armor.module";

@Module({
  imports: [
    DataBaseModule,
    UserModule,
    AuthenticationModule,
    ConfrerieModule,
    WeaponModule,
    ArmorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
