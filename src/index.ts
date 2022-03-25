import { fabric } from "fabric";
const canvasEl = document.querySelector("#canvas") as HTMLCanvasElement;
const canvas = new fabric.Canvas("canvas", { interactive: true });
let rectWidth = 100;
let rectHeight = 100;
let canvasWidth = canvasEl.width;
let canvasHeight = canvasEl.height;
let rectAngle = 20;

var imgElement = document.querySelector("img") as HTMLImageElement;
let imgRatio = imgElement.offsetWidth / imgElement.offsetHeight;

// console.log(imgElement.offsetHeight, imgElement.offsetWidth);
let imgWidth = 100;
var imgInstance = new fabric.Image(imgElement, {
	left: 100,
	top: 100,
	scaleX: 0.051,
	scaleY: 0.051,
	// angle: 30,
	opacity: 0.85,
});
imgInstance.filters?.push(new fabric.Image.filters.Grayscale());
imgInstance.applyFilters();
canvas.add(imgInstance);

const rect = new fabric.Rect({
	left: canvasWidth / 2 - rectWidth / 2,
	top: canvasHeight / 2 - rectHeight / 2,
	fill: "rgb(255,0,0, 1)",
	width: rectWidth,
	height: rectHeight,
	angle: 0,
	flipX: true,
	flipY: true,
	opacity: 0.5,
	stroke: "blue",
	strokeWidth: 15,
	scaleX: 2,
	skewY: 15,
	// selectable: false,
});

canvas.add(rect);
rect.set({ angle: 20 });

rect.animate("angle", "+=50", {
	onChange: canvas.renderAll.bind(canvas),
	easing: fabric.util.ease.easeOutBounce,
	duration: 2000,
});

function animate() {
	rectAngle += 1;
	rect.set({ angle: rectAngle });
	canvas.renderAll();
	requestAnimationFrame(animate);
}
animate();

const fileInput = document.querySelector("input");
fileInput?.addEventListener("change", (e) => {
	console.log("New File");
	if (fileInput.files) {
		const file = fileInput.files[0];
		imgElement.src = URL.createObjectURL(file);
		canvas.renderAll();
		imgInstance.set({});
	}
});

var text = new fabric.Text("hello world", {
	left: 100,
	top: 100,
	fontFamily: "'Roboto', sans-serif",
	backgroundColor: "pink",
	fill: "white",
});
canvas.add(text);
