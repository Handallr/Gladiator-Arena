// game.js

const player = document.getElementById("player");

const walkFrames = [
  "assets/sprites/gladiator/walk_0.png",
  "assets/sprites/gladiator/walk_1.png",
  "assets/sprites/gladiator/walk_2.png",
  "assets/sprites/gladiator/walk_3.png",
  "assets/sprites/gladiator/walk_4.png",
  "assets/sprites/gladiator/walk_5.png"
];

const attackFrame = "assets/sprites/gladiator/attack/attack_0.png";

let positionX = 100;
let direction = 0;
let currentFrame = 0;
let frameTimer = 0;
let isAttacking = false;

// Controlli tastiera
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") direction = 1;
  if (e.key === "ArrowLeft") direction = -1;
  if (e.key === "a" || e.key === "A") {
    isAttacking = true;
    setTimeout(() => {
      isAttacking = false;
    }, 300); // durata dell'attacco
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" && direction === 1) direction = 0;
  if (e.key === "ArrowLeft" && direction === -1) direction = 0;
});

// Animazione
function update() {
  if (isAttacking) {
    player.style.backgroundImage = `url(${attackFrame})`;
  } else if (direction !== 0) {
    frameTimer++;
    if (frameTimer >= 6) {
      currentFrame = (currentFrame + 1) % walkFrames.length;
      frameTimer = 0;
    }
    player.style.backgroundImage = `url(${walkFrames[currentFrame]})`;
    positionX += direction * 2;
    player.style.left = `${positionX}px`;
    player.style.transform = direction === -1 ? "scaleX(-1)" : "scaleX(1)";
  } else {
    player.style.backgroundImage = `url(${walkFrames[0]})`;
  }

  requestAnimationFrame(update);
}

update();
