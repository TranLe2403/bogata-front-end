import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DropdownInputContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  height: 40px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  user-select: none;
`;

const DropdownContent = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
  gap: 4px;
  padding: 0 16px;
`;

const DropdownOptionsContainer = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1;
  max-height: ${(props) => (props.open ? '256px' : '0')};
  overflow: auto;
  margin-top: 2px;
  border-radius: 4px;
  background-color: white;
  pointer-events: auto;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
  width: 100%;
`;

const DropdownOptionContainer = styled.div<{ active: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  max-width: 100%;
  padding: 0 16px;
  height: 40px;
  border: none;
  cursor: pointer;
  user-select: none;
  gap: 8px;
  background-color: ${(props) => (props.active ? '#E1F0FF' : 'white')};

  &:hover {
    background-color: ${(props) => (props.active ? '#B9DCFF' : '#FAFAFA')};
  }
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const SelectedItem = styled.div`
  width: fit-content;
  min-width: 32px;
  border-radius: 12px;
  background-color: #e1f0ff;
  padding: 4px 8px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FilterDropdown = ({ data }: { data: string[] }) => {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [options, setOptions] = useState<string[]>([]);
  
    const dropdownOptionsEl = useRef(null);
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOptionsEl.current === null || event.target === null) return;
      if ((dropdownOptionsEl.current as HTMLDivElement).contains(event.target as HTMLDivElement))
        return;
      setOpenDropdown(false);
    };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOptionsEl]);

  const dropdownClickHandler = () => {
    setOpenDropdown(!openDropdown);
  };

  const optionCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const copyOptions = [...options];
    const { checked, value } = e.target;
    const newArr = checked
      ? copyOptions.concat(value)
      : copyOptions.filter((option) => option !== value);
    setOptions(newArr);
  };

  const onClickOptionHandler = (item: string) => {
    const copyOptions = [...options];
    const newArr = copyOptions.includes(item)
      ? copyOptions.filter((option) => option !== item)
      : copyOptions.concat(item);
    setOptions(newArr);
  };

  return (
    <div style={{ position: 'relative', maxHeight: 'fit-content' }}>
      <DropdownInputContainer onClick={dropdownClickHandler}>
        <DropdownContent>
          {options.map((item) => (
            <SelectedItem key={item}>{item}</SelectedItem>
          ))}
        </DropdownContent>
        <DropdownIcon>
          <ExpandMoreIcon />
        </DropdownIcon>
      </DropdownInputContainer>

      <DropdownOptionsContainer open={openDropdown} ref={dropdownOptionsEl}>
        {data.map((item) => (
          <DropdownOptionContainer
            key={item}
            active={options.includes(item)}
            onClick={() => onClickOptionHandler(item)}
          >
            <input
              type="checkbox"
              value={item}
              checked={options.includes(item)}
              onChange={optionCheckHandler}
            />
            <p>{item}</p>
          </DropdownOptionContainer>
        ))}
      </DropdownOptionsContainer>
    </div>
  );
};

export default FilterDropdown;
