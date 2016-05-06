// GAME
var RockEmSockEm = function(canvas, opts){
  var self = this;
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.opts = opts;
  this.losingPlayer = false;

  this.addPlayers();
  this.keyEvents();
  this.render();
};

RockEmSockEm.prototype.addPlayers = function(){
  var self = this;
  this.players = [];
  this.opts.players.forEach(function(opts, index){
    self.players.push(new Player(self, opts, index));
  });
};

RockEmSockEm.prototype.keyEvents = function(){
  var self = this;
  this.keysDown = [];

  window.onkeydown = function(e){
    self.keysDown[e.keyCode] = true;
  };

  window.onkeyup = function(e){
    self.keysDown[e.keyCode] = false;
  };
};

RockEmSockEm.prototype.render = function(){
  var self = this;
  this.context.clearRect(0, 0, this.opts.size.width, this.opts.size.height);

  this.players.forEach(function(player){
    player.update();
    if(player.health <= 0){
      self.losingPlayer = player;
    }
  });

  if(this.losingPlayer){
    alert(this.losingPlayer.opts.name + ' Lost');
    return false;
  }

  window.requestAnimationFrame(function(){
    self.render();
  });
};



// PLAYER
var Player = function(game, opts, index){
  this.game = game;
  this.opts = opts;
  this.index = index;

  this.y = this.game.opts.size.height - this.opts.height - this.game.opts.padding;
  this.isLeft = (this.opts.direction === 'left');
  this.health = this.opts.health;

  if(this.isLeft){
    this.x = this.game.opts.size.width - this.game.opts.padding - (this.opts.width / 2);
  } else {
    this.x = this.game.opts.padding + (this.opts.width / 2);
  }

  this.getImages();
  this.resetDefaults();
};

Player.prototype.getImages = function(){
  this.images = {
    default: new Image(),
    punch: new Image()
  };

  this.images.default.src = this.opts.images.default;
  this.images.punch.src = this.opts.images.punch;
};

Player.prototype.resetDefaults = function(){
  this.image = this.images.default;
  this.width = this.opts.width;
  this.height = this.opts.height;
};

Player.prototype.update = function(){
  var self = this;
  this.resetDefaults();

  if(this.health < this.opts.health){
    this.health += this.opts.regen;
  }

  this.opts.events.forEach(function(action){
    if(self.game.keysDown[action.key]){
      self[action.event]();
    }
  });

  this.collision();
  this.render();
};

Player.prototype.collision = function(){
  var self = this;
  var hitPlayer = false;

  this.game.players.forEach(function(player, index){
    if(index === self.index){
      return false;
    }
    
    if(self.isLeft){
      if(self.x < player.x + self.width){
        self.x = player.x + self.width;
        hitPlayer = player;
      }
    } else {
      if(self.x > player.x - self.width){
        self.x = player.x - self.width;
        hitPlayer = player;
      }
    }
  });

  if(this.x - (this.width / 2) < 0){
    this.x = this.width / 2;
  }

  if(this.x + (this.width / 2) > this.game.opts.size.width){
    this.x = this.game.opts.size.width - this.width / 2;
  }

  if(hitPlayer && !this.madeHit && this.punching){
    this.madeHit = true;
    hitPlayer.health -= 2;
  }
};

Player.prototype.render = function(){
  var healthX = 0;
  var healthWidth = (this.game.opts.size.width * this.health) / 100;

  if(this.isLeft){
    var x = this.x - this.width + this.opts.width / 2;
  } else {
    var x = this.x - this.opts.width / 2;
  }

  this.game.context.drawImage(this.image, x, this.y, this.width, this.height);

  if(this.isLeft){
    healthX = this.game.opts.size.width - ((this.game.opts.size.width * this.health) / 100);
  }
  this.game.context.fillStyle = this.opts.color;
  this.game.context.fillRect(healthX, 0, healthWidth, 10);
};

Player.prototype.punch = function(){
  var self = this;
  this.image = this.images.punch;
  this.width = this.opts.actionSize.width;
  this.height = this.opts.actionSize.height;
  this.punching = true;

  if(this.timer){
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function(){
    self.madeHit = false;
    self.punching = false;
  }, 20);
};

Player.prototype.moveForward = function(){
  this.x += 10;
};

Player.prototype.moveBackward = function(){
  this.x -= 10;
};