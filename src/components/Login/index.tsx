import { jwtDecode } from 'jwt-decode';
import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { UserInfo } from '../../App';
import { Button } from '@mui/material';
import { useOutsideClick } from './useHandleClickOutside';

interface PropTypes {
  email: string;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContainerStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: self-start;
  justify-content: flex-end;
`;

const SignInContainer = styled.div`
  background: white;
  padding: 32px;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const Login: FC<PropTypes> = ({ email, setUser, showLogin, setShowLogin }) => {
  const ref = useOutsideClick(() => {
    setShowLogin(false);
  });

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
    setShowLogin(false);
    const {email, name, picture}: Record<string, string> = jwtDecode(res.credential);
    setUser({ email, name, picture });
    const getElem = document.getElementById('signInDiv');
    if (!getElem) return;
    getElem.hidden = true;
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
    <UserContainerStyle onClick={userClickHandler} ref={ref}>
      <SignInContainer>
        {!email ? (
            <div id="signInDiv" />
        ) : (
          <Button onClick={handleSignOut}>Logout</Button>
        )}
      </SignInContainer>
    </UserContainerStyle>
  );
};

export default Login;