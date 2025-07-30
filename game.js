const player = document.getElementById('player');
const enemy = document.getElementById('enemy');

let playerPos = 100;
const speed = 10;
let attacking = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    playerPos += speed;
  } else if (e.key === 'ArrowLeft') {
    playerPos -= speed;
  } else if (e.key === ' ') {
    attack();
  }

  // limita i confini
  playerPos = Math.max(0, Math.min(550, playerPos));
  player.style.left = playerPos + 'px';
});

function attack() {
  if (attacking) return;
  attacking = true;
  player.style.backgroundColor = 'orange'; // animazione attacco

  // controlla se è vicino al nemico
  const enemyPos = parseInt(enemy.style.left);
  if (Math.abs(playerPos - enemyPos) < 60) {
    enemy.style.display = 'none'; // nemico eliminato
    alert("💥 Nemico sconfitto!");
  }

  setTimeout(() => {
    player.style.backgroundColor = 'darkred';
    attacking = false;
  }, 300);
}
