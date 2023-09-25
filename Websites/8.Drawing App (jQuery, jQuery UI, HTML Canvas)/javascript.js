$(function(){
    $("#slider").slider({
        min:3,
        max:30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });

    //declare variables
    //paintingerasing or not
    var paint = false;

    //painting or erasing
    var paint_erase = "paint";

    //get the canvas and context
    var canvas = document.getElementById("paint");
    var context = canvas.getContext("2d");

    //get the canvas container
    var container = $("#container");

    //mouse position
    var mouse = {x:0, y:0};

    //onload load svaed work from local storage

    //set drawing parameters (linewidth, linejoint, line cap)
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";

    //click inside container
    container.mousedown(function(e){
        paint = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x,mouse.y);
    });

    //move the mouse while holding mouse key

    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                //get color input
                context.strokeStyle = $("#paint_color").val();
            }else{

                context.strokeStyle = 'rgba(240,248,255,0.1)';
            }
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }

    });


    //mouse up -> we are not paintingerasing any more
    container.mouseup(function(){
        paint = false;
    });

    //if we leave the container we are not painting erasing anymore
    container.mouseleave(function(){
        paint = false;
    });
    //click on reset button
    $("#reset").click(function(){       context.clearRect(0,0,canvas.width,canvas.height); 
    paint_erase = "paint";
    });

    //click on save button
   $("#save").click(function(){
        if(typeof(localStorage) != null){
        localStorage.setItem("imgCanvas", canvas.toDataURL());
        window.alert(localStorage.getItem("imgCanvas"));
    }else{
        window.alert("your browser does not support local storage")
    }
   });
    
    //onload load saved work from local storage
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            context.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    }

    //click on erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });

    //change color input
    $("#paint_color").change(function(){
        $("#circle").css("background-color", $(this).val());
    })
    

    //change linewidth using slider
    $("#slider").slider({
        min:3,
        max:30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });


    //functions
});