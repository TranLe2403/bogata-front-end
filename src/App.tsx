import './App.css';

export type GameItem = {
  id: string;
  name: string;
  minPlayer: number;
  maxPlayer: number;
  description: string;
  playDuration: number;
  pictures: string[];
  available: boolean;
  dateAdded: Date;
  gameSize: 'small' | 'normal' | 'large';
  minAge: number;
  rule: string;
};

function App() {
  return <div className="App">Welcome to Bogata</div>;
}

export default App;
