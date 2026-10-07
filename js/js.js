(function(){
var P=location.pathname.split('/').pop()||'index.html';
var links=[['index.html','Início'],['projects.html','Projetos'],['resume.html','Sobre mim'],['index.html#contato','Contato']];
var nav='<div class="progress"></div><nav class="nav"><div class="wrap"><a class="brand" href="index.html">Joe Nicolas<i>.</i></a><button class="burger" aria-label="Abrir menu"><i class="bi bi-list"></i></button><ul>'+links.map(function(l){return '<li><a href="'+l[0]+'"'+(l[0]===P?' class="on"':'')+'>'+l[1]+'</a></li>'}).join('')+'</ul></div></nav><div class="cur"></div>';
document.body.insertAdjacentHTML('afterbegin',nav);
var cta='<section class="cta" id="contato"><div class="wrap"><h2>Entre em contato para conversarmos!</h2><div class="icons"><a href="https://wa.me/5511910497400" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a><a href="https://www.linkedin.com/in/joe-nicolas/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a><a href="mailto:joe.nrlsousa09@gmail.com" aria-label="E-mail"><i class="bi bi-envelope-fill"></i></a></div></div></section><footer class="foot"><div class="wrap"><span>© 2026 Joe Nicolas · Design Gráfico e UX/UI</span><span>Significando a sua marca</span></div></footer>';
document.body.insertAdjacentHTML('beforeend',cta);
var n=document.querySelector('.nav'),pr=document.querySelector('.progress');
function sc(){var y=scrollY;n.classList.toggle('scrolled',y>20);pr.style.width=(y/(document.documentElement.scrollHeight-innerHeight)*100||0)+'%'}
addEventListener('scroll',sc,{passive:true});sc();
document.querySelector('.burger').onclick=function(){n.classList.toggle('menu')};
n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('menu')})});
/* cursor */
var c=document.querySelector('.cur');
addEventListener('mousemove',function(e){c.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'});
document.addEventListener('mouseover',function(e){c.classList.toggle('big',!!e.target.closest('a,button,.card'))});
/* parallax das formas */
var sh=document.querySelectorAll('.shape');
if(sh.length)addEventListener('mousemove',function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;sh.forEach(function(s,i){var f=(i+1)*22;s.style.transform='translate('+x*f+'px,'+y*f+'px)'})});
/* imagens revelam ao rolar */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})},{threshold:.25});
document.querySelectorAll('.story img').forEach(function(i){io.observe(i)});
/* transição entre páginas */
document.querySelectorAll('a[href$=".html"]').forEach(function(a){a.addEventListener('click',function(e){if(a.target||e.metaKey||e.ctrlKey)return;e.preventDefault();document.body.classList.add('leaving');setTimeout(function(){location.href=a.href},300)})});
addEventListener('pageshow',function(){document.body.classList.remove('leaving')});
/* projetos: modal */
var m=document.getElementById('modal');
if(m){
var D=window.PROJETOS;
function close(){m.classList.remove('open');document.body.style.overflow=''}
document.querySelectorAll('.card').forEach(function(b){b.onclick=function(){
var p=D[b.dataset.id];
m.querySelector('.sheet').innerHTML='<header><h2>'+p.t+'</h2><button class="x" aria-label="Fechar">✕</button></header><p>'+p.d+'</p>'+p.i.map(function(s){return '<img src="'+encodeURI(s)+'" alt="'+p.t+'" loading="lazy">'}).join('');
m.querySelector('.x').onclick=close;m.classList.add('open');m.scrollTop=0;document.body.style.overflow='hidden'}});
m.addEventListener('click',function(e){if(e.target===m)close()});
addEventListener('keydown',function(e){if(e.key==='Escape')close()});
}
})();