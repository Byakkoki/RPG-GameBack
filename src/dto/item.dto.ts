export class CreateItemDTO {
    image: string;
    name: string;
    description: string;
    buy: number;
    sell: number;
}
export class ItemChange {
    image: string;
    name: string;
    description: string;
}
export class ItemPrice {
    buy: number;
    sell: number;
}