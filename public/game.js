var gameboardWidth = 20;
var gameboardHeight = 20;
var direction = 4;
var clearTail;
var startPosition = 380;

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

	
function clearWorm() {
	var length = 6;
	var clearPosition = startPosition;
	var whitecolor = 'white';
	var position = [];

		if (clearTail == 1){
			
			for (var i = 0; i<length; i++)
			{
				position.push(clearPosition);
				document.getElementById(clearPosition -gameboardWidth).style.backgroundColor = whitecolor;
				clearPosition += gameboardWidth;
			}
		}
	
		if (clearTail == 2){
			
			for (var i = 0; i<length; i++)
			{
				position.push(clearPosition);
				document.getElementById(clearPosition -1).style.backgroundColor = whitecolor;
				clearPosition++;
			}
		}

		if (clearTail == 3){
			
			for (var i = 0; i<length; i++)
			{
				position.push(clearPosition);
				document.getElementById(clearPosition + 1).style.backgroundColor = whitecolor;
				clearPosition--;
			}
		}

		if (clearTail == 4){
			
			for (var i = 0; i<length; i++)
			{
				position.push(clearPosition);
				document.getElementById(clearPosition - gameboardWidth).style.backgroundColor = whitecolor;
				clearPosition-=gameboardWidth;
			}
		}


}

function drawWorm() {
	var length = 5;
	var color = 'blue';
	var whitecolor = 'white';
	var position = [];

	

	setInterval(function(){

		

		// Mato liikkuu alas
		if (direction == 1){
		startPosition += gameboardWidth;
	for (var i = 0; i<length; i++){
		position.push(startPosition);
		document.getElementById(startPosition + gameboardWidth * i).style.backgroundColor = color;
		document.getElementById(startPosition - gameboardWidth).style.backgroundColor = whitecolor;
		clearTail = 1;
		}
	}

	
		// Mato liikkuu oikealle
		if (direction == 2){
			startPosition++;
	for (var i = 0; i<length; i++){
		position.push(startPosition+i);
		document.getElementById(startPosition + i).style.backgroundColor = color;
		document.getElementById(startPosition - 1).style.backgroundColor = whitecolor;
		clearTail = 2;
		}
	}

		// Mato liikkuu vasemmalle
		if(direction == 3){
			startPosition--;
	for (var i = 0; i<length; i++){
		position.push(startPosition-i);
		document.getElementById(startPosition - i).style.backgroundColor = color;
		document.getElementById(startPosition + 1).style.backgroundColor = whitecolor;
		clearTail = 3;
		}	
	} 

		// Mato liikkuu ylös
		if (direction == 4){
			startPosition -= gameboardWidth;
	for (var i = 0; i<length; i++){
		position.push(startPosition);
		document.getElementById(startPosition - gameboardWidth * i).style.backgroundColor = color;
		document.getElementById(startPosition + gameboardWidth).style.backgroundColor = whitecolor;
		clearTail = 4;
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
		  clearWorm();
		  break;
		case "ArrowLeft":
		  direction = 3;
		  clearWorm();
		  break;
		case "ArrowUp":
		  direction = 4;
		  clearWorm();
		  break;
		case "ArrowDown":
		  direction = 1;
		  clearWorm();
		  break;
		default:
		  return; // Quit when this doesn't handle the key event.
	}
		event.preventDefault();
},true);