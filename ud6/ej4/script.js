//Creation of 3 containers (each with a span as a counter)
$("body").append("<div class='blue-container ctn'><span>0</span></div>");
$("body").append("<div class='red-container ctn'><span>0</span></div>");
$("body").append("<div class='yellow-container ctn'><span>0</span></div>");

//Button for new postit
$("body").append("<button id='new'>NEW POST IT</button>");

//CREATION OF POSTITS (random color)
//Action listener for the button new postit
$("#new").click(function () {
	//A random number between 0 and 2 is generated and a array with 3 posible colors
	let colorIndex = Math.floor(Math.random() * 3);
	let colors = ["blue", "red", "yellow"];

	//Creation of the postit in a variable
	let postit = $("<div class='postit'><div class='min'>-</div><div class='close'>X</div><textarea placeholder='double click to open'></textarea></div>");

	//The postit is added to the body
	$("body").append(postit);

	//Adding the draggable property to the postit, data as is not dropped and the color as a class
	//(color is taken from the colors array with the random index)
	postit.draggable().data("dropped", false).addClass(colors[colorIndex]);

	//Limiting the textarea to 285 characters
	//On input event
	postit.find("textarea").on("input", function () {
		//The text is taken from the textarea value
		let text = $(this).val();
		//If the text is longer than 285 characters, it is cut to 285 characters
		if (text.length > 285) {
			text = text.substring(0, 285);
			//And the new value for the textarea is set to the cut text
			$(this).val(text);
		}
	});
});


//OPEN POST IT
//When clicking on a postit not activated, the next function is executed
$("body").on("dblclick", ".postit:not(.activated)", function (event) {
	//First check the click is not on the close button
	if (!$(event.target).hasClass("close")) {
		//Then the next actions are executed
		$(this).addClass("activated");
		$(this).find(".min").css("display", "flex");
		$(this).find(".close").css("display", "flex");
		$(this).removeClass("back");
		$(this).addClass("front");
	}
});



//MINIMIZE POST IT
//When clicking on the minimize button, the next function is executed so the postit now its big
$("body").on("click", ".min", function () {

	//Create the variable postit
	let postit = $(this).parent();

	//Only if the postit is activated, the next actions are executed and the postit minimizes
	if (postit.hasClass("activated")) {
		postit.removeClass("activated");
		postit.find(".min").css("display", "none");
		postit.removeClass("front");
		postit.addClass("back");
	}
});

//Variable to check if theres a dialog opened
let dialog = false;

//DELETE POST IT
//When clicking on the delete button, the next function is executed
$("body").on("click", ".close", function () {

	//postit variable created
	let postit = $(this).parent();

	//If there is no dialog opened
	if (!dialog) {

		//The variable is set to true
		dialog = true;

		//Dialog to confirm the delete is created with the next properties
		$("<div>Are you sure you want to delete this postit?</div>").dialog({
			resizable: false,
			height: "auto",
			width: 400,
			buttons: {
				//The button yes deletes the postit, rests one to the indicated container and closes the dialog
				Yes: function () {
					if (postit.data("dropped") == true) {

						if (postit.hasClass("blue")) {
							let container = $(".blue-container");
							let counter = container.data("counter");
							counter--;
							container.data("counter", counter);
							container.find("span").text(counter);
						}

						if (postit.hasClass("red")) {
							let container = $(".red-container");
							let counter = container.data("counter");
							counter--;
							container.data("counter", counter);
							container.find("span").text(counter);
						}

						if (postit.hasClass("yellow")) {
							let container = $(".yellow-container");
							let counter = container.data("counter");
							counter--;
							container.data("counter", counter);
							container.find("span").text(counter);
						}
					}
					//Removes the postit, sets dialog to false and closes the dialog
					postit.remove();
					dialog = false;
					$(this).dialog("close");
				},
				//Set dialog to false and closes the dialog with no further actions
				No: function () {
					dialog = false;
					$(this).dialog("close");
				},
			},
		});
	}
});




//CONTAINER DROPPABLES
//Three containers are created with a counter of 0 in its data
const blueContainer = $(".blue-container").data("counter", 0);
const redContainer = $(".red-container").data("counter", 0);
const yellowContainer = $(".yellow-container").data("counter", 0);

//Function to add one to the counter of the container and change the text of the span when a postit is dropped
function dropPostit(container, postit) {

	let counter = container.data("counter");

	if (postit.draggable.data("dropped") == false) {
		counter++;
		postit.draggable.data("dropped", true);
	}
	container.data("counter", counter);

	container.find("span").text(counter);
}

//Function to rest one to the counter of the container and change the text of the span when a postit is out
function outPostit(container, postit) {

	let counter = container.data("counter");

	if (postit.draggable.data("dropped") == true) {
		counter--;
		postit.draggable.data("dropped", false);
	}

	container.data("counter", counter);

	container.find("span").text(counter);
}

//The containers are set as droppables, setting that only accept theyre color and setting the functions to execute 
//when a postit is dropped or out with the previous functions
blueContainer.droppable({
	accept: ".blue",
	drop: function (e, postit) {
		dropPostit($(this), postit);
	},
	out: function (e, postit) {
		outPostit($(this), postit);
	}
});

redContainer.droppable({
	accept: ".red",
	drop: function (e, postit) {
		dropPostit($(this), postit);
	},
	out: function (e, postit) {
		outPostit($(this), postit);
	}
});

yellowContainer.droppable({
	accept: ".yellow",
	drop: function (e, postit) {
		dropPostit($(this), postit);
	},
	out: function (e, postit) {
		outPostit($(this), postit);
	}
});