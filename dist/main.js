var _a, _b, _c, _d, _e;
import { Circle } from "./shapes/Circle.js";
import { Triangle } from "./shapes/Triangle.js";
import { Square } from "./shapes/Square.js";
const canvas = document.getElementById("myCanvas");
const container = document.querySelector(".main");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
    if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }
    else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
let shapes = [];
let draggingShape = null;
let offset = { x: 0, y: 0 };
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
function randomColor() {
    return `hsl(${Math.random() * 360}, 70%, 50%)`;
}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((s) => s.draw(ctx));
    requestAnimationFrame(render);
}
canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    for (let i = shapes.length - 1; i >= 0; i--) {
        if (shapes[i].isPointInside(mouseX, mouseY)) {
            draggingShape = shapes[i];
            offset.x = mouseX - draggingShape.x;
            offset.y = mouseY - draggingShape.y;
            shapes.push(shapes.splice(i, 1)[0]);
            break;
        }
    }
});
window.addEventListener("mousemove", (e) => {
    if (draggingShape) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        draggingShape.x = mouseX - offset.x;
        draggingShape.y = mouseY - offset.y;
    }
});
window.addEventListener("mouseup", () => {
    draggingShape = null;
});
(_a = document.getElementById("circleBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const padding = 50;
    const x = randomRange(padding, canvas.width - padding);
    const y = randomRange(padding, canvas.height - padding);
    shapes.push(new Circle(x, y, randomColor()));
});
(_b = document.getElementById("triangleBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const padding = 60;
    const x = randomRange(padding, canvas.width - padding);
    const y = randomRange(padding, canvas.height - padding);
    shapes.push(new Triangle(x, y, randomColor()));
});
(_c = document.getElementById("squareBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    const padding = 60;
    const x = randomRange(padding, canvas.width - padding);
    const y = randomRange(padding, canvas.height - padding);
    shapes.push(new Square(x, y, randomColor()));
});
(_d = document.getElementById("colorBtn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    const padding = 50;
    const x = randomRange(padding, canvas.width - padding);
    const y = randomRange(padding, canvas.height - padding);
    shapes.push(new Circle(x, y, randomColor()));
});
(_e = document.getElementById("clearBtn")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    shapes = [];
});
render();
