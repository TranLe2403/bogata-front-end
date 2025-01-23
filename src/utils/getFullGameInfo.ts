import { GameInputType } from "../types/GameType";

export const getFullGameInfo = (x: Partial<GameInputType>): GameInputType =>( {
  name: '',
  genres: [],
  minPlayer: 0,
  description: '',
  maxPlayer: 0,
  playDuration: 0,
  available: true,
  pictures: [],
  size: '',
  minAge: 0,
  condition: '',
  ...x
})