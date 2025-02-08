export interface GameItem extends GameInputType {
  id: string;
}

export interface GameInputType extends GameFormType {
  dateAdded?: string;
  available: boolean;
  pictures: string[];
  size: String;
  condition: string;
}

export interface GameFormType {
  name: string;
  genres: string[];
  minPlayer: number;
  description: string;
  maxPlayer: number;
  playDuration: number;
  minAge: number;
}
