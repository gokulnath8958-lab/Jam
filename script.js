const home = document.getElementById('home');
const memories = document.getElementById('memories');
const grid = document.getElementById('memoryGrid');

document.getElementById('openMemories').addEventListener('click', () => {
  home.classList.remove('active'); memories.classList.add('active');
  home.setAttribute('aria-hidden','true'); memories.setAttribute('aria-hidden','false');
  window.scrollTo({top:0,behavior:'smooth'});
});
document.getElementById('back').addEventListener('click', () => {
  memories.classList.remove('active'); home.classList.add('active');
  memories.setAttribute('aria-hidden','true'); home.setAttribute('aria-hidden','false');
  window.scrollTo({top:0,behavior:'smooth'});
});
for(let i=0;i<36;i++){const s=document.createElement('span');s.className='sparkle';s.textContent=Math.random()>.5?'✦':'·';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.fontSize=(8+Math.random()*13)+'px';s.style.animationDelay=Math.random()*3+'s';document.getElementById('sparkles').appendChild(s);}

function render(data){
  document.getElementById('heroName').textContent=data.partnerName||'My Love';
  document.getElementById('loveLetter').textContent=data.loveLetter||'';
  grid.innerHTML='';
  (data.memories||[]).forEach(m=>{
    const card=document.createElement('article');card.className='card';
    const frame=document.createElement('div');frame.className='frame';
    const img=document.createElement('img');img.src=m.photo;img.alt=m.title||'Our memory';img.loading='lazy';
    const fallback=document.createElement('div');fallback.className='fallback';fallback.innerHTML='<b>♡</b><span>Add your photo here</span>';
    img.onerror=()=>img.style.display='none';img.onload=()=>fallback.style.display='none';frame.append(img,fallback);
    const copy=document.createElement('div');copy.className='copy';
    const date=document.createElement('p');date.className='date';date.textContent=m.date||'A favourite day';
    const title=document.createElement('h3');title.textContent=m.title||'A little memory';
    const caption=document.createElement('p');caption.textContent=m.caption||'';
    copy.append(date,title,caption);card.append(frame,copy);grid.appendChild(card);
  });
}
fetch('memories.json').then(r=>{if(!r.ok)throw Error('JSON not found');return r.json()}).then(render).catch(err=>{console.error(err);document.getElementById('heroName').textContent='My Love';grid.innerHTML='<p>Please open this site with a local server (for example VS Code Live Server) so memories.json can load.</p>';});
