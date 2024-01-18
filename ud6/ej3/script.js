$(document).ready(function () {

	$("textarea").countCharacters();

});



jQuery.fn.countCharacters = function () {
	$(this).each(function () {
			var counter = $("<p class='counter'></p>").insertAfter(this);
			$(this).on("keyup", function () {
					counter.text("Characters: " + $(this).val().length);
			}).trigger("keyup");
	});
};
// jQuery.fn.countCharacters = function () {

// 	$(this).each(function () {
		
// 		$(this).after("<p>" + $("textarea").val().length + "</p>");

// 	});
// }


// $(document).ready(function () {

// 	$("textarea").parent().append("<p>" + $("textarea").val().length + "</p>");

// 	$("textarea").on("keyup", function () {
// 		$(this).countCharacters();
// 	});
// });


// jQuery.fn.countCharacters = function () {

	
// 	$(this).each(function () {
// 		$("p").text($("textarea").val().length);
// 		$(this).append("<p>Caracteres: " + this.value.length + "</p>");
// 		console.log(this.value.length);
// 	});
// }
