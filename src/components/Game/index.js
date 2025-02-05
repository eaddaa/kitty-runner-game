import React, { useEffect } from 'react';
import { useGameLoop } from '../../hooks/useGameLoop';
import GameCanvas from './GameCanvas';
import GameScore from './GameScore';
import GameOver from './GameOver';
import './styles.css';

const Game = () => {
  const {
    canvasRef,
    gameState,
    score,
    combo,
    jump,
    startGame
  } = useGameLoop();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  return (
    <div className="game-container">
      <GameScore score={score} combo={combo} />
      
      {gameState === 'menu' && (
        <div className="game-menu">
          <button onClick={startGame} className="start-button">
            Start Game
          </button>
        </div>
      )}
      
      <GameCanvas ref={canvasRef} onJump={jump} />
      
      {gameState === 'gameOver' && (
        <GameOver
          score={score}
          onRestart={startGame}
        />
      )}
    </div>
  );
};

export default Game;