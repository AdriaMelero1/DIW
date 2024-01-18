const numOfCards = Math.floor((Math.random() * 8) + 3) * 2;
const cards = [];

let showedCards = 0;
let n = [];

$(document).ready(function () {
    for (let i = 1; i < (numOfCards / 2) + 1; i++) {
        cards.push(i, i);
    }

    cards.sort(() => Math.random() - 0.5);

    $("body").append("<div class='message'></div>");
    $("body").prepend("<div class='container'></div>");
    $("body").append("<button>RESTART</button>");

    for (let i = 0; i < cards.length; i++) {
        $(".container").prepend(`<div class='card'><div class='num'>${cards[i]}</div></div>`);
    }


    $("button").on("click", function () {
        location.reload();
    });

    $(".card").on("click", function () {
        console.log("object");

        if (showedCards < 2 & !$(this).children().hasClass("show")) {
            showedCards++;
            $(this).children().css("opacity", "1");

            n.push($(this));

            if (showedCards == 2) {
                if (n[0].children().text() == n[1].children().text()) {
                    $(".message").text("You found a pair!");
                    $(n[0]).addClass("show");
                    $(n[1]).addClass("show");

                    if($(".card:not(.show)").length == 0){
                        $(".message").text("You won!");

                    }
                } else {
                    $(".message").text("Not a pair");

                    setTimeout(() => {
                        $(".card:not(.show)").children().css("opacity", "0");
                        $(n[0]).children().css("opacity", "1");
                        $(n[1]).children().css("opacity", "1");
                        $(".message").text("");

                    }, 1000);
                }
                n = [];
                showedCards = 0;
            }
        }
    });
});
