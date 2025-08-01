import { loadAssets } from './assetLoader.js';
import ECS from './ecs.js';
import * as C from './components.js';
import { inputSystem } from './inputSystem.js';
import { movementSystem } from './movementSystem.js';
import { attackSystem } from './attackSystem.js';
import { renderSystem } from './renderSystem.js';
import { EventQueue } from './eventQueue.js';
import { GAME_SETTINGS } from '../config/settings.js';

// Create player entity
const player = ECS.createEntity();
ECS.addComponent(player, C.Position, { x:100, y:GAME_SETTINGS.groundY, w:50, h:50 });
ECS.addComponent(player, C.Velocity, { x:0, y:0 });
ECS.addComponent(player, C.Health,   { current:100, max:100 });
ECS.addComponent(player, C.Attack,   { damage:10, cooldown:0, targets:[] });
ECS.addComponent(player, C.Input,    { left:false, right:false, up:false, down:false, jumping:false, crouch:false });
ECS.addComponent(player, C.Render,   { color:'blue' });

const events = new EventQueue();
let lastTime = performance.now();

// Keyboard input
window.addEventListener('keydown', e => {
  const inp = ECS.getComponent(player, C.Input);
  switch(e.key) {
    case 'ArrowLeft': case 'a': inp.left = true; break;
    case 'ArrowRight': case 'd': inp.right = true; break;
    case 'ArrowUp': case 'w': inp.up = true; break;
    case 'ArrowDown': case 's': inp.down = true; break;
    case ' ': inp.attack = true; e.preventDefault(); break;
  }
});
window.addEventListener('keyup', e => {
  const inp = ECS.getComponent(player, C.Input);
  switch(e.key) {
    case 'ArrowLeft': case 'a': inp.left = false; break;
    case 'ArrowRight': case 'd': inp.right = false; break;
    case 'ArrowUp': case 'w': inp.up = false; break;
    case 'ArrowDown': case 's': inp.down = false; break;
    case ' ': inp.attack = false; break;
  }
});

// Health HUD update
function updateHUD() {
  const hp = ECS.getComponent(player, C.Health);
  const fill = document.getElementById('healthFill');
  const text = document.getElementById('healthText');
  const pct = hp.current / hp.max * 100;
  fill.style.width = pct + '%';
  text.textContent = hp.current;
}

// Mobile buttons (example)
document.getElementById('btnLeft').addEventListener('touchstart', () => ECS.getComponent(player, C.Input).left = true);
document.getElementById('btnLeft').addEventListener('touchend',   () => ECS.getComponent(player, C.Input).left = false);
// TODO: add other buttons similarly

loadAssets(() => {
  function loop(ts) {
    const dt = (ts - lastTime) / (1000 / GAME_SETTINGS.fps);
    lastTime = ts;
    events.process();
    inputSystem();
    movementSystem(dt);
    attackSystem();
    renderSystem();
    updateHUD();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
});
