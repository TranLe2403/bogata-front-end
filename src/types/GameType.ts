export interface GameItem extends GameInputType {
  id: string;
}

export interface GameInputType {
  name: string;
  genres: string[];
  minPlayer: number,
  description: string,
  maxPlayer: number,
  playDuration: number,
  available: boolean,
  pictures: string[],
  size: String,
  minAge: number,
  condition: string,
} 
