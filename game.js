const player = document.getElementById("player");

const walkFrames = [
  "assets/sprites/gladiator/walk_0.png",
  "assets/sprites/gladiator/walk_1.png",
  "assets/sprites/gladiator/walk_2.png",
  "assets/sprites/gladiator/walk_3.png",
  "assets/sprites/gladiator/walk_4.png",
  "assets/sprites/gladiator/walk_5.png"
];

const attackFrame = "assets/sprites/gladiator/attack_0.png";
const jumpFrame = "assets/sprites/gladiator/jump_0.png";

let positionX = 100;
let positionY = 0;
let velocityY = 0;
let gravity = 0.8;
let isJumping = false;
let isAttacking = false;
let direction = 0;
let currentFrame = 0;
let frameTimer = 0;

// Tastiera
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") direction = 1;
  if (e.key === "ArrowLeft") direction = -1;
  if (e.key === "a" || e.key === "A") {
    if (!isAttacking) {
      isAttacking = true;
      setTimeout(() => isAttacking = false, 300);
    }
  }
  if (e.key === "w" || e.key === "W") {
    if (!isJumping) {
      velocityY = -12;
      isJumping = true;
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" && direction === 1) direction = 0;
  if (e.key === "ArrowLeft" && direction === -1) direction = 0;
});

// Loop di gioco
function update() {
  // Movimento verticale (salto)
  if (isJumping) {
    velocityY += gravity;
    positionY += velocityY;

    if (positionY >= 0) {
      positionY = 0;
      velocityY = 0;
      isJumping = false;
    }
  }

  // Attacco
  if (isAttacking) {
    player.style.backgroundImage = `url(${attackFrame})`;
  }
  // Salto
  else if (isJumping) {
    player.style.backgroundImage = `url(${jumpFrame})`;
  }
  // Movimento
  else if (direction !== 0) {
    frameTimer++;
    if (frameTimer >= 6) {
      currentFrame = (currentFrame + 1) % walkFrames.length;
      frameTimer = 0;
    }
    player.style.backgroundImage = `url(${walkFrames[currentFrame]})`;
  } else {
    player.style.backgroundImage = `url(${walkFrames[0]})`;
  }

  // Posizione X/Y
  positionX += direction * 2;
  player.style.left = `${positionX}px`;
  player.style.bottom = `${positionY}px`;

  // Flip sinistra/destra
  player.style.transform = direction === -1 ? "scaleX(-1)" : "scaleX(1)";

  requestAnimationFrame(update);
}

update();
