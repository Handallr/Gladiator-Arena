
// scripts/loader.js
// Simplest async JSON level loader.
// Usage: await loadLevel('levels/level1.json');
//
// Assumes global arrays: platforms, enemies, goals, spikes and global objects Player, Platform, Enemy, Goal.
// Resets player position and camera.
async function loadLevel(file) {
  const response = await fetch(file);
  const data = await response.json();

  // reset world arrays
  platforms.length = 0;
  enemies.length = 0;
  goals.length = 0;
  spikes.length = 0;

  // populate
  data.platforms?.forEach(p => platforms.push(new Platform(p.x, p.y, p.w, p.h)));
  data.enemies?.forEach(e => enemies.push(new Enemy(e.x, e.y, e.dir)));
  data.goals?.forEach(g => goals.push(new Goal(g.x, g.y)));
  data.spikes?.forEach(s => spikes.push({x:s.x, y:s.y, w:s.w, h:s.h}));

  // player start
  player.x = data.playerStart[0];
  player.y = data.playerStart[1];
  player.vx = 0;
  player.vy = 0;

  // reset camera
  cameraX = 0;
}

// export to global
window.loadLevel = loadLevel;
