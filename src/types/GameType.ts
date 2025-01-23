export interface GameItem extends GameInputType {
  id: string;
}

export interface GameInputType {
  name: string;
  genres: string[];
  minPlayer: number;
  description: string;
  maxPlayer: number;
  playDuration: number;
  dateAdded?: string;
  available: boolean;
  pictures: string[];
  size: String;
  minAge: number;
  condition: string;
} 
