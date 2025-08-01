import Entity from './entity.js';
import Sprite from './sprite.js';

export default class Breakable extends Entity {
  constructor(tileset, xPos, yPos, width, height) {
    const sprite = new Sprite(tileset, 18, 0, 18, 18);
    super('breakable', sprite, xPos, yPos, width, height);
  }
}