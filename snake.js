/*$(function () {
	snake = [];
	currentDirection = 'right';
	loop = function() {};
	preLoad(80, 100, 7);
});*/

var game = {
	snake: [],
	snakeSize: 0, 
	gameHeight: 0,
	gameWidth: 0,
	blockSize: 0,
	currentDirection: 'right',
	loop: function() {},
	ctx: undefined,
	speed: 0,
	preLoad: preLoad,
	pause: false
}

game.preLoad(80,70,7);

function preLoad(height, width, blockSize) {
	game.gameHeight = height * blockSize;
	game.gameWidth = width * blockSize;
	game.blockSize = blockSize;
	game.snakeSize = 5;
	game.speed = 300;


	var $game = $("#game");
	$game.attr({
		"height": game.gameHeight.toString(),
		"width": game.gameWidth.toString()

	})
	$game.css("border", blockSize.toString() + 'px solid rgb(0, 0, 0)')
	game.ctx = $game[0].getContext("2d");
	
	initializeSnake(Math.round(game.gameHeight / 2), Math.round(game.gameWidth / 2), game.snakeSize, blockSize);
	registerControls();
	gameLoop();	
}

function gameLoop() {
	loop = window.setInterval(function () {
		game.ctx.clearRect(0, 0, game.gameHeight, game.gameWidth);
		updateSnake(game.currentDirection, game.blockSize);
		var dead = deadSnake();
		if (dead) gameOver();
		drawSnake(game.snakeSize, game.blockSize, game.ctx);
	}, game.speed);
	game.pause = false;
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

function updateSnake(direction, blockSize) {
	var snake = game.snake;
	snake.shift();
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
	if (head[0] < 0 || head[1] < 1 || head[0] >= game.gameWidth || head[1] >= game.gameHeight ) return true;
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