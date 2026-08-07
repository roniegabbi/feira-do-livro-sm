/* ===== Config + cliente Supabase ===== */
window.FDL_SUPABASE_URL='https://kqblnfkynhfvaztnpujw.supabase.co';
window.FDL_SUPABASE_KEY='sb_publishable_hsjMqk4-9a7gDp8zxhQNLg_M7sXAm1U';
window.fdl=(window.supabase&&window.supabase.createClient)
  ? window.supabase.createClient(window.FDL_SUPABASE_URL,window.FDL_SUPABASE_KEY) : null;

/* ===== Helpers ===== */
function escN(s){return (s==null?'':String(s)).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function fmtData(d){if(!d)return'';var p=String(d).slice(0,10).split('-');var M=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];return p.length===3?(p[2]+' de '+M[+p[1]-1]+' de '+p[0]):d;}
function defaultDia(){var t=new Date();if(t.getFullYear()===2026&&t.getMonth()===7){var d=t.getDate();if(d>=7&&d<=22)return String(d).padStart(2,'0');}return '07';}
var _toastT;
function toast(m,err){var t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}t.textContent=m;t.className='toast show'+(err?' err':'');clearTimeout(_toastT);_toastT=setTimeout(function(){t.className='toast';},2600);}
function toggleNav(){var d=document.getElementById('navDrop');if(d)d.classList.toggle('open');}
function closeNav(){var d=document.getElementById('navDrop');if(d)d.classList.remove('open');}

/* ===== Cabeçalho e rodapé (compartilhados) ===== */
var FDL_PAGES=[['index.html','Início'],['programacao.html','Programação'],['lancamentos.html','Lançamentos'],['maratona.html','Maratona'],['noticias.html','Notícias'],['galeria.html','Galeria'],['homenageados.html','Homenageados'],['parceiros.html','Parceiros']];
function buildHeader(active){
  var links=FDL_PAGES.map(function(p){return '<a href="'+p[0]+'"'+(p[0]===active?' class="on"':'')+'>'+p[1]+'</a>';}).join('');
  var drop=FDL_PAGES.map(function(p){return '<a href="'+p[0]+'" onclick="closeNav()"'+(p[0]===active?' class="on"':'')+'>'+p[1]+'</a>';}).join('');
  var el=document.getElementById('site-header');if(!el)return;
  el.innerHTML=
   '<header class="nav"><div class="wrap nav-in">'+
   '<a class="brand" href="index.html"><img src="assets/marca-roxo.png" alt="53ª Feira do Livro de Santa Maria"></a>'+
   '<nav class="nav-links">'+links+'</nav>'+
   '<div class="nav-cta"><button class="nav-burger" aria-label="Abrir menu" onclick="toggleNav()">☰</button></div>'+
   '</div><div class="nav-drop" id="navDrop">'+drop+'</div></header>';
}
function buildFooter(){
  var el=document.getElementById('site-footer');if(!el)return;
  el.innerHTML=
   '<section class="apoiadores"><div class="wrap">'+
   '<h4>Realização, patrocínio e apoio</h4>'+
   '<img src="assets/apoiadores-1.jpg" alt="Produção cultural, incentivo e patrocínio" loading="lazy">'+
   '<img src="assets/apoiadores-2.jpg" alt="Realização, apoio cultural e financiamento" loading="lazy">'+
   '</div></section>'+
   '<footer><div class="wrap"><div class="foot-grid">'+
   '<div><h4>53ª Feira do Livro de Santa Maria</h4>'+
   '<p>7 a 22 de agosto de 2026 · Praça Saldanha Marinho<br>Domingo a sexta, das 13h30 às 19h30 · Sábados, das 10h às 19h30</p>'+
   '<p style="opacity:.7">Realização da Prefeitura de Santa Maria, por meio das Secretarias de Cultura e de Educação, com a Câmara do Livro e instituições parceiras.</p></div>'+
   '<div><h4>Navegue</h4><a href="programacao.html">Programação</a><a href="lancamentos.html">Lançamentos</a><a href="maratona.html">Maratona</a><a href="parceiros.html">Parceiros</a></div>'+
   '<div><h4>Acompanhe</h4>'+
   '<a href="https://www.instagram.com/feiradolivrosm" target="_blank" rel="noopener">@feiradolivrosm</a>'+
   '<a href="https://www.instagram.com/cultura.santamaria" target="_blank" rel="noopener">@cultura.santamaria</a>'+
   '<a href="https://www.santamaria.rs.gov.br/cultura" target="_blank" rel="noopener">santamaria.rs.gov.br/cultura</a>'+
   '<a href="https://www.facebook.com/feiradolivrosm" target="_blank" rel="noopener">Facebook da Feira</a></div>'+
   '</div><div class="realiz">Financiamento: Lei de Incentivo à Cultura (LIC) de Santa Maria e Sistema Pró-Cultura RS · Produção cultural: Plano Comunicação e Eventos e Denise Copetti Produções · Incentivo: Unimed Santa Maria e Clínica Viver.</div>'+
   '</div></footer>';
}
function setupReveal(){
  if(!('IntersectionObserver' in window)){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in');});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(e){io.observe(e);});
  var co=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var el=en.target,end=+el.dataset.count,n=0,step=Math.ceil(end/40);var t=setInterval(function(){n+=step;if(n>=end){n=end;clearInterval(t);}el.textContent=n.toLocaleString('pt-BR');},28);co.unobserve(el);}});},{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(e){co.observe(e);});
}
window.setupReveal=setupReveal;
document.addEventListener('DOMContentLoaded',function(){
  buildHeader((document.body.dataset.page||'')+'');
  buildFooter();
  setupReveal();
});
