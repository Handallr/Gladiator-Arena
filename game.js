const player = document.getElementById('player');
const enemy  = document.getElementById('enemy');
const scoreDisplay = document.getElementById('score');
const playerHPFill = document.getElementById('player-hp-fill');
const enemyHPFill  = document.getElementById('enemy-hp-fill');

let playerPos = 100;
let playerHP  = 100;
let enemyHP   = 100;
let score     = 0;

const speed = 5;
let attacking = false;
let defending = false;
let animationInterval;

// set idle by default
player.classList.add('idle');
enemy.classList.add('idle');

// KEY HANDLERS

document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'a': case 'ArrowLeft': move(-speed); break;
    case 'd': case 'ArrowRight': move(+speed); break;
    case ' ': attack(); break;
    case 's': case 'ArrowDown': defend(true); break;
    case 'w': case 'ArrowUp': jump(); break;
  }
});
document.addEventListener('keyup', (e) => {
  if (e.key==='a' || e.key==='ArrowLeft' || e.key==='d' || e.key==='ArrowRight') stopAnimation();
  if (e.key==='s' || e.key==='ArrowDown') defend(false);
});

function move(dx) {
  if(attacking||defending) return;
  playerPos = Math.max(0, Math.min(736, playerPos + dx));
  player.style.left = playerPos + 'px';
  player.classList.remove('idle');
  player.classList.add('walk');
}

function stopAnimation() {
  clearInterval(animationInterval);
  player.classList.remove('walk');
  player.classList.add('idle');
}

function attack() {
  if(attacking||defending) return;
  attacking = true;
  player.classList.remove('idle');
  player.classList.add('attack');
  setTimeout(() => {
    player.classList.replace('attack','idle');
    attacking = false;
  },400);
}

function defend(state) {
  defending = state;
  if(state) player.classList.replace('idle','defend');
  else      player.classList.replace('defend','idle');
}

function jump() {
  if(attacking||defending) return;
  player.classList.replace('idle','jump');
  player.style.transition='bottom 0.3s ease';
  player.style.bottom='80px';
  setTimeout(()=>{
    player.style.bottom='0px';
    setTimeout(()=>{
      player.style.transition='none';
      player.classList.replace('jump','idle');
    },300);
  },300);
}

function updateBars() {
  playerHPFill.style.width = playerHP + '%';
  enemyHPFill.style.width  = enemyHP  + '%';
}

function tryHit() {
  if(Math.abs(playerPos - parseInt(enemy.style.left)) < 70) {
    enemyHP = Math.max(0, enemyHP - 20);
    updateBars();
    if(enemyHP===0) {
      score++;
      scoreDisplay.textContent = 'Punti: ' + score;
      enemyHP = 100;
      enemy.style.left = '736px';
      updateBars();
    }
  }
}

// on attack perform
attack = () => {
  if(attacking||defending) return;
  attacking = true;
  player.classList.replace('idle','attack');
  tryHit();
  setTimeout(()=>{
    player.classList.replace('attack','idle');
    attacking=false;
  },400);
};