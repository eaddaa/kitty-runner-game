import React from 'react';
import Game from './components/Game';
import GameTitle from './components/Game/GameTitle';
import './App.css';

function App() {
  return (
    <div className="App">
      <GameTitle />
      <Game />
    </div>
  );
}

export default App;