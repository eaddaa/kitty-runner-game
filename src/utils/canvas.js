import { COLORS } from '../constants/colors';
import { GAME_CONFIG } from '../constants/gameConfig';

export const clearCanvas = (ctx, width, height) => {
  ctx.clearRect(0, 0, width, height);
};

export const drawBackground = (ctx, width, height) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, COLORS.gradients.background[0]);
  gradient.addColorStop(1, COLORS.gradients.background[1]);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

export const drawCat = (ctx, x, y, size, velocity) => {
  ctx.save();
  ctx.font = `${size}px Arial`;
  
  // Zıplama animasyonu için rotasyon
  const rotation = Math.min(Math.max(velocity * 0.05, -0.5), 0.5);
  ctx.translate(x + size/2, y + size/2);
  ctx.rotate(rotation);
  
  // Gölge efekti
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 5;
  
  // Kedi emojisini çiz
  ctx.fillText(GAME_CONFIG.catEmoji, -size/2, -size/2);
  ctx.restore();
};

export const drawYarn = (ctx, x, y, size, rotation) => {
  ctx.save();
  ctx.translate(x + size/2, y + size/2);
  ctx.rotate(rotation);
  
  // Parıltı efekti
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
  gradient.addColorStop(0, 'rgba(255,255,255,0.2)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(-size, -size, size*2, size*2);
  
  ctx.font = `${size}px Arial`;
  // Yumak emojisini çiz
  ctx.fillText(GAME_CONFIG.yarnEmoji, -size/2, size/2);
  ctx.restore();
};

export const drawGround = (ctx, width, groundY) => {
  // Zemin çizgisi
  ctx.strokeStyle = COLORS.primary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(width, groundY);
  ctx.stroke();
  
  // Gölge efekti
  const gradient = ctx.createLinearGradient(0, groundY, 0, groundY + 20);
  gradient.addColorStop(0, 'rgba(255,105,180,0.2)');
  gradient.addColorStop(1, 'rgba(255,105,180,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, groundY, width, 20);
};