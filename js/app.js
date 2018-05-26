/* -------------------- NOTES FOR ME: 

1. Time the game 

2. Smth happens when you win

3. Smth happens when you lose

4. Chose your caracter 

5. Cats? 

*/

const startPosition = function() {
		player.x = 202;
	     player.y = 490;
	
	
}
class Enemy {
	constructor (x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/Rock.png';
	}
	
	update(dt) {
	this.x += this.speed * dt;

	if (this.x > 510) {
		this.x = -100;
		this.speed = 100 + Math.floor(Math.random() * 300);
	}
	
	if ( player.x < this.x + 80 &&
		 player.x + 80 > this.x && 
		 player.y < this.y + 60 && 
		 60 + player.y > this.y) {
		 startPosition();
	}
}

	render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
	
}

//---------------------------


class Player{
	constructor(x, y) {
	this.x = x;
	this.y = y;
	this.player = 'images/char-princess-girl.png';
	}
	
	update(dt) {
}
	
	render() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

	handleInput(keyPress) {
	
	if (keyPress == 'left' && this.x > 0) {
		this.x -= 102;
	}
	
	if (keyPress == 'right' && this.x < 405) {
		this.x +=102;
	}
	
	if (keyPress == 'up' && this.y > 0) {
		this.y -=83;
	}
	
	if (keyPress == 'down' && this.y < 405) {
		this.y +=83;
	}
	// wining game 
	if (this.y < 0) {
		setTimeout(function(){
		startPosition();
		winDivAppear();
		}, 1000);
	
		
	}}}

const allEnemies = [];
const enemyLocation = [63, 144, 230, 317, 400];


enemyLocation.forEach(function(locY){

const enemy = new Enemy(0, locY, 100 + Math.floor(Math.random() * 300));		
allEnemies.push(enemy);
})

const player = new Player(202, 490);


//----------------------------- SET THE TIMER 

const timer = document.getElementById('timer');
const restartButton = document.getElementById('restart');
const cont = document.getElementById('container');
let minutes = 0;
let seconds = 1;


function startTime() {
setInterval(function(){
		timer.innerText = minutes + ' min : ' + seconds + ' sec';
		seconds++;
		if (seconds == 60) {
			minutes++;
			seconds = 0;		
}}, 1000);
};

function resetTime(callBack) {
	clearInterval(callBack);
	callBack();
	minutes = 0;
    seconds = 1;
}; 


function displayCanvas() {
	cont.style.display = 'block';
	timer.innerText = "0 min: 0 sec";
	resetTime(startTime);
	startPosition();
	restartButton.innerText = "RESTART";
};

function restartAfterWin() {
	displayCanvas();
	winDivDissapear();
	
}

restartButton.addEventListener('click', displayCanvas);
restartAgain.addEventListener('click', restartAfterWin);
//_________________________________


document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//-------------------------- WIN DIV


const winDiv= document.getElementById('winDiv');

function winDivAppear() {
	
	winDiv.style.transform = "translate(0, 0)";
};

function winDivDissapear() {
	winDiv.style.transform = "translate(0, -890px)";
}




