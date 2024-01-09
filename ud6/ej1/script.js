$(":button").on("click", function () {

	if(isANumber($("#num1").val()) && isANumber($("#num2").val())){
		$("h4").text(parseFloat($("#num1").val()) + parseFloat($("#num2").val()));
	} else {
		$("h4").text("Not numeric values");
	}
});


function isANumber(n) {
	console.log(n);
	return !isNaN(parseFloat(n)) && isFinite(n);
}