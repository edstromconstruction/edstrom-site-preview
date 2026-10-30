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

  // quote form -> FormSubmit AJAX (mailto action stays as no-JS fallback)
  var f=document.getElementById('qform'),fm=document.getElementById('fmsg');
  function say(cls,html){if(!fm)return;fm.className='fmsg '+cls;fm.innerHTML=html;fm.hidden=false}
  if(f)f.addEventListener('submit',function(e){e.preventDefault();var ok=true;
    ['name','email'].forEach(function(n){var el=f.elements[n];var bad=!el.value.trim()||(n==='email'&&!/^\S+@\S+\.\S+$/.test(el.value));el.classList.toggle('bad',bad);if(bad)ok=false});
    if(!ok){f.querySelector('.bad').focus();return}
    if(f.elements['_honey']&&f.elements['_honey'].value){say('ok','Thanks - we got your request and will contact you soon.');f.reset();return}
    var v=function(n){return f.elements[n].value.trim()};
    var btn=f.querySelector('button[type=submit]'),bl=btn.textContent;btn.disabled=true;btn.textContent='Sending...';if(fm)fm.hidden=true;
    var data={name:v('name'),phone:v('phone'),email:v('email'),'project type':v('type'),location:v('loc'),details:v('msg'),
      _subject:'New quote request - Edstrom website',_template:'table',_captcha:'false',_replyto:v('email'),_honey:''};
    fetch('https://formsubmit.co/ajax/office@edstromak.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(!r.ok||String(j.success)!=='true')throw new Error(j.message||('HTTP '+r.status));return j})})
      .then(function(){say('ok','Thanks - we got your request and will contact you soon.');f.reset()})
      .catch(function(){say('err','Sorry, your request didn\'t go through. Please call our after-hours line at <a href="tel:+19074880452">(907) 488-0452</a> or email <a href="mailto:office@edstromak.com">office@edstromak.com</a>.')})
      .then(function(){btn.disabled=false;btn.textContent=bl});
  });
})();
