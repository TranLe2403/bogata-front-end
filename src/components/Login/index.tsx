import { jwtDecode } from 'jwt-decode';
import React, { FC, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { UserInfo } from '../../App';
import { Button } from '@mui/material';
import { useOutsideClick } from './useHandleClickOutside';
import { useOpenGoogleSignIn } from './useOpenGoogleSignIn';

interface PropTypes {
  email: string;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContainerStyle = styled.div`
  position: absolute;
  right: 0;
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
  const hideSigninDiv = useOpenGoogleSignIn()
  const ref = useRef<HTMLDivElement>(null);

  const divRef = useOutsideClick(() => {
    setShowLogin(false);
  }, ref);

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
    hideSigninDiv(true)
  };

  const handleSignOut = (): void => {
    setUser({ email: '', name: '', picture: '' });
    hideSigninDiv(false)
  };

  return (
    <UserContainerStyle ref={divRef}>
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