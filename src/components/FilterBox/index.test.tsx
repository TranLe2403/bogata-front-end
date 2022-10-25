import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterBox from '../FilterBox';

describe('<FilterBox />', () => {
  it('should render correctly', () => {
    const filterBoxElement = render(<FilterBox />);
    const filterWrapper = filterBoxElement.getByTestId('filter-container');

    expect(filterWrapper).toHaveStyle({
      'background-color': '#f0f0f0'
    });
    expect(filterWrapper.children).toHaveLength(7);
    expect(filterWrapper).toHaveTextContent('Filters');
  });

  it('should have empty applied filter field', () => {
    const filterBoxElement = render(<FilterBox />);
    const filterAppliedElem = filterBoxElement.getByTestId('filter-applied');

    expect(filterAppliedElem.children).toHaveLength(0);
  });

  //   it('should have 2 number input fields', () => {
  //     const gameItemElem = render(<FilterBox />);
  //     const getElems = gameItemElem.getAllByTestId('filter-textfield');

  //     expect(getElems).toHaveLength(2);
  //     expect(getElems[0]).toHaveTextContent('Min Player');
  //     // expect(getElems[1]).toHaveTextContent('Min Age');
  // console.log(getElems[0].childNodes[1].childNodes[0]);

  //     fireEvent.change(getElems[0].childNodes[1].childNodes[0], {target: {value: 23}})
  //     expect(getElems[0].childNodes[1].childNodes[0]).toHaveTextContent('23');
  //   });
});
