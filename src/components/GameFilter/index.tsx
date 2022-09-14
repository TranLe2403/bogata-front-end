import React, { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 88px 32px 0 0;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  margin: 0 32px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const genres = [
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

interface PropTypes {
  setCheckboxStates: React.Dispatch<React.SetStateAction<Record<string, string | number | string[]>>>;
  checkboxStates: Record<string, string | number | string[]>;
};

const GameFilter = ({ setCheckboxStates, checkboxStates }: PropTypes) => {
  const [filterBarShown, setFilterBarShown] = useState<boolean>(false);

  const genreCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxStates({ ...checkboxStates, genre: (checkboxStates.genre as string[]).concat(e.target.name)});
  };

  const handleFilterClick = () => {
    console.log(checkboxStates);
  };

  return (
    <>
      <FilterButtonContainer>
        <FilterButton
          onClick={() => {
            setFilterBarShown(!filterBarShown);
          }}
        >
          Filter {filterBarShown ? <FilterAltOffIcon /> : <FilterAltIcon />}
        </FilterButton>
      </FilterButtonContainer>
      {filterBarShown && (
        <FilterContainer>
          {genres.map((item) => (
            <CheckboxWrapper key={item}>
              <input type="checkbox" onChange={genreCheckHandler} name={item} />
              <p>{item}</p>
            </CheckboxWrapper>
          ))}
          <button onClick={handleFilterClick}>filter</button>
        </FilterContainer>
      )}
    </>
  );
};

export default GameFilter;
