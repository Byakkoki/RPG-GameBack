import { Rank } from '../enums/rank.enum';

export class UserChangeLevel {
  level: number;
}

export class UserChangeRank {
  rank: Rank;
}
export class UserChangeMoney {
  coins: number;
}
export class UserEmail {
  email: string;
}

export class CredentialsDTO {
  email: string;
  password: string;
}

export class CreateUserDTO {
  email: string;
  pseudo: string;
  password: string;
}
