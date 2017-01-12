var pathvars={worker:"https://mydevstore-15.myshopify.com/apps/manifestFile/service-worker.js",manifest:"https://mydevstore-15.myshopify.com/apps/manifestFile/manifest.json"};

!function(w,d,s,u) {
    if(typeof(_pe)!="undefined") return;
    _pedata=[];
    w._pedata=_pedata;
    _pe={};
    _pe.subscribe=function(){_pedata.push({"action":"subscribe"});}
    w._pe=_pe;
    e = d.createElement(s);
    e.async = !0;
    e.src = u;
    p = d.getElementsByTagName(s)[0];
    p.parentNode.insertBefore(e, p);
   console.log(_pedata);
}(window, document, 'script',
    'https://mydevstore-15.myshopify.com/apps/manifestFile/core/20.js');
/*
var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://mydevstore-15.myshopify.com/apps/manifestFile/core/20.js";
        document.getElementsByTagName('head')[0].appendChild(script);
*/
function subs() {
      if (typeof pe != 'undefined'){

          _pe.subscribe();
      } else {
          setTimeout(subs, 50);
      }
  }
subs();
