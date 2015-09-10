function startGame(){
	console.log("startGame");

	initGameboard(20, 20);
	drawWorm();
}

function initGameboard(height, width){
	console.log("initGameboard");

	var gameboard = '<table id="gameboard">';

	for (var i=0; i<height; i++) {
		gameboard+= '<tr>';
		for (var j = 0; j < width; j++) {
			var id = (j+(i*height));
			var grid = '<td id="' + id + '" title= "' + id + '"></td>';
			gameboard += grid;
		}
		gameboard += '</tr>'
		}
		gameboard += '</table>';

		document.getElementById('gameboard').innerHTML = gameboard;
	}

function drawWorm() {
	var length = 5;
	var color = 'blue';
	var position = [];
	var startPosition = 62;

	for (var i = 0; i<length; i++){
		position.push(startPosition+i);
		document.getElementById(startPosition + i).style.backgroundColor = color;
	}
}