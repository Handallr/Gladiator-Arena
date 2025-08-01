const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 100,
  y: GAME_SETTINGS.groundY,
  vx: 0,
  vy: 0,
  width: 64,
  height: 64,
  hp: GAME_SETTINGS.maxHP,
  isJumping: false,
  isAttacking: false,
  currentFrame: 0,
  frameCount: 6,
  frameTimer: 0,
  frameInterval: 1000 / 10, // 10 FPS di animazione
};

let lastTime = 0;

function loop(timestamp) {
  const dt = (timestamp - lastTime) / (1000 / GAME_SETTINGS.fps);
  lastTime = timestamp;

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

function update(dt) {
  // Fisica
  player.vy += GAME_SETTINGS.gravity * dt;
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  // Collisione con il terreno
  if (player.y > GAME_SETTINGS.groundY) {
    player.y = GAME_SETTINGS.groundY;
    player.vy = 0;
    player.isJumping = false;
  }

  // Clamping dei confini
  player.x = Math.max(0, Math.min(GAME_SETTINGS.canvasWidth - player.width, player.x));

  // Animazione frame
  player.frameTimer += dt * 1000;
  if (player.frameTimer > player.frameInterval) {
    player.currentFrame = (player.currentFrame + 1) % player.frameCount;
    player.frameTimer = 0;
  }
}

function draw() {
  // Pulisce lo schermo
  ctx.clearRect(0, 0, GAME_SETTINGS.canvasWidth, GAME_SETTINGS.canvasHeight);

  // Disegna lo sprite del giocatore
  const sx = player.currentFrame * player.width;
  ctx.drawImage(
    images.player,
    sx, 0, player.width, player.height,
    player.x, player.y - player.height,
    player.width, player.height
  );

  // Barra HP
  const barWidth = 200;
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 30, barWidth, 20);
  ctx.fillStyle = 'green';
  ctx.fillRect(10, 30, barWidth * (player.hp / GAME_SETTINGS.maxHP), 20);
  ctx.strokeStyle = 'white';
  ctx.strokeRect(10, 30, barWidth, 20);
  ctx.fillStyle = 'white';
  ctx.font = '16px sans-serif';
  ctx.fillText(`${player.hp} HP`, 15, 45);
}

// Input di attacco
document.getElementById('attackBtn').addEventListener('click', () => {
  if (!player.isAttacking) {
    player.isAttacking = true;
    setTimeout(() => { player.isAttacking = false; }, 300);
  }
});

// Avvia il gioco dopo il caricamento asset
loadAssets(() => requestAnimationFrame(loop));
