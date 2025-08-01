// Gestione input tastiera e mobile
document.addEventListener('keydown', e => handleKey(e, true));
document.addEventListener('keyup',   e => handleKey(e, false));

const inputState = {
  left: false,
  right: false,
  up: false,
  down: false,
  attack: false,
};

function handleKey(e, isDown) {
  switch (e.key) {
    case 'ArrowLeft': case 'a': inputState.left = isDown; break;
    case 'ArrowRight': case 'd': inputState.right = isDown; break;
    case 'ArrowUp': case 'w': inputState.up = isDown; break;
    case 'ArrowDown': case 's': inputState.down = isDown; break;
    case ' ': inputState.attack = isDown; e.preventDefault(); break;
  }
}

// Mobile buttons
['Left','Right','Up','Down','attack'].forEach(name => {
  const btn = document.getElementById('btn' + (name==='attack'? 'Attack' : name));
  if (btn) {
    btn.addEventListener('touchstart', e => { inputState[name.toLowerCase()] = true; e.preventDefault(); });
    btn.addEventListener('touchend',   e => { inputState[name.toLowerCase()] = false; e.preventDefault(); });
  }
});
