// src/components/Game/GameCanvas.js

import React, { forwardRef, useEffect } from 'react';
import { GAME_CONFIG } from '../../constants/gameConfig';

const GameCanvas = forwardRef(({ onJump }, ref) => {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const handleClick = () => {
      if (onJump) onJump();
    };

    canvas.addEventListener('click', handleClick);
    return () => canvas.removeEventListener('click', handleClick);
  }, [onJump, ref]); // ref'i dependency array'e ekledik

  return (
    <canvas
      ref={ref}
      width={GAME_CONFIG.canvasWidth}
      height={GAME_CONFIG.canvasHeight}
      className="game-canvas"
    />
  );
});

GameCanvas.displayName = 'GameCanvas';

export default GameCanvas;
