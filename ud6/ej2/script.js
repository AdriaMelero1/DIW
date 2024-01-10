//Create a number of cards between 6 and 20 and an empty array
const numOfCards = Math.floor((Math.random() * 8) + 3) * 2;
const cards = [];

let showing = false;

//
$(document).ready(function () {

	//Fill the array with numbers, every number in 2 cards
	for (let i = 1; i < (numOfCards/2) +1; i++) {
		cards.push(i, i);
	}

	//Sort randomly the cards
	cards.sort(() => Math.random() - 0.5 );

	//Create a container
	$("body").prepend("<div class='container'></div>");


	//For every card create a div with the number inside
	for(let i = 0; i < cards.length; i++) {
		$(".container").prepend(`<div class='card'><div class='num'>${cards[i]}</div></div>`);
	}


	//Event listener for the cards
	// $(".card").on("click", function () {

	// 	if(!showing){
	// 		showing = true;
	// 		$(this).children().css("opacity", "1");
	// 	setTimeout(() => {
	// 		$(this).children().css("opacity", "0");
	// 		showing = false;
	// 	}, 1000);
	// 	}


		
	// });

		$(".card").on("click", showCardShort());

});


function showCardShort() {

}