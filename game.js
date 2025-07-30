
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const playerHP = document.getElementById("player-hp-fill");
const enemyHP = document.getElementById("enemy-hp-fill");
const scoreEl = document.getElementById("score");

let playerHealth = 100;
let enemyHealth = 100;
let score = 0;
let isJumping = false;
let isDefending = false;

function updateHealthBars() {
  playerHP.style.width = playerHealth + "%";
  enemyHP.style.width = enemyHealth + "%";
}

function playAnimation(element, type) {
  element.style.animation = type + " 0.4s steps(1) forwards";
  setTimeout(() => {
    element.style.animation = "";
  }, 400);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    player.style.left = parseInt(player.style.left || 100) + 20 + "px";
    playAnimation(player, "walk");
  }

  if (e.key === " ") {
    playAnimation(player, "attack");
    enemyHealth -= 10;
    score += 10;
    updateHealthBars();
    scoreEl.textContent = "Punti: " + score;

    if (enemyHealth <= 0) {
      alert("Nemico sconfitto!");
      enemyHealth = 100;
      score += 100;
    }
  }

  if (e.key === "ArrowUp" && !isJumping) {
    isJumping = true;
    playAnimation(player, "jump");
    setTimeout(() => isJumping = false, 600);
  }

  if (e.key === "ArrowDown") {
    isDefending = true;
    playAnimation(player, "defend");
    setTimeout(() => isDefending = false, 600);
  }
});
