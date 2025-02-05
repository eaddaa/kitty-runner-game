import React from 'react';
import './styles.css';

const GameTitle = () => {
  const title = 'KITTY RUNNER';
  
  return (
    <div className="game-title-container">
      <div className="game-title">
        {title.split('').map((letter, index) => (
          <span 
            key={index} 
            className="title-letter"
            style={{ 
              '--index': index,
              animationDelay: `${index * 0.1}s`
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="title-decoration">
        <span className="paw-left">🐾</span>
        <span className="yarn-icon">🧶</span>
        <span className="paw-right">🐾</span>
      </div>
    </div>
  );
};

export default GameTitle;