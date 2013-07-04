$(function() {
	//set up 100 rows
	var game = new jSnake.Game(20, 20, 4);
	var ui   = new jSnake.UI(game, 1500);
	ui.start();
});