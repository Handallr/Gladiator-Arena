import ECS from './ecs.js';
import { Position, Velocity } from './components.js';
import { GAME_SETTINGS } from '../config/settings.js';

export function movementSystem(dt) {
  for (const e of ECS.query([Position, Velocity])) {
    const pos = ECS.getComponent(e, Position);
    const vel = ECS.getComponent(e, Velocity);
    vel.y += GAME_SETTINGS.gravity * dt;
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
    pos.x = Math.max(0, Math.min(GAME_SETTINGS.canvasWidth - pos.w, pos.x));
    if (pos.y > GAME_SETTINGS.groundY) {
      pos.y = GAME_SETTINGS.groundY;
      vel.y = 0;
      const inp = ECS.getComponent(e, 'input');
      if (inp) inp.jumping = false;
    }
  }
}
