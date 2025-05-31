var myCanvas = document.getElementById("canvas").getContext("2d");
var snakePosx = 80;
var snakePosy = 80;
var nextPosx = 0;
var nextPosy = 0;
var fruitPosx = 140;
var fruitPosy = 140;
var snakeTail = [];
var snakeSize = 1;
var score = 0;
var gameStatus = "Ready";

window.onload = function(){
    document.addEventListener("keydown", inputControl);
    game = setInterval(mainGame, 200);
}

function mainGame(){
    document.getElementById("game-status").innerHTML = gameStatus;
    document.getElementById("score").innerHTML = score;
    snakePosx += nextPosx;
    snakePosy += nextPosy;
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
    myCanvas.fillStyle = "black";
    myCanvas.fillRect(0,0,400,400);
    for(var colmnLine = 0; colmnLine < 400; colmnLine += 20){
        myCanvas.moveTo(colmnLine, 0);
        myCanvas.lineTo(colmnLine,400);
    }
    for(var rawLine = 0; rawLine < 400; rawLine += 20){
        myCanvas.moveTo(0, rawLine);
        myCanvas.lineTo(400,rawLine);
    }
    myCanvas.strokeStyle = "grey";
    myCanvas.stroke();
    myCanvas.fillStyle = "yellow";
    for(var i= 0; i< snakeTail.length; i++){
        myCanvas.fillRect(snakeTail[i].x, snakeTail[i].y, 20, 20);
        if(snakePosx == snakeTail[i].x && snakePosy == snakeTail[i].y && snakeSize > 1){
            clearInterval(game);
            gameStatus = "Game Over";
        document.getElementById("game-status").innerHTML = gameStatus;
        }
    }
    myCanvas.fillStyle = "red";
    myCanvas.fillRect(fruitPosx, fruitPosy, 20, 20);
    if(snakePosx == fruitPosx && snakePosy == fruitPosy){ 
        snakeSize++;
        score += 10;
        fruitPosx = Math.floor(Math.random()*20)*20;
        fruitPosy = Math.floor(Math.random()*20)*20;
    }
    snakeTail.push({ x:snakePosx, y:snakePosy }); 
    while(snakeTail.length > snakeSize){
        snakeTail.shift();
    }
}

function inputControl(e){
    console.log(e.keyCode);
    console.log(e.key);
    switch(e.keyCode){
        case 38:
            nextPosy -= 20;
            nextPosx = 0;
            break;
        case 40:
            nextPosy += 20;
            nextPosx = 0;
            break;
        case 39:
            nextPosx += 20;
            nextPosy = 0;
            break;
        case 37:
            nextPosx -= 20;
            nextPosy = 0;
            break;
    }
    if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
        gameStatus = "Game started";
        document.getElementById("game-status").innerHTML = gameStatus;
    }
}