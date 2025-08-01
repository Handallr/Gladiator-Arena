const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

// Ground level
const groundY = height - 50; // 50px from bottom

let player = {
    x: width/2 - 25,
    y: 0,
    w: 50,
    h: 50,
    speed: 3,
    vy: 0,
    gravity: 0.5
};

let keys = {};
window.addEventListener('keydown', e => { keys[e.key] = true; });
window.addEventListener('keyup', e => { keys[e.key] = false; });

document.getElementById('left').addEventListener('mousedown', () => keys['ArrowLeft'] = true);
document.getElementById('left').addEventListener('mouseup', () => keys['ArrowLeft'] = false);
document.getElementById('right').addEventListener('mousedown', () => keys['ArrowRight'] = true);
document.getElementById('right').addEventListener('mouseup', () => keys['ArrowRight'] = false);
document.getElementById('attack').addEventListener('click', () => console.log('Attack!'));

function update() {
    // Horizontal movement
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x + player.w < width) player.x += player.speed;

    // Apply gravity
    player.vy += player.gravity;
    player.y += player.vy;

    // Ground collision
    if (player.y + player.h > groundY) {
        player.y = groundY - player.h;
        player.vy = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw ground
    ctx.fillStyle = '#444';
    ctx.fillRect(0, groundY, width, height - groundY);

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
