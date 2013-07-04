jSnake.UI = (function () {
	function UI(game, speed) {
		this.game = game;
		this.speed = speed;
	}
	
	UI.prototype.update = function () {
		if(this.game.step()) {
			this.clearBoard();
			this.refresh(this.game.snake, this.game.apple);
		} else {
			$('body').append("<div>").text("GAME OVER!");
		}
	};
	
	UI.prototype.clearBoard = function () {
		var $snk = $('.snake').removeClass();
		$snk.addClass('element');
		var $apl = $('.apple').removeClass();
		$apl.addClass('element');
	}
	
	UI.prototype.refresh = function (snake, apple) {
		var that = this;
		
		_.each(snake.body, function (segment) {
			$('#e' + ((segment.x * that.game.xDim) + segment.y)).addClass('snake');
		});
		
		// _.times(that.game.xDim, function(idx) {
// 			$row = $('<div id="row'+idx+'">').addClass('row');
// 			$board.append($row);
// 			
// 			_.times(that.game.yDim, function(jdx) {
// 				var $tile = $('<div>').addClass('element');
// 				var piece = that.game.board.rows[idx][jdx];
// 			
// 				if(piece === 's') {
// 					$tile.addClass('snake');
// 				} else if (piece === 'a') {
// 					$tile.addClass('apple');
// 				}
// 			
// 			});
// 		});
	};
	
	UI.prototype.draw = function () {
		var that = this;
		var $board = $('<div id="board">');
		
		_.times(that.game.xDim, function(idx) {
			$row = $('<div id="row'+idx+'">').addClass('row');
			$board.append($row);
			
			_.times(that.game.yDim, function(jdx) {
				var $tile = $('<div id="e'+ ((idx * that.game.xDim) + jdx) +'">').addClass('element');
				var piece = that.game.board.rows[idx][jdx];
			
				if(piece === 's') {
					$tile.addClass('snake');
				} else if (piece === 'a') {
					$tile.addClass('apple');
				}
			
				$board.find('#row' + idx).append($tile);
			
			});
		});
		$('body').append($board);
	};
	
	UI.prototype.start = function () {
		this.bindKeys();
		this.draw();
		var that = this;
		var loop = setInterval(function() {
			that.update();
		}, this.speed);
	}
	
	UI.prototype.bindKeys = function () {
		var that = this;
		$('html').keydown(function(e) {
			var dir;
			switch(e.keyCode) {
			case 37:
				dir = "west";
				break;
			case 38:
				dir = "north";
				break;
			case 39:
				dir = "east";
				break;
			case 40:
				dir = "south";
				break;
			default:
				return true;
				break;
			}
			that.game.snake.turn(dir);
			return false;
		});
	}
	
	return UI;
})();

