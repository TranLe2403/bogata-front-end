import React from 'react';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopBarContainer = styled.div`
  width: calc(100% - 64px);
  height: 40px;
  background: #f0f0f0;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.04);
  z-index: 2;
`;

const ProjectNameStyle = styled.h1`
  margin: 0;
  font-size: 40px;
`;

const TopBar = () => {
  return (
    <TopBarContainer>
      <MenuIcon fontSize="large" />
      <ProjectNameStyle>BoGaTa</ProjectNameStyle>
      <AccountCircleIcon fontSize="large" />
    </TopBarContainer>
  );
};

export default TopBar;
