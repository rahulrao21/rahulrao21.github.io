var pathvars={worker:"https://mydevstore-15.myshopify.com/apps/manifestFile/service-worker.js",manifest:"https://mydevstore-15.myshopify.com/apps/manifestFile/manifest.json"};
/*var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://mydevstore-15.myshopify.com/apps/manifestFile/core/20.js";
        document.getElementsByTagName('head')[0].appendChild(script);
*/
function subs()
{
      if (typeof pe != 'undefined'){
subs();
         // pe.subscribe();
      } else {
          _pe.subscribe();
      }
}
subs();
