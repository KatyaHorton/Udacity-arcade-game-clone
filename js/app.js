

const startPosition = function() {
		player.x = 202;
	     player.y = 490;
		grassAccess = 0;
}

//------------- CLASS ENEMIES

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
		this.speed = 100 + Math.floor(Math.random() * 220);
	}
	
	if ( player.x < this.x + 80 &&
		 player.x + 80 > this.x && 
		 player.y < this.y + 60 && 
		 60 + player.y > this.y) {
		 startPosition();
		 loseDivAppear();
		 clearInterval(handle);
	}
}

	render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
	
}

//--------------------------- KEYBOARD SHOULD BE BLOCKED BEFORE THE START/RESTART BUTTON IS PRESSED 

	function keyBoard() {
	
		document.removeEventListener('keyup', keyEvents, true);
		
	function keyEvents(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

		player.handleInput(allowedKeys[e.keyCode]); 
}
		
	document.addEventListener('keyup', keyEvents, true); 

	}

	keyBoard();	


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
	
	if (keyPress == 'up' && this.y > 80) {
		this.y -=83;
	}
		
	if (keyPress == 'up' && this.y > 0 && grassAccess === 5) {
		this.y -=83;
	}
	
	if (keyPress == 'down' && this.y < 475) {
		this.y +=83;
	}
	
	// wining game 
	if (this.y < 0) {
		clearInterval(handle);
		setTimeout(function(){
		startPosition();
		winDivAppear();	
		winTime.innerText = timer.innerText;
		}, 1000);
	
		
	}}}

const allEnemies = [];
const enemyLocation = [63, 144, 230, 317, 400];


enemyLocation.forEach(function(locY){

const enemy = new Enemy(0, locY, 400 + Math.floor(Math.random() * 300));		
allEnemies.push(enemy);
})

const player = new Player(202, 490);


//----------------------------- SET THE TIMER 

const timer = document.getElementById('timer');
const restartButton = document.getElementById('restart');
const cont = document.getElementById('container');
let minutes = 0;
let seconds = 1;
let handle;
let winTime = document.getElementById('winTime');
function startTime() {
	clearInterval(handle);
	handle = setInterval(function(){
	timer.innerText = minutes + ' min : ' + seconds + ' sec';
		seconds++;
		if (seconds == 60) {
			minutes++;
			seconds = 0;		
}}, 1000);

};

function resetTime() {
	startTime();
	minutes = 0;
    seconds = 1;
}; 


function displayCanvas() {
	timer.innerText = "0 min: 0 sec";
	resetTime();
	startPosition();
	restartButton.innerText = "restart";
	displayIcebergs();
	displayStars();
	
};

function restartAfterWin() {
	displayCanvas();
	winDivDissapear();
	
}

function loseRestart() {
	displayCanvas();
	winDivDissapear();
	loseDiv.style.zIndex = 1;
}


restartButton.addEventListener('click', displayCanvas);
restartAgain.addEventListener('click', restartAfterWin);
restartAfterLose.addEventListener('click', loseRestart);
//_________________________________





//-------------------------- WIN DIV


const winLoseContainer= document.getElementById('winLoseContainer');

function winDivAppear() {
	
	winLoseContainer.style.transform = "translate(0, 0)";
};

function winDivDissapear() {
	winLoseContainer.style.transform = "translate(0, -930px)";
	winLoseContainer.style.transition = "1s";
}


//----------------------- LOSE DIV

const loseDiv = document.getElementById('loseDiv');

function loseDivAppear() {
	winDivAppear();
	loseDiv.style.zIndex = 11;
	winLoseContainer.style.transition = "0s";
}


//----------------------chose the player

const prince = document.querySelector('#prince');
const princess = document.getElementById('princess');
const cat = document.getElementById('cat');
const choosePlayerContainer =document.getElementById('choosePlayerContainer');
const winText = document.getElementById('winText');	
const begenningText = document.getElementById('begenningText');
const ifYous = document.querySelectorAll('.ifYou');

 function choosePlayerFunction(playerImg, playerDiv, winT, removeDiv1, removeDiv2) {
	 
	 for (const ifYou of ifYous) {
	 	ifYou.innerText = 'THE';
	 	};
	 
	 	playerDiv.style.backgroundColor = 'whitesmoke';
	 	player.player = playerImg;
	 	winText.innerText = winT;
	 	removeDiv1.style.display = 'none';
	   	removeDiv2.style.display = 'none';
	 	begenningText.innerText = 'You have selected:';
	 	setTimeout(function() {
		choosePlayerContainer.style.display = "none";
		restartButton.style.display = 'inline';
			
		},	   
			   3000)
} 

 prince.addEventListener('click', function(){
	 choosePlayerFunction('images/char-boy.png', prince, 'Prince', princess, cat)});

 princess.addEventListener('click', function(){
	 choosePlayerFunction('images/char-princess-girl.png', princess, 'Princess', prince, cat)});

cat.addEventListener('click', function(){
	 choosePlayerFunction('images/char-cat.png', cat, 'Cat', prince, princess) });

//--------------------------------- DRAWING STONES

class Iceberg {
	
	
	constructor (x, y) {
	this.x = x;
	this.y = y;
	this.iceberg = 'images/bug.png';
	}
	
	
		update(dt) {
			
if (grassAccess === 5) {
	this.iceberg = 'images/Selector.png';
	}
			
}
	
	render() {
    ctx.drawImage(Resources.get(this.iceberg), this.x, this.y);
}	
}


let allIcebergs = [];
const icebergLocation = [0, 100, 200, 300, 400];


//------------------DISPLAY ICEBERGS 

function displayIcebergs() {	

	allIcebergs = [];

	icebergLocation.forEach(function(locX)
							{
	const iceberg = new Iceberg(locX, -25);
	allIcebergs.push(iceberg);	
		});}


	
	




//----------------------------------- DRAWING  STARS


let allStars = [];
const starLocation = [75, 158, 241, 324, 407];
const starLocationX = [-2, 100, 202, 304, 406]; 


//-------------------CLASS STARS
let grassAccess = 0;

class Stars {
	constructor (x, y) {
	this.x = x;
	this.y = y;
	this.star = 'images/Star.png';
	}
//---- collision when player hits the star

	

		update(dt) {
		 
			if (this.x === player.x && this.y === player.y) {
				this.x = this.x+1;
				this.star = 'images/Heart.png';
				grassAccess ++;
			}
		}
	
		
	
	render() {
    ctx.drawImage(Resources.get(this.star), this.x, this.y);
		
}	
}



//--------------- SHUFFLE STARS

function displayStars() {	

	allStars = [];

	starLocation.forEach(function(locY){
		
	const locX = starLocationX[Math.floor(Math.random() * 5)];
	const star = new Stars(locX, locY);
		
	allStars.push(star);
		
	
	});}


displayIcebergs();
//--- STARS/PLAYER COLLISION 



// After each reset I have to clear the stars and add new ones, but I dont know how to do it 


































