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
let defending = false;
let crouching = false;
let jumping = false;
let animationInterval = null;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    playerPos += speed;
    animateWalk();
  } else if (e.key === 'ArrowLeft') {
    playerPos -= speed;
    animateWalk();
  } else if (e.key === ' ') {
    attack();
  } else if (e.key === 'Shift') {
    defend(true);
  } else if (e.key === 'ArrowUp') {
    jump();
  } else if (e.key === 'ArrowDown') {
    crouch(true);
  }

  playerPos = Math.max(0, Math.min(536, playerPos));
  player.style.left = playerPos + 'px';
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Shift') {
    defend(false);
  } else if (e.key === 'ArrowDown') {
    crouch(false);
  }
});

function animateWalk() {
  if (attacking || defending || jumping || crouching) return;
  stopAnimation();
  let frame = 1;
  animationInterval = setInterval(() => {
    player.style.backgroundPosition = `-${frame * 64}px 0`;
    frame = frame === 1 ? 2 : 1; // alterna Walk1 e Walk2
  }, 150);
  setTimeout(stopAnimation, 600);
}

function stopAnimation() {
  clearInterval(animationInterval);
  player.style.backgroundPosition = '0 0'; // Idle
}

function attack() {
  if (attacking || defending || jumping || crouching) return;
  attacking = true;
  player.style.backgroundPosition = '-192px 0'; // Attack

  const enemyPos = parseInt(enemy.style.left);
  if (Math.abs(playerPos - enemyPos) < 60) {
    if (!defending) {
      enemyHP -= 25;
      updateBars();

      if (enemyHP <= 0) {
        score++;
        scoreDisplay.textContent = score;
        respawnEnemy();
      }
    }
  }

  setTimeout(() => {
    player.style.backgroundPosition = '0 0';
    attacking = false;
  }, 400);
}

function defend(state) {
  defending = state;
  player.style.backgroundPosition = state ? '-384px 0' : '0 0'; // Defend
}

function jump() {
  if (jumping || crouching || attacking) return;
  jumping = true;
  player.style.backgroundPosition = '-256px 0'; // Jump
  player.style.transition = 'bottom 0.2s ease';
  player.style.bottom = '80px';

  setTimeout(() => {
    player.style.bottom = '0px';
    setTimeout(() => {
      player.style.transition = 'none';
      player.style.backgroundPosition = '0 0';
      jumping = false;
    }, 200);
  }, 200);
}

function crouch(state) {
  if (jumping || attacking) return;
  crouching = state;
  player.style.height = state ? '48px' : '64px';
  player.style.backgroundPosition = state ? '-320px 0' : '0 0'; // Crouch
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

let enemyFrame = 0;
setInterval(() => {
  enemy.style.backgroundPosition = `-${enemyFrame * 64}px 0`;
  enemyFrame = enemyFrame === 0 ? 1 : 0; // alterna Idle e Walk
}, 400);

