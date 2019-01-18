// Copyright 2018 Peter Ward

var gridSize = 10;
var cubeSize = 25;
var strikes = 0; // Set strikes
var ships = 13; // 3 ships(13 squares) to hit
var battleship = 5;
var destroyer = 4;
var seascapeContainer = document.getElementById("seascape"); // get the container element to display our Grid
var textbox = document.getElementById("coord");

makeGrid(); // Make our Grid (send to browser)

var battleArea = gameArray(); // Place ships, a simple 2d array

function shoot(_temp) {
    var _r = doInt(_temp.charAt(0));
    var _c = parseInt(_temp.charAt(1)); 
    var strike_id = 'c' + _r + _c; // build up our ID as a string
    doMessage(''); // reset the message field
    doTurn(_r, _c, strike_id); // 
}

function doTurn(_row, _col, _id){
    // Splash! missed
    if (battleArea[_row][_col] == 0) {
        if (strikes == ships){
            doMessage('You can stop firing, you have already won!');
        } else {       
            doStyle(_id, {'background-color': '#1a5f79'}); // set the square to red - its a miss
            battleArea[_row][_col] = 3; // set this square to 3 because its a miss
        }

    // Boom! direct hit
    } else if (battleArea[_row][_col] == 1) {
        doStyle(_id, {'background-color': '#982e2e'}); // set the square to red - its a hit
        battleArea[_row][_col] = 2;
        strikes++; // increment strikes on each direct hit
        if (strikes == ships) {
            doMessage('You are Victorious!');
        }

    // if player clicks a square that's been previously hit, let them know
    } else if (battleArea[_row][_col] > 1) {
        if (strikes == ships){
            doMessage('You can stop firing, you have already won!');
        } else {
            doMessage('You are wasting your ammo, you have hit this location before.');
        }
    }
}

function makeGrid(){
    // Make our Grid (to browser) and set our Battle Area (2d array)
    for (i = 0; i < gridSize; i++) {
        for (j = 0; j < gridSize; j++) {
        // create a new div HTML element for each grid square and make it the right size
            var cube = document.createElement('div');
            seascapeContainer.appendChild(cube);
            cube.id = 'c' + j + i; // set the ID of the square
        // set each square's coordinates
            var topPosition = j * cubeSize;
            var leftPosition = i * cubeSize;			
        // use CSS absolute positioning
            cube.style.top = topPosition + 'px';
            cube.style.left = leftPosition + 'px';						
        }
    }    
}

function gameArray(){
    var _grid = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				];
    
    _grid = doShip(battleship, _grid); //Battleship
    _grid = doShip(destroyer, _grid); //Destroyer
    _grid = doShip(destroyer, _grid); //Destroyer
    
    return _grid;
}

function doShip(length, playArea) {
	var x, y, dir, retry, count=0;
	do {
		count++;
		retry = false;
		dir = Math.floor((Math.random() * 2));
		y = Math.floor((Math.random() * (10-(length-1)*(1-dir))));
		x = Math.floor((Math.random() * (10-(length-1)*dir)));
		for (var i = 0; i<length; i++) {
			if (!findSpace(x+i*dir, y+i*(1-dir), playArea)) retry = true;
		}
	} while (retry && count<100);
	if (count >= 100) alert("falied to find a place");
	for (i = 0; i<length; i++) {
		playArea[y+i*(1-dir)][x+i*dir] = 1;
	}
    
    return playArea;
}

function findSpace(x, y, thisGrid) {
	for (var i=-1; i<=1; i++) {
		for (var j=-1; j<=1; j++) {
			if (y+j<0 || x+i<0 || y+j>=10 || x+i>=10) continue;
			if (thisGrid[y+j][x+i] == 1) {
				return false;
			}
		}
	}
	return true;
}

function doInt(_char){
    var _c = parseInt(_char.charCodeAt(0)) - 97; // gets character code and deduct 97 for a = 0, b = 1 etc
    console.log('Character ' + _char + ' return ' + _c);
    return _c;
}

function doStyle(anId, propertyObject) {
    var currentId = document.getElementById(anId);
    for (var property in propertyObject) {
        currentId.style[property] = propertyObject[property];
    }
}

function doMessage(msg){
    document.getElementById('message').innerHTML = msg; // Populates the message tag
}