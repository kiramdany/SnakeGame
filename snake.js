/*$(function () {
	snake = [];
	currentDirection = 'right';
	loop = function() {};
	preLoad(80, 100, 7);
});*/

var game = {
	snake: [],
	food: [], 
	snakeSize: 0, 
	gameHeight: 0,
	gameWidth: 0,
	blockSize: 0,
	currentDirection: 'right',
	loop: function() {},
	ctx: undefined,
	speed: 0,
	preLoad: preLoad,
	pause: false,
	speedIncrease: 0.98
}

game.preLoad(30, 24, 7);

function preLoad(height, width, blockSize) {
	game.gameHeight = height * blockSize;
	game.gameWidth = width * blockSize;
	game.blockSize = blockSize;
	game.snakeSize = 5;
	game.speed = 200;
	


	var $game = $("#game");
	$game.attr({
		"height": game.gameHeight.toString(),
		"width": game.gameWidth.toString()

	})
	$game.css("border", blockSize.toString() + 'px solid rgb(0, 0, 0)')
	game.ctx = $game[0].getContext("2d");
	
	initializeSnake(Math.round(game.gameHeight / 2), Math.round(game.gameWidth / 2), game.snakeSize, blockSize);
	positionFood();
	registerControls();
	gameLoop();	
}

function gameLoop() {
	loop = window.setInterval(function () {
		game.ctx.clearRect(0, 0, game.gameWidth, game.gameHeight);
		var eat = collision(game.snake[game.snake.length - 1], game.food)
		updateSnake(game.currentDirection, game.blockSize, eat);
		var dead = deadSnake();
		if (dead) gameOver();
		
		if (eat) {
			positionFood();
			pauseSnake();
			increaseSpeed();
		}
		drawSnake(game.snakeSize, game.blockSize, game.ctx);
		drawFood();
	}, game.speed);
	game.pause = false;
}

function increaseSpeed() {
	game.speed *= game.speedIncrease;
	gameLoop();
}

function drawSnake(size, blockSize, ctx) {
	var snake = game.snake;
	var i = 0;
	for (i; i < size - 1; i++) {
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(snake[i][0], snake[i][1], blockSize, blockSize);
		ctx.strokeStyle = "rgb(0, 0, 0)";
		ctx.strokeRect(snake[i][0], snake[i][1], blockSize, blockSize);
	}
	ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(snake[i][0], snake[i][1], blockSize, blockSize);
}

function updateSnake(direction, blockSize, eat) {
	var snake = game.snake;
	if (!eat) snake.shift();
	else game.snakeSize++;
	var head = snake[snake.length - 1].slice();
	switch (direction) {
	case 'right':
		head[0] += blockSize;
		break;
	case 'left':
		head[0] -= blockSize;
		break;
	case 'up':
		head[1] -= blockSize;
		break;
	case 'down':
		head[1] += blockSize;
		break;
	}

	snake.push(head);

}

function pauseSnake(){
	game.pause = true;
	window.clearInterval(loop);
}

function initializeSnake(x, y, size, blockSize) {
	var i = 0;
	for (i; i < size; i++) {
		game.snake.push([x + i * blockSize, y]);
	}
}

function deadSnake() {
	var i = 0;
	var snake = game.snake;
	var head = snake[snake.length - 1].slice();
	if (head[0] < 0 || head[1] < 0 || head[0] >= game.gameWidth || head[1] >= game.gameHeight ) return true;
	for (i; i < game.snakeSize - 1; i++) {
		if (snake[i][0] === head[0] && snake[i][1] === head[1]) return true;
	}
	return false;
	
}
	
function gameOver() {
	var ctx = game.ctx;
	pauseSnake();
	ctx.font = "30px Arial";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
    ctx.fillText("Game Over",game.gameWidth/2,game.gameHeight/2);
}

function positionFood() {
	var i = 0;
	var freeSpace = false;
	var blockSize = game.blockSize;
	var x = randomNumber(0, game.gameWidth - blockSize, blockSize);
	var y = randomNumber(0, game.gameHeight - blockSize, blockSize);
	/*while(!freeSpace) {
		var x = randomNumber(0, game.gameWidth - game.blockSize, game.blockSize);
		var y = randomNumber(0, game.gameHeight - game.blockSize, game.blockSize);
		for (i; i < game.snakeSize; i++) {
		if (snake[i][0] === x && snake[i][1] === y) {
			break;
		}
		else freeSpace = true;
	} */
	game.food = [x, y];
}

function collision(position1, position2) {
	if (position1[0] === position2[0] && position1[1] === position2[1] ) return true;
	return false;
}

function drawFood() {
	var x = game.food[0];
	var y = game.food[1];
	var blockSize = game.blockSize;
	var ctx = game.ctx;
	ctx.fillStyle = "rgb(255, 147, 39)";
	ctx.fillRect(x, y, blockSize, blockSize);
	
}


function randomNumber (min, max, increment) {
		var number = min + (max-min)*Math.random();
		var number = Math.round(number/increment)*increment; //(*1)
		return (number>min) ? number : min;
	}

function registerControls() {
	var currentDirection = game.currentDirection;
	document.addEventListener('keydown', function (event) {
		switch (event.keyCode) {
		
		case 37: // Left
			if (currentDirection === 'left' || currentDirection === 'right') {

			} else currentDirection = 'left';
			break;

		case 38: // Up
			if (currentDirection === 'up' || currentDirection ===  'down') {

			} else currentDirection = 'up';
			break;

		case 39: // Right
			if (currentDirection === 'left' || currentDirection === 'right') {

			} else currentDirection = 'right';
			break;


		case 40: // Down
			if (currentDirection === 'up' || currentDirection === 'down') {

			} 
				else currentDirection = 'down';
			break;
					case 32: //Space
				if (game.pause) gameLoop();
				else pauseSnake();
				break;

		}
		game.currentDirection = currentDirection;
	});
	
}