const player = document.getElementById('player');
const enemy = document.getElementById('enemy');

const playerHPFill = document.getElementById('player-hp-fill');
const enemyHPFill = document.getElementById('enemy-hp-fill');
const scoreDisplay = document.getElementById('score');

let playerPos = 200;
let playerHP = 100;
let enemyHP = 50;
let score = 0;

const speed = 10;
let attacking = false;
let currentFrame = 0;
let animationInterval = null;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    playerPos += speed;
    animateMovement();
  } else if (e.key === 'ArrowLeft') {
    playerPos -= speed;
    animateMovement();
  } else if (e.key === ' ') {
    attack();
  }

  playerPos = Math.max(0, Math.min(536, playerPos));
  player.style.left = playerPos + 'px';
});

function animateMovement() {
  stopAnimation();
  let frame = 0;
  animationInterval = setInterval(() => {
    frame = (frame + 1) % 4;
    player.style.backgroundPosition = `-${frame * 64}px 0`;
  }, 150);
  setTimeout(stopAnimation, 600);
}

function stopAnimation() {
  clearInterval(animationInterval);
  player.style.backgroundPosition = '0 0';
}

function attack() {
  if (attacking) return;
  attacking = true;
  player.style.backgroundPosition = '-128px 0'; // esempio frame 2 come attacco

  const enemyPos = parseInt(enemy.style.left);
  if (Math.abs(playerPos - enemyPos) < 60) {
    enemyHP -= 25;
    updateBars();

    if (enemyHP <= 0) {
      score++;
      scoreDisplay.textContent = score;
      respawnEnemy();
    }
  }

  setTimeout(() => {
    player.style.backgroundPosition = '0 0'; // ritorna al frame base
    attacking = false;
  }, 300);
}

function updateBars() {
  playerHPFill.style.width = playerHP + '%';
  enemyHPFill.style.width = Math.max(0, enemyHP) + '%';
}

function respawnEnemy() {
  enemyHP = 50;
  enemy.style.left = (Math.random() * 400 + 150) + 'px';
  updateBars();
}
