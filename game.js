const player     = document.getElementById("player");
const enemy      = document.getElementById("enemy");
const playerHP   = document.getElementById("player-hp-fill");
const enemyHP    = document.getElementById("enemy-hp-fill");
const scoreEl    = document.getElementById("score");

let playerHealth = 100;
let enemyHealth  = 100;
let score        = 0;

// Aggiorna le barre vita
function updateHealthBars() {
  playerHP.style.width = playerHealth + "%";
  enemyHP.style.width  = enemyHealth  + "%";
}

// Applica un’animazione CSS e poi ritorna a idle
function playAnimation(el, anim) {
  el.classList.remove("walk", "attack", "jump", "defend");
  void el.offsetWidth;  // reset dell’animazione
  el.classList.add(anim);
}

// Gestione input
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowRight":
      player.style.left = (parseInt(player.style.left) + 10) + "px";
      playAnimation(player, "walk");
      break;
    case "ArrowLeft":
      player.style.left = (parseInt(player.style.left) - 10) + "px";
      playAnimation(player, "walk");
      break;
    case " ":
      playAnimation(player, "attack");
      enemyHealth -= 10;
      score       += 10;
      updateHealthBars();
      scoreEl.textContent = "Punti: " + score;
      break;
    case "ArrowUp":
      playAnimation(player, "jump");
      break;
    case "ArrowDown":
      playAnimation(player, "defend");
      break;
  }
});

// Quando l’animazione non è più in corso, torniamo a idle
player.addEventListener("animationend", () => {
  player.classList.remove("walk", "attack", "jump", "defend");
  player.classList.add("idle");
});
