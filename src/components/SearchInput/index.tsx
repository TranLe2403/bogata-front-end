import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.form`
  position: relative;
  display: flex;
  width: 40%;
  height: 100%;
  height: 40px;
  margin-top: 104px;

  @media (max-width: 768px) {
    width: calc(100% - 32px);
  }
`;

const SearchInputStyle = styled.input`
  position: absolute;
  height: calc(100% - 2px);
  width: calc(100% - 18px);
  border-radius: 4px;
  display: flex;
  border: 1px solid #d7d7d7;
  outline: none;
  padding: 0 0 0 16px;
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
  padding-left: 16px;
`;

const AccessoryStyle = styled.img`
  width: 24px;
  height: 24px;
  z-index: 1;
`;

interface PropsType {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  searchHandler: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

const SeachInput = ({ setSearchValue, searchValue, searchHandler }: PropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <SearchBarWrapper>
      <InputWrapper onSubmit={searchHandler}>
        <SearchInputStyle
          data-testid="search-bar"
          placeholder="Let's find some games"
          type="text"
          value={searchValue}
          onChange={onChangeHandler}
        />
        <MinimumBlock />
        <AccessoryContainer data-testid="search-icon" onClick={searchHandler}>
          <AccessoryStyle src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png" />
        </AccessoryContainer>
      </InputWrapper>
    </SearchBarWrapper>
  );
};

export default SeachInput;
