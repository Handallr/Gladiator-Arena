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

let currentFrame = 0;
let positionX = 100;
let direction = 1;

function update() {
  // Cambia il frame dell'animazione
  currentFrame = (currentFrame + 1) % walkFrames.length;
  player.style.backgroundImage = `url(${walkFrames[currentFrame]})`;

  // Muovi il personaggio verso il nemico
  if (positionX < 550) {
    positionX += 2 * direction;
    player.style.left = `${positionX}px`;
  }
}

setInterval(update, 120);
