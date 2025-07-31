// play.js
import { Game } from './game.js';
export class PlayState {
  constructor(sm) {
    this.sm    = sm;
    this.arena = document.getElementById('arena');
    this.game  = new Game();
  }
  enter() {
    this.arena.style.display = 'block';
    this.game.reset();
  }
  exit() {
    this.arena.style.display = 'none';
  }
  update(dt) {
    this.game.update(dt);
    if (this.game.isOver && this.game.isOver()) {
      this.sm.change('gameover');
    }
  }
}
