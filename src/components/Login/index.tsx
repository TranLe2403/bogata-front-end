import { jwtDecode } from 'jwt-decode';
import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { UserInfo } from '../../App';
import { Button } from '@mui/material';

interface PropTypes {
  email: string;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContainerStyle = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: rgba(240, 240, 240, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 32px;
  min-width: 240px;
  border-radius: 4px;
  align-items: center;
  gap: 32px;
`;

const Login: FC<PropTypes> = ({ email, setUser, showLogin, setShowLogin }) => {
  useEffect(() => {
    // @ts-expect-error
    const google = window.google;
    google.accounts.id.initialize({
      // eslint-disable-line
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large'
    });
  }, [showLogin]);

  const handleCallbackResponse = (res: Record<string, string>): void => {
    const {email, name, picture}: Record<string, string> = jwtDecode(res.credential);
    setUser({ email, name, picture });
    const getElem = document.getElementById('signInDiv');
    if (!getElem) return;
    getElem.hidden = true;
    setShowLogin(false);
  };

  const handleSignOut = (): void => {
    setUser({ email: '', name: '', picture: '' });
    const getElem = document.getElementById('signInDiv');
    if (!getElem) return;
    getElem.hidden = false;
  };

  const userClickHandler = (): void => {
    setShowLogin(!showLogin);
  };

  return (
    <UserContainerStyle onClick={userClickHandler}>
      {email === '' ? (
        <SignInContainer>
          <p style={{ fontSize: 48, margin: 0 }}>BoGaTa</p>
          <div id="signInDiv" />
        </SignInContainer>
      ) : (
        <Button onClick={handleSignOut}>Logout</Button>
      )}
    </UserContainerStyle>
  );
};

export default Login;