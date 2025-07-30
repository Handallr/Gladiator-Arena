
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gladiatorImg = new Image();
gladiatorImg.src = "img/gladiatore_sprite.png";

const enemyImg = new Image();
enemyImg.src = "img/nemico_sprite.png";

let gladiator = { x: 50, y: 280, frame: 0 };
let enemy = { x: 700, y: 280, frame: 0 };

function drawSprite(img, frame, x, y) {
  const frameWidth = img.width / 6;
  ctx.drawImage(img, frame * frameWidth, 0, frameWidth, img.height, x, y, frameWidth, img.height);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Muove l'enemy verso sinistra
  enemy.x -= 1;

  drawSprite(gladiatorImg, gladiator.frame, gladiator.x, gladiator.y);
  drawSprite(enemyImg, enemy.frame, enemy.x, enemy.y);

  gladiator.frame = (gladiator.frame + 1) % 6;
  enemy.frame = (enemy.frame + 1) % 5;

  requestAnimationFrame(update);
}

// Inizia il gioco solo dopo che le immagini sono caricate
gladiatorImg.onload = () => {
  enemyImg.onload = () => {
    update();
  };
};
