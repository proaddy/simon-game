// variables
var coloredButton = ["red", "blue", "green", "yellow"];
var patternArray = [];
var counter = 0;
var level = 1;

// click for buttons
$(".btn").click(function (e) {
  switch (e.target.id) {
    case "green":
      var tempAud = new Audio("./sounds/green.mp3");
      tempAud.play();
      break;
    case "red":
      tempAud = new Audio("./sounds/red.mp3");
      tempAud.play();
      break;
    case "yellow":
      tempAud = new Audio("./sounds/yellow.mp3");
      tempAud.play();
      break;
    case "blue":
      tempAud = new Audio("./sounds/blue.mp3");
      tempAud.play();
      break;
    default:
      break;
  }
  // animation for pressed
  $(`.${e.target.id}`).addClass("pressed");
  setTimeout(() => {
    $(`.${e.target.id}`).removeClass("pressed");
  }, 100);

  // checking the button click is right or not
  checker(e.target.id);
});

// randomly add new color to the array
function randomGenerator() {
  var index = Math.floor(Math.random() * 4);
  patternArray.push(coloredButton[index]);

  $(`#${coloredButton[index]}`).fadeOut().fadeIn();
  return patternArray;
}

// check if the clicked color is correct
function checker(id) {
  if (id === patternArray[counter]) {
    counter++;
    levels();
  } else {
    tempAud = new Audio("./sounds/wrong.mp3");
    tempAud.play();

    // animation for wrong click
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Press 'S' to restart");

    counter = 0;
    level = 1;
    patternArray = [];
  }
}

// keep count of levels
function levels() {
  if (counter === patternArray.length) {
    console.log("Level Complete");
    level++;
    counter = 0;

    // Getting to next level
    $("#level-title").text(`Level ${level}`);
    setTimeout(() => {
      randomGenerator();
    }, 500);
  }
}

// start and restart game
$(document).keypress(function (e) {
  if (e.key === "s") {
    $("#level-title").text(`Level ${level}`);
    randomGenerator();
  }
});
