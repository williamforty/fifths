import { drawBackground } from "./drawBackground";
import { drawPath } from "./drawPath";
import { height, width } from "./main";
import { setrgb } from "./setrgb";

const circle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  fill = false
) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  fill ? ctx.fill() : ctx.stroke();
};

const dot = (ctx: CanvasRenderingContext2D, x: number, y: number, size = 1) => {
  ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
};

const randomNudge = 0;

const seekRandom = (
  pos: [number, number],
  targets: [number, number][]
): [number, number] => {
  const chosenTarget = targets[Math.floor(targets.length * Math.random())];
  const average = [0, 1]
    .map((n) => pos[n] * 1 + chosenTarget[n] * 1)
    .map((n) => n / 2);
  return average.map(
    (n) => n + Math.random() * randomNudge - randomNudge / 2
  ) as [number, number];
};

const seekNextSequenceOld = (
  pos: [number, number],
  target: [number, number]
): [number, number] => {
  /*
    if (Math.random() > 0.5) {
      t = (t + (Math.random() > 0.5 ? 2 : 4)) % 12;
    } else {
      t = (t + (Math.random() > 0.5 ? 7 : 5)) % 12;
    }
  */
  const average = [0, 1]
    .map((n) => pos[n] * 1 + target[n] * 1)
    .map((n) => n / 2);
  return average.map(
    (n) => n + Math.random() * randomNudge - randomNudge / 2
  ) as [number, number];
};

const seekNextSequence = (
  pos: [number, number],
  points: [number, number][],
  sequence: number[],
  id: number
): [number, number] => {
  const average = [0, 1]
    .map((n) => pos[n] + points[sequence[id % sequence.length]][n])
    .map((n) => n / 2);
  return average.map(
    (n) => n + Math.random() * randomNudge - randomNudge / 2
  ) as [number, number];
};

export function fifths(ctx: CanvasRenderingContext2D) {
  const totalPoints = 12;
  const size = height / 2 - 15;
  const points: [number, number][] = [...new Array(totalPoints)]
    .map((_, n) => (Math.PI * 2 * n) / totalPoints)
    .map((n) => [Math.cos(n) * size, Math.sin(n) * size])
    .map(([x, y]) => [x + width / 2, y + height / 2]);

  let pos: [number, number] = [width / 2, height / 2];
  const history = new Map();
  history.set(pos.join(","), 255);

  const pointsToUse = points.filter((p, i) => i % 4 === 1);

  let id = 0;

  const update = () => {
    pos = seekRandom(pos, pointsToUse);
    const key = [...pos].map(Math.floor).join(",");
    const val = history.has(key) ? history.get(key) + 255 : 255;
    history.set(key, val);
  };

  // Seed
  const seedNumber = 50000;
  for (let n = 0; n <= seedNumber; n++) {
    update();
  }

  function gameLoop() {
    update();

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = setrgb(255, 255, 255);
    ctx.lineWidth = 2;

    drawBackground(ctx);

    circle(ctx, width / 2, height / 2, size);

    ctx.fillStyle = setrgb(255, 255, 0);
    points.map(([x, y]) => circle(ctx, x, y, 6, true));

    // ctx.strokeStyle = setrgb(255, 255, 255);
    // ctx.lineWidth = 1;
    // drawPath(ctx, [...history], false);

    ctx.fillStyle = setrgb(255, 255, 255);
    history.forEach((value, key) => {
      const [x, y] = key.split(",");

      ctx.fillStyle = setrgb(value, value, value);
      dot(ctx, x, y, 1);
    });

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
}
