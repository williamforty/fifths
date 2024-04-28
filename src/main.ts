import { fifths } from "./fifths";
import "./style.css";

export const width = 1200;
export const height = 800;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <canvas id="gameCanvas" width="${width}" height="${height}" style="border: solid 5px #000"></canvas>
  </div>
`;

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

fifths(ctx);
