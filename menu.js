export class MenuState {
  constructor(sm) {
    this.sm = sm;
    this.menuEl = document.getElementById('menu');
    this.startBtn = document.getElementById('startBtn');
    this.startBtn.addEventListener('click', () => this.sm.change('play'));
  }
  enter() { this.menuEl.style.display = 'block'; }
  exit()  { this.menuEl.style.display = 'none'; }
}
