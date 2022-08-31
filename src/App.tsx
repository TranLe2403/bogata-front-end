import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import styled from '@emotion/styled';

import './App.css';
import GameItem from './components/GameItem';
import { gameItemsData } from './dummyData';
import TopBar from './components/TopBar';

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

interface UserInfo {
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
`;

const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<GameItemType[]>(gameItemsData);
  const [user, setUser] = useState<UserInfo>({ email: '', name: '', picture: '' });

  const searchHandler = (e: EventType) => {
    e.preventDefault();
    const filtedSearchResult = gameItemsData.filter((item) => item.name.includes(searchValue));
    setSearchResult(filtedSearchResult);
  };

  useEffect(() => {
    // @ts-expect-error
    const google = window.google;
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large'
    });
  }, []);

  const setSignInButtonHidden = (hidden: boolean = false) => {
    const getElem = document.getElementById('signInDiv');
    if (getElem === null) return;
    getElem.hidden = hidden;
  };

  const handleCallbackResponse = (res: Record<string, string>) => {
    const { email, name, picture }: Record<string, string> = jwtDecode(res.credential);
    setUser({ email, name, picture });
    setSignInButtonHidden(true);
  };

  const handleSignOut = () => {
    setUser({ email: '', name: '', picture: '' });
    setSignInButtonHidden();
  };

  return (
    <>
      {user.email === '' ? <div>Login</div> : <div onClick={handleSignOut}>Logout</div>}
      <div id="signInDiv"></div>

      <TopBar
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchHandler={searchHandler}
      />
      <AppStyle>
        <GameListStyle data-testid="game-list">
          {searchResult
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
