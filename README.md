<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="theme-color" content="#07090F">
<title>Project Passbook</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
:root{
  --bg1:#07090F; --bg2:#0C1119; --bg3:#121A26; --bg4:#18222F;
  --b1:rgba(255,255,255,.07); --b2:rgba(255,255,255,.13);
  --text:#EAF2FF; --text2:#B9C8DC; --text3:#8296AF; --text4:#5D6E85;
  --cyan:#00F0FF; --lime:#C8FF00; --amber:#FFB020; --coral:#FF4D6D;
  --violet:#9B5DE5; --mint:#2BD9A6; --pink:#FF0099;
  --r:16px;
}
html,body{background:var(--bg1);color:var(--text);font-family:'Outfit',system-ui,-apple-system,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
body{min-height:100vh;overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom)}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace;font-variant-numeric:tabular-nums}

/* ── aurora backdrop ───────────────────────────────── */
#aurora{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
#aurora i{position:absolute;display:block;border-radius:50%;filter:blur(70px);opacity:.30;animation:drift 22s ease-in-out infinite}
#aurora i:nth-child(1){width:52vw;height:52vw;background:radial-gradient(circle,#00F0FF,transparent 68%);top:-14vw;left:-14vw}
#aurora i:nth-child(2){width:46vw;height:46vw;background:radial-gradient(circle,#9B5DE5,transparent 68%);bottom:-12vw;right:-12vw;animation-delay:-7s}
#aurora i:nth-child(3){width:38vw;height:38vw;background:radial-gradient(circle,#C8FF00,transparent 70%);top:42%;right:-16vw;animation-delay:-13s;opacity:.16}
@keyframes drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(5vw,7vh) scale(1.12)}66%{transform:translate(-6vw,-4vh) scale(.92)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}

.wrap{position:relative;z-index:1;max-width:760px;margin:0 auto;padding:18px 14px 60px}

/* ── PIN gate ──────────────────────────────────────── */
#gate{position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;padding:20px;
  background:radial-gradient(120% 90% at 50% 0%,#111A28 0%,#07090F 70%);transition:opacity .5s ease,transform .5s cubic-bezier(.22,1,.36,1)}
#gate.out{opacity:0;transform:scale(1.06);pointer-events:none}
.gcard{width:100%;max-width:330px;text-align:center}
.glogo{width:70px;height:70px;margin:0 auto 16px;border-radius:22px;display:flex;align-items:center;justify-content:center;font-size:32px;
  background:linear-gradient(135deg,rgba(0,240,255,.18),rgba(155,93,229,.18));border:1px solid var(--b2);
  box-shadow:0 12px 40px rgba(0,240,255,.16);animation:bob 3.6s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.gtitle{font-size:20px;font-weight:900;letter-spacing:-.4px}
.gsub{font-size:12px;color:var(--text3);margin-top:5px;font-weight:600;line-height:1.5}
.cells{display:flex;gap:10px;justify-content:center;margin:24px 0 6px}
.cell{width:48px;height:60px;border-radius:14px;background:rgba(255,255,255,.045);border:1.5px solid var(--b2);
  display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:var(--cyan);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:all .22s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden}
.cell.on{border-color:rgba(0,240,255,.65);background:rgba(0,240,255,.10);transform:translateY(-3px);box-shadow:0 8px 22px rgba(0,240,255,.20)}
.cell.on::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.35) 50%,transparent 65%);animation:sweep .55s ease}
@keyframes sweep{from{transform:translateX(-120%)}to{transform:translateX(120%)}}
.cells.bad{animation:shake .42s}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-11px)}40%{transform:translateX(9px)}60%{transform:translateX(-6px)}80%{transform:translateX(4px)}}
.cells.bad .cell{border-color:rgba(255,77,109,.75);color:var(--coral);background:rgba(255,77,109,.10)}
#gmsg{font-size:12px;font-weight:700;color:var(--coral);min-height:18px;margin-top:8px}
.pad{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:20px}
.key{height:52px;border-radius:14px;border:1px solid var(--b1);background:rgba(255,255,255,.04);color:var(--text);
  font-size:20px;font-weight:800;font-family:inherit;cursor:pointer;backdrop-filter:blur(10px);transition:transform .1s,background .18s}
.key:active{transform:scale(.93);background:rgba(0,240,255,.16)}
.key.fn{font-size:15px;color:var(--text3)}
#pin{position:absolute;opacity:0;pointer-events:none;height:0;width:0}

/* ── header ────────────────────────────────────────── */
.hero{background:linear-gradient(150deg,rgba(0,240,255,.10),rgba(155,93,229,.07) 55%,transparent);
  border:1px solid var(--b1);border-radius:22px;padding:20px 18px;position:relative;overflow:hidden;
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.hero::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--cyan),var(--lime),var(--violet),transparent);background-size:200% 100%;animation:slide 4.5s linear infinite}
@keyframes slide{to{background-position:200% 0}}
@keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.78)}}
.badge{display:inline-flex;align-items:center;gap:5px;font-size:9.5px;font-weight:900;letter-spacing:2px;text-transform:uppercase;
  padding:4px 10px;border-radius:20px;background:rgba(0,240,255,.12);color:var(--cyan);border:1px solid rgba(0,240,255,.28)}
.cname{font-size:23px;font-weight:900;letter-spacing:-.6px;margin-top:11px;line-height:1.15}
.cproj{font-size:13px;color:var(--lime);font-weight:800;margin-top:3px}
.cmeta{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}
.chip{font-size:10.5px;font-weight:700;color:var(--text3);background:rgba(255,255,255,.05);border:1px solid var(--b1);padding:4px 10px;border-radius:20px}

/* ── KPI ───────────────────────────────────────────── */
.kpis{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:14px}
@media(min-width:560px){.kpis{grid-template-columns:repeat(4,1fr)}}
.kpi{background:var(--bg3);border:1px solid var(--b1);border-radius:var(--r);padding:14px 12px;position:relative;overflow:hidden;
  opacity:0;transform:translateY(16px);animation:rise .6s cubic-bezier(.22,1,.36,1) forwards}
@keyframes rise{to{opacity:1;transform:none}}
.kpi::after{content:'';position:absolute;width:74px;height:74px;border-radius:50%;top:-32px;right:-26px;opacity:.16;background:currentColor;filter:blur(6px)}
.kpi .ic{font-size:15px}
.kpi .vl{font-size:18px;font-weight:900;margin-top:6px;letter-spacing:-.6px}
.kpi .lb{font-size:8.5px;font-weight:900;letter-spacing:1.6px;color:var(--text4);text-transform:uppercase;margin-top:3px}
.kpi .sb{font-size:10px;font-weight:700;color:var(--text3);margin-top:4px}

/* ── sections ──────────────────────────────────────── */
.sec{margin-top:22px}
.stitle{display:flex;align-items:center;gap:9px;margin-bottom:11px}
.stitle b{font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase}
.stitle span.n{margin-left:auto;font-size:10px;font-weight:800;color:var(--text4);background:var(--bg3);border:1px solid var(--b1);padding:3px 9px;border-radius:20px}
.card{background:var(--bg2);border:1px solid var(--b1);border-radius:var(--r);padding:14px;margin-bottom:9px;
  opacity:0;transform:translateY(14px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}
.card.in{opacity:1;transform:none}
.row{display:flex;justify-content:space-between;align-items:center;gap:10px}
.bar{height:7px;border-radius:6px;background:rgba(255,255,255,.07);overflow:hidden;margin-top:9px}
.bar i{display:block;height:100%;border-radius:6px;width:0;transition:width 1.1s cubic-bezier(.22,1,.36,1)}
.tbl{width:100%;border-collapse:collapse;font-size:12px}
.tbl th{font-size:9px;letter-spacing:1.3px;text-transform:uppercase;color:var(--text4);text-align:left;padding:7px 8px;border-bottom:1px solid var(--b1);font-weight:900}
.tbl td{padding:9px 8px;border-bottom:1px solid rgba(255,255,255,.045);color:var(--text2);font-weight:600}
.tbl tr:last-child td{border-bottom:none}
.tbl .r{text-align:right}
.pill{font-size:9.5px;font-weight:900;padding:2.5px 8px;border-radius:20px;white-space:nowrap;display:inline-block}
.tot{display:flex;justify-content:space-between;padding:9px 8px;font-size:12.5px;font-weight:900;border-top:1.5px solid var(--b2);margin-top:2px}

/* ── UPI ───────────────────────────────────────────── */
.upi{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
@media(min-width:480px){.upi{grid-template-columns:repeat(4,1fr)}}
.ub{display:flex;flex-direction:column;align-items:center;gap:6px;padding:13px 8px;border-radius:14px;text-decoration:none;
  background:var(--bg3);border:1px solid var(--b1);color:var(--text2);font-size:10.5px;font-weight:800;transition:transform .2s,border-color .2s}
.ub:active{transform:scale(.95)}
.ub em{font-size:21px;font-style:normal}

.foot{margin-top:30px;text-align:center;font-size:11px;color:var(--text4);line-height:1.8;font-weight:600;
  border-top:1px solid var(--b1);padding-top:18px}
.empty{text-align:center;padding:26px 14px;color:var(--text4);font-size:12px;font-weight:600}
.err{max-width:400px;margin:16vh auto;text-align:center;padding:26px}
.tog{display:flex;gap:7px;justify-content:center;margin-top:14px;flex-wrap:wrap}
.tog button{padding:6px 13px;border-radius:20px;border:1px solid var(--b1);background:var(--bg3);color:var(--text3);
  font-size:11px;font-weight:800;font-family:inherit;cursor:pointer}
.tog button:active{transform:scale(.95)}
@media print{
  #aurora,#gate,.tog,.upi,.noprint{display:none!important}
  html,body{background:#fff;color:#000}
  .card,.kpi,.hero{background:#fff;border:1px solid #ccc;opacity:1!important;transform:none!important;animation:none!important}
  .kpi .vl,.cname{color:#000}
}
</style>
</head>
<body>
<div id="aurora"><i></i><i></i><i></i></div>

<!-- ══ PIN GATE ══ -->
<div id="gate">
  <div class="gcard">
    <div class="glogo">🏗️</div>
    <div class="gtitle">Project Passbook</div>
    <div class="gsub" id="gsub">Enter the PIN shared by your contractor</div>
    <input id="pin" type="tel" inputmode="numeric" autocomplete="off" maxlength="6">
    <div class="cells" id="cells"></div>
    <div id="gmsg"></div>
    <div class="pad" id="pad"></div>
  </div>
</div>

<!-- ══ CONTENT ══ -->
<div class="wrap" id="app" style="display:none"></div>

<script>
var LZString=function(){var r=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",e={};function t(r,o){if(!e[r]){e[r]={};for(var n=0;n<r.length;n++)e[r][r.charAt(n)]=n}return e[r][o]}var i={compressToBase64:function(r){if(null==r)return"";var n=i._compress(r,6,function(r){return o.charAt(r)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(n){return t(o,r.charAt(n))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(r){return null==r?"":""==r?null:i._decompress(r.length,16384,function(o){return r.charCodeAt(o)-32})},compressToUint8Array:function(r){for(var o=i.compress(r),n=new Uint8Array(2*o.length),e=0,t=o.length;e<t;e++){var s=o.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null==o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;e<t;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(r){return null==r?"":i._compress(r,6,function(r){return n.charAt(r)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(o){return t(n,r.charAt(o))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(r,o,n){if(null==r)return"";var e,t,i,s={},u={},a="",p="",c="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<r.length;i+=1)if(a=r.charAt(i),Object.prototype.hasOwnProperty.call(s,a)||(s[a]=f++,u[a]=!0),p=c+a,Object.prototype.hasOwnProperty.call(s,p))c=p;else{if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++),s[p]=f++,c=String(a)}if(""!==c){if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==o-1){d.push(n(m));break}v++}return d.join("")},decompress:function(r){return null==r?"":""==r?null:i._decompress(r.length,32768,function(o){return r.charCodeAt(o)})},_decompress:function(o,n,e){var t,i,s,u,a,p,c,l=[],f=4,h=4,d=3,m="",v=[],g={val:e(0),position:n,index:1};for(t=0;t<3;t+=1)l[t]=t;for(s=0,a=Math.pow(2,2),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 2:return""}for(l[3]=c,i=c,v.push(c);;){if(g.index>o)return"";for(s=0,a=Math.pow(2,d),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(c=s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 2:return v.join("")}if(0==f&&(f=Math.pow(2,d),d++),l[c])m=l[c];else{if(c!==h)return null;m=i+i.charAt(0)}v.push(m),l[h++]=i+m.charAt(0),i=m,0==--f&&(f=Math.pow(2,d),d++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module?module.exports=LZString:"undefined"!=typeof angular&&null!=angular&&angular.module("LZString",[]).factory("LZString",function(){return LZString});
</script>
<script>
/* ══════════════════════════════════════════════════════════════
   BuildLedger — Customer Project Passbook Viewer  v1.0
   Reads a PIN-gated snapshot from the URL fragment. No server,
   no database, no network calls. Everything lives in the link.
   ══════════════════════════════════════════════════════════════ */
var P = null, SECLEN = 4, buf = '', tries = 0, lockUntil = 0;
var LIVE = null;      /* {url,id,key} when this card carries a live pointer */
var LIVEST = 'none';  /* none | pending | live | offline                    */

/* The key travels in the URL fragment, which browsers never transmit, so the
   server holding the blob cannot read it \u2014 and neither can anyone who copies
   it out of storage. */
function b64uBytes(str){
  str = String(str).replace(/-/g,'+').replace(/_/g,'/');
  while(str.length%4) str += '=';
  var bin = atob(str), out = new Uint8Array(bin.length);
  for(var i=0;i<bin.length;i++) out[i] = bin.charCodeAt(i);
  return out;
}
function b64uText(str){ return new TextDecoder().decode(b64uBytes(str)); }
function canCrypto(){ return !!(window.crypto && window.crypto.subtle && window.TextDecoder && window.fetch); }

function pbDecrypt(blob, keyB64u){
  var raw = b64uBytes(blob);
  var iv  = raw.slice(0,12), ct = raw.slice(12);
  return window.crypto.subtle.importKey('raw', b64uBytes(keyB64u), {name:'AES-GCM'}, false, ['decrypt'])
    .then(function(key){ return window.crypto.subtle.decrypt({name:'AES-GCM', iv:iv}, key, ct); })
    .then(function(pt){ return new TextDecoder().decode(pt); });
}

/* ── helpers ─────────────────────────────────────────────── */
function $(id){ return document.getElementById(id); }
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function num(v){ return Number(v)||0; }
function fmt(v){ return '\u20B9'+Math.round(num(v)).toLocaleString('en-IN'); }
function fmtS(v){
  v = num(v);
  if(Math.abs(v)>=10000000) return '\u20B9'+(v/10000000).toFixed(2)+' Cr';
  if(Math.abs(v)>=100000)   return '\u20B9'+(v/100000).toFixed(2)+' L';
  if(Math.abs(v)>=1000)     return '\u20B9'+(v/1000).toFixed(1)+' K';
  return '\u20B9'+Math.round(v).toLocaleString('en-IN');
}
var MO = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtD(d){
  if(!d) return '\u2014';
  var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(d).trim());
  if(!m) return '\u2014';
  var mo = Number(m[2]), dy = Number(m[3]);
  if(mo<1 || mo>12 || dy<1 || dy>31) return '\u2014';
  return String(dy).padStart(2,'0')+' '+MO[mo-1]+' '+m[1];
}
function daysBetween(a,b){ return Math.round((a-b)/86400000); }
function todayD(){ var t=new Date(); t.setHours(0,0,0,0); return t; }
function parseD(s){
  if(!s) return null;
  var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(s).trim());
  if(!m) return null;
  var mo=Number(m[2]), dy=Number(m[3]);
  if(mo<1 || mo>12 || dy<1 || dy>31) return null;
  var d=new Date(Number(m[1]), mo-1, dy); d.setHours(0,0,0,0);
  /* reject roll-overs like 2026-02-31 */
  if(d.getMonth()!==mo-1 || d.getDate()!==dy) return null;
  return isNaN(d.getTime())?null:d;
}
function hasD(s){ return parseD(s)!==null; }

/* ── boot: decode the fragment ───────────────────────────── */
function boot(){
  var frag = '';
  try { frag = (location.hash||'').replace(/^#/,''); } catch(e){}
  /* A live card looks like  L.<b64u worker url>.<record id>.<key>.<snapshot>
     The snapshot still rides on the end, so the passbook opens instantly and
     still works with no signal. The fetch happens after the PIN, never before. */
  if(frag.charAt(0)==='L' && frag.charAt(1)==='.'){
    var parts = frag.split('.');
    if(parts.length>=5){
      try { LIVE = { url:b64uText(parts[1]).replace(/\/+$/,''), id:parts[2], key:parts[3] }; }
      catch(e){ LIVE = null; }
      frag = parts.slice(4).join('.');
      if(LIVE) LIVEST = 'pending';
    }
  }
  if(!frag){ fail('No passbook data found in this link.','Ask your contractor to send the passbook link again \u2014 the part after the # sign is missing.'); return; }
  try {
    var json = LZString.decompressFromEncodedURIComponent(frag);
    if(!json) throw new Error('decompress failed');
    P = JSON.parse(json);
  } catch(e){
    fail('This passbook link is damaged.','The link was probably cut short when it was forwarded. Please ask for a fresh link \u2014 copy it in full, including everything after the # sign.');
    return;
  }
  if(!P || !P.c){ fail('Unrecognised passbook link.','This does not look like a BuildLedger passbook link.'); return; }
  SECLEN = String(P.sec||'').length || 4;
  if(!P.sec){ unlock(true); return; }          /* no PIN set \u2192 open directly */
  buildPad();
  buildCells();
  $('gsub').textContent = 'Enter the '+SECLEN+'-digit PIN shared by '+(P.co&&P.co.n ? P.co.n : 'your contractor');
  try{ document.title = (P.c.pr||P.c.n||'Project')+' \u2014 Passbook'; }catch(e){}
  setTimeout(function(){ try{ $('pin').focus({preventScroll:true}); }catch(e){} }, 400);
}

function fail(title, msg){
  $('gate').style.display='none';
  var a=$('app'); a.style.display='block';
  a.innerHTML = '<div class="err"><div style="font-size:44px;margin-bottom:12px">\u26A0\uFE0F</div>'
    + '<div style="font-size:17px;font-weight:900;margin-bottom:8px">'+esc(title)+'</div>'
    + '<div style="font-size:12.5px;color:var(--text3);line-height:1.7;font-weight:600">'+esc(msg)+'</div></div>';
}

/* ── PIN gate ────────────────────────────────────────────── */
function buildCells(){
  var h=''; for(var i=0;i<SECLEN;i++) h += '<div class="cell" data-i="'+i+'"></div>';
  $('cells').innerHTML = h;
}
function buildPad(){
  var keys = ['1','2','3','4','5','6','7','8','9','clr','0','del'];
  $('pad').innerHTML = keys.map(function(k){
    if(k==='clr') return '<button class="key fn" data-k="clr">Clear</button>';
    if(k==='del') return '<button class="key fn" data-k="del">\u232B</button>';
    return '<button class="key" data-k="'+k+'">'+k+'</button>';
  }).join('');
  $('pad').addEventListener('click', function(e){
    var b=e.target.closest('button'); if(!b) return;
    var k=b.getAttribute('data-k');
    if(k==='clr') buf='';
    else if(k==='del') buf=buf.slice(0,-1);
    else if(buf.length<SECLEN) buf+=k;
    paint();
  });
  $('pin').addEventListener('input', function(e){
    buf = (e.target.value||'').replace(/\D/g,'').slice(0,SECLEN);
    paint();
  });
  document.addEventListener('keydown', function(e){
    if($('gate').classList.contains('out')) return;
    if(/^[0-9]$/.test(e.key)){ if(buf.length<SECLEN) buf+=e.key; paint(); }
    else if(e.key==='Backspace'){ buf=buf.slice(0,-1); paint(); }
  });
}
function paint(){
  $('pin').value = buf;
  var cs = $('cells').children;
  for(var i=0;i<cs.length;i++){
    var was = cs[i].classList.contains('on');
    if(i<buf.length){ cs[i].textContent='\u25CF'; if(!was) cs[i].classList.add('on'); }
    else { cs[i].textContent=''; cs[i].classList.remove('on'); }
  }
  $('cells').classList.remove('bad');
  if(buf.length===SECLEN) setTimeout(check, 130);
}
function check(){
  if(Date.now() < lockUntil){ startLockTick(); return; }
  if(buf === String(P.sec)){ unlock(); return; }
  tries++;
  $('cells').classList.add('bad');
  try{ if(navigator.vibrate) navigator.vibrate(70); }catch(e){}
  if(tries>=5){ lockUntil = Date.now()+30000; tries=0; startLockTick(); }
  else $('gmsg').textContent = 'Wrong PIN \u2014 '+(5-tries)+' attempt'+(5-tries===1?'':'s')+' left';
  setTimeout(function(){ buf=''; paint(); $('cells').classList.remove('bad'); }, 460);
}
var _lockTick = null;
function startLockTick(){
  clearInterval(_lockTick);
  var tick = function(){
    var left = Math.ceil((lockUntil - Date.now())/1000);
    if(left<=0){ clearInterval(_lockTick); _lockTick=null; $('gmsg').textContent=''; return; }
    $('gmsg').textContent = 'Too many attempts \u2014 try again in '+left+'s';
  };
  tick();
  _lockTick = setInterval(tick, 1000);
}

function unlock(skip){
  var g=$('gate');
  g.classList.add('out');
  setTimeout(function(){ g.style.display='none'; }, skip?0:520);
  $('app').style.display='block';
  render();
  if(LIVE) pullLive();
}

/* ── live refresh ────────────────────────────────────────────────────────
   Runs only after the PIN is accepted. If anything at all goes wrong \u2014 no
   signal, Worker down, record deleted, key tampered with \u2014 we keep the
   snapshot that came inside the link and say so honestly. */
function pullLive(){
  if(!LIVE || !canCrypto()){ LIVEST = LIVE ? 'offline' : 'none'; paintLive(); return; }
  var to = setTimeout(function(){ LIVEST='offline'; paintLive(); }, 9000);
  fetch(LIVE.url+'/p/'+LIVE.id, {cache:'no-store'})
    .then(function(r){ if(!r.ok) throw new Error('http '+r.status); return r.text(); })
    .then(function(blob){ return pbDecrypt(blob, LIVE.key); })
    .then(function(packed){
      var fresh = JSON.parse(LZString.decompressFromEncodedURIComponent(packed));
      if(!fresh || !fresh.c) throw new Error('bad payload');
      clearTimeout(to);
      var keepSec = P.sec;          /* the gate already passed \u2014 don't re-lock */
      P = fresh; P.sec = keepSec;
      LIVEST = 'live';
      render();
    })
    .catch(function(){ clearTimeout(to); LIVEST='offline'; paintLive(); });
}

function paintLive(){
  var el = $('livebar');
  if(!el) return;
  if(LIVEST==='live'){
    el.style.display='flex';
    el.style.color='var(--mint)';
    el.style.borderColor='rgba(43,217,166,.30)';
    el.style.background='rgba(43,217,166,.07)';
    el.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:var(--mint);box-shadow:0 0 8px var(--mint);animation:pulseDot 1.8s ease-in-out infinite"></span>'
      + '<span>Live \u00B7 updated '+fmtD(P.d)+'</span>';
  } else if(LIVEST==='pending'){
    el.style.display='flex';
    el.style.color='var(--text4)';
    el.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:var(--text4)"></span><span>Checking for updates\u2026</span>';
  } else if(LIVEST==='offline'){
    el.style.display='flex';
    el.style.color='var(--amber)';
    el.style.borderColor='rgba(255,176,32,.28)';
    el.style.background='rgba(255,176,32,.06)';
    el.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:var(--amber)"></span>'
      + '<span>' + (P.min
          ? 'No internet \u2014 this card stores no details of its own. Please reconnect and reopen.'
          : 'Offline \u2014 showing the details saved on this card ('+fmtD(P.d)+')')
      + '</span>';
  } else {
    el.style.display='none';
  }
}

/* ══ CALCULATIONS ═════════════════════════════════════════ */
function calc(){
  var c = P.c||{}, f = P.f||{};
  var py = P.py||[];                                   /* [date,amt,method,type,ref] */
  var sp = P.sp||{}, plan = sp.pl||[], spays = sp.py||[];
  var received = 0, refunded = 0;
  py.forEach(function(r){
    if(String(r[3]||'').toLowerCase()==='refund') refunded += num(r[1]);
    else received += num(r[1]);
  });
  var stageColl = 0;
  spays.forEach(function(r){ stageColl += num(r[2]); });
  var grossRec = received + stageColl;
  var net      = grossRec - refunded;
  var budget   = num(c.bg);
  var agreed   = plan.reduce(function(s,r){ return s+num(r[2]); },0);
  var contract = agreed>0 ? agreed : budget;
  var balance  = Math.max(contract - net, 0);
  var over     = net - contract;
  var ph = P.ph||[];
  var prog = ph.length ? Math.round(ph.reduce(function(s,r){ return s+num(r[3]); },0)/ph.length) : 0;
  return {
    py:py, plan:plan, spays:spays, ph:ph,
    received:grossRec, refunded:refunded, net:net,
    budget:budget, agreed:agreed, contract:contract,
    balance:balance, over:over, prog:prog, noContract: !(contract>0),
    spent:num(f.sp), matVal:num(f.mv), ncTotal:num(f.nc),
    payPct: contract>0 ? Math.min(Math.round(net/contract*100),100) : 0
  };
}

/* ══ RENDER ═══════════════════════════════════════════════ */
function render(){
  var c = P.c||{}, co = P.co||{}, K = calc();
  var H = '';

  /* ── hero ── */
  var stCol = {Active:'var(--lime)','On Hold':'var(--amber)',Completed:'var(--cyan)',Cancelled:'var(--coral)'}[c.st]||'var(--text3)';
  H += '<div id="livebar" class="noprint" style="display:none;align-items:center;gap:8px;font-size:11px;font-weight:800;'
     + 'padding:8px 13px;border-radius:20px;border:1px solid var(--b1);background:var(--bg3);margin-bottom:11px;width:fit-content"></div>';

  H += '<div class="hero">'
     + '<span class="badge">\uD83D\uDCD8 Project Passbook</span>'
     + '<div class="cname">'+esc(c.n||'Customer')+'</div>'
     + (c.pr?'<div class="cproj">\uD83C\uDFE0 '+esc(c.pr)+'</div>':'')
     + '<div class="cmeta">'
     + (c.st?'<span class="chip" style="color:'+stCol+';border-color:'+stCol+'40">\u25CF '+esc(c.st)+'</span>':'')
     + (c.ad?'<span class="chip">\uD83D\uDCCD '+esc(c.ad)+'</span>':'')
     + (c.sq?'<span class="chip">\uD83D\uDCD0 '+num(c.sq).toLocaleString('en-IN')+' sq ft</span>':'')
     + (c.sd?'<span class="chip">\uD83D\uDE80 Started '+fmtD(c.sd)+'</span>':'')
     + (c.ed?'<span class="chip">\uD83C\uDFC1 Target '+fmtD(c.ed)+'</span>':'')
     + (hasD(P.d) ? '<span class="chip">\uD83D\uDD52 As of '+fmtD(P.d)+'</span>' : '')
     + '</div></div>';

  /* ── KPIs ── */
  var kpis = [
    K.noContract
      ? {i:'\uD83D\uDCB0', l:'Contract Value', v:'\u2014', c:'var(--text3)', s:'not set yet'}
      : {i:'\uD83D\uDCB0', l:'Contract Value', v:fmtS(K.contract), c:'var(--amber)', s:K.agreed>0?'agreed stage total':'project budget'},
    {i:'\uD83D\uDCB5', l:'Total Received', v:fmtS(K.net), c:'var(--lime)',
      s:K.refunded>0?('after '+fmtS(K.refunded)+' refund'):(K.noContract?'received to date':(K.payPct+'% collected'))},
    K.noContract
      ? {i:'\u2139\uFE0F', l:'Balance to Pay', v:'\u2014', c:'var(--text3)', s:'ask your contractor'}
      : {i:K.over>0?'\u2705':'\u23F3', l:K.over>0?'Advance Paid':'Balance to Pay', v:fmtS(K.over>0?K.over:K.balance), c:K.balance>0?'var(--coral)':'var(--mint)', s:K.balance>0?'still outstanding':'fully settled'},
    {i:'\uD83C\uDFD7\uFE0F', l:'Work Progress', v:K.prog+'%', c:'var(--cyan)', s:K.ph.length?(K.ph.filter(function(r){return r[2]==='Completed';}).length+' of '+K.ph.length+' phases done'):'no phases yet'}
  ];
  H += '<div class="kpis">'+kpis.map(function(k,i){
    return '<div class="kpi" style="color:'+k.c+';animation-delay:'+(i*0.08)+'s">'
      + '<div class="ic">'+k.i+'</div>'
      + '<div class="vl" style="color:'+k.c+'">'+k.v+'</div>'
      + '<div class="lb">'+k.l+'</div>'
      + '<div class="sb">'+k.s+'</div></div>';
  }).join('')+'</div>';

  /* ── payment progress bar ── */
  if(K.contract>0){
    H += '<div class="card in" style="margin-top:12px">'
      + '<div class="row"><b style="font-size:11.5px;letter-spacing:1.4px;color:var(--text3);text-transform:uppercase">Payment Collected</b>'
      + '<b class="mono" style="font-size:13px;color:var(--lime)">'+K.payPct+'%</b></div>'
      + '<div class="bar"><i data-w="'+K.payPct+'" style="background:linear-gradient(90deg,var(--lime),var(--cyan))"></i></div>'
      + '<div class="row" style="margin-top:8px;font-size:11px;color:var(--text4);font-weight:700">'
      + '<span>'+fmt(K.net)+' received</span><span>'+fmt(K.contract)+' total</span></div>'
      + '</div>';
  }

  /* ── UPI pay now ── */
  if(P.o && P.o.u && co.u && K.balance>0 && /^[A-Za-z0-9._\-]+@[A-Za-z0-9.\-]+$/.test(String(co.u).trim())){
    /* A VPA can only ever contain these characters. Anything else is either a
       typo or an injection attempt, and both must not reach the payment app. */
    var vpa = String(co.u).trim().replace(/[^A-Za-z0-9._\-@]/g,'');
    var amt = K.balance.toFixed(2);
    var pn  = encodeURIComponent(co.n||'Contractor');
    var note= encodeURIComponent('Project payment \u2014 '+(c.pr||c.n||''));
    var q   = 'pa='+encodeURIComponent(vpa)+'&pn='+pn+'&am='+encodeURIComponent(amt)+'&cu=INR&tn='+note;
    var waN = String(co.p||'').replace(/[^\d]/g,'');
    if(waN.length===10) waN='91'+waN;
    var waMsg = encodeURIComponent('Hello '+(co.n||'')+',\n\nI have made a payment for my project *'+(c.pr||c.n||'')+'*.\n\nAmount: '+fmt(K.balance)+'\nUTR / Reference: \n\nPlease confirm receipt. Thank you.');
    H += '<div class="sec"><div class="stitle"><b style="color:var(--mint)">\uD83D\uDCB3 Pay Now</b>'
      + '<span class="n">'+fmt(K.balance)+' due</span></div>'
      + '<div class="upi">'
      + '<a class="ub" style="border-color:rgba(66,133,244,.35)" href="tez://upi/pay?'+q+'"><em>\uD83D\uDD35</em>GPay</a>'
      + '<a class="ub" style="border-color:rgba(93,58,155,.45)" href="phonepe://pay?'+q+'"><em>\uD83D\uDFE3</em>PhonePe</a>'
      + '<a class="ub" style="border-color:rgba(0,186,245,.35)" href="paytmmp://pay?'+q+'"><em>\uD83D\uDD37</em>Paytm</a>'
      + '<a class="ub" style="border-color:rgba(37,211,102,.35)" href="upi://pay?'+q+'"><em>\uD83D\uDCB8</em>Any UPI</a>'
      + '</div>'
      + '<div style="font-size:10.5px;color:var(--text4);text-align:center;margin-top:9px;font-weight:600">Paying to <b class="mono" style="color:var(--text3)">'+esc(vpa)+'</b></div>'
      + (waN?'<a class="ub noprint" style="flex-direction:row;justify-content:center;margin-top:9px;background:rgba(37,211,102,.10);border-color:rgba(37,211,102,.35);color:#25D366" href="https://wa.me/'+waN+'?text='+waMsg+'"><em>\uD83D\uDCF2</em> Send payment confirmation on WhatsApp</a>':'')
      + '</div>';
  }

  /* ── stage payment plan ── */
  if(K.plan.length){
    var coll = K.spays.reduce(function(s,r){ return s+num(r[2]); },0);
    H += '<div class="sec"><div class="stitle"><b style="color:var(--violet)">\uD83D\uDCB3 Stage Payment Plan</b><span class="n">'+K.plan.length+' stages</span></div>';
    K.plan.forEach(function(st){
      var sid = st[0], nm = st[1], amt = num(st[2]), due = st[3];
      var paid = K.spays.filter(function(p){ return p[0]===sid; }).reduce(function(s,p){ return s+num(p[2]); },0);
      var pct  = amt>0 ? Math.min(Math.round(paid/amt*100),100) : (paid>0?100:0);
      var done = amt>0 && paid>=amt;
      var mark = done ? '\u2705' : paid>0 ? '\uD83D\uDD36' : '\u2B1C';
      var col  = done ? 'var(--mint)' : paid>0 ? 'var(--amber)' : 'var(--text4)';
      var dueD = parseD(due), late = (!done && dueD && dueD < todayD());
      H += '<div class="card"><div class="row">'
        + '<div style="min-width:0"><div style="font-size:13px;font-weight:800">'+mark+' '+esc(nm)+'</div>'
        + '<div style="font-size:10.5px;color:var(--text4);margin-top:3px;font-weight:700">'
        + (due?('Due '+fmtD(due)+(late?' \u2014 <span style="color:var(--coral)">'+daysBetween(todayD(),dueD)+' days overdue</span>':'')):'No due date')
        + '</div></div>'
        + '<div style="text-align:right;flex-shrink:0"><div class="mono" style="font-size:13.5px;font-weight:900;color:'+col+'">'+fmt(paid)+'</div>'
        + '<div style="font-size:10px;color:var(--text4);font-weight:700">of '+fmt(amt)+'</div></div>'
        + '</div><div class="bar"><i data-w="'+pct+'" style="background:'+col+'"></i></div></div>';
    });
    H += '<div class="card in" style="background:var(--bg3)">'
      + '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">Total Agreed</span><span class="mono">'+fmt(K.agreed)+'</span></div>'
      + '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">Collected</span><span class="mono" style="color:var(--lime)">'+fmt(coll)+'</span></div>'
      + '<div class="tot"><span>Balance</span><span class="mono" style="color:'+(K.agreed-coll>0?'var(--coral)':'var(--mint)')+'">'+fmt(Math.max(K.agreed-coll,0))+(K.agreed-coll<=0?' \u2705':'')+'</span></div>'
      + '</div></div>';
  }

  /* ── payment ledger ── */
  var allPays = [];
  K.py.forEach(function(r){ allPays.push({d:r[0], a:num(r[1]), m:r[2]||'', t:r[3]||'Payment', ref:r[4]||'', src:''}); });
  K.spays.forEach(function(r){
    var st = K.plan.filter(function(s){ return s[0]===r[0]; })[0];
    allPays.push({d:r[1], a:num(r[2]), m:r[3]||'', t:'Stage', ref:r[4]||'', src:st?st[1]:''});
  });
  allPays.sort(function(a,b){ return String(b.d||'').localeCompare(String(a.d||'')); });
  if(allPays.length){
    H += '<div class="sec"><div class="stitle"><b style="color:var(--lime)">\uD83E\uDD1D Payment Ledger</b><span class="n">'+allPays.length+' entries</span></div>'
      + '<div class="card in" style="padding:4px 4px 8px"><table class="tbl"><thead><tr>'
      + '<th>Date</th><th>Details</th><th class="r">Amount</th></tr></thead><tbody>';
    var run = 0;
    allPays.slice().reverse().forEach(function(p){ p._run = (run += (String(p.t).toLowerCase()==='refund'? -p.a : p.a)); });
    allPays.forEach(function(p){
      var isRef = String(p.t).toLowerCase()==='refund';
      var pcol  = isRef ? 'var(--coral)' : 'var(--lime)';
      H += '<tr><td class="mono" style="white-space:nowrap;font-size:11px">'+fmtD(p.d)+'</td>'
        + '<td><div style="font-weight:800;color:var(--text)">'+esc(p.src||p.t)+'</div>'
        + '<div style="font-size:10px;color:var(--text4);margin-top:2px">'+esc(p.m)+(p.ref?' \u00B7 '+esc(p.ref):'')+'</div></td>'
        + '<td class="r mono" style="font-weight:900;color:'+pcol+';white-space:nowrap">'+(isRef?'\u2212':'')+fmt(p.a)
        + '<div style="font-size:9.5px;color:var(--text4);font-weight:700;margin-top:2px">bal '+fmtS(p._run)+'</div></td></tr>';
    });
    H += '</tbody></table>'
      + '<div class="tot"><span>Total Received</span><span class="mono" style="color:var(--lime)">'+fmt(K.net)+'</span></div>'
      + '</div></div>';
  }

  /* ── work progress ── */
  if(K.ph.length){
    var order = {'In Progress':0,'On Hold':1,'Not Started':2,'Completed':3,'Cancelled':4};
    var phs = K.ph.slice().sort(function(a,b){ return (order[a[2]]==null?9:order[a[2]]) - (order[b[2]]==null?9:order[b[2]]); });
    H += '<div class="sec"><div class="stitle"><b style="color:var(--cyan)">\uD83D\uDD28 Work Progress</b><span class="n">'+K.prog+'% overall</span></div>';
    phs.forEach(function(r){
      var nm=r[0], cat=r[1], st=r[2], comp=num(r[3]), sd=r[4], ed=r[5], con=r[6], nt=r[7];
      var col = st==='Completed'?'var(--mint)':st==='In Progress'?'var(--cyan)':st==='On Hold'?'var(--amber)':st==='Cancelled'?'var(--coral)':'var(--text4)';
      var edD = parseD(ed), late = (st!=='Completed' && st!=='Cancelled' && edD && edD < todayD());
      H += '<div class="card"><div class="row">'
        + '<div style="min-width:0"><div style="font-size:13px;font-weight:800">'+esc(nm)+'</div>'
        + '<div style="font-size:10.5px;color:var(--text4);margin-top:3px;font-weight:700">'
        + (cat?esc(cat)+' \u00B7 ':'')+(sd?fmtD(sd):'')+(sd&&ed?' \u2192 ':'')+(ed?fmtD(ed):'')
        + (con?' \u00B7 '+esc(con):'')+'</div></div>'
        + '<span class="pill" style="background:'+col+'1E;color:'+col+';border:1px solid '+col+'44">'+esc(st)+'</span>'
        + '</div>'
        + '<div class="bar"><i data-w="'+comp+'" style="background:'+col+'"></i></div>'
        + '<div class="row" style="margin-top:6px"><span style="font-size:10px;color:var(--text4);font-weight:700">'
        + (late?'<span style="color:var(--coral)">\u26A0 '+daysBetween(todayD(),edD)+' days overdue</span>':(nt?esc(nt):''))
        + '</span><b class="mono" style="font-size:11.5px;color:'+col+'">'+comp+'%</b></div>'
        + '</div>';
    });
    H += '</div>';
  }

  /* ── site log ── */
  if((P.sl||[]).length){
    H += '<div class="sec"><div class="stitle"><b style="color:var(--amber)">\uD83D\uDCD3 Site Log</b><span class="n">'+P.sl.length+' updates</span></div>';
    P.sl.forEach(function(r){
      var d=r[0], w=r[1], wx=r[2], wd=r[3], iss=r[4];
      H += '<div class="card"><div class="row">'
        + '<b style="font-size:12.5px;color:var(--amber)">'+fmtD(d)+'</b>'
        + '<span style="font-size:10.5px;color:var(--text4);font-weight:700">'+(w?'\uD83D\uDC77 '+esc(w)+' workers':'')+(w&&wx?' \u00B7 ':'')+(wx?esc(wx):'')+'</span></div>'
        + (wd?'<div style="font-size:12px;color:var(--text2);margin-top:8px;line-height:1.6;font-weight:600">'+esc(wd)+'</div>':'')
        + (iss?'<div style="font-size:11.5px;color:var(--coral);margin-top:7px;font-weight:700">\u26A0 '+esc(iss)+'</div>':'')
        + '</div>';
    });
    H += '</div>';
  }

  /* ── photos summary ── */
  if((P.pt||[]).length){
    var tot = P.pt.reduce(function(s,r){ return s+num(r[1]); },0);
    H += '<div class="sec"><div class="stitle"><b style="color:var(--pink)">\uD83D\uDCF8 Site Photos</b><span class="n">'+tot+' photos</span></div>'
      + '<div class="card in"><div style="display:flex;flex-wrap:wrap;gap:7px">'
      + P.pt.map(function(r){
          return '<span class="chip" style="color:var(--text2)">'+esc(r[0])+' \u00B7 <b style="color:var(--pink)">'+num(r[1])+'</b></span>';
        }).join('')
      + '</div><div style="font-size:10.5px;color:var(--text4);margin-top:10px;font-weight:600">Photos are kept on file \u2014 ask your contractor to share them on WhatsApp.</div></div></div>';
  }

  /* ── cost summary ── */
  if(K.spent!==0 || K.matVal!==0 || K.ncTotal!==0){
    var _internal = !!(P.f && P.f.i);          /* were internal figures opted in? */
    var _rows = 0;
    var _body = '';
    if(K.spent!==0){ _rows++;
      _body += '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">Work Executed</span><span class="mono">'+fmt(K.spent)+'</span></div>'; }
    if(_internal && K.matVal!==0){ _rows++;
      _body += '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">Materials</span><span class="mono">'+fmt(K.matVal)+'</span></div>'; }
    if(_internal && K.ncTotal!==0){ _rows++;
      _body += '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">Site Expenses</span><span class="mono">'+fmt(K.ncTotal)+'</span></div>'; }
    /* a one-line "total" that just repeats the line above it is noise */
    if(_rows>1) _body += '<div class="tot"><span>Total Cost to Date</span><span class="mono" style="color:var(--amber)">'+fmt(K.spent+(_internal?K.matVal+K.ncTotal:0))+'</span></div>';
    if(_rows) H += '<div class="sec"><div class="stitle"><b style="color:var(--text3)">\uD83D\uDCCA Cost Summary</b></div>'
      + '<div class="card in">'+_body+'</div></div>';
  }

  /* ── note ── */
  if(P.c && P.c.nt){
    H += '<div class="sec"><div class="card in" style="border-color:rgba(255,176,32,.28);background:rgba(255,176,32,.06)">'
      + '<div style="font-size:10px;font-weight:900;letter-spacing:1.6px;color:var(--amber);text-transform:uppercase;margin-bottom:7px">\uD83D\uDCCC Note</div>'
      + '<div style="font-size:12.5px;line-height:1.65;color:var(--text2);font-weight:600">'+esc(P.c.nt)+'</div></div></div>';
  }

  /* ── actions + footer ── */
  H += '<div class="tog noprint">'
    + '<button onclick="window.print()">\uD83D\uDDA8 Print / Save PDF</button>'
    + '<button onclick="location.reload()">\uD83D\uDD04 Reload</button>'
    + '</div>';

  H += '<div class="foot">'
    + (co.n?'<div style="font-size:14px;font-weight:900;color:var(--text2)">\uD83C\uDFE2 '+esc(co.n)+'</div>':'')
    + (co.p?'<div>\uD83D\uDCDE '+esc(co.p)+'</div>':'')
    + (co.e?'<div>\u2709\uFE0F '+esc(co.e)+'</div>':'')
    + (co.a?'<div>\uD83D\uDCCD '+esc(co.a)+'</div>':'')
    + (co.g?'<div class="mono" style="font-size:10px">GSTIN '+esc(co.g)+'</div>':'')
    + '<div style="margin-top:12px;font-size:10px;color:var(--text4);line-height:1.7">'
    + (hasD(P.d) ? 'This passbook is a snapshot taken on '+fmtD(P.d)+'.<br>' : 'This passbook is a snapshot of your project account.<br>')
    + 'For the latest position please contact your contractor.<br>'
    + '<span style="opacity:.6">Powered by BuildLedger \u00B7 Passbook v1.3</span></div>'
    + '</div>';

  $('app').innerHTML = H;
  paintLive();
  animate();
}

/* ── entrance animations ─────────────────────────────────── */
function animate(){
  /* progress bars */
  setTimeout(function(){
    document.querySelectorAll('.bar i').forEach(function(el){
      el.style.width = (Number(el.getAttribute('data-w'))||0)+'%';
    });
  }, 220);
  /* scroll reveal */
  var cards = document.querySelectorAll('.card:not(.in)');
  if(!('IntersectionObserver' in window)){
    cards.forEach(function(c){ c.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(en){
    en.forEach(function(e,i){
      if(e.isIntersecting){
        setTimeout(function(){ e.target.classList.add('in'); }, i*45);
        io.unobserve(e.target);
      }
    });
  }, {rootMargin:'0px 0px -40px 0px', threshold:0.04});
  cards.forEach(function(c){ io.observe(c); });
}

/* ── go ──────────────────────────────────────────────────── */
boot();

</script>
</body>
</html>

