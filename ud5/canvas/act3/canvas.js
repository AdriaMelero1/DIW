let canvas = document.getElementById('canvas');
let context;
context = canvas.getContext('2d');

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const movex = document.getElementById('xaxis');
const movey = document.getElementById('yaxis');
const xaxis = document.getElementById('xaxis');

let started = false;

var ballX = 350;
var ballY = 250;
var directionX = 3;
var directionY = 2;
context.fillStyle = "#da2c38";


console.log("Move x value: " + movex.value);

window.addEventListener('load', function () {
	context.save();

	draw(ballX, ballY);






	context.restore();
});


function draw(x, y, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, 20, 0, Math.PI * 2, true);
	context.fill();
}


function clearCanvas() {
	canvas.width = canvas.width;
}

function getDirectionX() {
	console.log(movex.value);
	return movex.value;
}


startBtn.addEventListener('click', () => {

	if (!started) {
		started = true;

		move = setInterval(function () {
			if (ballX > 690 || ballX < 10) {

				directionX *= -1;
			}

			if (ballY < 10 || ballY > 490) {

				directionY *= -1;
			}


			ballX += directionX * movex.value / 3;
			ballY += directionY * movey.value / 3;
			clearCanvas();
			draw((ballX - directionX * movex.value * 1.5), (ballY - directionY * movey.value * 1.5), "#87c38f")
			draw((ballX - directionX * movex.value * 2), (ballY - directionY * movey.value * 2), "#87c38f")
			draw(ballX - directionX * movex.value, ballY - directionY * movey.value, "#87c38f")
			draw(ballX, ballY, "#da2c38");

		}, 5);
	}
});


stopBtn.addEventListener('click', () => {
	started = false;
	clearInterval(move);
});