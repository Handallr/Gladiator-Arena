const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

let player = { x: width/2 - 25, y: height/2 - 25, w: 50, h: 50, speed: 3 };

let keys = {};
window.addEventListener('keydown', e => { keys[e.key] = true; });
window.addEventListener('keyup', e => { keys[e.key] = false; });

document.getElementById('left').addEventListener('mousedown', () => keys['ArrowLeft'] = true);
document.getElementById('left').addEventListener('mouseup', () => keys['ArrowLeft'] = false);
document.getElementById('right').addEventListener('mousedown', () => keys['ArrowRight'] = true);
document.getElementById('right').addEventListener('mouseup', () => keys['ArrowRight'] = false);
document.getElementById('up').addEventListener('mousedown', () => keys['ArrowUp'] = true);
document.getElementById('up').addEventListener('mouseup', () => keys['ArrowUp'] = false);
document.getElementById('down').addEventListener('mousedown', () => keys['ArrowDown'] = true);
document.getElementById('down').addEventListener('mouseup', () => keys['ArrowDown'] = false);
document.getElementById('attack').addEventListener('click', () => console.log('Attack!'));

function update() {
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x + player.w < width) player.x += player.speed;
    if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y + player.h < height) player.y += player.speed;
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
