var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var userCLickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started=true;
    }
}
);
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userCLickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userCLickedPattern.length-1);
});
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+ level);  
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}   
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");  
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    },100);
}
function playSound(name){
    var audio=new Audio("sound/" + name + ".mp3");
    audio.play();
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userCLickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
        },1000);
       }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      
      startOver();

    }
    
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    
}
