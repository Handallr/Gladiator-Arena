// main.js
import { StateManager } from './stateManager.js';
import { MenuState }    from './menu.js';
import { PlayState }    from './play.js';
import { GameOverState }from './gameOver.js';

const sm = new StateManager();
sm
  .add('menu',    new MenuState(sm))
  .add('play',    new PlayState(sm))
  .add('gameover',new GameOverState(sm));

sm.change('menu');

let last = 0;
function loop(ts) {
  const dt = ts - last;
  last = ts;
  sm.update(dt);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
