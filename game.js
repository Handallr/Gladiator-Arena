
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gladiatorImg = new Image();
gladiatorImg.src = "img/gladiatore_sprite.png";

const enemyImg = new Image();
enemyImg.src = "img/nemico_sprite.png";

const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 64;

const player = {
  x: 100,
  y: 270,
  vx: 0,
  vy: 0,
  width: 64,
  height: 64,
  frame: 0,
  grounded: true,
  action: 'idle'
};

const enemy = {
  x: 600,
  y: 270,
  width: 64,
  height: 64,
  frame: 0
};

const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

gladiatorImg.onload = () => {
  enemyImg.onload = () => {
    requestAnimationFrame(gameLoop);
  };
};

function updatePlayer() {
  player.vx = 0;
  if (keys["ArrowLeft"]) {
    player.vx = -3;
    player.action = "walk";
  } else if (keys["ArrowRight"]) {
    player.vx = 3;
    player.action = "walk";
  } else {
    player.action = "idle";
  }

  if (keys["ArrowUp"] && player.grounded) {
    player.vy = -10;
    player.grounded = false;
    player.action = "jump";
  }

  if (keys["s"]) player.action = "crouch";
  if (keys["a"]) player.action = "attack";
  if (keys["d"]) player.action = "defend";

  player.x += player.vx;
  player.y += player.vy;
  player.vy += 0.5;

  if (player.y >= 270) {
    player.y = 270;
    player.vy = 0;
    player.grounded = true;
  }
}

function drawSprite(img, frame, x, y) {
  ctx.drawImage(img, frame * FRAME_WIDTH, 0, FRAME_WIDTH, FRAME_HEIGHT, x, y, FRAME_WIDTH, FRAME_HEIGHT);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePlayer();

  drawSprite(gladiatorImg, player.frame, player.x, player.y);
  drawSprite(enemyImg, enemy.frame, enemy.x, enemy.y);

  player.frame = (player.frame + 1) % 4;

  requestAnimationFrame(gameLoop);
}
