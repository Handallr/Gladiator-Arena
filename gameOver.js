export class GameOverState {
  constructor(sm) {
    this.sm = sm;
    this.el = document.getElementById('gameOver');
    this.btn = document.getElementById('restartBtn');
    this.btn.addEventListener('click', () => this.sm.change('play'));
  }
  enter() { this.el.style.display = 'block'; }
  exit()  { this.el.style.display = 'none'; }
}
