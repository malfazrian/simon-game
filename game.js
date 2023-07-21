const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Call startGame function when a key is pressed
$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    startGame();
    started = true;
  }
});

// Click event for buttons
$(".btn").on("click", function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSounds(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function startGame() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  const randomChosenColour = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSounds(randomChosenColour);
}

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        startGame();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  playSounds("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  started = false;
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function playSounds(color) {
  const sfx = new Audio(`sounds/${color}.mp3`);
  sfx.play();
}
