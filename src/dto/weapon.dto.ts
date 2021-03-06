export class CreateWeaponDTO {
  image: string;
  name: string;
  description: string;
  level: number;
  damage: number;
  crit_damage: number;
  crit_chance: number;
  durability: number;
  buy: number;
  sell: number;
}
export class WeaponChangeLevel {
  level: number
}
export class WeaponChangeStats {
  damage: number;
  crit_damage: number;
  crit_chance: number;
  durability: number;
}
export class WeaponChange {
  image: string;
  name: string;
  description: string;
}
export class WeaponPrice {
  buy: number;
  sell: number;
}