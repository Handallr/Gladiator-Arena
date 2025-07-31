import { loadImages } from './assetManager.js';
import { Game } from './game.js';

const assets = {
  player: 'img/gladiatore_sprite.png',
  enemy:  'img/nemico_sprite.png'
};

loadImages(assets).then(images => {
  const game = new Game(images);
  game.start();
}).catch(err => console.error('Errore caricamento asset:', err));
