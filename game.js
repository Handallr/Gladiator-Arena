export class Game {
  constructor(images) {
    this.images = images;
    this.playerEl = document.getElementById('player');
    this.enemyEl  = document.getElementById('enemy');
    this.scoreDisp = document.getElementById('score');
    this.pFill = document.getElementById('playerHP');
    this.eFill = document.getElementById('enemyHP');

    this.playerEl.style.backgroundImage = `url('${images.player.src}')`;
    this.enemyEl.style.backgroundImage  = `url('${images.enemy.src}')`;
    this.playerEl.style.left = '100px';
    this.enemyEl.style.left  = '736px';

    this.playerHP = 100;
    this.enemyHP = 100;
    this.score = 0;

    this.dir = 0;
    this.states = { jump: false, block: false, attack: false };

    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    const dt = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.update(dt);
    requestAnimationFrame(this.loop.bind(this));
  }

  handleKeyDown(e) {
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) e.preventDefault();
    if (this.states.jump || this.states.attack) return;
    switch(e.key) {
      case 'a': case 'ArrowLeft':  this.dir=-1; this.startWalk(); break;
      case 'd': case 'ArrowRight': this.dir= 1; this.startWalk(); break;
      case 'w': case 'ArrowUp':    this.jump();        break;
      case 's': case 'ArrowDown':  this.block();       break;
      case ' ':                    this.attack();      break;
    }
  }

  handleKeyUp(e) {
    switch(e.key) {
      case 'a': case 'd': case 'ArrowLeft': case 'ArrowRight': this.stopWalk(); break;
      case 's': case 'ArrowDown': this.stopBlock(); break;
    }
  }

  startWalk() {
    if (this.states.block) return;
    this.playerEl.className = 'sprite walk';
    this.playerEl.style.transform = this.dir < 0 ? 'scaleX(-1)' : '';
  }

  stopWalk() {
    this.dir = 0;
    this.playerEl.className = 'sprite idle';
    this.playerEl.style.transform = '';
  }

  movePlayer(dt) {
    const speed = 0.2; // px per ms
    let x = parseFloat(this.playerEl.style.left);
    x = Math.max(0, Math.min(736, x + this.dir * speed * dt));
    this.playerEl.style.left = x + 'px';
  }

  attack() {
    this.states.attack = true;
    this.playerEl.className = 'sprite attack';
    this.playerEl.addEventListener('animationend', () => {
      this.states.attack = false;
      this.playerEl.className = 'sprite idle';
    }, { once: true });
  }

  block() {
    this.states.block = true;
    this.playerEl.className = 'sprite defend';
  }

  stopBlock() {
    this.states.block = false;
    this.playerEl.className = 'sprite idle';
  }

  jump() {
    this.states.jump = true;
    this.playerEl.className = 'sprite jump';
    this.playerEl.style.transition = 'bottom 0.3s ease';
    this.playerEl.style.bottom = '80px';
    this.playerEl.addEventListener('transitionend', () => {
      this.playerEl.style.bottom = '0';
      this.playerEl.addEventListener('transitionend', () => {
        this.playerEl.style.transition = '';
        this.playerEl.className = 'sprite idle';
        this.states.jump = false;
      }, { once: true });
    }, { once: true });
  }

  update(dt) {
    if (this.dir !== 0) {
      this.movePlayer(dt);
    }
    this.updateHUD();
  }

  updateHUD() {
    this.pFill.style.width = this.playerHP + '%';
    this.eFill.style.width = this.enemyHP + '%';
    this.scoreDisp.textContent = 'Punti: ' + this.score;
  }
}
