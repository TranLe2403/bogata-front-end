import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopBar from '../TopBar';

describe('<TopBar />', () => {
  const mockSetState: React.Dispatch<React.SetStateAction<string>> = jest.fn();

  jest.mock('react', () => ({
    useState: (initial: string) => [initial, mockSetState]
  }));

  const mockSeachHandler = jest.fn();

  it('should display working search bar', () => {
    const topbarElem = render(
      <TopBar setSearchValue={mockSetState} searchValue="" searchHandler={() => {}} />
    );
    const getElem = topbarElem.getByTestId('search-bar') as HTMLInputElement;

    expect(getElem.placeholder).toEqual("Let's find some games");

    fireEvent.change(getElem, { target: { value: 'Zomb' } });

    expect(mockSetState).toHaveBeenCalledWith('Zomb');
  });

  fit('should display search icon and it is clickable', () => {
    const topbarElem = render(
      <TopBar setSearchValue={() => {}} searchValue="Zom" searchHandler={mockSeachHandler} />
    );
    const getElem = topbarElem.getByTestId('search-icon');
    const getIconElem = getElem.firstChild as HTMLImageElement;

    expect(getIconElem.src).toContain(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png'
    );

    fireEvent.click(getIconElem);

    expect(mockSeachHandler).toBeCalledTimes(1);
  });
});
