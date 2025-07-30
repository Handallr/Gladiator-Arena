// Elementi DOM
const player    = document.getElementById('player');
const enemy     = document.getElementById('enemy');
const scoreDisp = document.getElementById('score');
const pFill     = document.getElementById('playerHP');
const eFill     = document.getElementById('enemyHP');

// Stati
let playerHP = 100, enemyHP = 100, score = 0;
let dir = 0, isJump = false, isBlock = false, isAttack = false;

// Inizializza posizioni
player.style.left = '100px';
enemy.style.left  = '736px';

// Blocca scrolling con frecce e space
window.addEventListener('keydown', e => {
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) {
    e.preventDefault();
  }
  switch(e.key) {
    case 'a': case 'ArrowLeft':  dir = -1; startWalk(); break;
    case 'd': case 'ArrowRight': dir = +1; startWalk(); break;
    case 'w': case 'ArrowUp':    jump(); break;
    case 's': case 'ArrowDown':  block(); break;
    case ' ':                   attack(); break;
  }
});
window.addEventListener('keyup', e => {
  if (['a','d','ArrowLeft','ArrowRight'].includes(e.key)) stopWalk();
  if (['s','ArrowDown'].includes(e.key)) stopBlock();
});

// Funzioni movimento e animazioni
function startWalk() {
  if (isJump||isBlock||isAttack) return;
  let frame = 1;
  player.className = 'sprite walk1';
  player.walkInt = setInterval(() => {
    frame = frame===1?2:1;
    player.className = 'sprite walk'+frame;
    movePlayer(dir*5);
  }, 150);
}
function stopWalk() {
  clearInterval(player.walkInt);
  dir = 0;
  player.className = 'sprite idle';
}
function movePlayer(delta) {
  let x = parseInt(player.style.left);
  x = Math.min(736, Math.max(0, x + delta));
  player.style.left = x+'px';
}
function attack() {
  if (isJump||isBlock||isAttack) return;
  isAttack = true;
  player.className = 'sprite attack';
  setTimeout(() => {
    isAttack = false;
    player.className = 'sprite idle';
  }, 200);
}
function block() {
  if (isJump||isAttack) return;
  isBlock = true;
  player.className = 'sprite defend';
}
function stopBlock() {
  isBlock = false;
  player.className = 'sprite idle';
}
function jump() {
  if (isJump||isBlock||isAttack) return;
  isJump = true;
  player.className = 'sprite jump';
  player.style.transition = 'bottom 0.3s ease';
  player.style.bottom = '80px';
  setTimeout(() => {
    player.style.bottom = '0';
    setTimeout(() => {
      player.style.transition = '';
      player.className = 'sprite idle';
      isJump = false;
    }, 300);
  }, 300);
}

// Aggiorna HUD
function updateHUD() {
  pFill.style.width = playerHP + '%';
  eFill.style.width = enemyHP + '%';
  scoreDisp.textContent = 'Punti: ' + score;
}
updateHUD();
