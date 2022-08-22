import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameItem from '../GameItem';
import { gameItemsData } from '../../dummyData';

describe('<GameItem />', () => {
  it('should display image properly', () => {
    const gameItemElem = render(<GameItem data={gameItemsData[0]} />);
    const getElem = gameItemElem.getByTestId('game-image') as HTMLImageElement;
    expect(getElem.src).toContain(
      'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
    );
  });

  it('should display image properly if there is item in pictures props', () => {
    const gameItemElem = render(<GameItem data={gameItemsData[1]} />);
    const getElem = gameItemElem.getByTestId('game-image') as HTMLImageElement;
    expect(getElem.src).toContain(
      'https://cf.geekdo-images.com/g4XmxyKhNVdhC3QPd1purQ__itemrep/img/QKJwfdV3Qrv9w2TX_ML5T3z5G9E=/fit-in/246x300/filters:strip_icc()/pic3761012.jpg'
    );
  });
});
