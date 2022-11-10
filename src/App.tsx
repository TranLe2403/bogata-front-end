import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import axios from 'axios';

import GameItem from './components/GameItem';
import TopBar from './components/TopBar';
import SeachInput from './components/SearchInput';
import FilterBox from './components/FilterBox';

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
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 32px;
  gap: 24px;
`;

const GameListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
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

const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [gameItems, setGameItems] = useState<GameItemType[]>([]);

  useEffect(() => {
    const setItems = async () => {
      const items = await axios.get<GameItemType[]>('http://localhost:3001/games');
      const filtedSearchResult = items.data.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setGameItems(filtedSearchResult);
    };
    setItems().catch((error) => console.error(error));
  }, [searchValue]);

  const renderGameList = () => {
    if (gameItems.length === 0) return <Typography component="p">No game found</Typography>;
    return gameItems
      .filter((game) => game.available)
      .map((item) => <GameItem key={item.id} data={item} />);
  };

  return (
    <>
      <TopBar />
      <SeachInput setSearchValue={setSearchValue} />
      <AppStyle>
        <FilterBox />
        <GameListStyle data-testid="game-list">{renderGameList()}</GameListStyle>
      </AppStyle>
    </>
  );
};

export default App;
