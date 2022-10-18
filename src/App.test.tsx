import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import moxios from 'moxios';
import { gameItemsData } from './dummyData';

describe('<App />', () => {
  beforeEach(() => {
    moxios.install(); // install moxios before each test
  });

  afterEach(() => {
    moxios.uninstall(); // uninstall moxios after each test finished
  });

  it('should display all available game items', async () => {
    const AppElem = render(<App />);

    moxios.wait(() => {
      moxios.requests
        .get('get', 'http://localhost:3001/games')
        .respondWith({
          status: 200,
          response: gameItemsData
        })
        .catch((error) => {
          console.error(error);
        });
    });

    await waitFor(() => {
      const getGameListElem = AppElem.getByTestId('game-list');
      expect(getGameListElem.children).toHaveLength(5);
    });
  });
});
