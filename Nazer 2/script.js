document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => document.getElementById('loader').style.display = 'none', 1800);
  setTimeout(() => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }, 1850);
});

// Particles animation
(() => {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const particles = [];
  function rand(a,b){ return Math.random()*(b-a)+a; }
  for(let i=0;i<80;i++){
    particles.push({x:rand(0,w),y:rand(0,h),r:rand(0.6,2.8),vx:rand(-0.22,0.22),vy:rand(-0.06,0.06),alpha:rand(0.04,0.25)});
  }
  window.addEventListener('resize', ()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;});
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<-10)p.x=w+10; if(p.x>w+10)p.x=-10;
      if(p.y<-10)p.y=h+10; if(p.y>h+10)p.y=-10;
      ctx.beginPath();
      ctx.fillStyle='rgba(0,200,255,'+p.alpha+')';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Robot float
(() => {
  const robot=document.getElementById('robot'); let t=0;
  function animate(){ t+=0.02; const y=Math.sin(t)*6; const r=1+Math.sin(t/1.6)*0.01;
    robot.style.transform=`translateY(${y}px) scale(${r})`;
    requestAnimationFrame(animate);
  }
  setTimeout(()=>{requestAnimationFrame(animate)},900);
})();

// Cycle words
(() => {
  const words=['HABITS','PROGRESS','UNFINISHED WORK','DEADLINES'];
  const el=document.getElementById('cycleText');
  let i=0;
  function change(){
    el.style.opacity=0; el.style.transform='translateY(6px)';
    setTimeout(()=>{
      el.textContent=words[i];
      el.style.transition='opacity .42s ease, transform .42s ease';
      el.style.opacity=1; el.style.transform='translateY(0)';
      i=(i+1)%words.length;
    },320);
  }
  setTimeout(change,500);
  setInterval(change,2100);
})();

// Popup
function showPopup(){
  const pb=document.getElementById('popupBack');
  pb.style.display='flex';
  pb.setAttribute('aria-hidden','false');
  setTimeout(()=>pb.style.opacity=1,20);
  setTimeout(()=>{
    pb.style.opacity=0;
    setTimeout(()=>{pb.style.display='none'; pb.setAttribute('aria-hidden','true');},420);
  },1800);
}
document.getElementById('tryBtn').addEventListener('click',showPopup);
document.getElementById('remindBtn').addEventListener('click',showPopup);

// FB SDK
(function(d,s,id){
  var js,fjs=d.getElementsByTagName(s)[0];
  if(d.getElementById(id))return;
  js=d.createElement(s);js.id=id;
  js.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0";
  fjs.parentNode.insertBefore(js,fjs);
}(document,'script','facebook-jssdk'));
