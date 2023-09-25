$(function(){
    //variables
    //App mode
    var mode = 0;
    //time counter
    var timeCounter = 0;
    //lap counter
    var lapCounter = 0;
    //variable for set interval
    var action;
    //number of laps
    var lapNumber = 0;
    //minuites, seconds, centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

    //on App load show start and lap buttons
    hideShowButtons("#start_btn", "#lap_btn");

    //click on startButton   
    $("#start_btn").click(function(){       
        ///mode on
        mode = 1;
        //show stop and lap buttons
        hideShowButtons("#stop_btn", "#lap_btn");
        //start counter
        startAction();

    });


    //click on stop button
    $("#stop_btn").click(function(){
        //show resume and reset buttons
        hideShowButtons("#resume_btn", "#reset_btn");
        //stop counter
        clearInterval(action);

    });

    //click on Resume button
    $("#resume_btn").click(function(){
        //show stop and lap buttons
        hideShowButtons("#stop_btn", "#lap_btn");
        //start action
        startAction();

    });


    //click on reset button
    $("#reset_btn").click(function(){
        //reload the page
        location.reload();
    });

    //click on lap button
    $("#lap_btn").click(function(){        
        //if mode is on
        if(mode == 1){
            //stop action
            clearInterval(action);
            //reset lap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }




    });


    //functions
    // This function shows two buttons
    function hideShowButtons(x, y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
            updateTime();
        },10);
    }

    //update time: convert counters to min, sec, centiseconds
    function updateTime(){
        timeMinutes = Math.floor(timeCounter/6000);
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;

        if(timeMinutes<10){
            $("#timeminute").text("0"+timeMinutes);
        }else{
            $("#timeminute").text(timeMinutes);   
        }

        if(timeSeconds<10){
            $("#timesecond").text("0"+timeSeconds);
        }else{
            $("#timesecond").text(timeSeconds);   
        }

        if(timeCentiseconds<10){
            $("#timecentsecond").text("0"+timeCentiseconds);
        }else{
            $("#timecentsecond").text(timeCentiseconds);   
        }

        lapMinutes = Math.floor(lapCounter/6000);
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100; 

        if(lapMinutes<10){
            $("#lapminute").text("0"+lapMinutes);
        }else{
            $("#lapminute").text(lapMinutes);   
        }

        if(lapSeconds<10){
            $("#lapsecond").text("0"+lapSeconds);
        }else{
            $("#lapsecond").text(lapSeconds);   
        }

        if(lapCentiseconds<10){
            $("#lapcentsecond").text("0"+lapCentiseconds);
        }else{
            $("#lapcentsecond").text(lapCentiseconds);   
        }

    }

    //print lap details
    function addLap(){
        lapNumber++;
        var myLapDetails = 
        '<div class="lap">'+
                '<div class="lap-number">'+
                    'Lap ' + lapNumber +
                '</div>'+
                '<div class="duration">'+
                    '<span>'+ format(lapMinutes)+'</span>' + ':' + '<span>'+ format(lapSeconds)+'</span>' + ':'+ '<span>'+ format(lapCentiseconds)+'</span>' + 
            '</div>'+  
           
        '</div>';    
        $(myLapDetails).prependTo("#laps");
    }

    function format(time){
        if(time < 10){
            return "0"+time;
        }else{
            return time;
        }
    }

});