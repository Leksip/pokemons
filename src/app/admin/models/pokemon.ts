import {Tag} from "./tag";

export class Pokemon {
  readonly id: number;
  name: string;
  height: string;
  weight: string;
  tags: Tag[];
  description: string;
  abilities: string[];
  level:number;
  hp:number;
  attack: number;
  defend: number;
  stamina:number;
  spd:number;
  staticImageUrl?: string;
  dynamicImageUrl?: string;
}
