$(document).ready(function () {

	$("textarea").countCharacters();
});


jQuery.fn.countCharacters = function () {
	$(this).each(function () {

		$(this).data("counter", $("<p>Characters: " + $(this).val().length + "</p>").insertAfter(this));

			$(this).on("keyup", function () {

				$(this).data("counter", $(this).data("counter").text("Characters: " + $(this).val().length));

			});
	});
};