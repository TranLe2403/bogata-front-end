import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';

const TopBarContainer = styled.div`
  width: 100%;
  height: 40px;
  background: #f0f0f0;
  padding: 16px 32px;
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.form`
  display: flex;
  position: relative;
  width: 40%;
  height: 100%;
`;

const SearchInputStyle = styled.input`
  position: absolute;
  height: calc(100% - 2px);
  width: calc(100% - 2px);
  border-radius: 4px;
  display: flex;
  border: 1px solid #d7d7d7;
  outline: none;
  padding: 0;
`;
const AccessoryContainer = styled.div`
  width: 64px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MinimumBlock = styled.div`
  min-width: 64px;
  flex: 1;
`;

const AccessoryStyle = styled.img`
  width: 24px;
  height: 24px;
  z-index: 2;
`;

interface PropsType {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  searchHandler: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

function TopBar({ setSearchValue, searchValue, searchHandler }: PropsType) {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <TopBarContainer>
      <InputWrapper onSubmit={searchHandler}>
        <SearchInputStyle type="text" value={searchValue} onChange={onChangeHandler} />
        <MinimumBlock />
        <AccessoryContainer onClick={searchHandler}>
          <AccessoryStyle src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png" />
        </AccessoryContainer>
      </InputWrapper>
    </TopBarContainer>
  );
}

export default TopBar;
