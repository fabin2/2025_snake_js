// 1.Variable declaration
var myCanvas = document.getElementById("canvas").getContext("2d");
var snakePosx = 80;
var snakePosy = 80;
var nextPosx = 0; // continous movement
var nextPosy = 0;

// 2.Onload function
window.onload = function(){
    document.addEventListener("keydown", inputControl);
    setInterval(mainGame, 200);
}

// 3.Main game function
function mainGame(){
    //Move snake
    snakePosx += nextPosx;
    snakePosy += nextPosy;

    // Game area

    //Background color
    myCanvas.fillStyle = "black";
    myCanvas.fillRect(0,0,400,400);

    //Grid line
    //x value
    for(var colmnLine = 0; colmnLine < 400; colmnLine += 20){
        myCanvas.moveTo(colmnLine, 0); // x,y value=0
        myCanvas.lineTo(colmnLine,400); // value x=0, y=400
    }
    //y value
    for(var rawLine = 0; rawLine < 400; rawLine += 20){
        myCanvas.moveTo(0, rawLine); // x,y value=0
        myCanvas.lineTo(400,rawLine); // value x=400, y=0
    }
    myCanvas.strokeStyle = "grey";
    myCanvas.stroke();
    
    //Snake
    myCanvas.fillStyle = "yellow";
    myCanvas.fillRect(snakePosx, snakePosy, 20, 20);

    //Fruit
    myCanvas.fillStyle = "red";
    myCanvas.fillRect(140, 140, 20, 20);
}

// 4.Input control function
function inputControl(e){
    console.log(e.keyCode);
    console.log(e.key);

    switch(e.keyCode){
        case 38:
            //Up
            nextPosy -= 20; // this values going to move snake & updated at snake fillRect
            nextPosx = 0;
            break;
        case 40:
            //Down
            nextPosy += 20;
            nextPosx = 0;
            break;
        case 39:
            //Right
            nextPosx += 20;
            nextPosy = 0;
            break;
        case 37:
            //Left
            nextPosx -= 20;
            nextPosy = 0;
            break;
    }
}