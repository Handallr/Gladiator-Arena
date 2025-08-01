import ECS from './ecs.js';
import { Position, Render, Health } from './components.js';
import { GAME_SETTINGS } from '../config/settings.js';

export function renderSystem() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, GAME_SETTINGS.canvasWidth, GAME_SETTINGS.canvasHeight);
  for (const e of ECS.query([Position, Render])) {
    const pos = ECS.getComponent(e, Position);
    const rend = ECS.getComponent(e, Render);
    ctx.fillStyle = rend.color || 'blue';
    ctx.fillRect(pos.x, pos.y - pos.h, pos.w, pos.h);
  }
  const barW = 50;
}
