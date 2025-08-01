
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


// Stato del giocatore
let player = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    color: "red",
    speed: 5,
    vy: 0,
    gravity: 0.8,
    jumpPower: -15,
    isJumping: false,
    hp: 100
};

// Input
let keys = {};

// Eventi tastiera
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Pulsanti touch
document.getElementById("leftBtn").addEventListener("touchstart", () => keys["ArrowLeft"] = true);
document.getElementById("rightBtn").addEventListener("touchstart", () => keys["ArrowRight"] = true);
document.getElementById("upBtn").addEventListener("touchstart", () => keys["jump"] = true);
document.getElementById("downBtn").addEventListener("touchstart", () => keys["ArrowDown"] = true);
document.getElementById("attackBtn").addEventListener("touchstart", () => keys["x"] = true);
["leftBtn", "rightBtn", "upBtn", "downBtn", "attackBtn"].forEach(id =>
    document.getElementById(id).addEventListener("touchend", () => {
        keys["ArrowLeft"] = false;
        keys["ArrowRight"] = false;
        keys["jump"] = false;
        keys["ArrowDown"] = false;
        keys["x"] = false;
    })
);

// Movimento e disegno
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimento orizzontale
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;

    // Movimento verticale diretto (non salto)
    if (keys["ArrowDown"]) player.y += player.speed;

    // Salto (una volta sola)
    if ((keys["ArrowUp"] || keys["jump"]) && !player.isJumping) {
        player.vy = player.jumpPower;
        player.isJumping = true;
    }

    // Gravità
    player.y += player.vy;
    player.vy += player.gravity;

    // Pavimento
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.vy = 0;
        player.isJumping = false;
    }

    // HP draw
    document.getElementById("hp-fill").style.width = player.hp + "%";
    document.getElementById("hp-fill").textContent = player.hp;

    // Disegna il player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
}
update();
