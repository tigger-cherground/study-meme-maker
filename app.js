const lineWidth = document.getElementById('line-width');
const color = document.getElementById('color');
const colorOptions = Array.from(document.getElementsByClassName('color-options'));

const modeBtn = document.getElementById('mode-btn');
const destoryBtn = document.getElementById('destory-btn');
const eraseBtn = document.getElementById('eraser-btn');

const fileInput = document.getElementById('file');
const textInput = document.getElementById('text');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }

    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event) {
    isPainting = true;
}

function cancelPainting(event) {
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value; 
}
function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const selectColor = event.target.dataset.color;
    ctx.strokeStyle = selectColor;
    ctx.fillStyle = selectColor;
    color.value = selectColor;
}

function onModeClick(event) {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDesctoryClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling =  false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}

function onCanvasDoubleClick(event) {
    const text = textInput.value;
    if (text === "") {
        return;
    }

    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onCanvasDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(colorOption => colorOption.addEventListener('click', onColorClick));

modeBtn.addEventListener("click", onModeClick);
destoryBtn.addEventListener('click', onDesctoryClick);
eraseBtn.addEventListener('click', onEraserClick);

fileInput.addEventListener('change', onFileChange);