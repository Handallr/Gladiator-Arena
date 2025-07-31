
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gladiatorImage = new Image();
gladiatorImage.src = "assets/gladiator.png";

let player = {
  x: 50,
  y: canvas.height - 80,
  width: 50,
  height: 70,
  velocityY: 0,
  jumpPower: -12,
  gravity: 0.6,
  isJumping: false,
  speed: 4
};

let keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

function update() {
  // Movimento orizzontale
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;

  // Salto
  if (keys["w"] || keys["W"]) {
    if (!player.isJumping) {
      player.velocityY = player.jumpPower;
      player.isJumping = true;
    }
  }

  // Gravità
  player.y += player.velocityY;
  player.velocityY += player.gravity;

  // Atterra sul suolo
  if (player.y >= canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    player.isJumping = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gladiatorImage, player.x, player.y, player.width, player.height);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

gladiatorImage.onload = () => {
  loop();
};
