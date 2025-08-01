import ECS from './ecs.js';
import { Velocity, Input } from './components.js';
import { GAME_SETTINGS } from '../config/settings.js';

export function inputSystem() {
  for (const e of ECS.query([Input, Velocity])) {
    const inp = ECS.getComponent(e, Input);
    const vel = ECS.getComponent(e, Velocity);
    vel.x = 0;
    if (inp.left)  vel.x = -GAME_SETTINGS.moveSpeed;
    if (inp.right) vel.x =  GAME_SETTINGS.moveSpeed;
    if (inp.up && !inp.jumping) {
      vel.y = GAME_SETTINGS.jumpForce;
      inp.jumping = true;
    }
    inp.crouch = inp.down && !inp.jumping;
  }
}
