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
    animateMovement();
  } else if (e.key === 'ArrowLeft') {
    playerPos -= speed;
    animateMovement();
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

function animateMovement() {
  if (attacking || defending || jumping || crouching) return;
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
  if (attacking || defending || jumping || crouching) return;
  attacking = true;
  player.style.backgroundPosition = '-128px 0'; // frame di attacco

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
  }, 300);
}

function defend(state) {
  defending = state;
  player.style.filter = state ? 'brightness(70%) grayscale(50%)' : 'none';
}

function jump() {
  if (jumping || crouching || attacking) return;
  jumping = true;
  let jumpHeight = 80;
  player.style.transition = 'bottom 0.2s ease';
  player.style.bottom = jumpHeight + 'px';
  setTimeout(() => {
    player.style.bottom = '0px';
    setTimeout(() => {
      jumping = false;
      player.style.transition = 'none';
    }, 200);
  }, 200);
}

function crouch(state) {
  if (jumping || attacking) return;
  crouching = state;
  player.style.height = state ? '40px' : '64px';
  player.style.backgroundPosition = state ? '-192px 0' : '0 0'; // frame 3 per accovacciato
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
