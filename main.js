function Rocket(eng)
{
	this.canvas = document.createElement('canvas');
	this.canvas.id = 'rocket';
	this.canvas.width = this.width = 50;
	this.canvas.height = this.height = 50;

	this.ctx = this.canvas.getContext("2d");
	this.ctx.lineWidth = 1;
	this.ctx.strokeStyle = "#ffffff";

	this.maxspeed = 20;

	this.engine = eng;

	this.reset();
}


Rocket.prototype = {
	'reset' : function() {
		this.angle = 0;	
		this.xspeed = 0;
		this.yspeed = 0;

		// Position on the screen
		this.x = this.engine.width / 2;
		this.y = this.engine.height / 2;

		this.ctx.save();
		this.ctx.clearRect(0, 0, this.width, this.width);
		
		if(typeof(DEBUG) != 'undefined') {
			this.ctx.fillStyle = '#ff0000';
			this.ctx.fillRect(0,0,this.width, this.height);
		}

		this.ctx.translate((this.width / 2) - 5, (this.height / 2), - 10);
		this.ctx.beginPath();
		this.ctx.moveTo(0,20);
		this.ctx.lineTo(5,0);
		this.ctx.lineTo(10,20);
		this.ctx.moveTo(2,17);
		this.ctx.lineTo(7, 17);
		this.ctx.stroke();
		this.ctx.restore();
	
		this.ctx.translate(this.width / 2, this.height / 2 + 10);
	},
	'TurnLeft' : function() { this._left++; },
	'TurnRight' : function() { this._right++; },
	'Trust' : function() { this._trust = true; },
	'Fire' : function() { this._fire = true; },
	'Tick' : function() {

		this.rotate_angle = 0;

		if(this._left > this._right)
		{
			this.rotate_angle = -6;
		}
		if(this._left < this._right)
		{
			this.rotate_angle = 6;
		}
		this.angle += this.rotate_angle;
		if(this.angle > 360) this.angle -= 360;
		if(this.angle < 0) this.angle += 360;


		if(this._trust)
		{
			this.xspeed = Math.sin(this.angle) * this.maxspeed;
			this.yspeed = Math.cos(this.angle) * this.maxspeed;	
		}

		this.x += this.xspeed;
		if(this.x < 0) this.x = this.engine.width;
		if(this.x > this.engine.width) this.x = 0;
		this.y += this.yspeed;
		if(this.y < 0) this.y = this.engine.height;
		if(this.y > this.engine.height) this.y = 0;

		this._left = this._right = 0;
		this._trust = this._fire = false;
	}
};

function Engine(w, h) {
	self = this;
	self.width = w;
	self.height = h;

	// Set drawing surface
	self.drawingSurface = document.createElement('canvas');
	self.drawingSurface.id = 'dsurface';
	self.drawingSurface.width = w;
	self.drawingSurface.height = h;
	self.ctx = self.drawingSurface.getContext("2d");
	self.clear(); // Clear to black
	
	// Set keyboard handler
	document.body.onkeydown = self.keyhandler;

	// Add the canvas to the body
	document.body.appendChild(self.drawingSurface);
	
	self.rocket = new Rocket(self);

	self.Tick = function() {
		self.clear();
		self.rocket.Tick(); // Propagate the tick
	

		self.ctx.save();
		self.ctx.translate(self.rocket.x, self.rocket.y);
		self.ctx.rotate(self.rocket.angle  * Math.PI / 180);
		self.ctx.drawImage(self.rocket.canvas, self.rocket.width * -0.5, self.rocket.height * -0.5 - 10);
		self.ctx.restore();
		
	};

	self.tickrate = 30;
}

Engine.prototype = {
	'clear' : function() {
		self.ctx.fillStyle="#000000";
		self.ctx.fillRect(0, 0, self.width, self.height);
	},
	'reset' : function() {
		self.clear();
		self.rocket.reset();
	},
	'pause' : function() {
		window.clearInterval(self.intervalId);
		self.intervalId = null;
	},
	'resume' : function() {
		self.intervalId = window.setInterval(self.Tick, self.tickrate);
	},
	'keyhandler' : function(event) {
		if(self.intervalId == null)
		{
			self.resume();
		}
		
		switch(event.which)
		{
			case 30:
				// Space
				self.rocket.Fire();
				break;
			case 37: 
				// Left
				self.rocket.TurnLeft();
				break;
			case 38:
				// Ùp
				self.rocket.Trust();
				break;
			case 39:
				// Right
				self.rocket.TurnRight();
				break;
			case 80:
			case 112:
				// Pause
				self.pause();
				break;
			case 'S':
				// Sound trigger
				self.sound = !self.sound;
				break;
			case 8:
				self.reset();
				break;
			default:
				return;
		}
	}
}


var e = new Engine(640,480);

