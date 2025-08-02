
function loadData(data){
  platforms=[];enemies=[];goals=[];
  if(data.platforms) data.platforms.forEach(p=>platforms.push(new Platform(p.x,p.y,p.w,p.h)));
  if(data.enemies) data.enemies.forEach(e=>enemies.push(new Enemy(e.x,e.y)));
  if(data.goal) goals=[new Goal(data.goal.x,data.goal.y)];
  player.x=data.playerStart?data.playerStart[0]:64;
  player.y=data.playerStart?data.playerStart[1]:160;
  player.vx=player.vy=0;
  cameraX=0;
}

// scripts/main.js
import { loadLevel } from './loader.js';
import { generateLevel } from './levelGenerator.js';
// Procedural levels cache
const procLevels = [
  generateLevel(12), // livello 1: 12 piattaforme
  generateLevel(24)  // livello 2: 24 piattaforme
];

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// ===== Constants
const GRAVITY = 0.5;
const MOVE_ACC = 0.6;
const MAX_VX = 4;
const JUMP_VEL = -12;

// ===== Global arrays
let platforms = [];
let enemies   = [];
let goals     = [];
let spikes    = [];

// ===== Camera
let cameraX = 0;

// camera thresholds
const CAMERA_LEFT  = canvas.width * 0.33;   // move forward threshold
const CAMERA_RIGHT = canvas.width * 0.33;   // backtrack threshold

function updateCamera(){
  if(player.x - cameraX > CAMERA_LEFT){
    cameraX = player.x - CAMERA_LEFT;
  }
  if(player.x - cameraX < CAMERA_RIGHT){
    cameraX = player.x - CAMERA_RIGHT;
  }
}



// ===== Classes
class RectEntity{
    constructor(x,y,w,h){ this.x=x; this.y=y; this.w=w; this.h=h; }
    draw(color='#0ff'){
        ctx.fillStyle=color;
        ctx.fillRect(this.x-cameraX, this.y, this.w, this.h);
    }
}
class Player extends RectEntity{
    constructor(x,y){
        super(x,y,20,28);
        this.vx=0; this.vy=0;
        this.onGround=false;
    }
    update(keys){
        // horizontal
        if(keys.left)  this.vx=Math.max(this.vx - MOVE_ACC, -MAX_VX);
        if(keys.right) this.vx=Math.min(this.vx + MOVE_ACC,  MAX_VX);
        if(!keys.left && !keys.right) this.vx*=0.8;
        // jump
        if(keys.jump && this.onGround){
            this.vy = JUMP_VEL;
            this.onGround=false;
        }
        // gravity
        this.vy += GRAVITY;

        // move X
        this.x += this.vx;
        // collision X with platforms
        for(const p of platforms){
            if(AABB(this,p)){
                if(this.vx>0) this.x = p.x - this.w;
                if(this.vx<0) this.x = p.x + p.w;
                this.vx=0;
            }
        }
        // move Y
        this.y += this.vy;
        this.onGround=false;
        for(const p of platforms){
            if(AABB(this,p)){
                if(this.vy>0){ // falling
                    this.y = p.y - this.h;
                    this.onGround=true;
                } else if(this.vy<0){
                    this.y = p.y + p.h;
                }
                this.vy=0;
            }
        }

        // death by falling
        if(this.y > canvas.height) resetLevel();
    }
    draw(){
        super.draw('#00f');
    }
}
class Platform extends RectEntity{
    constructor(x,y,w,h){ super(x,y,w,h); }
    draw(){ super.draw('#8b692f'); }
}
class Enemy extends RectEntity{
    constructor(x,y){
        super(x,y,18,18);
        this.vx = -1.2;
        this.vy = 0;
        this.alive = true;
    }
    update(){
        if(!this.alive) return;

        // gravity
        this.vy = Math.min(this.vy + GRAVITY, 8);
        this.y += this.vy;

        // death if fall off screen
        if(this.y > canvas.height){ this.alive = false; return; }

        // landing on platforms (tolerance 4px)
        let onGround = false;
        for(const p of platforms){
            if (this.y + this.h > p.y && this.y + this.h < p.y + 4 &&
                this.x + this.w > p.x && this.x < p.x + p.w) {
                this.y = p.y - this.h;
                this.vy = 0;
                onGround = true;
            }
        }

        if(onGround){
            this.x += this.vx;

            // edge detection
            const aheadX = this.vx > 0 ? this.x + this.w : this.x - 1;
            const hasFloorAhead = platforms.some(p =>
                aheadX > p.x && aheadX < p.x + p.w &&
                this.y + this.h === p.y
            );
            if(!hasFloorAhead){
                this.vx *= -1;
            }
        }
    }
    draw(){ super.draw('#f60'); }
}

class Goal extends RectEntity{
    constructor(x,y){
        super(x,y,16,32);
    }
    draw(){
        // pole
        ctx.fillStyle = '#999';
        ctx.fillRect(this.x - cameraX + 6, this.y - 40, 4, 40);
        // flag
        super.draw('#0f0');
    }
}

class Spike extends RectEntity{
    constructor(x,y,w,h){ super(x,y,w,h); }
    draw(){ super.draw('#f0f'); }
}

function AABB(a,b){
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
}

// ===== Input
const keys={left:false,right:false,jump:false};
window.addEventListener('keydown',e=>{
    if(e.code==='ArrowLeft') keys.left=true;
    if(e.code==='ArrowRight')keys.right=true;
    if(e.code==='ArrowUp')   keys.jump=true;
});
window.addEventListener('keyup',e=>{
    if(e.code==='ArrowLeft') keys.left=false;
    if(e.code==='ArrowRight')keys.right=false;
    if(e.code==='ArrowUp')   keys.jump=false;
});

// touch buttons
document.getElementById('btn-left').onpointerdown = ()=>keys.left=true;
document.getElementById('btn-left').onpointerup   = ()=>keys.left=false;
document.getElementById('btn-right').onpointerdown= ()=>keys.right=true;
document.getElementById('btn-right').onpointerup  = ()=>keys.right=false;
document.getElementById('btn-jump').onpointerdown = ()=>keys.jump=true;
document.getElementById('btn-jump').onpointerup   = ()=>keys.jump=false;

// ===== Level list
const levelFiles = ['proc1','proc2'];
let currentLevel = 0;

// ===== Player instance
const player = new Player(32,160);

// ===== Game loop
function update(){
      updateCamera();
player.update(keys);
    enemies.filter(obj => obj.x + obj.w > cameraX && obj.x < cameraX + canvas.width).forEach(e=>e.update());

    // player-enemy collision
    enemies.forEach(e=>{
        if(!e.alive) return;
        if(AABB(player,e)){
            const stomp = player.vy>0 && (player.y + player.h - e.y) < 10;
            if(stomp){
                e.alive=false;
                player.vy = JUMP_VEL*0.6;
            }else{
                resetLevel();
            }
        }
    });

    // player-goal
    for(const g of goals){
        if(AABB(player,g)){
            nextLevel();
            return;
        }
    // auto-finish if all enemies defeated
    if (enemies.every(e => !e.alive)) {
        nextLevel();
        return;
    }

    }

    // camera follow
    if(player.x - cameraX > canvas.width*0.4){
        cameraX = player.x - canvas.width*0.4;
    }
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    platforms.filter(obj => obj.x + obj.w > cameraX && obj.x < cameraX + canvas.width).forEach(p=>p.draw());
    spikes.filter(obj => obj.x + obj.w > cameraX && obj.x < cameraX + canvas.width).forEach(s=>s.draw());
    goals.filter(obj => obj.x + obj.w > cameraX && obj.x < cameraX + canvas.width).forEach(g=>g.draw());
    enemies.forEach(e=>e.alive && e.draw());
    player.draw();
}
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// ===== Level management
async function start(){
    await buildLevel(levelFiles[currentLevel]);
    requestAnimationFrame(gameLoop);
}
async function buildLevel(file){
  if(file==='proc1'||file==='proc2'){
    const data = file==='proc1'? procLevels[0]: procLevels[1];
    loadData(data);
    return;
  }

    const data = await loadLevel(file);
    // clear arrays
    platforms=[]; enemies=[]; goals=[]; spikes=[];
    // build
    if(data.platforms) data.platforms.forEach(p=>platforms.push(new Platform(p.x,p.y,p.w,p.h)));
    if(data.enemies)   data.enemies.forEach(e=>enemies.push(new Enemy(e.x,e.y)));
    if(data.goals)     data.goals.forEach(g=>goals.push(new Goal(g.x,g.y)));
    if(data.spikes)    data.spikes.forEach(s=>spikes.push(new Spike(s.x,s.y,s.w,s.h)));
    if(data.playerStart){
        player.x = data.playerStart[0];
        player.y = data.playerStart[1];
        player.vx = 0; player.vy=0;
    }
    cameraX=0;
}
function resetLevel(){
    buildLevel(levelFiles[currentLevel]);
}
function nextLevel(){
    currentLevel = (currentLevel+1)%levelFiles.length;
    buildLevel(levelFiles[currentLevel]);
}

// ===== Start!
start();
