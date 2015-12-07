// Initialize an HTML5 context from canvas myCanvas
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
// This is static here (TODO: fix)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

points = [];

// Create player object
var player = {
  r:255, g:165, b:0, cInc:true, lastX:-1, lastY:-1, x:-1, y:-1,
  draw: function() {
    ctx.strokeStyle = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
    //ctx.fillStyle = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';

    if (this.x != -1 && this.lastX != -1) {
      console.log("X: " + this.lastX + ", Y: " + this.lastY);
      // ctx.beginPath();
      // ctx.moveTo(this.lastX, this.lastY);
      // ctx.lineWidth="20";
      // ctx.lineJoin = ctx.lineCap="round";
      // ctx.moveTo(this.lastX, this.lastY);
      // ctx.lineTo(this.x, this.y);
      // ctx.shadowBlur = 30;
      // ctx.shadowOpacity = 1.5;
      // ctx.shadowColor = ctx.strokeStyle;
      // ctx.stroke();

      // ctx.beginPath();
      // ctx.moveTo(this.lastX, this.lastY);
      // var radgrad = ctx.createRadialGradient(this.lastX,this.lastY,10,this.lastX,this.lastY, 20);
      // radgrad.addColorStop(0, '#000');
      // radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
      // radgrad.addColorStop(1, 'rgba(0,0,0,0)');
      // ctx.fillStyle = radgrad;
      // ctx.fillRect(this.lastX-20, this.lastY-20, 40, 40);

      points.push({ 
        x: this.lastX, 
        y: this.lastY,
        rgb: 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')',
        radius: getRandomInt(10, 30),
        opacity: Math.random()
      });
      //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineWidth="10";
      ctx.lineJoin = ctx.lineCap="round";
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(this.x, this.y);
      ctx.shadowBlur = 30;
      ctx.shadowOpacity = 1.5;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.stroke();

      // for (var i = 0; i < points.length; i++) {
      //   ctx.beginPath();
      //   ctx.globalAlpha = points[i].opacity;
      //   ctx.fillStyle = points[i].rgb;
      //   ctx.arc(
      //     points[i].x, points[i].y, points[i].radius, 
      //     false, Math.PI * 2, false);
      //   ctx.fill();
      // }

      if (this.cInc) {this.g += 1;} else {this.g -= 1;}
      if (this.g == 100) {this.cInc = true;}
      if (this.g == 230) {this.cInc = false;}
    }
  }
};
// Add an event listener to detect mouse movement
canvas.addEventListener('mousemove', function(evt) {
  // Get mouse coordinates and make msg
  var mousePos = getMousePos(canvas, evt);
  var message = 'Player pos: ' + player.x + ',' + player.y;
  // Draw anew
  draw(canvas, message, mousePos);
}, false);


function draw(canvas, message, mousePos) {
  var ctx = canvas.getContext('2d');
  ctx.font = '18pt Calibri';
  ctx.fillStyle = 'black';
  ctx.clearRect(0, 0, 230, 30);
  ctx.fillText(message, 10, 25);
  player.lastX = player.x;
  player.lastY = player.y;
  player.x = mousePos.x;
  player.y = mousePos.y;
  player.draw();
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}