const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player placeholder come cubo
const player = {
  x: 100,
  y: GAME_SETTINGS.groundY,
  vx: 0,
  vy: 0,
  width: 50,
  height: 50,
  hp: GAME_SETTINGS.maxHP,
  isJumping: false,
  isCrouching: false,
  isAttacking: false,
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
  // Input per movimento orizzontale
  player.vx = 0;
  if (inputState.left)  player.vx = -200;
  if (inputState.right) player.vx =  200;

  // Salto
  if (inputState.up && !player.isJumping) {
    player.vy = GAME_SETTINGS.jumpForce;
    player.isJumping = true;
  }

  // Abbassarsi
  player.isCrouching = inputState.down && !player.isJumping;

  // Attacco
  if (inputState.attack && !player.isAttacking) {
    player.isAttacking = true;
    // gestisci danno: console.log o callback
    console.log('Attacco: inflitto 10 danni');
    setTimeout(() => player.isAttacking = false, 300);
  }

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

  // Clamping confini
  player.x = Math.max(0, Math.min(GAME_SETTINGS.canvasWidth - player.width, player.x));

  // Riduci altezza se accovacciato
  if (player.isCrouching) player.height = 30;
  else player.height = 50;
}

function draw() {
  ctx.clearRect(0, 0, GAME_SETTINGS.canvasWidth, GAME_SETTINGS.canvasHeight);

  // Disegna player
  ctx.fillStyle = player.isAttacking ? 'orange' : 'blue';
  ctx.fillRect(player.x, player.y - player.height, player.width, player.height);

  // Barra HP
  const barW = 200;
  ctx.fillStyle = 'red'; ctx.fillRect(10,10,barW,20);
  ctx.fillStyle = 'green'; ctx.fillRect(10,10,barW*(player.hp/GAME_SETTINGS.maxHP),20);
  ctx.strokeStyle = 'white'; ctx.strokeRect(10,10,barW,20);
  ctx.fillStyle = 'white'; ctx.font='16px sans-serif'; ctx.fillText(player.hp+' HP',15,25);
}

// Avvia
requestAnimationFrame(loop);
