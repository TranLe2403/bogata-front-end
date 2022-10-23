import React, { useState, Dispatch, SetStateAction } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import styled from '@emotion/styled';

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
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
}

const FilterSelect = ({ title, data, options, setOptions }: PropsType) => {
  const [open, setOpen] = useState<boolean>(true);
  const onClickOptionHandler = (item: string) => {
    const copyOptions = [...options];
    const newArr = copyOptions.includes(item)
      ? copyOptions.filter((option) => option !== item)
      : copyOptions.concat(item);
    setOptions(newArr);
  };

  const getAllOptions = () => {
    if (!open) return;
    return data.map((item) => {
      const fontWeight = options.includes(item) ? 'bold' : 'medium';
      return (
        <CustomListItem
          key={item}
          sx={{ py: 0, minHeight: 32 }}
          onClick={() => onClickOptionHandler(item)}
          data-testid="list-item"
        >
          {options.includes(item) && <SelectedBar />}
          <ListItemText primary={item} primaryTypographyProps={{ fontSize: 14, fontWeight }} />
        </CustomListItem>
      );
    });
  };

  return (
    <Box>
      <Box
        onClick={() => setOpen(!open)}
        sx={{ px: 0 }}
        style={{ display: 'flex', cursor: 'pointer' }}
        justifyContent="space-between"
        data-testid="filter-select-heading"
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
