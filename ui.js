
import Game from './lib/game.js';
Game.onStateChange = (state)=>{
  const overlay=document.getElementById('overlay');
  if(state==='level-start-1') overlay.textContent='Livello 1';
  if(state==='level-start-2') overlay.textContent='Livello 2';
  if(state==='dead') overlay.textContent='Morto';
  if(state==='victory') overlay.textContent='VITTORIA';
  overlay.style.display='block';
  if(state==='victory') return;
  setTimeout(()=>{overlay.style.display='none';}, 1500);
};
