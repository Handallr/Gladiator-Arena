import ECS from './ecs.js';
import { Attack, Health } from './components.js';

export function attackSystem() {
  for (const e of ECS.query([Attack])) {
    const atk = ECS.getComponent(e, Attack);
    if (!atk.cooldown) continue;
    atk.targets.forEach(t => {
      const hp = ECS.getComponent(t, Health);
      if (hp) hp.current = Math.max(0, hp.current - atk.damage);
    });
    atk.cooldown -= 1;
  }
}
