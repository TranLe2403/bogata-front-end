import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('<App />', () => {
  it('should display all available game items', async () => {
    const AppElem = render(<App />);
    const getGameListElem = AppElem.getByTestId('game-list');
    expect(getGameListElem.children).toHaveLength(5);
  });
});
