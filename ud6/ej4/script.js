$("body").append("<div class='blue-container'><span>0</span></div>");
$("body").append("<div class='red-container'><span>0</span></div>");
$("body").append("<div class='yellow-container'><span>0</span></div>");

$("body").append("<button id='new'>NEW POST IT</button>");

//CREATION OF POSTITS (random color)
$("#new").click(function () {
	let colorIndex = Math.floor(Math.random() * 3);
	let colors = ["blue", "red", "yellow"];

	let postit = $("<div class='postit'><div class='close'>x</div><div class='text'>kajsdkjasdjkasd</div></div>");

	$("body").append(postit)

	postit.draggable().data("dropped", false).addClass(colors[colorIndex]);

});


//OPEN POST IT
$("body").on("click", ".postit:not(.activated)", function () {
	$(this).addClass("activated");
	$(this).draggable("disable");
});



//CLOSE POST IT
$("body").on("click", ".close", function () {
	if ($(this).parent().hasClass("activated")) {
		$(this).parent().removeClass("activated");
		$(this).parent().draggable("enable");
	}
});




//CONTAINER DROPPABLES

$(".blue-container").droppable({
	accept: ".blue",
	drop: function (e, postit) {
		let counter = $(this).find("span").text();
		if (postit.draggable.data("dropped") == false) {
			counter++;
			postit.draggable.data("dropped", true);
		}
		$(this).find("span").text(counter);
	},

	out: function (e, postit) {
		let counter = $(this).find("span").text();
		if (postit.draggable.data("dropped") == true) {
			counter--;
			postit.draggable.data("dropped", false);
		}
		$(this).find("span").text(counter);
	}
});

$(".red-container").droppable({
	accept: ".red",
	drop: function (e, postit) {
		let counter = $(this).find("span").text();
		if (postit.draggable.data("dropped") == false) {
			counter++;
			postit.draggable.data("dropped", true);
		}
		$(this).find("span").text(counter);
	},

	out: function (e, postit) {
		let counter = $(this).find("span").text();
		if (postit.draggable.data("dropped") == true) {
			counter--;
			postit.draggable.data("dropped", false);
		}
		$(this).find("span").text(counter);
	}
});

$(".yellow-container").droppable({
	accept: ".yellow",
	drop: function (e, postit) {
		let counter = $(this).find("span").text();
		if (postit.draggable.data("dropped") == false) {
			counter++;
			postit.draggable.data("dropped", true);
		}
		$(this).find("span").text(counter);
	},

	out: function (e, postit) {
		let counter = $(this).find("span").text();
		if (postit.draggable.data("dropped") == true) {
			counter--;
			postit.draggable.data("dropped", false);
		}
		$(this).find("span").text(counter);
	}
});