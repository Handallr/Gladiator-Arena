
document.addEventListener('DOMContentLoaded',()=>{
  const btnL=document.getElementById('btn-left');
  const btnR=document.getElementById('btn-right');
  const btnJ=document.getElementById('btn-jump');
  if(!btnL) return;
  const down=(key)=>()=>window.dispatchEvent(new KeyboardEvent('keydown',{code:key}));
  const up=(key)=>()=>window.dispatchEvent(new KeyboardEvent('keyup',{code:key}));
  btnL.onpointerdown=down('ArrowLeft'); btnL.onpointerup=up('ArrowLeft');
  btnR.onpointerdown=down('ArrowRight');btnR.onpointerup=up('ArrowRight');
  btnJ.onpointerdown=down('ArrowUp');   btnJ.onpointerup=up('ArrowUp');
});
