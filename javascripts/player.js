Halo = (function() {
  function Halo(x) {
    var player = {
      r:getRandomInt(0, 255), g:getRandomInt(140, 200), b:getRandomInt(0, 255), a:0.95, 
      cInc:true, lastX:-1, lastY:-1, x:-1, y:-1,

      draw: function() {
        if (this.x != -1 && this.lastX != -1) {
          // 
          point = { x: this.lastX, y: this.lastY,
            rgba: 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + 0.95 + ')',
            radius: getRandomInt(10, 25)};

          // Draw circle on canvas context
          ctx.beginPath();
          ctx.fillStyle = point.rgba;
          ctx.arc(point.x, point.y, point.radius, false, Math.PI * 2, false);
          ctx.fill();

          // Color flagging for circles
          if (this.cInc) {this.g += 1;} else {this.g -= 1;}
          if (this.g == 140) {this.cInc = true;}
          if (this.g == 200) {this.cInc = false;}
        }
      }
    };
    return player;
  }

  Halo.prototype = {
    draw: function() {
      // Do something with this.width and this.height
    }
  };

  return Halo;
})();

var player = new Halo();