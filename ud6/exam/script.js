//Declaration of variables
let isFirstTime = true;
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var namePattern = /^[A-Z]/;

//Select container into a variable
let container = $('.container');

//Append elements (form) to the container
container.append("<form><label>Email: </label><input name='email' id='email' type='text'></input></form>");
container.append("<div id='message'></div>");

//Select form into variable
let form = container.find("form");

//Append form elements to form
form.append("<br><label>Name: </label><input name='name' id='name' type='text'></input>");
//And send button
container.append("<button id='btn'>Send</button>")

//Form fields into variables
let email = form.find("#email");
let name = form.find("#name");

//send button action listener (on click, calls a function)
$("#btn").on("click", function () {
	checkAndCreate();
});


//Function to check if field values are correct, if so, if its first time creates the select and inserts the option with values
//If already exists, just insert option with values
function checkAndCreate() {

	if (checkEmail(email.val()) && checkName(name.val())) {

		if (isFirstTime) {
			isFirstTime = false;
			container.append("<br><select><option>Select an option</option></select>");
			$("select").append("<option>" + name.val() + " - " + email.val() + "</option>")
		} else {
			$("select").append("<option>" + name.val() + " - " + email.val() + "</option>")
		}
		//Empty form fields
		name.val("");
		email.val("");
	}
}

//Name field, on focus out action calls a function
name.on("focusout", function () {
	checkName(name.val());
});

//Function to check if name is correct, first name is not null, then test pattern to check first is capital
//And if all is good, return true and empty message
//When is not good, the message is displayed with the error and return false
function checkName(name) {
	if (name == null || name == '') {
		$("#message").text("Name shouldn't be empty");
		return false;
	} else if (!namePattern.test(name)) {
		$("#message").text("First letter must be capital");
		return false;
	} else {
		$("#message").text(" ");
		return true;
	}
}


//Same as name event listener
email.on("focusout", function () {
	checkEmail(email.val());
});


//Check email as in name, but instead of first capital, the email pattern is tested.
function checkEmail(email) {
	if (email == null || email == '') {
		$("#message").text("Email shouldn't be empty");
		return false;
	} else if (!emailPattern.test(email)) {
		$("#message").text("Invalid Email format");
		return false;
	} else {
		$("#message").text(" ");
		return true;
	}
}