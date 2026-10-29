(function(){
  // mobile menu
  var bg=document.querySelector('.burger'),mn=document.getElementById('mnav');
  if(bg){bg.addEventListener('click',function(){var o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
    mn.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mn.classList.remove('open');bg.setAttribute('aria-expanded','false')})});}

  // before/after
  function initBA(root){root.querySelectorAll('.ba').forEach(function(b){var r=b.querySelector('input'),a=b.querySelector('.after'),bar=b.querySelector('.bar');function u(){a.style.clipPath='inset(0 0 0 '+r.value+'%)';bar.style.left=r.value+'%'}r.addEventListener('input',u);u()})}

  // project modal
  var pm=document.getElementById('pm'),pin=pm.querySelector('.pm-in'),last=null;
  var lb=document.getElementById('lb'),lbi=lb.querySelector('img');
  function close(){pm.classList.remove('open');pin.innerHTML='';document.body.style.overflow='';if(last)last.focus()}
  function open(id,btn){var t=document.getElementById('p-'+id);if(!t)return;last=btn;pin.innerHTML='';pin.appendChild(t.content.cloneNode(true));
    pin.querySelectorAll('.gal img').forEach(function(i){i.loading='lazy';i.addEventListener('click',function(){lbi.src=i.src;lbi.alt=i.alt;lb.classList.add('open')})});
    initBA(pin);pm.classList.add('open');pm.scrollTop=0;document.body.style.overflow='hidden';pm.querySelector('.pm-x').focus()}
  document.querySelectorAll('.tile[data-p]').forEach(function(b){b.addEventListener('click',function(){open(b.dataset.p,b)})});
  pm.addEventListener('click',function(e){if(e.target===pm||e.target.classList.contains('pm-x'))close()});
  lb.addEventListener('click',function(){lb.classList.remove('open');lbi.removeAttribute('src')});
  // in-page sliders and galleries
  initBA(document.querySelector('main')||document);
  document.querySelectorAll('main .gal img').forEach(function(i){i.addEventListener('click',function(){lbi.src=i.src;lbi.alt=i.alt;lb.classList.add('open')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(lb.classList.contains('open')){lb.classList.remove('open')}else if(pm.classList.contains('open'))close()}});

  // quote form -> mailto
  var f=document.getElementById('qform');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();var ok=true;
    ['name','email'].forEach(function(n){var el=f.elements[n];var bad=!el.value.trim()||(n==='email'&&!/^\S+@\S+\.\S+$/.test(el.value));el.classList.toggle('bad',bad);if(bad)ok=false});
    if(!ok){f.querySelector('.bad').focus();return}
    var v=function(n){return f.elements[n].value.trim()};
    var body='Name: '+v('name')+'\nPhone: '+v('phone')+'\nEmail: '+v('email')+'\nProject type: '+v('type')+'\nLocation: '+v('loc')+'\n\nDetails:\n'+v('msg');
    location.href='mailto:office@edstromak.com?subject='+encodeURIComponent('Quote request: '+v('type'))+'&body='+encodeURIComponent(body);
  });
})();
