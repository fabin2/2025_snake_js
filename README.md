```js
//// 1.Variable declaration
var myCanvas = document.getElementById("canvas").getContext("2d");
var snakePosx = 80;
var snakePosy = 80;
var nextPosx = 0; // continous movement
var nextPosy = 0;
var fruitPosx = 140;
var fruitPosy = 140;
var snakeTail = [];
var snakeSize = 1;
var score = 0;
var gameStatus = "Ready";

//// 2.Onload function
window.onload = function(){
    document.addEventListener("keydown", inputControl);
    game = setInterval(mainGame, 200);
}

//// 3.Main game function
function mainGame(){
    document.getElementById("game-status").innerHTML = gameStatus;
    document.getElementById("score").innerHTML = score;
    ////Move snake
    snakePosx += nextPosx;
    snakePosy += nextPosy;

    //// Control snake movement from width height
    if(snakePosx > 400){
        snakePosx = 0;
    }
    if(snakePosy > 400){
        snakePosy = 0;
    }
    if(snakePosx < 0){
        snakePosx = 400;
    }
    if(snakePosy < 0){
        snakePosy = 400;
    }

    //// Game area

    ////Background color
    myCanvas.fillStyle = "black";
    myCanvas.fillRect(0,0,400,400);

    ////Grid line
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
    
    ////Snake
    myCanvas.fillStyle = "yellow";
    // myCanvas.fillRect(snakePosx, snakePosy, 20, 20);
    for(var i= 0; i< snakeTail.length; i++){
        myCanvas.fillRect(snakeTail[i].x, snakeTail[i].y, 20, 20);
        // if snake touch its tail
        if(snakePosx == snakeTail[i].x && snakePosy == snakeTail[i].y && snakeSize > 1){
            clearInterval(game);
            gameStatus = "Game Over";
        document.getElementById("game-status").innerHTML = gameStatus;
        }
    }

    ////Fruit
    myCanvas.fillStyle = "red";
    myCanvas.fillRect(fruitPosx, fruitPosy, 20, 20);
    
    // If snake eat fruit. 1.snake and fruit position reaching same
    if(snakePosx == fruitPosx && snakePosy == fruitPosy){ 
        snakeSize++;
        score += 10;
        fruitPosx = Math.floor(Math.random()*20)*20; // 2. fruit randomly positioned
        fruitPosy = Math.floor(Math.random()*20)*20;
    }

    // snake tail
    snakeTail.push({ x:snakePosx, y:snakePosy }); // every 200 msecond x and y value adding at the array snakeTail
    while(snakeTail.length > snakeSize){
        snakeTail.shift();
    }
}

//// 4.Input control function
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
    if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
        gameStatus = "Game started";
        document.getElementById("game-status").innerHTML = gameStatus;
    }
}
```