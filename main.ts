import { BaseShape } from "./shapes/Shape.js";
import { Circle } from "./shapes/Circle.js";
import { Triangle } from "./shapes/Triangle.js";
import { Square } from "./shapes/Square.js";

class SketchApp {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private shapes: BaseShape[] = [];

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;

    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.setupInputs();
    this.loop();
  }

  private resize(): void {
    const wrapper = this.canvas.parentElement!;
    this.canvas.width = wrapper.clientWidth;
    this.canvas.height = wrapper.clientHeight;
  }

  private loop(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const shape of this.shapes) {
      shape.update();
      shape.draw(this.ctx);
    }
    requestAnimationFrame(() => this.loop());
  }

  public addShape(type: string, color: string): void {
    const x = 50 + Math.random() * (this.canvas.width - 100);
    const y = 50 + Math.random() * (this.canvas.height - 100);
    const size = 60;

    let newShape: BaseShape;
    switch (type) {
      case "square":
        newShape = new Square(x, y, size, color);
        break;
      case "triangle":
        newShape = new Triangle(x, y, size, color);
        break;
      default:
        newShape = new Circle(x, y, size, color);
    }
  }

  public clear(): void {
    this.shapes = [];
  }

  private setupInputs(): void {
    document.getElementById("addBtn")?.addEventListener("click", () => {
      const type = (document.getElementById("shapeSelect") as HTMLSelectElement)
        .value;
      const color = (document.getElementById("colorSelect") as HTMLInputElement)
        .value;
      this.addShape(type, color);
    });
    document
      .getElementById("clearBtn")
      ?.addEventListener("click", () => this.clear());
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new SketchApp();
});
