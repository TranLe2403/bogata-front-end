import { useEffect, useState } from 'react';
import axios from 'axios';
import { NewGameItem } from './components/NewGameItem';
import { GameItem } from './types/GameType';
import { GameItemModal } from './components/GameItemForm';
import { Button } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { getFullGameInfo } from './utils/getFullGameInfo';
import Login from './components/Login';
import styled from '@emotion/styled';


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

const UserDefaultImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: red;
  position: fixed;
  right: 32px;
  top: 16px;
  z-index: 2;
`;

const UserImage = styled.img`
  border-radius: 20px;
  position: fixed;
  right: 32px;
  top: 16px;
  z-index: 2;
`;

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

  export interface UserInfo {
    email: string;
    name: string;
    picture: string;
  }

export const App = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [gameItems, setGameItems] = useState<GameItem[]>([]);

  const [user, setUser] = useState<UserInfo>({ email: '', name: '', picture: '' });
  const [showLogin, setShowLogin] = useState<boolean>(false);

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

  const handleAddGame = (): void => setOpen(true)

  const userClickHandler = (): void => setShowLogin(!showLogin);

  return (
    <>
    {user.picture === '' ? (
        <UserDefaultImage onClick={userClickHandler} />
      ) : (
        <UserImage
          src={user.picture}
          alt={user.name}
          width={40}
          height={40}
          onClick={userClickHandler}
        />
      )}

      {showLogin ? (
        <Login
          email={user.email}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setUser={setUser}
        />
      ): null}

      <Button onClick={handleAddGame} variant="contained">Add Game</Button>
      <GameItemModal 
        handleSubmitGame={handleSubmitGame} 
        open={open} 
        onClose={() => setOpen(false)}
        gameInfo={null}
      />
      {gameItems.map((item) => (
        <NewGameItem gameItems={gameItems} item={item} key={item.id} setGameItems={setGameItems} />
      ))}
    </>
  );
};
