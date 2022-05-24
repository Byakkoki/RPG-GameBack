import { Module } from '@nestjs/common';
import {DataBaseModule} from "./database/database.module";
import {UserModule} from "./user/user.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {ConfrerieModule} from "./confrerie/confrerie.module";

@Module({
  imports: [DataBaseModule, UserModule, AuthenticationModule, ConfrerieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
