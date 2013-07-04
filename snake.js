jSnake = {};

jSnake.Snake = (function() {
	function Snake(head, board, startLength) {
		this.direction = randomDirection();
		this.head = head;
		this.board = board;
		this.body = this.buildBody(startLength);
	}
	
	Snake.prototype.buildBody = function(startLength) {
		var section = this.head;
		var that = this;
		var newBody = [];
		_.times(startLength, function() {
			section.x -= that.direction.x;
			section.y -= that.direction.y;
			newBody.push(_.clone(section));
		});
		return newBody;
	};
	
	Snake.prototype.update = function (apple) {
		var next = this.nextStep();
		if(this.board.onBoard(next)) {
			if (!(next.x === apple.x && 
				    next.y === apple.y)) {
				this.body.shift();
			} else {
				this.eat(apple);
			}
			this.slither();	
			return true;
		} else {
			return false;
		}
	};
	
	Snake.prototype.eat = function (food) {
		var r = this.randomApple();
		food.x = r.x;
		food.y = r.y;
	}
	
	Snake.prototype.randomApple = function () {
			var x = -1, y = -1;
			while(_.some(this.body, function (el) {
				return el.x == x && el.y == y;
			}) || x<0) {
				x = Math.floor(Math.random() * this.board.xDim);
				y = Math.floor(Math.random() * this.board.yDim);
			}
			console.log("apple: " + x + "  " + y);
			return { x: x, y: y };
	};
	
	Snake.prototype.nextStep = function () {
		return { x: this.head.x + this.direction.x,
						 y: this.head.y + this.direction.y };
	}
	
	Snake.prototype.slither = function () {
		this.head.x += this.direction.x;
		this.head.y += this.direction.y;
		this.body.push({ x: this.head.x, y: this.head.y });
	};
	
	function randomDirection() {
		var x = 0, y = 0;
		while((x===0 && y===0) || (x !== 0 && y !== 0)) {
			x = Math.floor(Math.random() * 2) - 1;
			y = Math.floor(Math.random() * 2) - 1;
		} 
		return { x: x, y: y }; 
	}
	
	Snake.prototype.turn = function(dir) {
		this.direction.x = 0;
		this.direction.y = 0;
		switch(dir) {
			case "north":
				this.direction.x = -1;
				break;
			case "south":
				this.direction.x =  1;
				break;
			case "east":
				this.direction.y =  1;
				break;
			case "west":
				this.direction.y = -1;
				break;
			default:
				console.log("incorrect turn attempted");
				break;
		}
	}
	
	return Snake;
})();

jSnake.Game = (function () {
	function Game(xDim, yDim, startLength) {
		this.xDim = xDim;
		this.yDim = yDim;
		this.board = new jSnake.Board(this.xDim, this.yDim);
		
		this.snake = new jSnake.Snake({ 
									 x: Math.round(xDim/2), 
									 y: Math.round(yDim/2) }, 
									 this.board, startLength);
									 
		console.log(this.snake);
		this.apple = this.randomApple();
		this.step();
	}
	
	Game.prototype.step = function () {
		this.board.clear();
		
		if(this.snake.update(this.apple, this.board)) {
			this.board.addSnake(this.snake);
			this.board.addApple(this.apple);
			return true;
		} else {
			return false;
		}
	};
	
	Game.prototype.randomApple = function () {
		var x = -1, y = -1;
		while(_.some(this.snake.body, function (el) {
			return el.x == x && el.y == y;
		}) || x<0) {
			x = Math.floor(Math.random() * this.xDim);
			y = Math.floor(Math.random() * this.yDim);
		}
		return { x: x, y: y };
	};
	
	return Game;
})();

jSnake.Board = (function () {
	function Board(x, y) {
		this.xDim = x;
		this.yDim = y;
		this.rows = [];
		var that = this;
		_.times(x, function(){
			that.rows.push([]);
			_.times(y, function(j) {
				_.last(that.rows).push(' ');
			});
		});
	}
	
	Board.prototype.addSnake = function (snake) {
		var that = this;
		snake.body.forEach(function(element) {
			that.rows[element.x][element.y] = 's';
		});
	};
	
	Board.prototype.addApple = function (apple) {
		this.rows[apple.x][apple.y] = 'a';
	}
	
	Board.prototype.print = function () {
		console.log(this.rows);
	};
	
	Board.prototype.onBoard = function (l) {
		return l.x >= 0 && l.y >=0 && l.x < this.rows.length && l.y < this.rows[0].length;
	}
	
	Board.prototype.clear = function () {
		var that = this;
		_.each(this.rows, function (el, i) {
			_.each(el, function(e, j) {
				that.rows[i][j] = ' ';
			})
		});
	}
	
	return Board;
})();









