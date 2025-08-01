const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 100,
    y: 300,
    width: 50,
    height: 50,
    color: "red",
    velocityY: 0,
    speed: 3,
    isJumping: false,
    isAttacking: false,
    hp: 100
};

const gravity = 0.5;
let keys = {};

// Mobile input handlers
document.getElementById("leftBtn").addEventListener("touchstart", () => keys["ArrowLeft"] = true);
document.getElementById("leftBtn").addEventListener("touchend", () => keys["ArrowLeft"] = false);
document.getElementById("rightBtn").addEventListener("touchstart", () => keys["ArrowRight"] = true);
document.getElementById("rightBtn").addEventListener("touchend", () => keys["ArrowRight"] = false);
document.getElementById("jumpBtn").addEventListener("touchstart", () => {
    if (!player.isJumping) {
        player.velocityY = -10;
        player.isJumping = true;
    }
});
document.getElementById("attackBtn").addEventListener("touchstart", () => {
    if (!player.isAttacking) {
        player.isAttacking = true;
        setTimeout(() => player.isAttacking = false, 300);
    }
});

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function update() {
    if (keys["ArrowRight"]) player.x += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;

    // Jump physics
    player.velocityY += gravity;
    player.y += player.velocityY;
    if (player.y > 300) {
        player.y = 300;
        player.velocityY = 0;
        player.isJumping = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw HP
    ctx.fillStyle = "white";
    ctx.fillText("HP: " + player.hp, 10, 20);

    // Draw player
    ctx.fillStyle = player.isAttacking ? "orange" : player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
