
// scripts/main.js
// Simple 2D platformer core with level loading via loader.js
// Canvas & context
const canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 400;
const ctx = canvas.getContext('2d');

// Globals
let cameraX = 0;
const GRAVITY = 0.5;
const JUMP_VELOCITY = -12;

// Input
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Touch buttons optional (look for elements with ids)
['left','right','jump'].forEach(id=>{
  const btn = document.getElementById(id);
  if(btn){
    btn.onpointerdown = () => keys[id] = true;
    btn.onpointerup = () => keys[id] = false;
    btn.onpointerleave = () => keys[id] = false;
  }
});

// Classes
class Platform{
  constructor(x,y,w,h){
    this.x=x;this.y=y;this.w=w;this.h=h;
  }
  draw(){
    ctx.fillStyle='#654321';
    ctx.fillRect(this.x-cameraX,this.y,this.w,this.h);
  }
}

class Goal{
  constructor(x,y){
    this.x=x;this.y=y;this.w=16;this.h=32;
  }
  draw(){
    ctx.fillStyle='lime';
    ctx.fillRect(this.x-cameraX,this.y,this.w,this.h);
  }
}

class Enemy{
  constructor(x,y,dir=-1){
    this.x=x;this.y=y;this.w=16;this.h=16;
    this.vx=dir*1.2;
    this.vy=0;
    this.alive=true;
  }
  update(){
    if(!this.alive) return;
    this.x += this.vx;
    // gravity
    this.vy += GRAVITY;
    this.y += this.vy;

    // simple ground collision
    platforms.forEach(p=>{
      if (this.x+this.w > p.x && this.x < p.x+p.w && 
          this.y+this.h > p.y && this.y+this.h < p.y+p.h){
        this.y = p.y - this.h;
        this.vy = 0;
      }
    });

    // reverse direction at platform edges
    const underFoot = platforms.find(p=> this.x+this.w/2 > p.x && this.x+this.w/2 < p.x+p.w && Math.abs((this.y+this.h)-p.y) < 2);
    if(!underFoot){
      this.vx *= -1;
    }
  }
  draw(){
    if(!this.alive) return;
    ctx.fillStyle='orange';
    ctx.fillRect(this.x-cameraX,this.y,this.w,this.h);
  }
}

class Player{
  constructor(x,y){
    this.x=x;this.y=y;this.w=16;this.h=24;
    this.vx=0;this.vy=0;
  }
  update(){
    // horiz input
    if(keys['ArrowLeft']||keys['left']) this.vx = -3;
    else if(keys['ArrowRight']||keys['right']) this.vx = 3;
    else this.vx = 0;

    // jump
    if((keys['ArrowUp']||keys['jump']||keys[' ']) && this.onGround()){
      this.vy = JUMP_VELOCITY;
    }

    // gravity
    this.vy += GRAVITY;

    // move X
    this.x += this.vx;

    // horizontal collision with platforms
    platforms.forEach(p=>{
      if (this.x+this.w > p.x && this.x < p.x+p.w &&
          this.y+this.h > p.y && this.y < p.y+p.h){
        if(this.vx>0) this.x = p.x - this.w;
        if(this.vx<0) this.x = p.x + p.w;
      }
    });

    // move Y
    this.y += this.vy;

    // vertical collision
    let grounded = false;
    platforms.forEach(p=>{
      if (this.x+this.w > p.x && this.x < p.x+p.w &&
          this.y+this.h > p.y && this.y < p.y+p.h){
        if(this.vy>0){
          this.y = p.y - this.h;
          this.vy = 0;
          grounded = true;
        } else if(this.vy<0){
          this.y = p.y + p.h;
          this.vy = 0;
        }
      }
    });

    // spikes check
    spikes.forEach(s=>{
      if (this.x+this.w > s.x && this.x < s.x+s.w &&
          this.y+this.h > s.y && this.y < s.y+s.h){
        resetLevel();
      }
    });

    // bottom fall
    if(this.y > canvas.height) resetLevel();

    // camera
    if(this.x - cameraX > canvas.width*0.4){
      cameraX = this.x - canvas.width*0.4;
    }
  }

  onGround(){
    return platforms.some(p=> this.x+this.w > p.x && this.x < p.x+p.w && Math.abs((this.y+this.h) - p.y) < 1);
  }

  draw(){
    ctx.fillStyle='skyblue';
    ctx.fillRect(this.x-cameraX,this.y,this.w,this.h);
  }
}

// Arrays
const platforms = [];
const enemies = [];
const goals = [];
const spikes = [];

// levels
const levelFiles = ['levels/level1.json','levels/level2.json'];
let currentLevel = 0;

const player = new Player(0,0);

async function start(){
  await loadLevel(levelFiles[currentLevel]);
  requestAnimationFrame(loop);
}

function nextLevel(){
  currentLevel = (currentLevel+1) % levelFiles.length;
  loadLevel(levelFiles[currentLevel]);
}

function resetLevel(){
  loadLevel(levelFiles[currentLevel]);
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}

function update(){
  player.update();
  enemies.forEach(e=>{
    e.update();
    // player-enemy collision
    if(e.alive && AABB(player,e)){
      const stomp = player.vy>0 && (player.y + player.h - e.y) < 10;
      if(stomp){
        e.alive=false;
        player.vy = JUMP_VELOCITY*0.6;
      }else{
        resetLevel();
      }
    }
  });

  // goal
  goals.forEach(g=>{
    if(AABB(player,g)){
      nextLevel();
    }
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // background
  ctx.fillStyle='#a0d8ff';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  platforms.forEach(p=>p.draw());
  spikes.forEach(s=>{
    ctx.fillStyle='red';
    ctx.fillRect(s.x-cameraX,s.y,s.w,s.h);
  });
  player.draw();
  enemies.forEach(e=>e.draw());
  goals.forEach(g=>g.draw());
}

function AABB(a,b){
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

start();
