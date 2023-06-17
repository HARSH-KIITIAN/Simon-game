var started = false;
$(document).keydown(function(){
    if(!started){
        nextSequence();
        started = true;
    }
})
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
$(".btn").on("click", function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var index = userClickedPattern.length - 1;
    checkAnswer(index);
});
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $(document).on("click",() => {
            startOver();
        })
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}