var playing = false;
var score;
var action;
var timeremaining;
var correctanswer;

// if we click on the start/reset button
document.getElementById("startreset").onclick = function(){
    // if we are playing
    if(playing == true){
        // reloading the page
        location.reload(); 

        // if we are not playing
    }else{
        // change playing status
        playing = true;

        //set score to 0 
        score = 0; 
        document.getElementById("scorevalue").innerHTML = score;

        //show countdown box       
        show("timeremaining");
        
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameOver");
        
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";

        //start countdown
        startcountdown();

        // Generate Q&A
        generateQA();

    }
}

for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
    if(playing == true){
        if(this.innerHTML == correctanswer){
            score += 1;
            document.getElementById("scorevalue").innerHTML = score;
            show("correct");
            hide("wrong");
            setTimeout(function(){hide("correct") },1000);
            generateQA();
            
        }else{
            show("wrong");
            hide("correct")
              setTimeout(function(){hide("wrong")},1000);
        }
    }
}
}

//Functions

//Start counter
function startcountdown(){
    action = setInterval(function(){
        timeremaining -= 1;               
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            stopcountdown();

            show("gameOver");
            document.getElementById("startreset").innerHTML = "Start Game";
            document.getElementById("gameOver").innerHTML = "<p>Game Over</p><p>Your score is "+ score +".</p>";

            hide("timeremainig");
            hide("correct");
            hide("wrong");
            playing = false;


        }}, 1000);
}

// stop counter
function stopcountdown(){
    clearInterval(action);
}

// hide certain element
function hide(id){
    document.getElementById(id).style.display = "none";
}


//show certain element
function show(id){
    document.getElementById(id).style.display = "block";
}

// generate question and multiple answers
function generateQA(){
    var wronganswer;
    var x = Math.round(Math.random() * 9) + 1;
    var y = Math.round(Math.random() * 9) + 1;
    correctanswer = x*y;
     document.getElementById("question").innerHTML= x + " x " + y;
    
    var correctposition = Math.round(Math.random() * 3) + 1
    
    document.getElementById("box"+correctposition).innerHTML = correctanswer;
    
    var answers = [correctanswer];
    
    
    // fill the other boxes with wrong answers
    for(i=1;i<5;i++){
          wronganswer = (Math.round(Math.random() * 9) + 1) * (Math.round(Math.random() * 9) + 1); 
        if (i != correctposition){          
            while(answers.indexOf(wronganswer)>-1){
                  wronganswer = (Math.round(Math.random() * 9) + 1) * (Math.round(Math.random() * 9) + 1); 
            }        
            document.getElementById("box"+i).innerHTML=wronganswer;
            answers.push(wronganswer);
        }
    }
    
}