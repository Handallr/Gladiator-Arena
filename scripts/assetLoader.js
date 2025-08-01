// Loader per immagini e asset
const images = {};
const assetsToLoad = {
  player: 'assets/sprites/gladiator/walk_0.png', // update paths as needed
  // aggiungi altri asset se servono, es. 'enemy': 'assets/enemy/enemy_spritesheet.png',
};

function loadAssets(callback) {
  const keys = Object.keys(assetsToLoad);
  let loaded = 0;
  keys.forEach(key => {
    const img = new Image();
    img.src = assetsToLoad[key];
    img.onload = () => {
      images[key] = img;
      loaded++;
      if (loaded === keys.length) callback();
    };
  });
}
