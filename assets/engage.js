// SellerCalc engagement: sticky header nav, recent, favourites, share, print, tool of day, popular searches. No login, browser only.
(function(){
  function esc(t){return String(t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  var isHome = /index\.html$/.test(location.pathname) || location.pathname.endsWith('/');
  var prefix = location.pathname.indexOf('/calculators/')>=0 || location.pathname.indexOf('/guides/')>=0 || location.pathname.indexOf('/tools/')>=0 || location.pathname.indexOf('/categories/')>=0 ? '../' : '';
  // Record recent (not on home itself)
  try{
    if(!isHome){
      var rec = JSON.parse(localStorage.getItem('sc_recent')||'[]');
      var title = document.title.replace(' - SellerCalc','');
      rec = rec.filter(function(x){return x.url!==location.href;});
      rec.unshift({title:title, url:location.href});
      localStorage.setItem('sc_recent', JSON.stringify(rec.slice(0,6)));
    }
  }catch(e){}
  // Toolbar on calculator/tool pages: favourite, share, print
  var main = document.querySelector('main');
  if(main && !isHome && !document.querySelector('.bc-toolbar')){
    var tb = document.createElement('div'); tb.className='bc-toolbar';
    tb.innerHTML = '<button id="bcBack" aria-label="Go back">← Back</button> <button id="bcFav">★ Favorite</button> <button id="bcShare">Share</button> <button id="bcPrint">Print result</button>';
    main.insertBefore(tb, main.firstChild);
    document.getElementById('bcBack').onclick = function(){
      try{
        if(window.history.length > 1){ window.history.back(); }
        else { window.location.href = prefix + 'index.html'; }
      }catch(e){ window.location.href = prefix + 'index.html'; }
    };
    var favBtn = document.getElementById('bcFav');
    try{
      var favs = JSON.parse(localStorage.getItem('sc_fav')||'[]');
      if(favs.some(function(x){return x.url===location.href;})) favBtn.textContent='★ Saved';
    }catch(e){}
    favBtn.onclick = function(){
      try{
        var favs = JSON.parse(localStorage.getItem('sc_fav')||'[]');
        var i = favs.findIndex(function(x){return x.url===location.href;});
        if(i>=0){ favs.splice(i,1); favBtn.textContent='★ Favorite'; }
        else { favs.unshift({title:document.title.replace(' - SellerCalc',''), url:location.href}); favBtn.textContent='★ Saved'; }
        localStorage.setItem('sc_fav', JSON.stringify(favs.slice(0,20)));
      }catch(e){}
    };
    document.getElementById('bcShare').onclick = function(){
      var url = location.href;
      if(navigator.share){ navigator.share({title:document.title, url:url}).catch(function(){}); }
      else { window.open('https://wa.me/?text='+encodeURIComponent(document.title+' '+url), '_blank'); }
    };
    document.getElementById('bcPrint').onclick = function(){ window.print(); };
    if(!document.querySelector('.result')){document.getElementById('bcPrint').textContent='Print page';}
  }
  // Home sections
  if(isHome){
    try{
      var rec = JSON.parse(localStorage.getItem('sc_recent')||'[]');
      var favs = JSON.parse(localStorage.getItem('sc_fav')||'[]');
      var recEl = document.getElementById('bcRecentList');
      if(recEl && rec.length){ recEl.innerHTML = rec.map(function(x){return '<a href="'+esc(x.url)+'">'+esc(x.title)+'</a>';}).join(' • '); document.getElementById('bcRecent').style.display='block'; }
      var favEl = document.getElementById('bcFavList');
      if(favEl && favs.length){ favEl.innerHTML = favs.map(function(x){return '<a href="'+esc(x.url)+'">★ '+esc(x.title)+'</a>';}).join(' • '); document.getElementById('bcFavs').style.display='block'; }
    }catch(e){}
    // Tool of the day: date-based pick
    var tools = [
      ['calculators/etsy-fee-calculator.html','Etsy Fee Calculator'],
      ['calculators/ebay-final-value-fee-calculator.html','eBay Final Value Fee Calculator'],
      ['calculators/poshmark-fee-calculator.html','Poshmark Fee Calculator'],
      ['calculators/amazon-fba-profit-calculator.html','Amazon FBA Profit Calculator'],
      ['calculators/dimensional-weight-calculator.html','Dimensional Weight Calculator'],
      ['calculators/shipping-cost-comparison-calculator.html','Shipping Cost Comparison Calculator'],
      ['calculators/profit-margin-calculator.html','Profit Margin Calculator']
    ];
    var tod = document.getElementById('bcTod');
    if(tod){
      var d = new Date(); var idx = (d.getFullYear()*366 + d.getMonth()*31 + d.getDate()) % tools.length;
      tod.innerHTML = 'Tool of the Day: <a href="'+tools[idx][0]+'">'+tools[idx][1]+'</a>';
    }
  }

  // Back to top on every page (category pages already have their own button)
  if(!document.getElementById('topBtn')){
    var topBtn = document.createElement('button');
    topBtn.id = 'topBtn'; topBtn.type = 'button'; topBtn.textContent = '↑ Back to top';
    document.body.appendChild(topBtn);
    window.addEventListener('scroll', function(){ topBtn.classList.toggle('show', window.scrollY > 400); });
    topBtn.addEventListener('click', function(){
      var r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({top:0, behavior: r ? 'auto' : 'smooth'});
    });
  }

  // Return-visitor extras: Tip of Day, Continue, Progress
  if(isHome){
    try{
      var tips=['Check the fee schedule before you price a listing, small rate changes eat profit fast.','Always count shipping in your profit, not just the item price.','Compare the same item across marketplaces before you choose where to list.','Re-check platform fees every few months, they change without much notice.','Price for profit after fees, not just to be the cheapest listing.'];
      var d2=new Date(); var tipEl=document.getElementById('bcTip');
      if(tipEl) tipEl.innerHTML='Tip of the Day: '+tips[(d2.getFullYear()*366+d2.getMonth()*31+d2.getDate())%tips.length];
      var rec2=JSON.parse(localStorage.getItem('sc_recent')||'[]');
      var favs2=JSON.parse(localStorage.getItem('sc_fav')||'[]');
      if(rec2.length){ var c=document.getElementById('bcContinue'); if(c){ c.style.display='block'; document.getElementById('bcContinueLink').innerHTML='<a href="'+esc(rec2[0].url)+'">'+esc(rec2[0].title)+'</a>'; } }
      var total=rec2.length+favs2.length;
      if(total>0){ var p=document.getElementById('bcProgress'); if(p){ p.style.display='block'; document.getElementById('bcProgressText').textContent='You have used '+rec2.length+' calculators and saved '+favs2.length+' favourites on this device.'; } }
    }catch(err){}
  }

  var lastY = window.scrollY;
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    var hdr = document.querySelector('header');
    if(!hdr) return;
    if(document.querySelector('.nav-links.open')){ lastY=y; return; }
    if(y > lastY && y > 120){ hdr.style.animation='none'; hdr.style.transform='translateY(-110%)'; hdr.style.top='-120px'; hdr.classList.add('bc-hide'); }
    else { hdr.style.animation=''; hdr.style.transform=''; hdr.style.top=''; hdr.classList.remove('bc-hide'); }
    lastY = y;
  }, {passive:true});
})();

// Mobile menu button (nav links are hidden under 700px otherwise)
(function(){
  var w=document.querySelector('header .wrap'), n=document.querySelector('header .nav-links');
  if(!w||!n||document.querySelector('.menu-btn')) return;
  var b=document.createElement('button'); b.type='button'; b.className='menu-btn'; b.setAttribute('aria-label','Open menu'); b.setAttribute('aria-expanded','false'); b.textContent='Menu';
  w.insertBefore(b,n);
  b.addEventListener('click',function(){ var o=n.classList.toggle('open'); b.setAttribute('aria-expanded',o?'true':'false'); });
})();
