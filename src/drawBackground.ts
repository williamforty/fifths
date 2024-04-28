import { drawPath } from "./drawPath";
import { height, width } from "./main";

export const drawBackground = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, width, height);

  gradient.addColorStop(0, "rgb(0, 0, 120)");
  gradient.addColorStop(0.5, "rgb(120, 0, 120)");
  gradient.addColorStop(1, "rgb(120, 0, 0)");

  ctx.fillStyle = gradient;
  drawPath(ctx, [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ]);
};
