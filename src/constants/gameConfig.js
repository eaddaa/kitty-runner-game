export const GAME_CONFIG = {
  // Oyun fizik ayarları
  gravity: 0.6,
  jumpForce: -16,
  gameSpeed: 5,
  
  // Canvas boyutları
  canvasWidth: 800,
  canvasHeight: 400,
  groundY: 350,
  
  // Karakter ayarları
  catSize: 40,
  catEmoji: '🐱',
  
  // Engel ayarları
  yarnSize: 30,
  yarnEmoji: '🧶',
  yarnSpawnRate: 0.02,
  
  // Oyun durumları
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver'
};