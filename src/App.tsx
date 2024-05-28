import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { NewGameItem } from './components/NewGameItem';
import { GameInputType, GameItem } from './types/GameType';
import { GameItemModal } from './components/GameItemForm';
import { Button } from '@mui/material';


export interface GameItemType {
  id: string;
  name: string;
  description?: string;
  minPlayer: number;
  maxPlayer: number;
  playDuration: number;
  pictures?: string[];
  available: boolean;
  dateAdded: string;
  gameSize: 'small' | 'normal' | 'large';
  genre: Genre[];
  minAge: number;
  rule?: string;
  rating: number;
}


type Genre =
  | 'Co-op'
  | 'Action'
  | 'Survival'
  | 'Trading'
  | 'Strategy'
  | 'Resource Management'
  | 'RPG'
  | 'City Building'
  | 'Detective'; // Consider to use enum type

const DEFAULT_GAME_VALUE = {
  name: '',
  genres: [],
  minPlayer: 0,
  description: '',
  maxPlayer: 0,
  playDuration: 0,
  available: true,
  pictures: [],
  size: 'normal',
  minAge: 0,
  condition: '',  
}

export const App = (): JSX.Element => {
  const [gameInput, setGameInput] = useState<GameInputType>(DEFAULT_GAME_VALUE)
  const [open, setOpen] = useState(false)
  const [gameItems, setGameItems] = useState<GameItem[]>([]);

  useEffect(() => {
    const setItems = async (): Promise<void> => {
      const abc = await axios.get('http://localhost:3005/api/games');
      console.log('abc: ', abc)
      setGameItems(abc.data)
    };
    setItems().catch((error) => console.error(error));
  }, []);

  const handleSubmitGame = (event: FormEvent<HTMLFormElement> ): void => {
    event.preventDefault()
    axios.post('http://localhost:3005/api/games', gameInput).then(res => {
      setGameItems(gameItems.concat(res.data))
    }).catch(err => console.log(err))
    setGameInput(DEFAULT_GAME_VALUE)
    setOpen(false)
  }

  const handleAddGame = (): void => setOpen(true)
  return (
    <>
      <Button onClick={handleAddGame} variant="contained">Add Game</Button>
      <GameItemModal gameInput={gameInput} handleSubmitGame={handleSubmitGame} open={open} setGameInput={setGameInput} setOpen={setOpen} />
      {gameItems.map((item) => (
        <NewGameItem gameItems={gameItems} item={item} key={item.id} setGameItems={setGameItems} />
      ))}
    </>
  );
};
