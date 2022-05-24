export class CreateArmorDTO {
  image: string;
  name: string;
  description: string;
  level: number;
  health: number;
  defense: number;
  durability: number;
  buy: number;
  sell: number;
}
export class ArmorChangeLevel {
  level: number;
}
export class ArmorChangeStats {
  health: number;
  defense: number;
  durability: number;
}
export class ArmorChange {
  image: string;
  name: string;
  description: string;
}
export class ArmorPrice {
  buy: number;
  sell: number;
}
