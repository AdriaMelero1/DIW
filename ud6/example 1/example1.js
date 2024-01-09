$(document).ready(function () {
	console.log("Loaded");

	$("div:has(.highlight)").css("background-color", "yellow");

	$("div:contains('title')").addClass("highlight");


	// document.getElementById("send");
	$("#sendInfo").on({
		"click": function () {
			console.log("Clicked");
			console.log($("#num").val());
		},
		"mouseover": function () {
			console.log("Mouseover");
			$("#num").val("Hola adria");

		}
	});

	$("#sendInfo").on("click", {name: "Adria"}, test);



});

function test(event){
	console.log(event.data.name);
}

