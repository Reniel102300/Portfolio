const body=document.body;
const nav=document.getElementById('navMenu');
const menuToggle=document.getElementById('menuToggle');
const themeToggle=document.getElementById('themeToggle');

menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='dark'){body.classList.add('dark');themeToggle.textContent='☾';}
themeToggle.addEventListener('click',()=>{
  body.classList.toggle('dark');
  const dark=body.classList.contains('dark');
  themeToggle.textContent=dark?'☾':'☀';
  localStorage.setItem('portfolio-theme',dark?'dark':'light');
});

const words=['IT Professional','Web Developer','Tech Enthusiast','Problem Solver'];
let wordIndex=0,charIndex=0,deleting=false;
const typed=document.getElementById('typed');
function type(){
  const word=words[wordIndex];
  typed.textContent=word.substring(0,charIndex);
  if(!deleting && charIndex<word.length){charIndex++;setTimeout(type,85)}
  else if(!deleting){deleting=true;setTimeout(type,1300)}
  else if(charIndex>0){charIndex--;setTimeout(type,45)}
  else{deleting=false;wordIndex=(wordIndex+1)%words.length;setTimeout(type,300)}
}
type();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('nav a');
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
});

const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
window.addEventListener('mousemove',e=>{
  dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';
  ring.style.left=(e.clientX-12)+'px';ring.style.top=(e.clientY-12)+'px';
});
document.querySelectorAll('a,button,.skill-card,.project-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.style.transform='scale(1.5)');
  el.addEventListener('mouseleave',()=>ring.style.transform='scale(1)');
});

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('name').value.trim();
  const status=document.getElementById('formStatus');
  status.textContent=`Thanks, ${name}! Your message is ready to send.`;
  status.style.color='#ffd166';
  e.target.reset();
});

document.getElementById('year').textContent=new Date().getFullYear();
