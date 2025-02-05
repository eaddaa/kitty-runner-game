export const checkCollision = (cat, yarn) => {
  return (
    cat.x < yarn.x + yarn.width &&
    cat.x + cat.width > yarn.x &&
    cat.y < yarn.y + yarn.height &&
    cat.y + cat.height > yarn.y
  );
};

export const createHitbox = (x, y, width, height, scale = 0.6) => ({
  x,
  y,
  width: width * scale,
  height: height * scale
});