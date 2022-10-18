import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import styled from '@emotion/styled';

const SearchIconBox = styled.div`
  padding: 0 8px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  right: 0;
`;

const SearchContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 104px;
`;

const SearchStyles = styled.form`
  position: relative;
  border-radius: 4px;
  border: 1px solid #d7d7d7;
  width: calc(40% - 18px);
`;

type SearchEventType = FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>;

interface PropsType {
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
  searchHandler: (e: SearchEventType) => void;
}

const useStyles: any = makeStyles(() => ({
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: '8px 40px 8px 16px'
  }
}));

const SeachInput = ({ setSearchValue, searchValue, searchHandler }: PropsType) => {
  const classes = useStyles();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <SearchContainer>
      <SearchStyles onSubmit={searchHandler}>
        <SearchIconBox data-testid="search-icon" onClick={searchHandler}>
          <SearchIcon />
        </SearchIconBox>
        <InputBase
          data-testid="search-bar"
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={onChangeHandler}
        />
      </SearchStyles>
    </SearchContainer>
  );
};

export default SeachInput;
