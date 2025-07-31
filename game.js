export class Game {
  constructor() {
    this.playerEl = document.getElementById('player');
    this.dir = 0;
    this.states = { attack:false };
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup',   this.onKeyUp.bind(this));
  }
  reset() {
    this.playerEl.style.left = '100px';
    this.playerEl.className = 'sprite idle';
  }
  onKeyDown(e) {
    if (e.key==='d') { this.dir=1; this.playerEl.className='sprite walk'; }
    if (e.key==='a') { this.dir=-1; this.playerEl.className='sprite walk'; this.playerEl.style.transform='scaleX(-1)'; }
    if (e.key===' ') this.attack();
  }
  onKeyUp(e) {
    if (['a','d'].includes(e.key)) { this.dir=0; this.playerEl.className='sprite idle'; this.playerEl.style.transform=''; }
  }
  attack() {
    if (this.states.attack) return;
    this.states.attack=true;
    this.playerEl.className='sprite attack';
    this.playerEl.addEventListener('animationend', ()=>{
      this.states.attack=false;
      this.playerEl.className='sprite idle';
    }, {once:true});
  }
  update(dt) {
    const speed=0.2;
    if(this.dir) {
      let x=parseFloat(this.playerEl.style.left)||100;
      x=Math.max(0,Math.min(736,x+this.dir*speed*dt));
      this.playerEl.style.left=x+'px';
    }
  }
  isOver() {
    return false; // implementa la logica di fine partita
  }
}
