export function getRandomStarSize(min, max) {
  if (max <= min) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function drawStar(ctx, centerX, centerY, radius, color = "yellow") {
const innerRadius = radius * 0.4;
 ctx.beginPath();
 for (let i = 0; i < 10; i++)
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}
