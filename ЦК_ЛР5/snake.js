let snakeColor = "rgb(146, 20, 219)"; 
let bckColor = "rgb(255, 255, 255)"; 
let foodColor = "rgb(251, 0, 255)"; 
let ctx; 
let gridSize = 20; 
let snake; 
let food = []; 
let direction; 
let changex = [-1, 0, 1, 0]; 
let changey = [0, -1, 0, 1]; 
let paused; 
let speed = 100; 
let clock;

window.onload = function () {
  canvas = document.getElementById("canvas1");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  snake = [[0, 0]]; 
  direction = 2; 
  paused = true; 

  document.onkeydown = function (event) { 
    changeDirection(event);
    // console.log(event);
  }; 

  addFood(); 
  return true; 
}

function changeDirection(event) { 
  if(!paused) { 
    code = 0; 
    console.log(event.keyCode);
    code = event.keyCode; 
    switch(code) { 
      case 37: if(direction != 2) { direction = 0; } break; //влево
      case 38: if(direction != 3) { direction = 1; } break; //вверх
      case 39: if(direction != 0) { direction = 2; } break; //вправо
      case 40: if(direction != 1) { direction = 3; } break; //вниз
    } 
  } else {console.log('game is paused' + paused);}
  if(code === 32){
    play();
  }
}

//Управление игрой
function play() { 
  if(paused) { 
    clock = setInterval(movement, speed); 
  } else { 
    clearInterval(clock); 
  } 
  paused = !paused; 
  if(paused) {console.log('pause');} else {console.log('play');} 
}

//Основной игровой цикл
function movement() { 
  snake.push([setX(snake[snake.length - 1][0] + changex[direction]), 
              setY(snake[snake.length - 1][1] + changey[direction])]); 
  if(!dotBelongSnake(food[0], food[1])) { 
    delPart(snake[0][0], snake[0][1]); snake.shift(); 
  } else { 
    addFood(); 
  } if(crash()) { 
    play(); 
    alert("Game Over;"); 
    clear(); 
    play(); 
  } drawSnake();
}

function setX(x) { 
  return x >= 0 ? x % (ctx.canvas.width / gridSize) : x + (ctx.canvas.width / gridSize); 
} 

function setY(y) { 
  return y >= 0 ? y % (ctx.canvas.height / gridSize) : y + (ctx.canvas.height / gridSize); 
} 

function dotBelongSnake(x, y) { 
  res = false; 
  for (i = 0; i < snake.length && !res; ++i) { 
    res = x == snake[i][0] && y == snake[i][1]; 
  } return res; 
}

function addFood() { 
  do { 
    food[0] = Math.floor(Math.random() * (ctx.canvas.height / gridSize)); 
    food[1] = Math.floor(Math.random() * (ctx.canvas.height / gridSize)); 
  } while (dotBelongSnake(food[0], food[1]));;
  drawFood(); 
}

function crash() { 
  res = false; 
  for (i = 0; i < snake.length - 1 && !res; ++i) { 
    res = snake[i][0] == snake[snake.length - 1][0] && snake[i][1] == snake[snake.length - 1][1]; 
  } return res;
}


//функции отрисовки элементов
function drawSnake() { 
  ctx.fillStyle = snakeColor; 
  ctx.fillRect(snake[snake.length - 1][0] * gridSize, snake[snake.length - 1][1] * gridSize, gridSize, gridSize); 
} 

let score = 0;

function drawFood() { 
  ctx.fillStyle = foodColor; 
  ctx.fillRect(food[0] * gridSize, food[1] * gridSize, gridSize, gridSize);
  score++;
  document.getElementById("score").innerText = score - 1; // Обновляем счет на экране
}

function delPart(x, y) { 
  ctx.fillStyle = bckColor; 
  ctx.clearRect(x * gridSize, y * gridSize, gridSize, gridSize); 
}

function clear(){
  location.reload();
}