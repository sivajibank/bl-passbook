/* BuildLedger owner phone — keeps the page working offline and shows alerts.
   The alert itself carries nothing: the computer only says "something new".
   This helper then fetches the locked summary and opens it with the key the
   page saved on this phone after the PIN was entered. */
'use strict';
var SHELL = 'bl-owner-v6', FILES = ['bl-owner.html', 'bl-owner.webmanifest', 'bl-owner-icon-192.png', 'bl-owner-icon-512.png'];
self.addEventListener('install', function(e){ e.waitUntil(caches.open(SHELL).then(function(c){ return c.addAll(FILES).catch(function(){}); }).then(function(){ return self.skipWaiting(); })); });
self.addEventListener('activate', function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k !== SHELL; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener('fetch', function(e){
  var u = new URL(e.request.url);
  if(e.request.method !== 'GET' || u.origin !== location.origin || !/\/bl-owner[^/]*$/.test(u.pathname)) return;   // only the owner page's own files; the customer passbook and the summary are never touched
  e.respondWith(fetch(e.request).then(function(r){ if(r.ok){ var c = r.clone(); caches.open(SHELL).then(function(x){ x.put(e.request, c); }); } return r; })
    .catch(function(){ return caches.match(e.request, {ignoreSearch:true}).then(function(r){ return r || caches.match('bl-owner.html'); }); }));
});
function kv(k){ return new Promise(function(ok){ var r = indexedDB.open('bl-owner', 1); r.onupgradeneeded = function(){ r.result.createObjectStore('kv'); };
  r.onsuccess = function(){ try{ var q = r.result.transaction('kv').objectStore('kv').get(k); q.onsuccess = function(){ ok(q.result); }; q.onerror = function(){ ok(null); }; }catch(e){ ok(null); } }; r.onerror = function(){ ok(null); }; }); }
function kvPut(k, v){ return new Promise(function(ok){ var r = indexedDB.open('bl-owner', 1); r.onsuccess = function(){ try{ var tx = r.result.transaction('kv', 'readwrite'); tx.objectStore('kv').put(v, k); tx.oncomplete = function(){ ok(); }; }catch(e){ ok(); } }; r.onerror = function(){ ok(); }; }); }
function unb64u(s){ s = String(s).replace(/-/g, '+').replace(/_/g, '/'); while(s.length % 4) s += '='; var b = atob(s), a = new Uint8Array(b.length); for(var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
function latest(){
  return Promise.all([kv('cfg'), kv('key'), kv('seenAlert')]).then(function(r){
    var cfg = r[0], key = r[1], seen = r[2] || 0; if(!cfg || !key) return null;
    return fetch(cfg.url + '/p/' + cfg.id, {cache:'no-store'}).then(function(x){ return x.ok ? x.text() : null; }).then(function(t){
      if(!t) return null; var all = unb64u(t.trim());
      return crypto.subtle.decrypt({name:'AES-GCM', iv:all.slice(0, 12)}, key, all.slice(12)).then(function(pt){
        var s = JSON.parse(new TextDecoder().decode(pt)), fresh = (s.alerts || []).filter(function(a){ return a.at > seen; });
        if(fresh.length) kvPut('seenAlert', Math.max.apply(null, fresh.map(function(a){ return a.at; })));
        return {co:s.co || 'BuildLedger', fresh:fresh, q:(s.queue || []).length};
      });
    });
  }).catch(function(){ return null; });
}
self.addEventListener('push', function(e){
  e.waitUntil(latest().then(function(x){
    var title = x ? x.co : 'BuildLedger', body;
    if(x && x.fresh.length) body = x.fresh.length === 1 ? x.fresh[0].t : x.fresh[x.fresh.length - 1].t + '  (+' + (x.fresh.length - 1) + ' more)';
    else if(x && x.q) body = x.q + ' thing' + (x.q === 1 ? '' : 's') + ' waiting for your approval';
    else body = 'Something new in your business — tap to see';
    return self.registration.showNotification(title, {body:body, icon:'bl-owner-icon-192.png', badge:'bl-owner-icon-192.png', tag:'bl-owner', renotify:true, data:{u:'bl-owner.html'}});
  }));
});
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(function(cs){
    for(var i = 0; i < cs.length; i++){ if(/bl-owner\.html/.test(cs[i].url)) return cs[i].focus(); }
    return self.clients.openWindow('bl-owner.html');
  }));
});
