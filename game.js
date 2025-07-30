const player = document.getElementById('player');
const enemy = document.getElementById('enemy');

const playerHPFill = document.getElementById('player-hp-fill');
const enemyHPFill = document.getElementById('enemy-hp-fill');
const scoreDisplay = document.getElementById('score');

let playerPos = 100;
let playerHP = 100;
let enemyHP = 50;
let score = 0;

const speed = 10;
let attacking = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    playerPos += speed;
  } else if (e.key === 'ArrowLeft') {
    playerPos -= speed;
  } else if (e.key === ' ') {
    attack();
  }

  playerPos = Math.max(0, Math.min(550, playerPos));
  player.style.left = playerPos + 'px';
});

function attack() {
  if (attacking) return;
  attacking = true;
  player.style.backgroundColor = 'orange';

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
    player.style.backgroundColor = 'darkred';
    attacking = false;
  }, 300);
}

function updateBars() {
  playerHPFill.style.width = playerHP + '%';
  enemyHPFill.style.width = Math.max(0, enemyHP) + '%';
}

function respawnEnemy() {
  enemyHP = 50;
  enemy.style.left = (Math.random() * 500 + 50) + 'px';
  updateBars();
}
