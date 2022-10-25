import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeachInput from '../SearchInput';

describe('<SeachInput />', () => {
  const mockSetState: React.Dispatch<React.SetStateAction<string>> = jest.fn();

  jest.mock('react', () => ({
    useState: (initial: string) => [initial, mockSetState]
  }));

  const mockSeachHandler = jest.fn();

  it('should display working search bar', () => {
    const searchInputElem = render(
      <SeachInput setSearchValue={() => {}} />
    );
    const searchbarElement = searchInputElem.getByTestId('search-bar');
    const selectNode = searchbarElement.childNodes[0];

    fireEvent.change(selectNode, { target: { value: 'Zomb' } });

    expect(selectNode).toHaveValue('Zomb');
  });

  it('should display search icon and it is workable', () => {
    const searchInputElem = render(
      <SeachInput setSearchValue={mockSetState} />
    );
    const searchIconElement = searchInputElem.getByTestId('search-icon');
    const getIconElem = searchIconElement.firstChild as HTMLImageElement;

    fireEvent.click(getIconElem);

    expect(mockSetState).toBeCalledTimes(1);
  });
});
