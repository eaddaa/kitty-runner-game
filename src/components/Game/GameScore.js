import React from 'react';
import './styles.css';

const GameScore = ({ score, combo }) => {
  return (
    <div className="game-score">
      <div className="score">Score: {score}</div>
      {combo > 0 && (
        <div className="combo">
          Combo: x{combo} 🔥
        </div>
      )}
    </div>
  );
};

export default GameScore;