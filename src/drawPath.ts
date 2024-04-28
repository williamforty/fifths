export const drawPath = (
  ctx: CanvasRenderingContext2D,
  coords: [number, number][],
  fill: boolean = true
) => {
  ctx.beginPath();
  let [x, y] = coords.shift() || [0, 0];
  ctx.moveTo(x, y);
  while (coords.length) {
    [x, y] = coords.shift() || [0, 0];
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  fill ? ctx.fill() : ctx.stroke();
};
