import './App.css';
import GameItem from './components/GameItem';
import { gameItemsData } from './dummyData';
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

const AppStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GameListStyle = styled.div`
  padding: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

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

const App = () => {
  return (
    <AppStyle>
      <GameListStyle>
        {gameItemsData
          .filter((game) => game.available)
          .map((item) => (
            <GameItem key={item.id} data={item} />
          ))}
      </GameListStyle>
    </AppStyle>
  );
};

export default App;
