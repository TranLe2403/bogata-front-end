import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameItem from '../GameItem';
import { gameItemsData } from '../../dummyData';

describe('<GameItem />', () => {
  it('should display image properly', () => {
    const gameItemElem = render(<GameItem data={gameItemsData[0]} />);
    const imageElement = gameItemElem.getByTestId('game-image');
    expect(imageElement.style.backgroundImage).toContain(
      'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
    );
  });

  it('should display game information properly', () => {
    const gameItemElem = render(<GameItem data={gameItemsData[1]} />);
    const contentElement = gameItemElem.getByTestId('game-content');
    const ratingElem = gameItemElem.getByTestId('game-rating');
    const dateElem = gameItemElem.getByTestId('game-date-added');

    expect(contentElement.childNodes).toHaveLength(3);
    expect(ratingElem).toHaveTextContent('BoardGameGeek rating:');
    expect(dateElem).toHaveTextContent('Date added:');
  });
});
