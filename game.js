const player       = document.getElementById('player');
const enemy        = document.getElementById('enemy');
const scoreDisplay = document.getElementById('score');
const playerHPFill = document.getElementById('playerHP');
const enemyHPFill  = document.getElementById('enemyHP');

let playerPos = 100;
let playerHP  = 100;
let enemyHP   = 100;
let score     = 0;

const speed = 5;
let attacking = false;
let defending = false;

// inizializza in idle
player.classList.add('idle');
enemy .classList.add('idle');

document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'a': case 'ArrowLeft':  move(-speed); break;
    case 'd': case 'ArrowRight': move(+speed); break;
    case ' ':                     attack();      break;
    case 's': case 'ArrowDown':  defend(true);  break;
    case 'w': case 'ArrowUp':    jump();         break;
  }
});
document.addEventListener('keyup', e => {
  if (['a','ArrowLeft','d','ArrowRight'].includes(e.key)) stopMove();
  if (e.key==='s' || e.key==='ArrowDown') defend(false);
});

function move(dx) {
  if (attacking || defending) return;
  playerPos = Math.max(0, Math.min(736, playerPos + dx));
  player.style.left = playerPos + 'px';
  player.classList.replace('idle','walk');
}

function stopMove() {
  player.classList.replace('walk','idle');
}

function attack() {
  if (attacking || defending) return;
  attacking = true;
  player.classList.replace('idle','attack');

  // check range di 70px
  const enemyX = parseInt(enemy.style.left) || (800-100-64);
  if (Math.abs(playerPos - enemyX) < 70) {
    enemyHP = Math.max(0, enemyHP - 20);
    enemyHPFill.style.width = enemyHP + '%';
    if (enemyHP === 0) {
      score++;
      scoreDisplay.textContent = 'Punti: ' + score;
      enemyHP = 100;
      enemyHPFill.style.width = '100%';
      enemy.style.left = '736px';
    }
  }

  setTimeout(() => {
    player.classList.replace('attack','idle');
    attacking = false;
  }, 400);
}

function defend(state) {
  defending = state;
  if (state) player.classList.replace('idle','defend');
  else       player.classList.replace('defend','idle');
}

function jump() {
  if (attacking || defending) return;
  player.classList.replace('idle','jump');
  player.style.transition = 'bottom 0.3s ease';
  player.style.bottom     = '80px';
  setTimeout(() => {
    player.style.bottom = '0px';
    setTimeout(() => {
      player.style.transition = 'none';
      player.classList.replace('jump','idle');
    }, 300);
  }, 300);
}
