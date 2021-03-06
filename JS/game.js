alert("Welcome to Simon Game");
alert("HOW TO PLAY...");
alert("The computer flashes a button . You need to start the game by pressing the same button");
alert("Next,the computer flashes another button. You need to press the previous buttons and the recent buttons.In this way, you need to press all the buttons in the sequence which were flashed.");
alert("If you press the wrong button,you lose the game.");

/**
 * a function which returns boolean value for touch-supported devices.
 * @returns {boolean} 
 */
function isTouchDevice(){
    return typeof window.ontouchstart !== 'undefined';
}

/**
 * Variables 
 */
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

var isTouch = isTouchDevice();

/**
 * function to generate random number .This random number is used as an index for buttonCOlors array and pushed into the gamePattern array
 * @param {void}
 * @returns {void}
 */
function nextSequence() {


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);


}

/**
 * Game start/restart function i.e a key event is triggered to start the game
 * @param {void}
 * @returns {void}
 */
function gameStart() {
    if(isTouch)
    {
    eventPassed = "touchend";
    $("#level-title").text("Press outside the buttons to start");
    }
    else 
    {
    eventPassed = "keydown";
    $("#level-title").text("Press a key to start");
    }
    $(document).on(eventPassed, function () {
        if (!started) {
            level += 1;
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }

    });

}

/**
 * User clicked buttons are stored in userClickedPattern array and the recently clicked button is passed into checkAnswer function
 */
if(isTouch)
eventPassed = "touchend";
else 
eventPassed = "click";
$(".btn").on(eventPassed, function () {
    var userChoosenColor = $(this).attr('id');
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);


    checkAnswer(userClickedPattern.length - 1);
});


/**
 * //This function validates the answer against the gamePattern.
 * @param {number} currentLevel 
 * @returns {void}
 */
function checkAnswer(currentLevel) {
    //If the user clicks the right button,it hghlights as the correct answer.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        $("#level-title").text("Hooray Correct button");
        // If the user completes the pattern,he/she heads to next level
        if (userClickedPattern.length === gamePattern.length) {
            level += 1;
            userClickedPattern = [];
            $("#level-title").text("Level " + level);
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

        //If the user clicks the wrong Button,he/she loses the game and have to restart the game.
    } else {
        console.log("wrong");
        playSound("wrong");
        $("#level-title").text("Game Over, please Wait to restart...");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        setTimeout(function(){
            startOver();
        },3000);
        
    }


}

/**
 * This startOver function Resets the variables.
 * @param {void}
 * @returns {void}
 */
function startOver() {

    gamePattern = [];
    userClickedPattern = [];

    level = 0;
    started = false;

    gameStart();

}

/**
 * This function generates the sounds.
 * @param {string} colorName 
 * @returns {void}
 */
function playSound(colorName) {
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

/**
 * This function generates pressed button effects.
 * @param {string} currentColor 
 * @returns {void}
 */
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);

}

//A function call to start the game.
gameStart();


