
export function generateLevel(numPlatforms, worldMultiplier=1){
  const TILE=32;
  const platforms=[];
  const enemies=[];
  let xCursor=0;
  for(let i=0;i<numPlatforms;i++){
    // random width 4-10 tiles
    const tilesWide = 4 + Math.floor(Math.random()*7); // 4..10
    const w = tilesWide*TILE;
    // gap 64-160 px
    const gap = 64 + Math.floor(Math.random()*96);
    const y = 184 - (Math.random()<0.3 ? 32*Math.floor(Math.random()*3) : 0); // maybe raised
    platforms.push({x:xCursor,y:y,w:w,h:16});
    // place enemy on some platforms
    if(Math.random()<0.4){
      enemies.push({x:xCursor+TILE,y:y-16});
    }
    xCursor += w + gap;
  }
  const level={playerStart:[64,160],platforms,enemies,goal:{x:xCursor-200,y:152}};
  return level;
}
