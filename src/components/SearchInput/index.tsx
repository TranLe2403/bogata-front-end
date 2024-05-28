import React, { ChangeEvent, FormEvent, Dispatch, SetStateAction, FC } from 'react';
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

const SeachInput: FC<PropsType> = ({ setSearchValue }) => {
  const classes = useStyles();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    search = e.target.value;
  };

  const onSubmitHandler = (e: SearchEventType): void => {
    e.preventDefault();
    setSearchValue(search);
  };

  return (
    <SearchContainer>
      <SearchStyles onSubmit={onSubmitHandler}>
        <InputBase
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          data-testid="search-bar"
          inputProps={{ 'aria-label': 'search' }}
          onChange={onChangeHandler}
          placeholder="Search…"
          sx={{ ml: 1, flex: 1 }}
        />
        <CustomIconButton aria-label="search" onClick={onSubmitHandler} type="button">
          <SearchIcon data-testid="search-icon" />
        </CustomIconButton>
      </SearchStyles>
    </SearchContainer>
  );
};

export default SeachInput;
