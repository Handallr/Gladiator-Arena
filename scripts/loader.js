// scripts/loader.js
// Simple level loader: fetch JSON level definition and return it
export async function loadLevel(path){
  const res = await fetch(path);
  if(!res.ok){
    throw new Error(`Cannot fetch ${path}: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}
