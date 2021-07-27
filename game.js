var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    
    var randomChosenColour = buttonColours[randomNumber];   

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

var started = true;
var level = 0;
$("body").keypress(function(){
    if(started){
        nextSequence();
        started = false;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(currentLevel + 1 === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    console.log("Highest level you reached is: " + level);
    console.log("Actual Order: " + gamePattern);
    console.log("Your Order: " + userClickedPattern);
    level = 0;
    started = true;
    gamePattern = [];
}