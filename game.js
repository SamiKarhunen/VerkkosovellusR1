var gameboardWidth = 20;
var gameboardHeight = 20;
var direction = 4;

function startGame(){
	console.log("startGame");

	initGameboard(gameboardWidth, gameboardHeight);
	drawWorm();
}

function initGameboard(height, width){
	console.log("initGameboard");

	var gameboard = '<table id="gameboard">';
 

  var tableElement = document.createElement("table");
  tableElement.setAttribute("id", "gameboard");
 
  for (var iRow = 0; iRow < height; ++iRow) {
    var rowElement = document.createElement("tr");
    for (var iCell = 0; iCell < width; ++iCell)
    {
      var cellElement = document.createElement("td");
      // Videolla iRow * height + iCell
      cellElement.setAttribute("id", iRow * width + iCell);
      cellElement.setAttribute("title", iRow * width + iCell);
      rowElement.appendChild(cellElement);
      
     
    }
    tableElement.appendChild(rowElement);
  }
  document.body.appendChild(tableElement);

		document.getElementById('gameboard').innerHTML = gameboard;
	}

	
function drawWorm() {
	var length = 5;
	var color = 'blue';
	var whitecolor = 'white';
	var position = [];
	var startPosition = 380;

	setInterval(function(){
		

		// Mato liikkuu alas
		if (direction == 1){
		startPosition += gameboardWidth;
	for (var i = 0; i<length; i++){
		position.push(startPosition);
		document.getElementById(startPosition + gameboardWidth * i).style.backgroundColor = color;
		document.getElementById(startPosition - gameboardWidth).style.backgroundColor = whitecolor;
		}
	}

		// Mato liikkuu oikealle
		if (direction == 2){
			startPosition++;
	for (var i = 0; i<length; i++){
		position.push(startPosition+i);
		document.getElementById(startPosition + i).style.backgroundColor = color;
		document.getElementById(startPosition - 1).style.backgroundColor = whitecolor;
		}
	}

		// Mato liikkuu vasemmalle
		if(direction == 3){
			startPosition--;
	for (var i = 0; i<length; i++){
		position.push(startPosition-i);
		document.getElementById(startPosition - i).style.backgroundColor = color;
		document.getElementById(startPosition + 1).style.backgroundColor = whitecolor;
		}	
	} 

		// Mato liikkuu ylös
		if (direction == 4){
			startPosition -= gameboardWidth;
	for (var i = 0; i<length; i++){
		position.push(startPosition);
		document.getElementById(startPosition - gameboardWidth * i).style.backgroundColor = color;
		document.getElementById(startPosition + gameboardWidth).style.backgroundColor = whitecolor;
		}
	}

}, 100);
}

//Key listener
window.addEventListener("keydown", function(event) {
		if(event.defaultPrevented) {
			return;
		}
	//Do something on key event
	switch (event.key) {
		case "ArrowRight":
		  direction = 2;
		  break;
		case "ArrowLeft":
		  direction = 3;
		  break;
		case "ArrowUp":
		  direction = 4;
		  break;
		case "ArrowDown":
		  direction = 1;
		  break;
		default:
		  return; // Quit when this doesn't handle the key event.
	}
		event.preventDefault();
},true);