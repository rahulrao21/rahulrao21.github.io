/*function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
sleep(7000);*/
//pe.subscribe();

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
}(window, document, 'script',
    'https://mydevstore-15.myshopify.com/manifestFile/core/20.js');
_pe.subscribe();

