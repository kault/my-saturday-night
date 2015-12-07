// Initialize an HTML5 context from canvas myCanvas
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// This is static here (TODO: fix)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create basic timer for game
var sec = 15;  
var id = window.setInterval(function() {
    sec--;
    if (sec <  0) {
        clearInterval(id);
        //alert("Time complete");
        return;
    }        
}, 1000)

points = [];

// Create player object
var player = {
  r:255, g:165, b:0, a:0.75, cInc:true, lastX:-1, lastY:-1, x:-1, y:-1,
  draw: function() {
    if (this.x != -1 && this.lastX != -1) {
      //console.log("X: " + this.lastX + ", Y: " + this.lastY);
      points.push({ x: this.lastX, y: this.lastY,
        rgba: 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + 0.95 + ')',
        radius: getRandomInt(10, 25)
      });
      
      for (var i = 0; i < points.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = points[i].rgba;
        ctx.arc(
          points[i].x, points[i].y, points[i].radius, 
          false, Math.PI * 2, false);
        ctx.fill();
      }

      if (this.cInc) {this.g += 1;} else {this.g -= 1;}
      if (this.g == 120) {this.cInc = true;}
      if (this.g == 235) {this.cInc = false;}
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
  player.lastX = player.x;
  player.lastY = player.y;
  player.x = mousePos.x;
  player.y = mousePos.y;
  player.draw();
  ctx.font = '18pt Courier New';
  ctx.fillStyle = 'black';
  ctx.clearRect(0, 0, 330, 60);
  ctx.fillText(message, 10, 25);
  ctx.fillText("Count: " + sec, 10, 55);
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

      // ctx.beginPath();
      // ctx.moveTo(this.lastX, this.lastY);
      // var radgrad = ctx.createRadialGradient(this.lastX,this.lastY,10,this.lastX,this.lastY, 20);
      // radgrad.addColorStop(0, '#000');
      // radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
      // radgrad.addColorStop(1, 'rgba(0,0,0,0)');
      // ctx.fillStyle = radgrad;
      // ctx.fillRect(this.lastX-20, this.lastY-20, 40, 40);