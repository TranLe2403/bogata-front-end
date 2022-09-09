import React, { useState } from 'react';
import styled from '@emotion/styled';

import GameItem from './components/GameItem';
import { gameItemsData } from './dummyData';
import TopBar from './components/TopBar';
import Login from './components/Login';

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

export interface UserInfo {
  email: string;
  name: string;
  picture: string;
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

type EventType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>;

const AppStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameListStyle = styled.div`
  padding: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 72px;
`;

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

const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [gameItems, setGameItems] = useState<GameItemType[]>(gameItemsData);
  const [user, setUser] = useState<UserInfo>({ email: '', name: '', picture: '' });
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const searchHandler = (e: EventType) => {
    e.preventDefault();
    const filtedSearchResult = gameItemsData.filter((item) => item.name.includes(searchValue));
    setGameItems(filtedSearchResult);
  };

  const userClickHandler = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <TopBar
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchHandler={searchHandler}
      />

      {user.picture === '' ? (
        <UserDefaultImage onClick={userClickHandler}></UserDefaultImage>
      ) : (
        <UserImage
          src={user.picture}
          alt={user.name}
          width={40}
          height={40}
          onClick={userClickHandler}
        />
      )}

      {showLogin && (
        <Login
          email={user.email}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setUser={setUser}
        />
      )}

      <AppStyle>
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
