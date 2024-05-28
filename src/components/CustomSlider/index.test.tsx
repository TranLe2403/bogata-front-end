import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomSlider from '../CustomSlider';

describe('<CustomSlider />', () => {
  it('should render two selectors', () => {
    const sliderElement = render(<CustomSlider max={100} min={0} />);
    const selectorElems = sliderElement.getAllByTestId('slider-selector');

    expect(selectorElems).toHaveLength(2);
  });

  it('should be able to click on slider track', () => {});
});
