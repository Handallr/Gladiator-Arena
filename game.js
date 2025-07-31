const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 100,
  y: 300,
  width: 64,
  height: 64,
  speed: 3,
  frameIndex: 0,
  frameTimer: 0,
  direction: 0,
  isJumping: false,
  isAttacking: false,
  velocityY: 0,
  gravity: 0.5
};

const walkFrames = [];
for (let i = 0; i <= 5; i++) {
  const img = new Image();
  img.src = `assets/gladiator/walk_${i}.png`;
  walkFrames.push(img);
}
const jumpImg = new Image();
jumpImg.src = `assets/gladiator/jump_0.png`;

const attackImg = new Image();
attackImg.src = `assets/gladiator/attack_0.png`;

function update() {
  if (player.isJumping) {
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    if (player.y >= 300) {
      player.y = 300;
      player.isJumping = false;
      player.velocityY = 0;
    }
  }

  player.x += player.direction * player.speed;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let imgToDraw = walkFrames[0];
  if (player.isAttacking) imgToDraw = attackImg;
  else if (player.isJumping) imgToDraw = jumpImg;
  else if (player.direction !== 0) {
    imgToDraw = walkFrames[player.frameIndex];
    player.frameTimer++;
    if (player.frameTimer > 6) {
      player.frameIndex = (player.frameIndex + 1) % walkFrames.length;
      player.frameTimer = 0;
    }
  }

  ctx.save();
  if (player.direction === -1) {
    ctx.scale(-1, 1);
    ctx.drawImage(imgToDraw, -player.x - player.width, player.y, player.width, player.height);
  } else {
    ctx.drawImage(imgToDraw, player.x, player.y, player.width, player.height);
  }
  ctx.restore();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") player.direction = 1;
  if (e.key === "ArrowLeft") player.direction = -1;
  if (e.key === "w" && !player.isJumping) {
    player.isJumping = true;
    player.velocityY = -10;
  }
  if (e.key === "a") {
    player.isAttacking = true;
    setTimeout(() => player.isAttacking = false, 300);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" && player.direction === 1) player.direction = 0;
  if (e.key === "ArrowLeft" && player.direction === -1) player.direction = 0;
});

gameLoop();