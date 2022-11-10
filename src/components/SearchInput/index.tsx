import React, { ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import styled from '@emotion/styled';

const SearchContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 104px;
`;

const SearchStyles = styled.form`
  border-radius: 4px;
  border: 1px solid #d7d7d7;
  width: calc(40% - 18px);
  display: flex;
  align-items: center;
`;

const CustomIconButton = styled(IconButton)`
  &:hover {
    background: none;
  }
`;

type SearchEventType = FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface PropsType {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const useStyles: any = makeStyles(() => ({
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: '8px 40px 8px 0'
  }
}));

let search = '';

const SeachInput = ({ setSearchValue }: PropsType) => {
  const classes = useStyles();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    search = e.target.value;
  };

  const onSubmitHandler = (e: SearchEventType) => {
    e.preventDefault();
    setSearchValue(search);
  };

  return (
    <SearchContainer>
      <SearchStyles onSubmit={onSubmitHandler}>
        <InputBase
          data-testid="search-bar"
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={onChangeHandler}
          sx={{ ml: 1, flex: 1 }}
        />
        <CustomIconButton type="button" aria-label="search" onClick={onSubmitHandler}>
          <SearchIcon data-testid="search-icon" />
        </CustomIconButton>
      </SearchStyles>
    </SearchContainer>
  );
};

export default SeachInput;
