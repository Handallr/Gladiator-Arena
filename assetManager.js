export function loadImages(imageMap) {
  const promises = [];
  const images = {};
  for (const key in imageMap) {
    promises.push(new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageMap[key];
      img.onload = () => { images[key] = img; resolve(); };
      img.onerror = reject;
    }));
  }
  return Promise.all(promises).then(() => images);
}
