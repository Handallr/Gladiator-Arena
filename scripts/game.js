import ECS from './ecs.js';
import { Position, Velocity, Input, Health, Attack } from './components.js';
import { inputSystem } from './inputSystem.js';
import { movementSystem } from './movementSystem.js';
import { attackSystem } from './attackSystem.js';
import { EventQueue }    from './eventQueue.js';
import { GAME_SETTINGS } from '../config/settings.js';

const events = new EventQueue();
let lastTime = 0;

// Create player entity
const player = ECS.createEntity();
ECS.addComponent(player, Position, { x: 100, y: GAME_SETTINGS.groundY, w: 50, h: 50 });
ECS.addComponent(player, Velocity, { x: 0, y: 0 });
ECS.addComponent(player, Input,   { left: false, right: false, up: false, down: false, attack: false, jumping: false, crouch: false });
ECS.addComponent(player, Health,  { current: 100, max: 100 });
ECS.addComponent(player, Attack,  { damage: 10, cooldown: 0, targets: [] });

// Setup input listeners
document.addEventListener('keydown', e => {
  const inp = ECS.getComponent(player, Input);
  switch(e.key) {
    case 'ArrowLeft': inp.left = true; break;
    case 'ArrowRight': inp.right = true; break;
    case 'ArrowUp': inp.up = true; break;
    case 'ArrowDown': inp.down = true; break;
    case ' ': inp.attack = true; e.preventDefault(); break;
  }
});
document.addEventListener('keyup', e => {
  const inp = ECS.getComponent(player, Input);
  switch(e.key) {
    case 'ArrowLeft': inp.left = false; break;
    case 'ArrowRight': inp.right = false; break;
    case 'ArrowUp': inp.up = false; break;
    case 'ArrowDown': inp.down = false; break;
    case ' ': inp.attack = false; break;
  }
});

function renderSystem() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, GAME_SETTINGS.canvasWidth, GAME_SETTINGS.canvasHeight);
  // draw player
  const pos = ECS.getComponent(player, Position);
  ctx.fillStyle = 'blue';
  ctx.fillRect(pos.x, pos.y - pos.h, pos.w, pos.h);
  // draw HP
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, 200, 20);
  ctx.fillStyle = 'green';
  const hp = ECS.getComponent(player, Health);
  ctx.fillRect(10, 10, 200 * (hp.current / hp.max), 20);
}

function gameLoop(timestamp) {
  const dt = (timestamp - lastTime) / (1000 / GAME_SETTINGS.fps);
  lastTime = timestamp;
  events.process();
  inputSystem();
  movementSystem(dt);
  attackSystem();
  renderSystem();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
