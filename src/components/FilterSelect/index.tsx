import React, { useState, Dispatch, SetStateAction, FC, ReactNode } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { GameInputType } from '../../types/GameType';

const CustomListItem = styled(ListItem)`
  position: relative;
  cursor: pointer;
  &.Mui-selected {
    background: none;
  }
`;

const SelectedBar = styled.div`
  position: absolute;
  left: 0;
  width: 2px;
  background: #cacaca;
  min-height: 32px;
`;

interface PropsType {
  title: string;
  data: string[];
  setGameInput:  Dispatch<SetStateAction<GameInputType>>
  gameInput: GameInputType
}

const FilterSelect: FC<PropsType> = ({ title, data, setGameInput, gameInput }) => {
  const [open, setOpen] = useState<boolean>(true);
  const onClickOptionHandler = (item: string): void => {
    const newArr = gameInput.genres.includes(item)
      ? gameInput.genres.filter((option) => option !== item)
      : gameInput.genres.concat(item);
      setGameInput({...gameInput, genres: newArr});
  };

  const getAllOptions = (): ReactNode[] | undefined => {
    if (!open) return;
    return data.map((item) => {
      const fontWeight = gameInput.genres.includes(item) ? 'bold' : 'medium';
      return (
        <CustomListItem
          data-testid="list-item"
          key={item}
          onClick={() => onClickOptionHandler(item)}
          sx={{ py: 0, minHeight: 32 }}
        >
          {gameInput.genres.includes(item) ? <SelectedBar /> : null}
          <ListItemText primary={item} primaryTypographyProps={{ fontSize: 14, fontWeight }} />
        </CustomListItem>
      );
    });
  };

  return (
    <Box>
      <Box
        data-testid="filter-select-heading"
        justifyContent="space-between"
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', cursor: 'pointer' }}
        sx={{ px: 0 }}
      >
        <Typography component="p">{title}</Typography>
        <KeyboardArrowDown
          sx={{
            transform: open ? 'rotate(-180deg)' : 'rotate(0)',
            transition: '0.2s'
          }}
        />
      </Box>
      {getAllOptions()}
    </Box>
  );
};

export default FilterSelect;
