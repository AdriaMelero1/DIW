let canvas = document.getElementById('canvas');
let context;
context = canvas.getContext('2d');

var sales = [{
	product: "Basketballs",
	units: 150,
	gradient: "yellow" 
}, {
	product: "Baseballs",
	units: 125,
	gradient: "blue" 

}, {
	product: "Footballs",
	units: 300,
	gradient: "red" 
}];


window.addEventListener('load', function () {

	context.save();

	paintText();
	paintLines();
	paintBars();

	context.restore();

});


function paintLines() {
	context.beginPath();
	context.translate(-50, 0)
	context.moveTo(-300, 0);
	context.lineTo(200, 0);
	context.translate(180, 0)
	context.moveTo(10, 10);
	context.lineTo(20, 0);
	context.moveTo(10, -10);
	context.lineTo(20, 0);
	context.translate(-180, 0)
	context.moveTo(-300, -350);
	context.lineTo(-300, 0);
	context.moveTo(-300, -350);
	context.lineTo(-310, -340);
	context.moveTo(-300, -350);
	context.lineTo(-290, -340);
	context.stroke();
}


function paintText() {

	context.translate(40, 200);
	context.font = "20px Arial";
	context.fillText("Units", 10, 50);

	context.translate(0, 200);
	context.font = "20px Arial";

	for (let i = 0; i < sales.length; i++) {
		context.translate(150, 0);
		context.fillText(sales[i].product, 10, 50);
	}

}


function paintBars() {

	context.translate(-250, -101);

	const grd = context.createLinearGradient(0, 0, 150, 0);
	grd.addColorStop(1, "white");

	for (let i = 0; i < sales.length; i++) {
		grd.addColorStop(0, sales[i].gradient);

		context.fillStyle = grd;
		context.fillRect(0, 100, 100, -sales[i].units);
		context.translate(150, 0);

	}
}