import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterSelect from '../FilterSelect';
import React from 'react';

describe('<FilterSelect />', () => {
  it('should render title corectly', () => {
    const wrapperElement = render(
      <FilterSelect
        title="Size"
        data={['Small', 'Medium', 'Large']}
        options={[]}
        setOptions={() => {}}
      />
    );
    const headingElem = wrapperElement.getByTestId('filter-select-heading');

    expect(headingElem).toHaveTextContent('Size');
    expect(headingElem).toHaveStyle({ cursor: 'pointer', 'justify-content': 'space-between' });
  });

  it('should render arrow corectly', () => {
    const wrapperElement = render(
      <FilterSelect
        title="Size"
        data={['Small', 'Medium', 'Large']}
        options={[]}
        setOptions={() => {}}
      />
    );
    const arrowElem = wrapperElement.getByTestId('KeyboardArrowDownIcon');

    expect(arrowElem.nodeName).toBe('svg');
  });

  it('should list all select items', () => {
    const wrapperElement = render(
      <FilterSelect
        title="Size"
        data={['Small', 'Medium', 'Large']}
        options={[]}
        setOptions={() => {}}
      />
    );
    const itemElems = wrapperElement.getAllByTestId('list-item');

    expect(itemElems).toHaveLength(3);
    expect(itemElems[0]).toHaveTextContent('Small');
    expect(itemElems[1]).toHaveTextContent('Medium');
    expect(itemElems[2]).toHaveTextContent('Large');
  });

  test('first list item should behave properly when clicking', () => {
    const mockSetState: React.Dispatch<React.SetStateAction<string[]>> = jest.fn();
    jest.mock('react', () => ({
      useState: (initial: string) => [initial, mockSetState]
    }));

    const wrapperElement = render(
      <FilterSelect
        title="Size"
        data={['Small', 'Medium', 'Large']}
        options={[]}
        setOptions={mockSetState}
      />
    );
    const arrowElem = wrapperElement.getAllByTestId('list-item');

    fireEvent.click(arrowElem[0]);
    expect(mockSetState).toHaveBeenCalledWith(['Small']);
    fireEvent.click(arrowElem[1]);
    expect(mockSetState).toHaveBeenCalledTimes(2);
  });
});
