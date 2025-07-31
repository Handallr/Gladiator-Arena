// game.js
const player = document.getElementById("player");
const walkFrames = [
  "sprite_frames/walk_0.png",
  "sprite_frames/walk_1.png",
  "sprite_frames/walk_2.png",
  "sprite_frames/walk_3.png",
  "sprite_frames/walk_4.png",
  "sprite_frames/walk_5.png"
];

let currentFrame = 0;
let positionX = 100;
let direction = 1;

function update() {
  // Cambia frame
  currentFrame = (currentFrame + 1) % walkFrames.length;
  player.style.backgroundImage = `url(${walkFrames[currentFrame]})`;

  // Muove il personaggio verso destra fino al nemico
  if (positionX < 550) {
    positionX += 2 * direction;
    player.style.left = `${positionX}px`;
  }
}

setInterval(update, 120);
