function Screen(w, h) {
	this.width = w;
	this.height = h;

	this.drawingSurface = document.createElement('canvas');
	this.drawingSurface.id = 'dsurface';
	this.drawingSurface.width = w;
	this.drawingSurface.height = h;
	
	document.body.appendChild(this.drawingSurface);

	this.ctx = this.drawingSurface.getContext("2d");

	this.reset();
}

Screen.prototype = {
	'reset' : function() {
		this.ctx.fillStyle="#000000";
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}

function Rocket()
{
	this.canvas = document.createElement('canvas');
	this.canvas.id = 'rocket';
	this.canvas.width = 20;
	this.canvas.height = 20;

	this.ctx = this.canvas.getContext("2d");
	this.ctx.lineWidth = 1;
	this.ctx.strokeStyle = "#ffffff";

	this.reset();
}


Rocket.prototype = {
	'reset' : function() {
		this.angle = 0;	
	
		this.ctx.clearRect(0, 0, 20, 20);
		this.ctx.beginPath();
		this.ctx.moveTo(5,20);
		this.ctx.lineTo(10,0);
		this.ctx.lineTo(15,20);
		this.ctx.moveTo(7,17);
		this.ctx.lineTo(13, 17);
		this.ctx.stroke();
	}

	'rotate' : function() {
		this.ctx.rotate(this.angle * Math.PI / 180);
	}
};

var s = new Screen(1024,728);

