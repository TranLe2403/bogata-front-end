import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { UserInfo } from '../../App';

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

const Login = ({ email, setUser, showLogin, setShowLogin }: PropTypes) => {
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

  const handleCallbackResponse = (res: Record<string, string>) => {
    const userObj: Record<string, string> = jwtDecode(res.credential);
    setUser({ email: userObj.email, name: userObj.name, picture: userObj.picture });
    const getElem = document.getElementById('signInDiv');
    if (getElem === null) return;
    getElem.hidden = true;
    setShowLogin(false);
  };

  const handleSignOut = () => {
    setUser({ email: '', name: '', picture: '' });
    const getElem = document.getElementById('signInDiv');
    if (getElem === null) return;
    getElem.hidden = false;
  };

  const userClickHandler = () => {
    setShowLogin(!showLogin);
  };

  return (
    <UserContainerStyle onClick={userClickHandler}>
      {email === '' ? (
        <SignInContainer>
          <p style={{ fontSize: 48, margin: 0 }}>BoGaTa</p>
          <div id="signInDiv"></div>
        </SignInContainer>
      ) : (
        <button onClick={handleSignOut}>Logout</button>
      )}
    </UserContainerStyle>
  );
};

export default Login;
