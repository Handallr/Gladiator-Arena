// menu.js
export class MenuState {
  constructor(sm) {
    this.sm = sm;
    this.el = document.getElementById('menu');
    this.btn = document.getElementById('startBtn');
    this.btn.addEventListener('click', () => this.sm.change('play'));
  }
  enter() { this.el.style.display = 'block'; }
  exit()  { this.el.style.display = 'none';  }
}
