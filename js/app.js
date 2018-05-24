//--------------------

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
		this.speed = 100 + Math.floor(Math.random() * 400);
	}
	
	if ( player.x < this.x + 80 &&
		 player.x + 80 > this.x && 
		 player.y < this.y + 60 && 
		 60 + player.y > this.y) {
		 player.x = 202;
	     player.y = 490;
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
	
	if (keyPress == 'down' && this.x < 405) {
		this.y +=83;
	}
	// wining game 
	if (this.y < 0) {
		setTimeout(function(){
		 player.x = 202;
	     player.y = 490;
		}, 1000);
		
	}}}

const allEnemies = [];
const enemyLocation = [63, 144, 230, 317, 400];


enemyLocation.forEach(function(locY){

const enemy = new Enemy(0, locY, 100 + Math.floor(Math.random() * 300));	
	
	
	
allEnemies.push(enemy);
})

const player = new Player(202, 490);







document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

