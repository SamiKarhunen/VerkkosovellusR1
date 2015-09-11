function startGame(){
	console.log("startGame");

	initGameboard(20, 20);
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
      
      if (!iRow) {
      }
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
	var startPosition = 62;

	setInterval(function(){

		startPosition++;
	for (var i = 0; i<length; i++){
		position.push(startPosition+i);
		document.getElementById(startPosition + i).style.backgroundColor = color;
		document.getElementById(startPosition - 1).style.backgroundColor = whitecolor;
	} 
}, 100);
}