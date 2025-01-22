import { useEffect, useState } from 'react';
import axios from 'axios';
import { NewGameItem } from './components/NewGameItem';
import { GameItem } from './types/GameType';
import { GameItemModal } from './components/GameItemForm';
import { Button } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { getFullGameInfo } from './utils/getFullGameInfo';
import SeachInput from './components/SearchInput';


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

export const App = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [filteredGames, setFiltedGames] = useState<GameItem[]>([])
  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    const setItems = async (): Promise<void> => {
      const abc = await axios.get('http://localhost:3005/api/games');
      setGameItems(abc.data)
    };
    setItems().catch((error) => console.error(error));
  }, []);

  const handleSubmitGame = async (data: FieldValues): Promise<void> => {
    const fullGame = getFullGameInfo(data)
    try {
      const games = await axios.post('http://localhost:3005/api/games', fullGame)
      setGameItems(gameItems.concat(games.data))
    } catch(error){
      console.log('error: ', error)
    } finally {
      setOpen(false)      
    }
  }

  useEffect(() => {
    if(!searchValue) setFiltedGames(gameItems)
    else setFiltedGames(gameItems.filter((item) => item.name.includes(searchValue)))
  }, [searchValue, gameItems]) 

  const handleAddGame = (): void => {
    setOpen(true)
  }
  
  return (
    <>
      <Button onClick={handleAddGame} variant="contained">Add Game</Button>
      <SeachInput setSearchValue={setSearchValue} />
      <GameItemModal 
        handleSubmitGame={handleSubmitGame} 
        open={open} 
        onClose={() => setOpen(false)}
        gameInfo={null}
      />
      {filteredGames.map((item) => (
        <NewGameItem gameItems={gameItems} item={item} key={item.id} setGameItems={setGameItems} />
      ))}
    </>
  );
};
