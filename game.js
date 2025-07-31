const player    = document.getElementById('player');
const enemy     = document.getElementById('enemy');
const scoreDisp = document.getElementById('score');
const pFill     = document.getElementById('playerHP');
const eFill     = document.getElementById('enemyHP');
let playerHP = 100, enemyHP = 100, score = 0;
let dir = 0, isJump = false, isBlock = false, isAttack = false;

player.style.left = '100px';
enemy.style.left  = '736px';

window.addEventListener('keydown', e => {
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) e.preventDefault();
  if (!isJump && !isAttack) switch(e.key) {
    case 'a': case 'ArrowLeft':  dir=-1; startWalk(); break;
    case 'd': case 'ArrowRight': dir= 1; startWalk(); break;
    case 'w': case 'ArrowUp':    jump();       break;
    case 's': case 'ArrowDown':  block();      break;
    case ' ':                    attack();     break;
  }
});
window.addEventListener('keyup', e => {
  if (['a','d','ArrowLeft','ArrowRight'].includes(e.key)) stopWalk();
  if (['s','ArrowDown'].includes(e.key))     stopBlock();
});

function startWalk() {
  if (isJump||isBlock||isAttack) return;
  clearInterval(player.walkInt);
  player.className = 'sprite walk';
  player.style.transform = dir<0?'scaleX(-1)':'scaleX(1)';
  player.walkInt = setInterval(()=> movePlayer(dir*5),50);
}
function stopWalk() {
  clearInterval(player.walkInt); dir=0;
  player.className='sprite idle'; player.style.transform='';
}
function movePlayer(dx) {
  let x = parseInt(player.style.left); x = Math.min(736, Math.max(0, x+dx));
  player.style.left = x+'px';
}
function attack() {
  if (isJump||isBlock||isAttack) return;
  isAttack=true; player.className='sprite attack';
  player.addEventListener('animationend',function h(){ isAttack=false; player.className='sprite idle'; player.removeEventListener('animationend',h); },{once:true});
}
function block() {
  if (isJump||isAttack) return; isBlock=true;
  player.className='sprite defend';
}
function stopBlock() {
  isBlock=false; player.className='sprite idle';
}
function jump() {
  if (isJump||isBlock||isAttack) return;
  isJump=true; player.className='sprite jump';
  player.style.transition='bottom 0.3s ease'; player.style.bottom='80px';
  player.addEventListener('transitionend',function h(){ player.style.bottom='0'; player.addEventListener('transitionend',()=>{ player.style.transition=''; player.className='sprite idle'; isJump=false; },{once:true}); player.removeEventListener('transitionend',h); },{once:true});
}
function updateHUD(){ pFill.style.width=playerHP+'%'; eFill.style.width=enemyHP+'%'; scoreDisp.textContent='Punti: '+score; }
updateHUD();