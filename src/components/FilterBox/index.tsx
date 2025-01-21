import React, { FC, ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { Box, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import CustomSlider from '../CustomSlider';

const FilterContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  padding: 32px 16px;
  gap: 16px;
`;

const FilterApplied = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const SelectedFilterOption = styled.div`
  display: flex;
  gap: 2px;
  background: #cacaca;
  padding: 8px;
  border-radius: 4px;
  height: 16px;
  width: fit-content;
  align-items: center;
  justify-content: center;
`;

const TextFieldStyle = styled(TextField)`
  & .MuiFilledInput-root {
    &:before {
      display: none;
      content: '';
    }
  }
`;

export const genres = [
  'Co-op',
  'Action',
  'Survival',
  'Trading',
  'Strategy',
  'Resource Management',
  'RPG',
  'City Building',
  'Detective'
];

const CustomTextField: FC<{ label: string }> = ({ label }) => (
  <TextFieldStyle
    InputLabelProps={{ shrink: true }}
    id="filled-required"
    label={label}
    size="small"
    type="number"
    variant="filled"
  />
);

const FilterBox: ReactNode = () => {
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const handleRemoveButton = (item: string): void => {
    const filterOptionsCopy = [...filterOptions];
    const newOptions = filterOptionsCopy.filter((option) => option !== item);
    setFilterOptions(newOptions);
  };

  return (
    <FilterContainer data-testid="filter-container">
      <Typography variant="h5">Filters</Typography>
      <FilterApplied data-testid="filter-applied">
        {filterOptions.map((item) => (
          <SelectedFilterOption key={item}>
            <CloseIcon
              onClick={() => handleRemoveButton(item)}
              sx={{ fontSize: 'small', cursor: 'pointer' }}
            />
            <Typography component="p" fontSize={14}>
              {item}
            </Typography>
          </SelectedFilterOption>
        ))}
      </FilterApplied>
      {/* <FilterSelect
        title="Genre"
        setOptions={setFilterOptions}
        options={filterOptions}
        data={genre}
      />
      <FilterSelect
        title="Size"
        setOptions={setFilterOptions}
        options={filterOptions}
        data={['small', 'normal', 'large']}
      /> */}
      <Box style={{ display: 'flex', flexDirection: 'column', gap: 8 }} sx={{ py: 1 }}>
        <Typography component="p">Duration</Typography>
        <CustomSlider max={180} min={0} />
      </Box>
      <CustomTextField label="Min Player" />
      <CustomTextField label="Min Age" />
    </FilterContainer>
  );
};

export default FilterBox;
