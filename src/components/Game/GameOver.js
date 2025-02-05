import React from 'react';
import './styles.css';

const GameOver = ({ score, onRestart }) => {
  return (
    <div className="game-over">
      <h2>Game Over!</h2>
      <p className="final-score">Score: {score}</p>
      <button className="restart-button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
};

export default GameOver;