import './App.css';

export type GameItem = {
  id: string;
  name: string;
  description?: string;
  minPlayer: number;
  maxPlayer: number;
  playDuration: number;
  pictures?: string[];
  available: boolean;
  dateAdded: string;
  gameSize: 'small' | 'normal' | 'large';
  genre: Genre[],
  minAge: number;
  rule?: string;
  rating: number;
};

type Genre = 'Co-op' | 'Action' | 'Survival' | 'Trading' | 'Strategy' | 'Resource Management' | 'RPG' | 'City Building' | 'Detective' // Consider to use enum type

function App() {
  return <div className="App">Welcome to Bogata</div>;
}

export default App;
