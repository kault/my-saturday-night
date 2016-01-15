/*************************************** GLOBAL VARIABLES ****************************************/

// Initialize an HTML5 context from canvas myCanvas
// var canvas = document.getElementById('myCanvas');
var canvas = $('#myCanvas')[0];
var ctx = canvas.getContext('2d');

// This is static here (TODO: fix)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create basic timer for game
var sec = 15;  
var id = window.setInterval(function() {
    sec--;
    if (sec <  0) {
        clearInterval(id); //alert("Time complete");
        return;
    }        
}, 1000)

// var player = new Halo();

/******************************************** OBJECTS ********************************************/



/******************************************* LISTENERS *******************************************/

// Add an event listener to detect mouse movement
canvas.addEventListener('mousemove', function(evt) {
  // Get mouse coordinates and make msg
  var mousePos = getMousePos(canvas, evt);
  var message = 'Player pos: ' + player.x + ',' + player.y;
  // Draw anew
  draw(canvas, message, mousePos);
}, false);


/******************************************* FUNCTIONS *******************************************/

// Draws, idk
function draw(canvas, message, mousePos) {
  // Update x,y coords and draw
  // var ctx = canvas.getContext('2d');
  player.lastX = player.x;
  player.lastY = player.y;
  player.x = mousePos.x;
  player.y = mousePos.y;
  player.draw();

  // Draw debug window
  ctx.font = '18pt Courier New';
  ctx.fillStyle = 'black';
  ctx.clearRect(0, 0, 330, 60);
  ctx.fillText(message, 10, 25);
  ctx.fillText("Count: " + sec, 10, 55);
}

// Returns a random integer between min and max (inclusive-exclusive?)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns x,y coordinates of mouse in canvas
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
}


// ctx.beginPath();
// ctx.moveTo(this.lastX, this.lastY);
// var radgrad = ctx.createRadialGradient(this.lastX,this.lastY,10,this.lastX,this.lastY, 20);
// radgrad.addColorStop(0, '#000');
// radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
// radgrad.addColorStop(1, 'rgba(0,0,0,0)');
// ctx.fillStyle = radgrad;
// ctx.fillRect(this.lastX-20, this.lastY-20, 40, 40);