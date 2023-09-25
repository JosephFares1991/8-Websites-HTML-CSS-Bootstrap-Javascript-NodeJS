var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = ["apple", "banana", "duran", "grape", "guava", "lemon", "orange", "peach", "pear", "pineapple", "tomato"];
$(function(){
    //click on start reset button
    $("#startreset").click(function(){
        //are we playing?   
        //yes
        if(playing == true){
            //reload the page
            location.reload();
            //no
        }else{
            //we are not playing
            playing = true; //game initiated
            score = 0;
            $("#scorevalue").html(score);
            //show trial left box
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts(); 
            //hide game over box
            $("#gameOver").hide();
            //change button text to reset game
            $("#startreset").html("Reset Game")
            start()
        }
    }); 
    
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score); //updatescore
        document.getElementById("slice-sound").play(); //play sound
        
        //stop fruit 
         clearInterval(action);
        
        //hide fruit
        $("#fruit1").hide("explode"); //slice the fruit
        
        //send new fruit
        setTimeout(start, 500);
        
    });
    //slice fruit
    //play sound in the background
    //explode the fruit

    function addHearts(){
        $("#trialsLeft").empty();
        for(i=0;i<trialsLeft;i++){
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }  
    }

    //start fruit game
    function start(){
        //create random fruit
        $("#fruit1").show()
        chooseFruit() //choose a random fruit
        $("#fruit1").css({"left":Math.round(Math.random()*550), "top":-50})

        //1.define random step for the fruit
        step = Math.round(Math.random()*5)+1;

        //2.move fruit down by one step every 10 milli sec
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            //check if the fruit too low?
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                //yes --> any trials left?
                if(trialsLeft > 1){
                    //create random fruit
                    $("#fruit1").show()
                    chooseFruit() //choose a random fruit
                    $("#fruit1").css({"left":Math.round(Math.random()*550), "top":-50})

                    //1.define random step for the fruit
                    step = Math.round(Math.random()*5)+1;

                    //reduce the number of steps by 1
                    trialsLeft--;

                    // populate trials left box
                    addHearts();
                }else{//show game over
                    // not playing anymore
                    playing = false;
                    //change startreset button text to Start Game
                    $("#startreset").html("Start Game");
                    //show gameover box
                    $("#gameOver").show();
                    $("#gameOver").html("<p>game over!</p><p>your score is "+ score + "</p>");
                    $("#trialsLeft").hide();
                    stopAction();

                }
            }

        },10);

    }

    function chooseFruit(){
        var randomFruit = Math.floor(Math.random()*10);
        $("#fruit1").attr("src", "images/"+fruits[randomFruit]+".png");
    }

    //stop dropping fruits
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
}); 