var userClickedPattern=[];

var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];

var started =false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userChosenColor.length-1);

});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
  }
  startOver();

}

function nextSequence(){
  userClickedPattern=[];
  level++;

  $("#level-title").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);         // This will give random number from 0 to 3
  var randomChosenColour=buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}


function playSound(name){
  var audio=new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);

}
