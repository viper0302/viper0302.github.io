
// Declare card symbols
let cardDeck = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




// Create array to hold opened cards and variables
let openedCards = [];
let moves = 0;
let starts = 3;
let matchFound = 0;
let startGame = false;
let starRate = "3";
let timer;

// Shuffle cards (function from http://stackoverflow.com/a/2450976)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Created each card's HTMl
function createCardDecks() {
    let cardList = shuffle(cardDeck);
    cardList.forEach(function(card) {
        $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
    })
}

// My own Logic to find matching cards
function matchingCards() {
    // Show cards on click
    $(".card").on("click", function() {
        if ($(this).hasClass("open show")) { return; }
        $(this).toggleClass("flipInY open show");
        openedCards.push($(this));
        startGame = true;
        // Check if classlist matches when openedCards length == 2
        if (openedCards.length === 2) {
            if (openedCards[0][0].classList[2] === openedCards[1][0].classList[2]) {
                openedCards[0][0].classList.add("bounceIn", "match");
                openedCards[1][0].classList.add("bounceIn", "match");
                $(openedCards[0]).off('click');
                $(openedCards[1]).off('click');
                matchFound += 1;
                moves++;
                removeOpenCards();
                Winner();
            } else {
                // If classes don't match, add "wrong" class
                openedCards[0][0].classList.add("shake", "wrong");
                openedCards[1][0].classList.add("shake", "wrong");
                // Set timeout to remove "show" and "open" class
                setTimeout(removeClasses, 1100);
                // Reset openCard.length to 0
                setTimeout(removeOpenCards, 1100);
                moves++;
            }
        }
        movesUpdater();
    })
}

// Update HTML with number of moves
function movesUpdater() {
    if (moves === 1) {
        $("#movesText").text(" Move");
    } else {
        $("#movesText").text(" Moves");
    }
    $("#moves").text(moves.toString());

    if (moves > 0 && moves < 16) {
        starRate = starRate;
    } else if (moves >= 16 && moves <= 20) {
        $("#starOne").removeClass("fa-star");
        starRate = "2";
    } else if (moves > 20) {
        $("#starTwo").removeClass("fa-star");
        starRate = "1";
    }
}


// Open the  popup window when game is complete source: www.w3schools.com
function Winner() {

    if (matchFound === 8) {

        var modal = document.getElementById('win-popup');
        var span = document.getElementsByClassName("close")[0];

        $("#total-moves").text(moves);
        $("#total-stars").text(starRate);

        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        $("#play-again-btn").on("click", function() {
            location.reload()
        });

        clearInterval(timer);


    }
}

// function to Reset openCard.length to 0
function removeOpenCards() {
    openedCards = [];
}

// Remove all classes unless they are a match
function removeClasses() {
    $(".card").removeClass("show open flipInY bounceIn shake wrong");
    removeOpenCards();
}

//  Used to disable clicks after a matched card
function disableClick() {
    openedCards.forEach(function (card) {
        card.off("click");
    })
}

// Start timer on the first card click
function startTimer() {
    let clicks = 0;
    $(".card").on("click", function() {
        clicks += 1;
        if (clicks === 1) {
            var sec = 0;
            function time ( val ) { return val > 9 ? val : "0" + val; }
            timer = setInterval( function(){
                $(".seconds").html(time(++sec % 60));
                $(".minutes").html(time(parseInt(sec / 60, 10)));
            }, 1000);
        }
    })
}

// Call functions
shuffle(cardDeck);
createCardDecks();
matchingCards();
startTimer();

// Function to restart the game on icon click
function restartGame() {
    $("#restart").on("click", function() {
        location.reload()
    });
}

restartGame();





