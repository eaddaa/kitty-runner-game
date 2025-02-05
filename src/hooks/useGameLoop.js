import { useCallback, useRef, useState, useEffect } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

export const useGameLoop = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  const [gameState, setGameState] = useState(GAME_CONFIG.MENU);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  const catRef = useRef({
    y: GAME_CONFIG.groundY,
    velocityY: 0,
    isJumping: false
  });

  const yarnsRef = useRef([]);
  const passedYarnsRef = useRef(new Set());

  const clearCanvas = useCallback((ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
  }, []);

  const drawBackground = useCallback((ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#FF69B4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GAME_CONFIG.groundY);
    ctx.lineTo(width, GAME_CONFIG.groundY);
    ctx.stroke();
  }, []);

  const drawCat = useCallback((ctx, x, y) => {
    ctx.font = `${GAME_CONFIG.catSize}px Arial`;
    ctx.fillText(GAME_CONFIG.catEmoji, x, y);
  }, []);

  const drawYarn = useCallback((ctx, x, y) => {
    ctx.font = `${GAME_CONFIG.yarnSize}px Arial`;
    ctx.fillText(GAME_CONFIG.yarnEmoji, x, y);
  }, []);

  const checkCollision = useCallback((catY, yarnX, yarnY) => {
    return (
      yarnX < 100 && 
      yarnX + GAME_CONFIG.yarnSize > 50 &&
      yarnY < catY + GAME_CONFIG.catSize &&
      yarnY + GAME_CONFIG.yarnSize > catY
    );
  }, []);

  const jump = useCallback(() => {
    if (!catRef.current.isJumping && gameState === GAME_CONFIG.PLAYING) {
      catRef.current.velocityY = GAME_CONFIG.jumpForce;
      catRef.current.isJumping = true;
    }
  }, [gameState]);

  const gameLoop = useCallback((currentTime) => {
    if (!lastTimeRef.current) lastTimeRef.current = currentTime;
    const deltaTime = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    clearCanvas(ctx, width, height);
    drawBackground(ctx, width, height);
    drawCat(ctx, 50, catRef.current.y);

    yarnsRef.current = yarnsRef.current.map((yarn) => ({
      ...yarn,
      x: yarn.x - GAME_CONFIG.yarnSpeed * deltaTime,
    })).filter(yarn => yarn.x > -GAME_CONFIG.yarnSize);

    yarnsRef.current.forEach(yarn => {
      drawYarn(ctx, yarn.x, yarn.y);
      if (checkCollision(catRef.current.y, yarn.x, yarn.y) && !passedYarnsRef.current.has(yarn.id)) {
        passedYarnsRef.current.add(yarn.id);
        setScore(prev => prev + 1);
      }
    });

    catRef.current.velocityY += GAME_CONFIG.gravity * deltaTime;
    catRef.current.y += catRef.current.velocityY;

    if (catRef.current.y > GAME_CONFIG.groundY) {
      catRef.current.y = GAME_CONFIG.groundY;
      catRef.current.isJumping = false;
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [clearCanvas, drawBackground, drawCat, drawYarn, checkCollision]);

  useEffect(() => {
    if (gameState === GAME_CONFIG.PLAYING) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [gameState, gameLoop]);

  return { canvasRef, gameState, setGameState, score, jump };
};
