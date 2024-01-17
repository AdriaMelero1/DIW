const numOfCards = Math.floor((Math.random() * 8) + 3) * 2;
const cards = [];

let showedCards = 0;
let n = [];

$(document).ready(function () {
    for (let i = 1; i < (numOfCards / 2) + 1; i++) {
        cards.push(i, i);
    }

    cards.sort(() => Math.random() - 0.5);

    $("body").prepend("<div class='container'></div>");
    $("body").prepend("<div class='message'></div>");

    for (let i = 0; i < cards.length; i++) {
        $(".container").prepend(`<div class='card'><div class='num'>${cards[i]}</div></div>`);
    }

    $(".card").on("click", function () {
        console.log("object");

        if (showedCards < 2 && !$(this).children().hasClass("show")) {
            $(this).children().css("opacity", "1");
            showedCards++;

            n.push($(this).children().text());

            if (showedCards == 2) {
                if (n[0] == n[1]) {
									$(".message").text("You found a pair!");
									$(".card:contains('" + n[0] + "')").children().addClass("show");
                } else {
									$(".message").text("Not a pair");

                    
                    setTimeout(() => {
                        $(".card:not(.show)").children().css("opacity", "1");
                        $(".card").children().css("opacity", "0");
												$(".message").text("");

                    }, 1000);
                }
                n = [];
                showedCards = 0;
            }
        }
    });
});
