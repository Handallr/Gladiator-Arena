import { loadImages } from './assetManager.js';
import { StateManager } from './stateManager.js';
import { MenuState } from './menu.js';
import { PlayState } from './play.js';
import { GameOverState } from './gameOver.js';

const assets = {
  idle:   'img/gladiatore_idle.png',
  walk:   'img/gladiatore_walk.png',
  attack: 'img/gladiatore_attack.png'
};

loadImages(assets).then(images => {
  const sm = new StateManager();
  sm
    .add('menu', new MenuState(sm))
    .add('play', new PlayState(sm))
    .add('gameover', new GameOverState(sm));

  sm.change('menu');
  let last = 0;
  function loop(ts) {
    const dt = ts - last;
    last = ts;
    sm.update(dt);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}).catch(err => console.error(err));
