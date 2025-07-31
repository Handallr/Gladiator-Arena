// main.js
import { StateManager }  from './stateManager.js';
import { MenuState }     from './menu.js';
import { PlayState }     from './play.js';
import { GameOverState } from './gameOver.js';

// Inizializza lo state manager e registra gli stati
const sm = new StateManager();
sm
  .add('menu',     new MenuState(sm))
  .add('play',     new PlayState(sm))
  .add('gameover', new GameOverState(sm));

// Parti dal menu
sm.change('menu');

// Game loop
let last = 0;
function loop(ts) {
  const dt = ts - last;
  last = ts;
  sm.update(dt);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
