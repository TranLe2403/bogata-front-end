import React, { useState } from 'react';
import styled from '@emotion/styled';

import GameItem from './components/GameItem';
import { gameItemsData } from './dummyData';
import TopBar from './components/TopBar';
import FilterDropdown from './components/FilterDropdown';
import CustomSlider from './components/CustomSlider';

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
  margin-top: 72px;
  padding: 32px;
  gap: 40px;
`;

const GameListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FilterContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  padding: 32px 16px;
  gap: 16px;
`;

const FilterLabel = styled.h4`
  margin: 0;
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

const genre = [
  'Co-op',
  'Action',
  'Survival',
  'Trading',
  'Strategy',
  'Resource Management',
  'RPG',
  'City Building',
  'Detective'
];

const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [gameItems, setGameItems] = useState<GameItemType[]>(gameItemsData);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  const searchHandler = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    const filtedSearchResult = gameItemsData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setGameItems(filtedSearchResult);
  };

  return (
    <>
      <TopBar
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchHandler={searchHandler}
      />

      <AppStyle>
        <FilterContainer>
          <h3 style={{ margin: 0 }}>Filters</h3>
          <FilterLabel>Genre</FilterLabel>
          <FilterDropdown setOptions={setFilterOptions} options={filterOptions} data={genre} />
          <FilterLabel>Player Count</FilterLabel>
          <CustomSlider min={1} max={20} />
          <FilterLabel>Duration</FilterLabel>
          <CustomSlider min={0} max={180} />
          <FilterLabel>Size</FilterLabel>
          <FilterDropdown
            setOptions={setFilterOptions}
            options={filterOptions}
            data={['small', 'normal', 'large']}
          />
          <FilterLabel>Min Age</FilterLabel>
          <input type="number" />
          <FilterLabel>Ratings</FilterLabel>
          <CustomSlider min={1} max={10} />
        </FilterContainer>
        <GameListStyle data-testid="game-list">
          {gameItems
            .filter((game) => game.available)
            .map((item) => (
              <GameItem key={item.id} data={item} />
            ))}
        </GameListStyle>
      </AppStyle>
    </>
  );
};

export default App;
