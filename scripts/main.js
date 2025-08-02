
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// map buttons to key names
const btnMap = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  jump: ' ',
  attack: 'x'
};

for(const id in btnMap){
  const btn = document.getElementById(id);
  const keyName = btnMap[id];
  btn.addEventListener('pointerdown', ()=> keys[keyName] = true);
  btn.addEventListener('pointerup', ()=> keys[keyName] = false);
}

let cameraX = 0;

class Entity{
  constructor(x,y,w,h){this.x=x;this.y=y;this.w=w;this.h=h;}
  get left(){return this.x;}
  get right(){return this.x+this.w;}
  get top(){return this.y;}
  get bottom(){return this.y+this.h;}
  intersects(o){
    return this.right>o.left && this.left<o.right && this.bottom>o.top && this.top<o.bottom;
  }
}

class Player extends Entity{
  constructor(x,y){
    super(x,y,32,32);
    this.vx=0;
    this.vy=0;
    this.onGround=false;
    this.speed=0.4;
    this.jumpVel=-10;
  }
  update(dt, platforms){
    if(keys['ArrowLeft']) this.vx = Math.max(this.vx - this.speed*dt, -3);
    else if(keys['ArrowRight']) this.vx = Math.min(this.vx + this.speed*dt, 3);
    else this.vx *= 0.8;

    if(keys[' '] && this.onGround){
      this.vy = this.jumpVel;
      this.onGround=false;
    }

    this.vy += 0.5*dt;

    this.x += this.vx;
    for(const p of platforms){
      if(this.intersects(p)){
        if(this.vx>0) this.x = p.left - this.w;
        if(this.vx<0) this.x = p.right;
      }
    }

    this.y += this.vy;
    this.onGround=false;
    for(const p of platforms){
      if(this.intersects(p)){
        if(this.vy>0){
          this.y = p.top - this.h;
          this.vy = 0;
          this.onGround=true;
        } else if(this.vy<0){
          this.y = p.bottom;
          this.vy = 0;
        }
      }
    }
  }
  draw(){
    ctx.fillStyle='cyan';
    ctx.fillRect(this.x - cameraX, this.y, this.w, this.h);
  }
}

class Enemy extends Entity{
  constructor(x,y){
    super(x,y,32,32);
    this.vx=-1;
  }
  update(dt, platforms){
    this.x += this.vx;

    // simple direction change when falling off platform
    const footX = this.vx > 0 ? this.right + 1 : this.left - 1;
    const footY = this.bottom + 1;

    let support=false;
    for(const p of platforms){
      if(footX > p.left && footX < p.right && footY >= p.top && footY <= p.bottom + 5){
        support=true;break;
      }
    }
    if(!support){
      this.vx *= -1;
    }
  }
  draw(){
    ctx.fillStyle='orange';
    ctx.fillRect(this.x - cameraX, this.y, this.w, this.h);
  }
}

class Platform extends Entity{
  constructor(x,y,w,h){super(x,y,w,h);}
  draw(){
    ctx.fillStyle='brown';
    ctx.fillRect(this.x - cameraX, this.y, this.w, this.h);
  }
}

const platforms=[
  new Platform(0,350,1600,50),
  new Platform(200,280,100,20),
  new Platform(400,220,100,20),
  new Platform(600,160,100,20),
];
const enemies=[
  new Enemy(500,318),
  new Enemy(900,318),
];

let player = new Player(50,318);

let last=0;
function loop(timestamp){
  const dt = (timestamp-last)/16;
  last=timestamp;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

function update(dt){
  player.update(dt, platforms);
  enemies.forEach(e=>e.update(dt, platforms));

  for(const e of enemies){
    if(player.intersects(e)){
      if(player.vy>0 && player.bottom - e.top < 20){
        e.y = 10000;
        player.vy = player.jumpVel*0.6;
      }else{
        resetLevel();
        return;
      }
    }
  }

  if(player.x - cameraX > canvas.width*0.4){
    cameraX = player.x - canvas.width*0.4;
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#87CEEB';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  platforms.forEach(p=>p.draw());
  enemies.forEach(e=>e.draw());
  player.draw();
}

function resetLevel(){
  cameraX=0;
  player = new Player(50,318);
}

requestAnimationFrame(loop);
