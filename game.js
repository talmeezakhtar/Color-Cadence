var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern =[];

var userClickedPattern=[];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level"+level);
        nextSequence();
        started=true;
    }
});
// callback function on clicking a button.
$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});
// sequence storing fnc.
function nextSequence(){

    userClickedPattern=[];

    level++;

    $("#level-title").text("level  "+ level);
    
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}
//sound while press and click
function playSound(randomChosenColour){
    var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();
}
// grey-animation on buttons
function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }