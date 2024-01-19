$("body").append("<div class='blue-container droppable'><p class='counter'></p></div>");
$("body").append("<div class='red-container droppable'></div>");
$("body").append("<div class='yellow-container droppable'></div>");

// $("body").append("<div class='draggable blue'></div>");
// $("body").append("<div class='draggable adria'></div>");
$("body").append("<button id='new'>NEW POST IT</button>");


$("#new").click(function () {
	$("body").append("<div class='postit'>x</div>");
	$(".postit").draggable();
});

$(".draggable").draggable();


$(".droppable").droppable({
	drop: function (e, ui) {

		
		if ($(this).hasClass("blue-container")) {
			
			$('.blue-container').text("Container is blue");
		}

		if (ui.draggable.hasClass("blue")) {
			$('.blue-container').text("Draggable has class blue");
		}

		let counter = 0;

		ui.draggable.each(function () {
			counter++;
		});

		$('.blue-container').text(counter);


		console.log(ui.draggable);
	}
});