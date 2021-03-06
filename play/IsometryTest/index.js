var c, ctx,
    mx = my = mux = muy = 0, md = false,
    PI = Math.PI, TAU = PI * 2,
    keyCodes = [];

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener("mousemove", mouseMove, false);
  c.addEventListener("mousedown", mouseDown, false);
  c.addEventListener("mouseup", mouseUp, false);

  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);

  assets.floor = new Image();
  assets.floor.src = "block_floor.png";

  assets.wall = new Image();
  assets.wall.src = "block_wall.png";

  update();
}

var ISO = {
  ANGLE: Math.PI/6,
  GRID_SIZE: 30
};

var player = {
  x: 0,
  y: 0,
  z: 0
}

function getIsoPoint(x, y, z){
  var nx = x * ISO.GRID_SIZE * 2 - z * ISO.GRID_SIZE * 2 + 700;
  var ny = x * ISO.GRID_SIZE + z * ISO.GRID_SIZE - y * ISO.GRID_SIZE + 100
  return {
    x: nx,
    y: ny
  }
}

var map = [
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
]

var assets = {};

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  r = 20;
  s = 0.1;

  if(keyCodes[65]){
    player.x -= s;
  }

  if(keyCodes[68]){
    player.x += s;
  }

  if(keyCodes[87]){
    player.z -= s;
  }

  if(keyCodes[83]){
    player.z += s;
  }

  if(keyCodes[32]){
    player.y += 0.2;
  }

  player.y = Math.max(player.y - 0.1, 0);

  for(var z in map){
    for(var x in map[z]){
      var p = getIsoPoint(x, 0, z);
      if(map[z][x] == 0){
        ctx.drawImage(assets.floor, p.x - ISO.GRID_SIZE * 2, p.y - ISO.GRID_SIZE * 1, ISO.GRID_SIZE * 4, ISO.GRID_SIZE * 4);
      } else{
        ctx.drawImage(assets.wall, p.x - ISO.GRID_SIZE * 2, p.y - ISO.GRID_SIZE * 1, ISO.GRID_SIZE * 4, ISO.GRID_SIZE * 4);
      }
    }
  }

  var p = getIsoPoint(player.x, player.y, player.z);

  ctx.beginPath();
  ctx.arc(p.x, p.y, 10, 0, TAU);
  ctx.stroke();

  window.requestAnimationFrame(update);
}


window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function mouseMove(e){
  setMousePosition(e);
}

function mouseDown(e){
  setMousePosition(e);
  md = true;
}

function mouseUp(e){
  mux = mx;
  muy = my;
  setMousePosition(e);
  md = false;
}

function setMousePosition(e){
  mx = e.clientX;
  my = e.clientY;
}

function keyDown(e){
  keyCodes[e.keyCode] = true;
}

function keyUp(e){
  keyCodes[e.keyCode] = false;
}
