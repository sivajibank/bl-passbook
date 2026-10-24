<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="theme-color" content="#F2F3FA">
<title>Project Passbook</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+Tamil:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="manifest" href="data:application/manifest+json,%7B%22name%22%3A%22Project%20Passbook%22%2C%22short_name%22%3A%22Passbook%22%2C%22start_url%22%3A%22.%22%2C%22display%22%3A%22standalone%22%2C%22background_color%22%3A%22%23F2F3FA%22%2C%22theme_color%22%3A%22%234338CA%22%7D">
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
/* ══ Passbook v4 — "Prism": a bright glass sheet over a slow colour field.
   Every accent has a job: indigo = contract, mint = money in, coral = still
   to pay, amber = work on site. Light by default, dark when the phone is. */
@property --ang{syntax:'<angle>';inherits:false;initial-value:0deg}
:root{
  --bg:#F2F3FA; --bg2:#FFFFFF; --glass:rgba(255,255,255,.74); --glass2:rgba(255,255,255,.5); --sunk:rgba(17,24,64,.045);
  --line:rgba(17,24,64,.08); --line2:rgba(17,24,64,.15);
  --text:#0E1530; --text2:#384160; --text3:#646D8C; --text4:#8A91AA;
  --indigo:#5B5BF6; --violet:#8B5CF6; --pink:#EC4899; --coral:#F43F5E; --amber:#F59E0B; --orange:#F97316;
  --mint:#10B981; --teal:#14B8A6; --cyan:#06B6D4; --sky:#3B82F6; --lime:#65A30D;
  --shadow:0 1px 2px rgba(17,24,64,.05),0 10px 30px -14px rgba(17,24,64,.20);
  --shadowL:0 2px 4px rgba(17,24,64,.05),0 24px 50px -24px rgba(17,24,64,.30);
  --ease:cubic-bezier(.22,1,.36,1); --spring:cubic-bezier(.34,1.56,.64,1);
  --mono:'JetBrains Mono',ui-monospace,monospace;
  /* names the older code paths still use */
  --bg1:var(--bg); --bg3:var(--sunk); --bg4:var(--sunk); --b1:var(--line); --b2:var(--line2);
  --datum:var(--cyan); --marking:var(--orange); --rebar:var(--amber); --verdigris:var(--mint); --alarm:var(--coral); --chalk:var(--text2);
  --r:18px; color-scheme:light;
}
@media (prefers-color-scheme:dark){ :root:not([data-theme=light]){
  --bg:#080C1B; --bg2:#111733; --glass:rgba(20,26,54,.72); --glass2:rgba(255,255,255,.05); --sunk:rgba(255,255,255,.055);
  --line:rgba(170,180,255,.11); --line2:rgba(170,180,255,.2);
  --text:#EEF1FF; --text2:#C5CBE8; --text3:#8F97BB; --text4:#69729A;
  --shadow:0 1px 2px rgba(0,0,0,.3),0 14px 34px -16px rgba(0,0,0,.7); --shadowL:0 30px 60px -28px rgba(0,0,0,.8);
  color-scheme:dark }}
:root[data-theme=dark]{
  --bg:#080C1B; --bg2:#111733; --glass:rgba(20,26,54,.72); --glass2:rgba(255,255,255,.05); --sunk:rgba(255,255,255,.055);
  --line:rgba(170,180,255,.11); --line2:rgba(170,180,255,.2);
  --text:#EEF1FF; --text2:#C5CBE8; --text3:#8F97BB; --text4:#69729A;
  --shadow:0 1px 2px rgba(0,0,0,.3),0 14px 34px -16px rgba(0,0,0,.7); --shadowL:0 30px 60px -28px rgba(0,0,0,.8);
  color-scheme:dark }
html{scroll-behavior:smooth;background:var(--bg)}
html,body{color:var(--text);font-family:'Outfit','Noto Sans Tamil',system-ui,-apple-system,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
body{background:var(--bg);min-height:100vh;overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom)}
.mono,.num{font-variant-numeric:tabular-nums}
.mono{font-family:var(--mono)}
button{font-family:inherit}

/* ── the colour field ─────────────────────────────────────────────── */
#mesh{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
#mesh i{position:absolute;border-radius:50%;filter:blur(70px);opacity:.42;will-change:transform}
#mesh i:nth-child(1){width:60vmax;height:60vmax;left:-22vmax;top:-26vmax;background:radial-gradient(circle,#818CF8,transparent 65%);animation:drift1 26s ease-in-out infinite alternate}
#mesh i:nth-child(2){width:52vmax;height:52vmax;right:-20vmax;top:-12vmax;background:radial-gradient(circle,#F472B6,transparent 65%);animation:drift2 31s ease-in-out infinite alternate}
#mesh i:nth-child(3){width:58vmax;height:58vmax;left:-6vmax;bottom:-34vmax;background:radial-gradient(circle,#22D3EE,transparent 65%);animation:drift3 35s ease-in-out infinite alternate;opacity:.32}
#mesh::after{content:'';position:absolute;inset:0;background-image:radial-gradient(color-mix(in srgb,var(--text) 9%,transparent) 1px,transparent 1.2px);background-size:22px 22px;
  mask-image:linear-gradient(180deg,#000,transparent 70%);-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);opacity:.55}
@keyframes drift1{to{transform:translate(9vmax,7vmax) scale(1.12)}}
@keyframes drift2{to{transform:translate(-8vmax,10vmax) scale(.92)}}
@keyframes drift3{to{transform:translate(7vmax,-9vmax) scale(1.08)}}
:root[data-theme=dark] #mesh i{opacity:.3}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) #mesh i{opacity:.3}}

/* reading progress */
#prog{position:fixed;top:0;left:0;right:0;height:3px;z-index:85;transform-origin:0 50%;transform:scaleX(0);
  background:linear-gradient(90deg,var(--indigo),var(--pink),var(--amber));pointer-events:none}

.wrap{position:relative;z-index:1;max-width:860px;margin:0 auto;padding:16px 16px 70px}

/* ── sticky header with section links (appears once the hero scrolls away) ── */
#topbar{position:fixed;top:0;left:0;right:0;z-index:70;transform:translateY(-110%);transition:transform .45s var(--ease);
  background:color-mix(in srgb,var(--bg2) 78%,transparent);-webkit-backdrop-filter:blur(20px) saturate(170%);backdrop-filter:blur(20px) saturate(170%);
  border-bottom:1px solid var(--line);box-shadow:0 10px 30px -22px rgba(17,24,64,.45)}
#topbar.show{transform:none}
#topbar .tb{max-width:860px;margin:0 auto;padding:9px 16px 0;display:flex;align-items:center;gap:10px}
#topbar .av{width:34px;height:34px;flex:0 0 34px;border-radius:11px;display:grid;place-items:center;font-weight:900;font-size:13px;color:#fff;
  background:linear-gradient(135deg,var(--indigo),var(--pink))}
#topbar .who{min-width:0;flex:1}
#topbar .who b{display:block;font-size:14.5px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#topbar .who small{display:block;font-size:11.5px;color:var(--text3);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#topbar .bal{flex:0 0 auto;font-size:12.5px;font-weight:800;padding:6px 11px;border-radius:999px;white-space:nowrap}
#snav{max-width:860px;margin:0 auto;display:flex;gap:6px;overflow-x:auto;padding:9px 16px 10px;scrollbar-width:none}
#snav::-webkit-scrollbar{display:none}
#snav a{flex:0 0 auto;font-size:12.5px;font-weight:800;color:var(--text3);text-decoration:none;padding:6px 12px;border-radius:999px;
  border:1px solid var(--line);background:var(--glass2);transition:all .3s var(--ease)}
#snav a.on{color:#fff;border-color:transparent;background:linear-gradient(135deg,var(--indigo),var(--violet));box-shadow:0 8px 18px -10px var(--indigo)}

/* ── PIN gate ─────────────────────────────────────────────────────── */
#gate{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:22px;overflow:hidden;color:#fff;
  background:radial-gradient(90% 60% at 15% 0%,#6366F1 0%,transparent 60%),radial-gradient(80% 60% at 100% 20%,#DB2777 0%,transparent 55%),
    radial-gradient(90% 70% at 50% 110%,#0891B2 0%,transparent 60%),#1E1B4B;
  transition:opacity .55s ease,transform .6s var(--ease)}
#gate::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.2px);background-size:22px 22px;
  mask-image:radial-gradient(70% 60% at 50% 40%,#000,transparent);-webkit-mask-image:radial-gradient(70% 60% at 50% 40%,#000,transparent)}
#gate.out{opacity:0;transform:scale(1.06);pointer-events:none}
.gcard{position:relative;width:100%;max-width:340px;text-align:center;padding:26px 22px 22px;border-radius:28px;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);-webkit-backdrop-filter:blur(22px);backdrop-filter:blur(22px);
  box-shadow:0 40px 80px -30px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.25);animation:rise .8s var(--ease) both}
.glogo{position:relative;width:78px;height:78px;margin:0 auto 16px;border-radius:24px;display:grid;place-items:center;font-size:36px;
  background:linear-gradient(135deg,rgba(255,255,255,.28),rgba(255,255,255,.08));box-shadow:0 18px 40px -16px rgba(0,0,0,.6);animation:float 4s ease-in-out infinite}
.glogo::before{content:'';position:absolute;inset:-3px;border-radius:27px;padding:2px;
  background:conic-gradient(from var(--ang),#A5B4FC,#F9A8D4,#FDE68A,#67E8F9,#A5B4FC);animation:spinAng 4s linear infinite;
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
@keyframes spinAng{to{--ang:360deg}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes rise{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}
.gtitle{font-size:22px;font-weight:900;letter-spacing:-.4px}
.gsub{font-size:13px;color:rgba(255,255,255,.78);margin-top:6px;font-weight:600;line-height:1.5}
.cells{display:flex;gap:10px;justify-content:center;margin:22px 0 4px}
.cell{width:50px;height:60px;border-radius:16px;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.28);
  display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;transition:all .25s var(--spring);position:relative;overflow:hidden}
.cell.on{border-color:#fff;background:rgba(255,255,255,.24);transform:translateY(-3px) scale(1.04);box-shadow:0 10px 26px -10px rgba(255,255,255,.6)}
.cell.on::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.5) 50%,transparent 65%);animation:sweep .55s ease}
@keyframes sweep{from{transform:translateX(-120%)}to{transform:translateX(120%)}}
.cells.bad{animation:shake .42s}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-11px)}40%{transform:translateX(9px)}60%{transform:translateX(-6px)}80%{transform:translateX(4px)}}
.cells.bad .cell{border-color:#FDA4AF;background:rgba(244,63,94,.28)}
#gmsg{font-size:12.5px;font-weight:800;color:#FECDD3;min-height:18px;margin-top:8px}
.pad{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px}
.key{height:56px;border-radius:18px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#fff;
  font-size:22px;font-weight:800;cursor:pointer;transition:transform .12s,background .2s}
.key:active{transform:scale(.92);background:rgba(255,255,255,.26)}
.key.fn{font-size:14px;color:rgba(255,255,255,.75)}
#pin{position:absolute;opacity:0;pointer-events:none;height:0;width:0}

/* ── hero ─────────────────────────────────────────────────────────── */
.hero{position:relative;overflow:hidden;isolation:isolate;border-radius:28px;padding:18px 18px 16px;color:#fff;
  background:linear-gradient(135deg,#4338CA 0%,#6D28D9 42%,#C026D3 78%,#DB2777 100%);
  box-shadow:0 34px 70px -34px rgba(91,33,182,.85),inset 0 1px 0 rgba(255,255,255,.28);animation:rise .9s var(--ease) both}
.hero::before{content:'';position:absolute;inset:-40%;z-index:-1;
  background:radial-gradient(40% 35% at 30% 30%,rgba(255,255,255,.28),transparent 70%),radial-gradient(35% 30% at 75% 70%,rgba(251,191,36,.35),transparent 70%);
  animation:heroLight 14s ease-in-out infinite alternate}
@keyframes heroLight{to{transform:translate(12%,8%) rotate(18deg)}}
.hero::after{content:'';position:absolute;right:-70px;bottom:-90px;width:260px;height:260px;z-index:-1;border-radius:50%;
  background:repeating-radial-gradient(circle,rgba(255,255,255,.14) 0 1px,transparent 1px 16px);opacity:.8}
.htop{display:flex;align-items:center;gap:10px}
.hlogo{width:38px;height:38px;flex:0 0 38px;border-radius:12px;display:grid;place-items:center;font-weight:900;font-size:14px;
  background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3)}
.hco{min-width:0;flex:1;font-size:13px;font-weight:700;line-height:1.25;opacity:.92}
.hco small{display:block;font-size:10px;letter-spacing:1.3px;text-transform:uppercase;opacity:.75;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hco{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.live{display:inline-flex;align-items:center;gap:6px;flex:0 0 auto;font-size:11px;font-weight:800;padding:6px 10px;border-radius:999px;
  background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.28);white-space:nowrap}
.live i{width:7px;height:7px;border-radius:50%;background:#fff}
.live.on i{background:#6EE7B7;box-shadow:0 0 0 0 rgba(110,231,183,.7);animation:ping 1.8s infinite}
.live.off i{background:#FCD34D}
@keyframes ping{70%{box-shadow:0 0 0 7px rgba(110,231,183,0)}100%{box-shadow:0 0 0 0 rgba(110,231,183,0)}}
.hmain{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;margin-top:16px}
.cname{font-size:28px;font-weight:900;letter-spacing:-.9px;line-height:1.08;text-wrap:balance}
.cproj{font-size:14.5px;font-weight:700;margin-top:5px;opacity:.92}
.hring{position:relative;width:118px;height:118px}
.hring svg{width:118px;height:118px;display:block;overflow:visible}
.hring .rbg{fill:none;stroke:rgba(255,255,255,.17)}
.hring .r1,.hring .r2{fill:none;transition:stroke-dashoffset 1.6s var(--ease)}
.hring .r1{stroke:url(#gPaid);filter:drop-shadow(0 0 6px rgba(255,255,255,.45))}
.hring .r2{stroke:url(#gWork)}
.hring .ctr{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.hring .ctr b{font-size:23px;font-weight:900;letter-spacing:-.6px;line-height:1}
.hring .ctr small{font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;opacity:.82;margin-top:3px}
.hleg{display:flex;justify-content:center;gap:10px;margin-top:6px;font-size:10.5px;font-weight:800;opacity:.9}
.hleg i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px;vertical-align:0}
.cmeta{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
.chip{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:700;padding:5px 10px;border-radius:999px;
  background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.24);color:#fff;white-space:nowrap}
.chip.st::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--dot,#6EE7B7);box-shadow:0 0 8px var(--dot,#6EE7B7)}

/* ── next payment due ─────────────────────────────────────────────── */
.due{--a:var(--indigo);position:relative;display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:14px;align-items:center;margin-top:14px;
  padding:14px 14px 14px 18px;border-radius:22px;background:var(--glass);-webkit-backdrop-filter:blur(18px) saturate(160%);backdrop-filter:blur(18px) saturate(160%);
  border:1px solid color-mix(in srgb,var(--a) 28%,var(--line));box-shadow:var(--shadow);overflow:hidden;animation:rise .8s .1s var(--ease) both}
.due::before{content:'';position:absolute;left:0;top:0;bottom:0;width:5px;background:linear-gradient(180deg,var(--a),color-mix(in srgb,var(--a) 40%,#fff))}
.due::after{content:'';position:absolute;right:-40px;top:-60px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--a) 22%,transparent),transparent 70%);pointer-events:none}
.cal{width:56px;border-radius:15px;overflow:hidden;text-align:center;background:var(--bg2);box-shadow:0 10px 22px -12px var(--a);border:1px solid color-mix(in srgb,var(--a) 25%,var(--line))}
.cal small{display:block;font-size:10px;font-weight:900;letter-spacing:1.4px;color:#fff;padding:4px 0 3px;background:linear-gradient(135deg,var(--a),color-mix(in srgb,var(--a) 60%,var(--pink)))}
.cal b{display:block;font-size:23px;font-weight:900;padding:4px 0 5px;color:var(--text);letter-spacing:-.5px}
.due.over .cal{animation:alarm 1.6s ease-in-out infinite}
@keyframes alarm{0%,100%{box-shadow:0 0 0 0 color-mix(in srgb,var(--a) 55%,transparent)}50%{box-shadow:0 0 0 8px transparent}}
.due .eb{font-size:10.5px;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;color:var(--a)}
.due .nm{font-size:16px;font-weight:800;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.due .wh{font-size:12.5px;font-weight:700;color:var(--text3);margin-top:2px}
.due .wh b{color:var(--a)}
.due .amt{text-align:right;position:relative;z-index:1}
.due .amt b{display:block;font-size:19px;font-weight:900;letter-spacing:-.5px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:0;cursor:pointer;text-decoration:none;font-weight:800;font-size:12.5px;
  padding:8px 14px;border-radius:999px;transition:transform .15s var(--spring),box-shadow .25s,filter .2s;white-space:nowrap}
.btn:active{transform:scale(.95)}
.btn.pri{color:#fff;background:linear-gradient(135deg,var(--a,var(--indigo)),color-mix(in srgb,var(--a,var(--indigo)) 55%,var(--pink)));box-shadow:0 10px 22px -10px var(--a,var(--indigo))}
.btn.gh{color:var(--text2);background:var(--glass);border:1px solid var(--line2)}
.due .btn{margin-top:7px}
@media(max-width:440px){
  .due{grid-template-columns:auto minmax(0,1fr)}
  .due .amt{grid-column:1 / -1;display:flex;align-items:center;justify-content:space-between;text-align:left;border-top:1px dashed var(--line2);padding-top:10px}
  .due .btn{margin-top:0}
}

/* ── KPI cards ────────────────────────────────────────────────────── */
.kpis{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:14px}
@media(min-width:720px){.kpis{grid-template-columns:repeat(4,minmax(0,1fr))}}
.kpi{--a:var(--indigo);--b:var(--violet);position:relative;isolation:isolate;display:flex;flex-direction:column;min-height:168px;
  padding:14px 14px 12px;border-radius:22px;overflow:hidden;outline:none;
  background:linear-gradient(165deg,color-mix(in srgb,var(--a) 15%,var(--bg2)) 0%,var(--bg2) 62%);
  border:1px solid color-mix(in srgb,var(--a) 20%,var(--line));box-shadow:var(--shadow);
  opacity:0;transform:translateY(18px) scale(.96);filter:blur(6px);
  animation:kin .85s var(--ease) var(--d,0ms) forwards;
  transition:box-shadow .4s var(--ease),border-color .4s}
@keyframes kin{to{opacity:1;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));filter:none}}
.kpi.settled{transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .35s var(--ease),box-shadow .4s var(--ease)}
/* a light that travels round the edge */
.kpi::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.5px;z-index:2;pointer-events:none;
  background:conic-gradient(from var(--ang),transparent 0 62%,var(--a) 78%,var(--b) 88%,transparent 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;
  animation:spinAng 5s linear infinite;opacity:.0;transition:opacity .5s}
.kpi.glow::before,.kpi:hover::before,.kpi:focus-visible::before{opacity:1}
/* a soft orb in the corner, and a spotlight that follows the finger */
.kpi::after{content:'';position:absolute;z-index:-1;right:-34px;top:-34px;width:120px;height:120px;border-radius:50%;
  background:radial-gradient(circle,color-mix(in srgb,var(--a) 30%,transparent),transparent 70%);animation:orb 7s ease-in-out infinite alternate}
@keyframes orb{to{transform:translate(-14px,12px) scale(1.15)}}
.kpi .spot{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:0;transition:opacity .35s;
  background:radial-gradient(160px 110px at var(--gx,50%) var(--gy,0%),color-mix(in srgb,var(--a) 18%,transparent),transparent 70%)}
.kpi:hover .spot{opacity:1}
.kpi:hover{box-shadow:var(--shadowL),0 18px 40px -22px var(--a)}
.khead{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
.kic{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;font-size:19px;
  background:linear-gradient(135deg,var(--a),var(--b));box-shadow:0 10px 20px -10px var(--a),inset 0 1px 0 rgba(255,255,255,.35)}
.kic svg{width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.kbadge{font-size:11px;font-weight:900;padding:4px 8px;border-radius:999px;color:color-mix(in srgb,var(--a) 75%,var(--text));
  background:color-mix(in srgb,var(--a) 13%,transparent);border:1px solid color-mix(in srgb,var(--a) 25%,transparent);white-space:nowrap}
.klab{margin-top:12px;font-size:10.5px;font-weight:900;letter-spacing:1.3px;text-transform:uppercase;color:var(--text3);line-height:1.25}
.kval{margin-top:3px;font-size:25px;font-weight:900;letter-spacing:-.8px;line-height:1.08;font-variant-numeric:tabular-nums;
  color:color-mix(in srgb,var(--a) 62%,var(--text))}
.ksub{font-size:11.5px;font-weight:700;color:var(--text3);margin-top:3px;line-height:1.35}
.kviz{margin-top:auto;padding-top:10px}
@media(min-width:720px){.kval{font-size:24px}}
@media(max-width:360px){.kval{font-size:21px}}
/* mini visuals */
.kbar{height:8px;border-radius:99px;background:color-mix(in srgb,var(--a) 13%,transparent);overflow:hidden}
.kbar i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,var(--a),var(--b));transition:width 1.4s var(--ease) .35s;position:relative;overflow:hidden}
.kbar i::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:translateX(-100%);animation:sheen 2.6s 1.4s ease-in-out infinite}
@keyframes sheen{60%,100%{transform:translateX(200%)}}
.kspark{display:block;width:100%;height:34px;overflow:visible}
.kspark path.ln{fill:none;stroke:var(--a);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);transition:stroke-dashoffset 1.6s var(--ease) .35s}
.kspark path.ar{opacity:0;transition:opacity 1s .9s}
.kspark.on path.ln{stroke-dashoffset:0}.kspark.on path.ar{opacity:1}
.kspark circle{fill:var(--bg2);stroke:var(--a);stroke-width:2.4;opacity:0;transition:opacity .4s 1.7s}
.kspark.on circle{opacity:1}
.kdots{display:flex;flex-wrap:wrap;gap:4px}
.kdots i{flex:1 1 0;min-width:8px;max-width:26px;height:8px;border-radius:99px;background:color-mix(in srgb,var(--a) 15%,transparent);transform:scaleX(0);transform-origin:0 50%;animation:dot .5s var(--ease) forwards}
.kdots i.d{background:linear-gradient(90deg,var(--a),var(--b))}
.kdots i.h{background:linear-gradient(90deg,var(--a) 50%,color-mix(in srgb,var(--a) 15%,transparent) 50%)}
@keyframes dot{to{transform:none}}
.kfoot{display:flex;justify-content:space-between;font-size:10.5px;font-weight:800;color:var(--text4);margin-top:6px}

/* ── collected bar ────────────────────────────────────────────────── */
.coll{margin-top:12px}
.coll .row b.t{font-size:12px;font-weight:900;letter-spacing:1.2px;color:var(--text3);text-transform:uppercase}
.coll .pc{font-size:15px;font-weight:900;background:linear-gradient(90deg,var(--mint),var(--cyan));-webkit-background-clip:text;background-clip:text;color:transparent}
.bigbar{position:relative;height:14px;border-radius:99px;background:var(--sunk);overflow:hidden;margin-top:10px}
.bigbar i{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:99px;transition:width 1.6s var(--ease) .3s;
  background:linear-gradient(90deg,var(--mint),var(--cyan),var(--indigo),var(--cyan),var(--mint));background-size:200% 100%;animation:flow 5s linear infinite}
.bigbar i::after{content:'';position:absolute;inset:0;border-radius:inherit;
  background:repeating-linear-gradient(-45deg,rgba(255,255,255,.22) 0 8px,transparent 8px 16px);background-size:22.6px 22.6px;animation:stripes 1s linear infinite}
@keyframes flow{to{background-position:200% 0}}
@keyframes stripes{to{background-position:22.6px 0}}
.coll .lg{display:flex;justify-content:space-between;margin-top:8px;font-size:12px;font-weight:700;color:var(--text3)}
.coll .lg b{color:var(--text)}

/* ── sections ─────────────────────────────────────────────────────── */
.sec{margin-top:30px;scroll-margin-top:108px}
.stitle{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.stitle .si{width:34px;height:34px;flex:0 0 34px;border-radius:12px;display:grid;place-items:center;font-size:16px;
  background:linear-gradient(135deg,var(--a1,var(--indigo)),var(--a2,var(--violet)));box-shadow:0 10px 20px -10px var(--a1,var(--indigo))}
.stitle b{font-size:17px;font-weight:800;letter-spacing:-.3px}
.stitle span.n{margin-left:auto;font-size:11.5px;font-weight:800;color:var(--text3);background:var(--glass);border:1px solid var(--line);padding:4px 10px;border-radius:999px;white-space:nowrap}
.card{position:relative;background:var(--glass);-webkit-backdrop-filter:blur(18px) saturate(160%);backdrop-filter:blur(18px) saturate(160%);
  border:1px solid var(--line);border-radius:var(--r);padding:14px 15px;margin-bottom:10px;box-shadow:var(--shadow);
  opacity:0;transform:translateY(16px);transition:opacity .7s var(--ease),transform .7s var(--ease),border-color .3s,box-shadow .3s}
.card.in{opacity:1;transform:none}
.row{display:flex;justify-content:space-between;align-items:center;gap:12px}
.t1{font-size:14.5px;font-weight:800;color:var(--text)}
.t2{font-size:12px;font-weight:600;color:var(--text3);margin-top:3px;line-height:1.45}
.bar{height:8px;border-radius:99px;background:var(--sunk);overflow:hidden;margin-top:10px}
.bar i{display:block;height:100%;width:0;border-radius:99px;transition:width 1.3s var(--ease);position:relative;overflow:hidden}
.bar i::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);transform:translateX(-100%);animation:sheen 3s 1.3s ease-in-out infinite}
.pill{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:800;padding:4px 9px;border-radius:999px;white-space:nowrap;
  color:var(--c);background:color-mix(in srgb,var(--c) 13%,transparent);border:1px solid color-mix(in srgb,var(--c) 28%,transparent)}
.amt{font-weight:900;font-variant-numeric:tabular-nums;letter-spacing:-.3px}
.tot{display:flex;justify-content:space-between;align-items:center;padding:10px 2px 2px;font-size:14px;font-weight:900;border-top:1px solid var(--line2);margin-top:6px}
.empty{text-align:center;padding:26px 14px;color:var(--text4);font-size:13px;font-weight:600}

/* stage timeline */
.tl{position:relative;padding-left:34px}
.tl::before{content:'';position:absolute;left:12px;top:22px;bottom:22px;width:2px;border-radius:2px;
  background:linear-gradient(180deg,var(--mint),var(--indigo) 60%,var(--line2))}
.tli{position:relative}
.tli .dot{position:absolute;left:-34px;top:15px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:900;
  background:var(--bg2);border:2.5px solid var(--c);color:var(--c);box-shadow:0 0 0 4px var(--bg)}
.tli.done .dot{background:var(--c);color:#fff}
.tli.part .dot{background:conic-gradient(var(--c) calc(var(--p)*1%),var(--bg2) 0)}
.tli.late .dot{animation:alarm 1.8s infinite;--a:var(--coral)}
.trio{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;text-align:center}
.trio div{padding:10px 6px;border-radius:14px;background:var(--sunk)}
.trio small{display:block;font-size:10.5px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;color:var(--text3)}
.trio b{display:block;font-size:16px;font-weight:900;margin-top:3px;font-variant-numeric:tabular-nums;letter-spacing:-.3px}

/* pay now */
.upi{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
@media(max-width:420px){.upi{grid-template-columns:repeat(2,minmax(0,1fr))}}
.ub{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 8px;border-radius:18px;text-decoration:none;color:var(--text);
  background:var(--glass);border:1px solid var(--line);box-shadow:var(--shadow);font-size:12.5px;font-weight:800;transition:transform .2s var(--spring),box-shadow .3s}
.ub:hover{transform:translateY(-3px);box-shadow:var(--shadowL)}
.ub:active{transform:scale(.95)}
.ub em{width:42px;height:42px;border-radius:14px;display:grid;place-items:center;font-style:normal;font-size:20px;color:#fff;font-weight:900;
  background:linear-gradient(135deg,var(--c1),var(--c2));box-shadow:0 10px 20px -10px var(--c1)}
.ub.wide{flex-direction:row;justify-content:center;margin-top:10px;color:#fff;background:linear-gradient(135deg,#22C55E,#10B981);border:0;font-size:13.5px;padding:13px}
.ub.wide em{width:auto;height:auto;background:none;box-shadow:none;font-size:18px}
.payto{font-size:12px;color:var(--text3);text-align:center;margin-top:10px;font-weight:600}
.payto b{font-family:var(--mono);color:var(--text2);font-size:11.5px}

/* ledger */
.lsearch{display:flex;gap:8px;margin-bottom:10px}
.lsearch label{position:relative;flex:1;min-width:0}
.lsearch label::before{content:'';position:absolute;left:13px;top:50%;width:14px;height:14px;margin-top:-7px;opacity:.55;
  background:no-repeat center/contain url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23646D8C' stroke-width='2.4' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M20 20l-3.5-3.5'/%3E%3C/svg%3E")}
.lsearch input{width:100%;padding:11px 12px 11px 36px;border-radius:14px;border:1px solid var(--line2);background:var(--glass);color:var(--text);font-size:13.5px;font-family:inherit;outline:none;transition:border-color .2s,box-shadow .2s}
.lsearch input:focus{border-color:var(--indigo);box-shadow:0 0 0 4px color-mix(in srgb,var(--indigo) 18%,transparent)}
.tbl{width:100%;border-collapse:separate;border-spacing:0;font-size:13px}
.tbl th{font-size:10.5px;letter-spacing:1.1px;text-transform:uppercase;color:var(--text4);text-align:left;padding:8px 10px 9px;border-bottom:1px solid var(--line);font-weight:900}
.tbl td{padding:11px 10px;border-bottom:1px solid var(--line);color:var(--text2);font-weight:600;vertical-align:middle}
.tbl tbody tr{transition:background .2s}
.tbl tbody tr:hover td{background:color-mix(in srgb,var(--indigo) 5%,transparent)}
.tbl tr:last-child td{border-bottom:none}
.tbl .r{text-align:right}
.tbl .dt{white-space:nowrap;font-size:12px;font-weight:700;color:var(--text3)}
.lic{display:flex;align-items:center;gap:10px;min-width:0}
.lic > i{flex:0 0 32px;width:32px;height:32px;border-radius:11px;display:grid;place-items:center;font-style:normal;font-size:15px;font-weight:900;
  color:var(--c);background:color-mix(in srgb,var(--c) 14%,transparent)}
.lic b{display:block;font-weight:800;color:var(--text);font-size:13.5px}
.lic small{display:block;font-size:11.5px;color:var(--text3);margin-top:2px;font-weight:600}
.rcpt{margin-top:5px;padding:3px 9px;border-radius:999px;border:1px solid var(--line2);background:var(--glass);color:var(--text2);font-size:10.5px;font-weight:800;cursor:pointer;vertical-align:1px}
.rcpt:hover{border-color:var(--indigo);color:var(--indigo)}
.runb{font-size:10.5px;color:var(--text4);font-weight:700;margin-top:2px}

/* site log + activity timelines */
.vt{position:relative;padding-left:22px}
.vt::before{content:'';position:absolute;left:6px;top:8px;bottom:8px;width:2px;border-radius:2px;background:linear-gradient(180deg,var(--amber),var(--pink),transparent)}
.vt .vi{position:relative;padding-bottom:12px}
.vt .vi::before{content:'';position:absolute;left:-21px;top:16px;width:12px;height:12px;border-radius:50%;background:var(--bg2);border:3px solid var(--amber)}
.tag{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:800;padding:3px 8px;border-radius:999px;background:var(--sunk);color:var(--text2)}
.warn{margin-top:8px;font-size:12.5px;font-weight:700;color:var(--coral);padding:7px 10px;border-radius:12px;background:color-mix(in srgb,var(--coral) 9%,transparent)}

/* gallery */
.gal{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
@media(min-width:560px){.gal{grid-template-columns:repeat(4,minmax(0,1fr))}}
.gal .galcell:first-child{grid-column:span 2;grid-row:span 2}
.galcell{position:relative;aspect-ratio:1;border-radius:16px;overflow:hidden;cursor:pointer;background:var(--sunk) center/cover no-repeat;
  border:1px solid var(--line);display:flex;align-items:center;justify-content:center;transition:transform .35s var(--ease),box-shadow .35s;box-shadow:var(--shadow)}
.galcell::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.55));opacity:0;transition:opacity .4s}
.galcell.loaded::after{opacity:1}
.galcell:hover{transform:translateY(-3px) scale(1.015);box-shadow:var(--shadowL)}
.galcell:active{transform:scale(.97)}
.galspin{width:20px;height:20px;border-radius:50%;border:2.5px solid color-mix(in srgb,var(--pink) 25%,transparent);border-top-color:var(--pink);animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.galcell.shim{background-image:linear-gradient(100deg,transparent 30%,color-mix(in srgb,var(--text) 6%,transparent) 50%,transparent 70%);background-size:200% 100%;animation:shim 1.4s linear infinite}
@keyframes shim{to{background-position:-200% 0}}
.galtag{position:absolute;z-index:1;left:8px;bottom:8px;right:8px;font-size:11px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 3px rgba(0,0,0,.5)}

/* documents */
.doc{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--line)}
.doc:last-of-type{border-bottom:0}
.doc .fi{flex:0 0 42px;width:42px;height:42px;border-radius:13px;display:grid;place-items:center;font-size:20px;background:color-mix(in srgb,var(--violet) 12%,transparent)}
.doc .dm{min-width:0;flex:1}
.doc .dm b{display:block;font-size:13.5px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.doc .dm small{display:block;font-size:11.5px;color:var(--text3);font-weight:600;margin-top:2px}
.ibtn{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;border:1px solid var(--line2);background:var(--glass);color:var(--text2);cursor:pointer;font-size:14px;font-weight:800}
.ibtn.pri{border:0;color:#fff;background:linear-gradient(135deg,var(--indigo),var(--violet));box-shadow:0 8px 16px -8px var(--indigo)}

/* help, actions, footer */
.help{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.help a{display:flex;align-items:center;gap:10px;padding:14px;border-radius:18px;text-decoration:none;color:#fff;font-weight:800;font-size:13.5px;
  box-shadow:0 14px 28px -16px var(--c1);background:linear-gradient(135deg,var(--c1),var(--c2));transition:transform .2s var(--spring)}
.help a:active{transform:scale(.96)}
.help a em{font-style:normal;font-size:20px;width:36px;height:36px;border-radius:12px;display:grid;place-items:center;background:rgba(255,255,255,.2)}
.tog{display:flex;gap:8px;justify-content:center;margin-top:26px;flex-wrap:wrap}
.tog button{padding:9px 14px;border-radius:999px;border:1px solid var(--line2);background:var(--glass);color:var(--text2);font-size:12.5px;font-weight:800;cursor:pointer;
  -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transition:transform .15s var(--spring),border-color .2s}
.tog button:active{transform:scale(.94)}
.tog button.hl{color:var(--indigo);border-color:color-mix(in srgb,var(--indigo) 40%,transparent)}
.foot{margin-top:26px;text-align:center;padding:20px 16px;border-radius:24px;background:var(--glass);border:1px solid var(--line);font-size:12.5px;color:var(--text3);line-height:1.85;font-weight:600}
.foot .fav{width:50px;height:50px;margin:0 auto 8px;border-radius:16px;display:grid;place-items:center;font-weight:900;font-size:18px;color:#fff;
  background:linear-gradient(135deg,var(--indigo),var(--pink));box-shadow:0 14px 26px -14px var(--indigo)}
.foot .fco{font-size:16px;font-weight:900;color:var(--text)}
.foot a{color:inherit;text-decoration:none}
.foot .fine{margin-top:12px;font-size:11px;color:var(--text4);line-height:1.7}
.err{max-width:400px;margin:16vh auto;text-align:center;padding:26px;border-radius:24px;background:var(--glass);border:1px solid var(--line);box-shadow:var(--shadow)}

/* photo + image viewer */
#lbx{position:fixed;inset:0;z-index:95;display:flex;flex-direction:column;background:rgba(5,7,16,.94);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;
  animation:fadeIn .25s ease both;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom)}
@keyframes fadeIn{from{opacity:0}}
#lbx .lbt{display:flex;align-items:center;gap:8px;padding:12px 14px}
#lbx .lbt .ct{flex:1;font-size:13px;font-weight:800;opacity:.85}
#lbx .lbb{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-size:18px;font-weight:800;color:#fff;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);cursor:pointer;text-decoration:none}
#lbx .stage{position:relative;flex:1;display:grid;place-items:center;min-height:0;padding:0 12px;touch-action:pan-y}
#lbx .stage img{max-width:100%;max-height:100%;object-fit:contain;border-radius:14px;box-shadow:0 30px 70px rgba(0,0,0,.6);animation:zoomIn .35s var(--ease) both}
@keyframes zoomIn{from{opacity:0;transform:scale(.94)}}
#lbx .nav{position:absolute;z-index:2;top:50%;margin-top:-24px;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;font-size:26px;font-weight:900;color:#fff;
  background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.3);cursor:pointer}
#lbx .nav.l{left:12px}#lbx .nav.r{right:12px}
#lbx .cap{text-align:center;padding:12px 18px 16px;font-size:13.5px;font-weight:700;opacity:.92}
#lbx .spin{width:30px;height:30px;border-radius:50%;border:3px solid rgba(255,255,255,.2);border-top-color:#fff;animation:spin .8s linear infinite}

@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
  .kpi,.card{opacity:1!important;transform:none!important;filter:none!important}}

@media print{.gal{grid-template-columns:repeat(4,1fr)}.galspin{display:none}}
.foot{margin-top:30px;text-align:center;font-size:11px;color:var(--text4);line-height:1.8;font-weight:600;
  border-top:1px solid var(--b1);padding-top:18px}
.empty{text-align:center;padding:26px 14px;color:var(--text4);font-size:12px;font-weight:600}
.err{max-width:400px;margin:16vh auto;text-align:center;padding:26px}
.tog{display:flex;gap:7px;justify-content:center;margin-top:14px;flex-wrap:wrap}
.tog button{padding:6px 13px;border-radius:20px;border:1px solid var(--b1);background:var(--bg3);color:var(--text3);
  font-size:11px;font-weight:800;font-family:inherit;cursor:pointer}
.tog button:active{transform:scale(.95)}
@media print{
  /* ══ A4 PAGE SETUP ═══════════════════════════════════════════════════ */
  @page{ size:A4 portrait; margin:14mm 13mm 15mm 13mm; }

  html,body{
    background:#fff !important; color:#14202c !important;
    font-size:10.2pt; line-height:1.45;
    -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important;
  }
  *{ -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }

  /* Ink-friendly palette. Re-pointing the variables recolours everything
     at once instead of chasing every rule individually. */
  :root{
    --bg1:#fff; --bg2:#fff; --bg3:#f6f8fa; --bg4:#f0f3f7;
    --b1:#d8dee6; --b2:#c3ccd6;
    --text:#14202c; --text2:#28394a; --text3:#42546a; --text4:#586a7d;
    --datum:#0a5f6b; --marking:#9c4408; --rebar:#7d5410;
    --verdigris:#0d6b52; --alarm:#a81e34; --chalk:#28394a;
    --cyan:#0a5f6b; --lime:#0d6b52; --amber:#7d5410; --coral:#a81e34;
    --violet:#4a3382; --mint:#0d6b52; --pink:#8d1558;
  }

  /* ── hide anything interactive or decorative ─────────────────────── */
  #aurora,#gate,#datum,#bob,.tog,.upi,.noprint,#livebar,.galspin,
  .kpi .tick,.kpi::before,.hero::before,
  .tbl button,.card button,.sec button,a.ub{ display:none !important; }
  .stitle::before{ display:none !important; }
  .kpi{ animation:none !important; opacity:1 !important; transform:none !important;
        background:#fff !important; }
  .kpi .kref{ color:#42546a !important; font-size:7.4pt !important; letter-spacing:1.2pt; }
  .kpi .krule{ background:#c3ccd6 !important; margin:2mm 0 1.6mm !important; }
  .kpi .vl{ font-size:14pt !important; letter-spacing:-.4pt; }
  .bar i::after{ display:none !important; }

  /* ── use the full width of the sheet ─────────────────────────────── */
  .wrap{ max-width:none !important; width:100% !important; margin:0 !important; padding:0 !important; }
  #app{ display:block !important; }

  /* ── never split a card, a table row or a section heading ────────── */
  .card,.kpi,.hero,tr,.galcell{ break-inside:avoid; page-break-inside:avoid; }
  .sec{ break-inside:auto; margin-top:9mm; }
  .stitle{ break-after:avoid; page-break-after:avoid; }
  thead{ display:table-header-group; }   /* repeat headers across pages */

  /* ── masthead ────────────────────────────────────────────────────── */
  #printhead{ display:block !important; border-bottom:2.5pt solid #14202c; padding-bottom:3mm; margin-bottom:5mm; }
  #printhead .ph-co{ font-size:16pt; font-weight:900; letter-spacing:-.3pt; }
  #printhead .ph-sub{ font-size:8.6pt; color:#42546a; margin-top:1mm; font-weight:600; }
  #printhead .ph-tag{ float:right; text-align:right; font-size:8.4pt; color:#42546a; font-weight:700; }
  #printhead .ph-tag b{ display:block; font-size:11pt; color:#14202c; letter-spacing:2pt; text-transform:uppercase; }

  /* ── hero ────────────────────────────────────────────────────────── */
  .hero{ background:#f6f8fa !important; border:1pt solid #c3ccd6 !important; border-radius:3mm;
         padding:4mm 5mm !important; margin-bottom:4mm; }
  .hero::before{ display:none !important; }
  .badge{ display:none !important; }
  .cname{ font-size:17pt !important; color:#14202c !important; margin-top:0 !important; }
  .cproj{ font-size:10.5pt !important; color:#3f6b12 !important; font-weight:800; }
  .chip{ background:#fff !important; border:.7pt solid #c3ccd6 !important; color:#28394a !important;
         font-size:8.2pt !important; padding:1mm 2.4mm !important; }

  /* ── KPI cards: four across ──────────────────────────────────────── */
  .kpis{ grid-template-columns:repeat(4,1fr) !important; gap:3mm !important; margin-top:0 !important; }
  .kpi{ background:#fff !important; border:1pt solid #c3ccd6 !important; border-radius:2.5mm;
        padding:3mm !important; opacity:1 !important; transform:none !important; animation:none !important; }
  .kpi::after{ display:none !important; }
  .kpi .ic{ font-size:9pt !important; }
  .kpi .vl{ font-size:13.5pt !important; margin-top:1mm !important; }
  .kpi .lb{ font-size:7.2pt !important; color:#4a5b6d !important; letter-spacing:.7pt; }
  .kpi .sb{ font-size:7.8pt !important; color:#42546a !important; }

  /* ── cards and section headings ──────────────────────────────────── */
  .card{ background:#fff !important; border:.8pt solid #d8dee6 !important; border-radius:2.5mm;
         padding:3mm 3.5mm !important; margin-bottom:2.2mm !important;
         opacity:1 !important; transform:none !important; transition:none !important; }
  .card.in{ opacity:1 !important; }
  .stitle b{ font-size:9.6pt !important; letter-spacing:1.4pt; }
  .stitle span.n{ background:#f0f3f7 !important; border:.7pt solid #d8dee6 !important;
                  color:#42546a !important; font-size:8pt !important; }
  p,div,td,span{ orphans:3; widows:3; }

  /* ── progress bars must actually show ink ────────────────────────── */
  .bar{ background:#e4e9ef !important; height:2.2mm !important; border:.4pt solid #d8dee6; }
  .bar i{ opacity:1 !important; transition:none !important; }

  /* ── tables ──────────────────────────────────────────────────────── */
  .tbl{ font-size:9pt !important; }
  .tbl th{ color:#14202c !important; font-size:7.9pt !important; border-bottom:1pt solid #9aa7b4 !important;
           background:#f0f3f7 !important; padding:1.8mm 2mm !important; }
  .tbl td{ color:#2b3a4a !important; border-bottom:.5pt solid #e4e9ef !important; padding:1.8mm 2mm !important; }
  .tbl tbody tr:nth-child(even) td{ background:#fafbfc !important; }
  .tot{ border-top:1pt solid #9aa7b4 !important; font-size:10pt !important; padding:2mm !important; }

  .pill{ border:.7pt solid currentColor !important; background:#fff !important; font-size:7.9pt !important; }

  /* ── photo gallery ───────────────────────────────────────────────── */
  .gal{ grid-template-columns:repeat(4,1fr) !important; gap:2.5mm !important; }
  .galcell{ border:.7pt solid #c3ccd6 !important; border-radius:2mm; }
  .galtag{ background:rgba(0,0,0,.72) !important; color:#fff !important; font-size:7.2pt !important; }

  /* ── footer ──────────────────────────────────────────────────────── */
  .foot{ border-top:1.2pt solid #c3ccd6 !important; color:#42546a !important;
         font-size:8.6pt !important; margin-top:7mm !important; padding-top:3mm !important;
         break-inside:avoid; }
  .foot div{ color:#42546a !important; }

  #printnote{ display:block !important; margin-top:4mm; padding:2.5mm 3mm; border:.7pt dashed #9aa7b4;
              border-radius:2mm; font-size:8.4pt; color:#42546a; font-weight:600; text-align:center; }
}

@media print{
  #mesh,#prog,#topbar,#lbx,#offnote,.hring,.hleg,.live,.hlogo,.kic,.kviz,.kpi .spot,.kpi::before,.kpi::after,.hero::before,.hero::after,.due,.help,.lsearch,.rcpt{display:none!important}
  .hero{color:#14202c!important;box-shadow:none!important;background:#f6f8fa!important;animation:none!important}
  .hco{color:#42546a!important}.hco small{display:none}
  .hmain{display:block!important;margin-top:0!important}
  .chip{color:#28394a!important}
  .kpi{min-height:0!important;filter:none!important;box-shadow:none!important}
  .kbadge{background:#fff!important;color:#28394a!important;border:.7pt solid #c3ccd6!important}
  .klab{font-size:7.2pt!important;color:#4a5b6d!important;margin-top:0!important}
  .kval{font-size:13.5pt!important;color:#14202c!important}
  .ksub{font-size:7.8pt!important;color:#42546a!important}
  .card,.foot,.trio div{box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}
  .tl::before{background:#c3ccd6!important}.tli .dot{box-shadow:none!important;background:#fff!important;color:var(--c)!important}
  .bigbar{height:2.4mm!important}.bigbar i,.bigbar i::after{animation:none!important;background:#0d6b52!important}
  .lic > i{display:none!important}
  .gal .galcell:first-child{grid-column:auto!important;grid-row:auto!important}
  .galcell::after{display:none!important}
  .foot{background:#fff!important;border-radius:0!important;border:0!important;border-top:1.2pt solid #c3ccd6!important}
  .stitle .si{display:none!important}
}
</style>
</head>
<body>
<div id="mesh" aria-hidden="true"><i></i><i></i><i></i></div>
<div id="prog" aria-hidden="true"></div>
<header id="topbar" class="noprint"></header>

<!-- ══ PIN GATE ══ -->
<div id="gate">
  <div class="gcard">
    <div class="glogo">🏗️</div>
    <div class="gtitle" id="gtitle">Project Passbook</div>
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


/* ══ bilingual strings ═══════════════════════════════════════════════════
   The passbook remembers the choice, so a Tamil-reading customer only picks
   it once. Falls back to English for anything missing. */
var LANG = 'en';
try { LANG = localStorage.getItem('blpb_lang') || 'en'; } catch(e){}
var STR = {
  ta: {
    projectPassbook:'\u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BCD \u0BAA\u0BBE\u0BB8\u0BCD\u0BAA\u0BC1\u0BAF\u0BCD',
    enterPin:'\u0B95\u0BC1\u0BB1\u0BBF\u0BAF\u0BC0\u0B9F\u0BCD\u0B9F\u0BC1 \u0B8E\u0BA3\u0BCD\u0BA3\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BC1\u0B95',
    clear:'\u0B85\u0BB4\u0BBF',
    wrongPin:'\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B95\u0BC1\u0BB1\u0BBF\u0BAF\u0BC0\u0B9F\u0BCD\u0B9F\u0BC1',
    attemptsLeft:'\u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BB3\u0BCD \u0BAE\u0BBF\u0B9F\u0BCD\u0B9F\u0BAE\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1',
    lockedFor:'\u0B85\u0BA4\u0BBF\u0B95 \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BB3\u0BCD \u2014 \u0BAE\u0BB1\u0BC1\u0BAA\u0B9F\u0BBF \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BCD\u0B95',
    contractValue:'\u0B92\u0BAA\u0BCD\u0BAA\u0BA8\u0BCD\u0BA4 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1',
    totalReceived:'\u0BAE\u0BC1\u0BA4\u0BCD\u0BA4 \u0BB5\u0BB0\u0BB5\u0BC1',
    balanceToPay:'\u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBF\u0BAF \u0BA4\u0BCA\u0B95\u0BC8',
    advancePaid:'\u0BAE\u0BC1\u0BA9\u0BCD\u0BAA\u0BAA\u0BCD \u0BAA\u0BA3\u0BAE\u0BCD',
    workProgress:'\u0BB5\u0BC7\u0BB2\u0BC8 \u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BC7\u0BB1\u0BCD\u0BB1\u0BAE\u0BCD',
    notSet:'\u0BA8\u0BBF\u0BB0\u0BCD\u0BA3\u0BAF\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8',
    askContractor:'\u0B95\u0BA3\u0BCD\u0B9F\u0BCD\u0BB0\u0BBE\u0B95\u0BCD\u0B9F\u0BB0\u0BBF\u0B9F\u0BAE\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD',
    paymentCollected:'\u0BB5\u0B9A\u0BC2\u0BB2\u0BBF\u0BA4\u0BCD\u0BA4 \u0BA4\u0BCA\u0B95\u0BC8',
    payNow:'\u0B87\u0BAA\u0BCD\u0BAA\u0BC7\u0BBE\u0BA4\u0BC1 \u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95',
    due:'\u0BA8\u0BBF\u0BB2\u0BC1\u0BB5\u0BC8',
    stagePaymentPlan:'\u0B95\u0B9F\u0BCD\u0B9F \u0B95\u0B9F\u0BCD\u0B9F\u0BA3 \u0B85\u0B9F\u0BCD\u0B9F\u0BB5\u0BA3\u0BC8',
    stages:'\u0B95\u0B9F\u0BCD\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BCD',
    totalAgreed:'\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0B92\u0BAA\u0BCD\u0BAA\u0BA8\u0BCD\u0BA4\u0BAE\u0BCD',
    collected:'\u0BB5\u0B9A\u0BC2\u0BB2\u0BBF\u0BA4\u0BCD\u0BA4\u0BA4\u0BC1',
    balance:'\u0BAE\u0BBF\u0B9F\u0BCD\u0B9F\u0BAE\u0BCD',
    paymentLedger:'\u0B95\u0B9F\u0BCD\u0B9F\u0BA3 \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1',
    entries:'\u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD',
    date:'\u0BA4\u0BC7\u0BA4\u0BBF', details:'\u0BB5\u0BBF\u0BB5\u0BB0\u0BAE\u0BCD', amount:'\u0BA4\u0BCA\u0B95\u0BC8',
    workProgressSec:'\u0BB5\u0BC7\u0BB2\u0BC8 \u0BA8\u0BBF\u0BB2\u0BC8',
    overall:'\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD',
    siteLog:'\u0BA4\u0BB3 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC7\u0B9F\u0BC1',
    updates:'\u0BAA\u0BC1\u0BA4\u0BC1\u0BAA\u0BCD\u0BAA\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD',
    workers:'\u0BAA\u0BA3\u0BBF\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BCD',
    sitePhotos:'\u0BA4\u0BB3 \u0BAA\u0BC1\u0BB1\u0BC8\u0BAA\u0BCD\u0BAA\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BCD',
    photos:'\u0BAA\u0BC1\u0BB1\u0BC8\u0BAA\u0BCD\u0BAA\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BCD',
    photosNote:'\u0BAA\u0BC1\u0BB1\u0BC8\u0BAA\u0BCD\u0BAA\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA9 \u2014 \u0BB5\u0BBE\u0B9F\u0BCD\u0BB8\u0BBE\u0BAA\u0BCD\u0BAA\u0BBF\u0BB2\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B9F\u0BC1\u0BAA\u0BCD \u0BAA\u0BC6\u0BB1\u0BB2\u0BBE\u0BAE\u0BCD.',
    costSummary:'\u0B9A\u0BC6\u0BB2\u0BB5\u0BC1 \u0B9A\u0BC1\u0B95\u0BCD\u0B95\u0BAE\u0BCD',
    workExecuted:'\u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0BB5\u0BC7\u0BB2\u0BC8',
    materials:'\u0BAA\u0BCA\u0BB0\u0BC1\u0B9F\u0BCD\u0B95\u0BB3\u0BCD',
    siteExpenses:'\u0BA4\u0BB3 \u0B9A\u0BC6\u0BB2\u0BB5\u0BC1\u0B95\u0BB3\u0BCD',
    totalCost:'\u0B87\u0BA4\u0BC1\u0BB5\u0BB0\u0BC8 \u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0B9A\u0BC6\u0BB2\u0BB5\u0BC1',
    note:'\u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1',
    printSave:'\u0B85\u0B9A\u0BCD\u0B9A\u0BBF\u0B9F\u0BC1 / PDF',
    reload:'\u0BAE\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC7\u0BB1\u0BCD\u0BB1\u0BC1',
    measurements:'\u0B85\u0BB3\u0BB5\u0BC1\u0BAA\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC7\u0B9F\u0BC1',
    item:'\u0BB5\u0BC7\u0BB2\u0BC8', qty:'\u0B85\u0BB3\u0BB5\u0BC1', rate:'\u0BB5\u0BBF\u0B95\u0BBF\u0BA4\u0BAE\u0BCD',
    documents:'\u0B86\u0BB5\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BCD',
    docsNote:'\u0B87\u0BB5\u0BC8 \u0B95\u0BA3\u0BCD\u0B9F\u0BCD\u0BB0\u0BBE\u0B95\u0BCD\u0B9F\u0BB0\u0BBF\u0B9F\u0BAE\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA9.',
    estimate:'\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1',
    items:'\u0BAA\u0BC0\u0B9F\u0BCD\u0B9F\u0B95\u0BB3\u0BCD',
    comingUp:'\u0B85\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4 \u0BB5\u0BC7\u0BB2\u0BC8\u0B95\u0BB3\u0BCD',
    next3Weeks:'\u0B85\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4 3 \u0BB5\u0BBE\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD',
    activity:'\u0B9A\u0BAE\u0BC0\u0BAA\u0B95\u0BBE\u0BB2 \u0BA8\u0B9F\u0BB5\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8',
    needHelp:'\u0B89\u0BA4\u0BB5\u0BBF \u0BB5\u0BC7\u0BA3\u0BC1\u0BAE\u0BBE?',
    requestCall:'\u0BA4\u0BCA\u0BB2\u0BC8\u0BAA\u0BC7\u0B9A \u0B95\u0BC7\u0B9F\u0BCD\u0B95',
    raiseQuery:'\u0B95\u0BC7\u0BB3\u0BCD\u0BB5\u0BBF \u0B95\u0BC7\u0B9F\u0BCD\u0B95',
    live:'\u0BA8\u0BC7\u0BB0\u0BB2\u0BC8', updated:'\u0BAA\u0BC1\u0BA4\u0BC1\u0BAA\u0BCD\u0BAA\u0BBF\u0BA4\u0BCD\u0BA4\u0BA4\u0BC1',
    offline:'\u0B87\u0BA3\u0BC8\u0BAA\u0BCD\u0BAA\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8',
    checking:'\u0B9A\u0BB0\u0BBF\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1\u2026',
    asOf:'\u0BA4\u0BC7\u0BA4\u0BBF \u0BB5\u0BB0\u0BC8', started:'\u0BA4\u0BCA\u0B9F\u0B95\u0BCD\u0B95\u0BAE\u0BCD', target:'\u0B87\u0BB2\u0B95\u0BCD\u0B95\u0BC1',
    sqft:'\u0B9A\u0BA4\u0BC1\u0BB0 \u0B85\u0B9F\u0BBF', addHome:'\u0BAE\u0BC1\u0B95\u0BAA\u0BCD\u0BAA\u0BC1 \u0BA4\u0BBF\u0BB0\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD',
    view:'\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95', download:'\u0BAA\u0BA4\u0BBF\u0BB5\u0BBF\u0BB1\u0B95\u0BCD\u0B95', close:'\u0BAE\u0BC2\u0B9F\u0BC1',
    loading:'\u0B8F\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1\u2026',
    receipt:'\u0BB0\u0B9A\u0BC0\u0BA4\u0BC1',
    variations:'\u0B85\u0BA9\u0BC1\u0BAE\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0B99\u0BCD\u0B95\u0BB3\u0BCD',
    addedToContract:'\u0B92\u0BAA\u0BCD\u0BAA\u0BA8\u0BCD\u0BA4\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1',
    retention:'\u0BA4\u0BC7\u0B95\u0BCD\u0B95\u0BBF \u0BA4\u0BCA\u0B95\u0BC8',
    retentionNote:'\u0B95\u0BC1\u0BB1\u0BC8 \u0B95\u0BBE\u0BB2 \u0BAE\u0BC1\u0B9F\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0BB5\u0BB0\u0BC8 \u0BB5\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1',
    preparing:'\u0BA4\u0BAF\u0BBE\u0BB0\u0BBE\u0B95\u0BBF\u0BB1\u0BA4\u0BC1\u2026',
    printNote:'\u0B87\u0BA4\u0BC1 \u0B85\u0B9A\u0BCD\u0B9A\u0BBF\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1. \u0B86\u0BB5\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BAA\u0BC1\u0BB0\u0BC8\u0BAA\u0BCD\u0BAA\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B87\u0BA3\u0BC8\u0BAF \u0BAA\u0BBE\u0BB8\u0BCD\u0BAA\u0BC1\u0BAF\u0BCD \u0B87\u0BA3\u0BCD\u0B95\u0BBF\u0BB2\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB2\u0BBE\u0BAE\u0BCD.',
    popupBlocked:'\u0BB0\u0B9A\u0BC0\u0BA4\u0BC1 \u0B85\u0B9A\u0BCD\u0B9A\u0BBF\u0B9F \u0BAA\u0BBE\u0BAA\u0BCD-\u0B85\u0BAA\u0BCD \u0B85\u0BA9\u0BC1\u0BAE\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.',
    needNet:'\u0B87\u0BA3\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1 \u0BA4\u0BC7\u0BB5\u0BC8',
    minCardOffline:'இணையம் இல்லை — இந்த கார்டில் விவரங்கள் சேமிக்கப்படவில்லை. மீண்டும் இணைந்து திறக்கவும்.',
    snapshotOffline:'இணையம் இல்லை — கார்டில் சேமிக்கப்பட்ட விவரங்கள் காட்டப்படுகின்றன',
    nextPaymentDue:'அடுத்த செலுத்த வேண்டிய தொகை',
    overdueBy:'தாமதமானது',
    dueToday:'இன்று செலுத்த வேண்டும்',
    dueInDays:'செலுத்த வேண்டிய நாள்',
    daysWord:'நாட்கள்',
    searchLedger:'பணம் தேடுக\u2026',
    noMatches:'பொருந்தும் பணம் இல்லை',
    overview:'சுருக்கம்',
    payNav:'செலுத்து',
    stagesNav:'கட்டங்கள்',
    changesNav:'மாற்றங்கள்',
    paymentsNav:'பணம்',
    workNav:'வேலை',
    nextNav:'அடுத்து',
    logNav:'பதிவேடு',
    photosNav:'படங்கள்',
    measNav:'அளவு',
    docsNav:'ஆவணங்கள்',
    activityNav:'நடப்பு',
    paidW:'செலுத்தியது',
    workW:'வேலை',
    leftW:'மீதம்',
    agreedTotal:'ஒப்பந்த கட்டங்களின் மொத்தம்',
    projectBudget:'திட்ட மதிப்பீடு',
    afterRefund:'திருப்பித் தந்த பின்',
    receivedToDate:'இதுவரை வந்தது',
    collectedW:'வசூலானது',
    paymentsW:'கட்டணங்கள்',
    aheadW:'ஒப்பந்தத்தை விட முன்பணம்',
    stillOut:'இன்னும் செலுத்த வேண்டியது',
    settledW:'முழுமையாக செலுத்தப்பட்டது',
    settledShort:'முடிந்தது',
    ofW:'மொத்தம்',
    phasesDone:'கட்டங்கள் முடிந்தன',
    noPhases:'கட்டங்கள் இல்லை',
    onSite:'நடக்கிறது',
    receivedW:'வந்தது',
    totalW:'மொத்தம்',
    anyUpi:'வேறு UPI',
    payingTo:'பெறுபவர்',
    sendConfirm:'வாட்ஸ்அப்பில் கட்டண உறுதிப்படுத்தல் அனுப்புக',
    dueW:'செலுத்த வேண்டியது',
    daysLate:'நாட்கள் தாமதம்',
    noDue:'தேதி இல்லை',
    balW:'மீதம்',
    themeAuto:'தானியங்கி',
    themeLight:'வெளிச்சம்',
    themeDark:'இருள்',
    exportLedger:'ஏற்றுமதி'
  }
};
function T(k, en){
  if(LANG==='ta' && STR.ta && STR.ta[k]) return STR.ta[k];
  return en;
}
function setLang(l){
  LANG = l;
  try { localStorage.setItem('blpb_lang', l); } catch(e){}
  render();
}


/* ══ documents ═══════════════════════════════════════════════════════════
   Each file is fetched as ciphertext and decrypted here with the key from
   this link's fragment, so the server never sees a readable document. */
var _docCache = {};

function pbDecryptBytes(blob, keyB64u){
  var raw = b64uBytes(blob);
  var iv  = raw.slice(0,12), ct = raw.slice(12);
  return window.crypto.subtle.importKey('raw', b64uBytes(keyB64u), {name:'AES-GCM'}, false, ['decrypt'])
    .then(function(key){ return window.crypto.subtle.decrypt({name:'AES-GCM', iv:iv}, key, ct); })
    .then(function(pt){ return new Uint8Array(pt); });
}

function docBusy(i, txt, col){
  var el = $('dst'+i);
  if(el){ el.innerHTML = txt; el.style.color = col || 'var(--text4)'; }
}

function fetchDoc(i){
  var d = (P.dc||[])[i];
  if(!d) return Promise.reject(new Error('missing'));
  if(_docCache[i]) return Promise.resolve(_docCache[i]);
  if(!LIVE || !canCrypto()) return Promise.reject(new Error(T('needNet','needs an internet connection')));
  docBusy(i, T('loading','Loading\u2026'), 'var(--cyan)');
  return fetch(LIVE.url+'/d/'+d[5], {cache:'force-cache'})
    .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.text(); })
    .then(function(blob){ return pbDecryptBytes(blob, LIVE.key); })
    .then(function(bytes){
      var url = URL.createObjectURL(new Blob([bytes], {type: d[4] || 'application/octet-stream'}));
      _docCache[i] = url;
      docBusy(i, '');
      return url;
    });
}

window.viewDoc = function(i){
  var d = (P.dc||[])[i];
  fetchDoc(i).then(function(url){
    var mime = String(d[4]||'');
    if(mime.indexOf('image/')===0){ showLightbox(url, d[0]); return; }
    var w = window.open(url, '_blank');
    if(!w) downloadDoc(i);           /* pop-up blocked \u2014 fall back to saving */
  }, function(e){
    docBusy(i, '\u26A0 '+esc(String(e && e.message || e).slice(0,40)), 'var(--coral)');
  });
};

window.downloadDoc = function(i){
  var d = (P.dc||[])[i];
  fetchDoc(i).then(function(url){
    var a = document.createElement('a');
    a.href = url; a.download = d[0] || 'document';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }, function(e){
    docBusy(i, '\u26A0 '+esc(String(e && e.message || e).slice(0,40)), 'var(--coral)');
  });
};

function lbOpen(html){
  var old = $('lbx'); if(old) old.remove();
  var lb = document.createElement('div'); lb.id = 'lbx'; lb.setAttribute('role','dialog'); lb.innerHTML = html;
  document.body.appendChild(lb); document.documentElement.style.overflow = 'hidden';
  return lb;
}
function lbShut(){ var lb = $('lbx'); if(lb){ lb.remove(); } document.documentElement.style.overflow = ''; document.removeEventListener('keydown', lbKeys); }
var _lbGo = null;
function lbKeys(e){ if(e.key==='Escape') lbShut(); else if(_lbGo && e.key==='ArrowLeft') _lbGo(-1); else if(_lbGo && e.key==='ArrowRight') _lbGo(1); }
function showLightbox(url, name){
  _lbGo = null;
  var lb = lbOpen('<div class="lbt"><span class="ct">'+esc(name||'')+'</span>'
    + '<a class="lbb" href="'+url+'" download="'+esc(name||'image')+'" aria-label="'+esc(T('download','Download'))+'">⬇</a>'
    + '<button class="lbb" data-x aria-label="'+esc(T('close','Close'))+'">✕</button></div>'
    + '<div class="stage"><img src="'+url+'" alt=""></div><div class="cap">'+esc(name||'')+'</div>');
  lb.addEventListener('click', function(e){ if(e.target.closest('[data-x]') || e.target.classList.contains('stage')) lbShut(); });
  document.addEventListener('keydown', lbKeys);
}
/* site photos: full screen, ‹ › arrows, swipe, counter, download */
function showGalBox(i, url, g){
  var total = (P.pg||[]).length;
  var draw = function(i, url){
    var g = (P.pg||[])[i] || [], cap = [g[2], g[1], hasD(g[3])?fmtD(g[3]):''].filter(Boolean).join(' · ');
    lb.querySelector('.ct').textContent = (i+1)+' / '+total;
    lb.querySelector('.stage').innerHTML = (total>1?'<button class="nav l" data-n="-1" aria-label="Previous">‹</button>':'')
      + (url ? '<img src="'+url+'" alt="">' : '<span class="spin"></span>')
      + (total>1?'<button class="nav r" data-n="1" aria-label="Next">›</button>':'');
    lb.querySelector('.cap').textContent = cap;
    var dl = lb.querySelector('a.lbb'); if(url){ dl.href = url; dl.setAttribute('download', (g[2]||'site-photo')+'.jpg'); dl.style.visibility = ''; } else dl.style.visibility = 'hidden';
  };
  var lb = lbOpen('<div class="lbt"><span class="ct"></span><a class="lbb" aria-label="'+esc(T('download','Download'))+'">⬇</a>'
    + '<button class="lbb" data-x aria-label="'+esc(T('close','Close'))+'">✕</button></div><div class="stage"></div><div class="cap"></div>');
  var cur = i;
  _lbGo = function(d){
    if(total < 2) return;
    cur = (cur + d + total) % total; var me = cur; draw(me, _galCache[me] || null);
    if(!_galCache[me]) galFetch(me).then(function(u){ if(cur===me) draw(me, u); }, function(){});
    if(_galCache[(me+d+total)%total] == null) galFetch((me+d+total)%total).catch(function(){});   /* fetch the next one ahead */
  };
  draw(i, url);
  lb.addEventListener('click', function(e){
    var n = e.target.closest('[data-n]'); if(n){ _lbGo(Number(n.getAttribute('data-n'))); return; }
    if(e.target.closest('[data-x]') || e.target.classList.contains('stage')) lbShut();
  });
  var x0 = null, y0 = 0;
  lb.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, {passive:true});
  lb.addEventListener('touchend', function(e){ if(x0===null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if(Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)*1.3) _lbGo(dx < 0 ? 1 : -1); else if(dy > 110 && Math.abs(dy) > Math.abs(dx)*1.5) lbShut(); }, {passive:true});
  document.addEventListener('keydown', lbKeys);
  if(total > 1) galFetch((i+1)%total).catch(function(){});
}

function docIcon(mime, name){
  var m = String(mime||'').toLowerCase(), n = String(name||'').toLowerCase();
  if(m.indexOf('pdf')>=0 || /\.pdf$/.test(n))   return '\uD83D\uDCD5';
  if(m.indexOf('image/')===0 || /\.(jpe?g|png|gif|webp|heic)$/.test(n)) return '\uD83D\uDDBC\uFE0F';
  if(/\.(docx?|odt)$/.test(n))  return '\uD83D\uDCDD';
  if(/\.(xlsx?|csv)$/.test(n))  return '\uD83D\uDCCA';
  return '\uD83D\uDCC4';
}
function fmtBytes(n){
  n = num(n);
  if(!n) return '';
  if(n >= 1048576) return (n/1048576).toFixed(1)+' MB';
  if(n >= 1024)    return Math.round(n/1024)+' KB';
  return n+' B';
}


/* ══ photo gallery ═══════════════════════════════════════════════════════
   Thumbnails load only as they scroll into view, so opening the passbook on
   a phone connection does not pull the whole album at once. */
var _galCache = {};

function galFetch(i){
  var g = (P.pg||[])[i];
  if(!g) return Promise.reject(new Error('missing'));
  if(_galCache[i]) return Promise.resolve(_galCache[i]);
  if(!LIVE || !canCrypto()) return Promise.reject(new Error('offline'));
  return fetch(LIVE.url+'/d/'+g[0], {cache:'force-cache'})
    .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.text(); })
    .then(function(blob){ return pbDecryptBytes(blob, LIVE.key); })
    .then(function(bytes){
      var url = URL.createObjectURL(new Blob([bytes], {type:'image/jpeg'}));
      _galCache[i] = url;
      return url;
    });
}

function galMount(){
  var cells = document.querySelectorAll('[data-gal]');
  if(!cells.length) return;
  var load = function(el){
    var i = Number(el.getAttribute('data-gal'));
    galFetch(i).then(function(url){
      el.style.backgroundImage = 'url('+url+')';
      el.classList.add('loaded'); el.classList.remove('shim');
      var sp = el.querySelector('.galspin'); if(sp) sp.remove();
    }, function(){
      el.classList.remove('shim');
      el.innerHTML = '<span style="font-size:18px;opacity:.35">\u26A0</span>';
    });
  };
  if(!('IntersectionObserver' in window)){ cells.forEach(load); return; }
  var io = new IntersectionObserver(function(en){
    en.forEach(function(e){
      if(e.isIntersecting){ load(e.target); io.unobserve(e.target); }
    });
  }, {rootMargin:'200px'});
  cells.forEach(function(c){ io.observe(c); });
}

window.openGal = function(i){
  var g = (P.pg||[])[i];
  galFetch(i).then(function(url){
    showGalBox(i, url, g);
  }, function(){});
};

/* ══ per-payment receipt ═════════════════════════════════════════════════ */
window.printReceipt = function(idx){
  var p = (window._ledger||[])[idx];
  if(!p) return;
  var co = P.co||{}, c = P.c||{};
  var w = window.open('', '_blank', 'width=760,height=900');
  if(!w){ alert(T('popupBlocked','Please allow pop-ups to print the receipt.')); return; }
  var row = function(k,v){ return '<tr><td class="k">'+esc(k)+'</td><td class="v">'+esc(v)+'</td></tr>'; };
  w.document.write(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Receipt \u2014 '+esc(c.n||'')+'</title><style>'
    + '@page{size:A5 landscape;margin:10mm}'
    + 'body{font-family:Georgia,"Times New Roman",serif;margin:0;padding:12mm;color:#14202c}'
    + '.wrap{border:2px solid #14202c;border-radius:8px;padding:10mm}'
    + '.co{font-size:19px;font-weight:bold;text-align:center}'
    + '.sub{font-size:10.5px;color:#566;text-align:center;margin-top:2px}'
    + '.ttl{text-align:center;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#667;margin:11px 0 3px}'
    + 'table{width:100%;border-collapse:collapse;margin-top:10px}'
    + 'td{padding:5px 3px;font-size:12.5px;border-bottom:1px solid #e3e7ec}'
    + 'td.k{color:#667;width:38%}td.v{font-weight:bold;text-align:right}'
    + '.amt{margin-top:12px;text-align:center;font-size:26px;font-weight:bold;letter-spacing:.5px}'
    + '.amtl{text-align:center;font-size:9.5px;letter-spacing:3px;text-transform:uppercase;color:#778}'
    + '.sig{margin-top:20px;display:flex;justify-content:space-between;font-size:10px;color:#667}'
    + '.sig div{border-top:1px solid #99a;padding-top:4px;width:38%;text-align:center}'
    + '.note{margin-top:10px;font-size:9.5px;color:#889;text-align:center}'
    + '</style></head><body><div class="wrap">'
    + '<div class="co">'+esc(co.n||'')+'</div>'
    + (co.a?'<div class="sub">'+esc(co.a)+'</div>':'')
    + (co.p?'<div class="sub">'+esc(co.p)+(co.e?' \u00B7 '+esc(co.e):'')+'</div>':'')
    + '<div class="ttl">Payment Receipt</div>'
    + '<table>'
    +   row('Received from', c.n||'')
    +   (c.pr?row('Project', c.pr):'')
    +   row('Date', fmtD(p.d))
    +   row('Towards', p.src||p.t||'Payment')
    +   (p.m?row('Mode', p.m):'')
    +   (p.ref?row('Reference', p.ref):'')
    + '</table>'
    + '<div class="amtl" style="margin-top:12px">Amount Received</div>'
    + '<div class="amt">'+fmt(p.a)+'</div>'
    + '<div class="sig"><div>Customer</div><div>For '+esc(co.n||'')+'</div></div>'
    + '<div class="note">Computer-generated receipt issued from the project passbook on '
    +   fmtD(P.d)+'. Running balance after this payment: '+fmt(p._run)+'.</div>'
    + '</div></body></html>');
  w.document.close();
  w.onload = function(){ w.focus(); w.print(); };
};

/* ══ ledger search & export ══════════════════════════════════════════════ */
window.filterLedger = function(q){
  q = String(q||'').toLowerCase().trim();
  var rows = document.querySelectorAll('#ledgerBody tr[data-q]');
  var shown = 0;
  rows.forEach(function(tr){
    var match = !q || tr.getAttribute('data-q').indexOf(q) !== -1;
    tr.style.display = match ? '' : 'none';
    if(match) shown++;
  });
  var empty = $('ledgerEmptyRow');
  if(empty) empty.style.display = shown ? 'none' : '';
};

window.exportLedger = function(){
  var co = P.co||{}, c = P.c||{};
  var qEl = $('ledgerSearch');
  var q = qEl ? String(qEl.value||'').toLowerCase().trim() : '';
  var rows = (window._ledger||[]).filter(function(p){
    if(!q) return true;
    var s = (fmtD(p.d)+' '+(p.src||p.t)+' '+p.m+' '+p.ref).toLowerCase();
    return s.indexOf(q)!==-1;
  });
  if(!rows.length){ alert(T('noMatches','No matching payments')); return; }
  var w = window.open('', '_blank', 'width=820,height=920');
  if(!w){ alert(T('popupBlocked','Please allow pop-ups to print the receipt.')); return; }
  var total = rows.reduce(function(s,p){ return s + (String(p.t).toLowerCase()==='refund'? -p.a : p.a); },0);
  var trs = rows.map(function(p){
    var isRef = String(p.t).toLowerCase()==='refund';
    return '<tr><td>'+esc(fmtD(p.d))+'</td><td>'+esc(p.src||p.t)+'</td><td>'+esc(p.m)+'</td><td>'+esc(p.ref||'\u2014')+'</td>'
      + '<td style="text-align:right;font-weight:bold;color:'+(isRef?'#a81e34':'#0d6b52')+'">'+(isRef?'\u2212':'')+fmt(p.a)+'</td></tr>';
  }).join('');
  w.document.write(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Payment Ledger \u2014 '+esc(c.n||'')+'</title><style>'
    + '@page{size:A4 portrait;margin:14mm}'
    + 'body{font-family:Georgia,"Times New Roman",serif;margin:0;color:#14202c}'
    + '.co{font-size:20px;font-weight:bold;text-align:center}'
    + '.sub{font-size:10.5px;color:#566;text-align:center;margin-top:2px}'
    + '.ttl{text-align:center;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#667;margin:14px 0 4px}'
    + '.meta{font-size:11px;color:#556;text-align:center;margin-bottom:14px}'
    + 'table{width:100%;border-collapse:collapse;margin-top:6px;font-size:11px}'
    + 'th{text-align:left;font-size:9.5px;letter-spacing:1px;text-transform:uppercase;color:#667;padding:6px 4px;border-bottom:1.5px solid #14202c}'
    + 'td{padding:6px 4px;border-bottom:1px solid #e3e7ec}'
    + '.tot{margin-top:10px;text-align:right;font-size:14px;font-weight:bold}'
    + '.note{margin-top:16px;font-size:9.5px;color:#889;text-align:center}'
    + '</style></head><body>'
    + '<div class="co">'+esc(co.n||'')+'</div>'
    + (co.a?'<div class="sub">'+esc(co.a)+'</div>':'')
    + '<div class="ttl">Payment Ledger</div>'
    + '<div class="meta">'+esc(c.n||'')+(c.pr?' \u00B7 '+esc(c.pr):'')+'</div>'
    + '<table><thead><tr><th>Date</th><th>Details</th><th>Mode</th><th>Reference</th><th style="text-align:right">Amount</th></tr></thead><tbody>'
    + trs
    + '</tbody></table>'
    + '<div class="tot">Total: '+fmt(total)+'</div>'
    + '<div class="note">Generated from the project passbook on '+fmtD(P.d)+'. Use your browser\u2019s Print dialog to save as PDF.</div>'
    + '</body></html>');
  w.document.close();
  w.onload = function(){ w.focus(); w.print(); };
};

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
  if(!frag){ fail('noData'); return; }
  try {
    var json = LZString.decompressFromEncodedURIComponent(frag);
    if(!json) throw new Error('decompress failed');
    P = JSON.parse(json);
  } catch(e){
    fail('damaged');
    return;
  }
  if(!P || !P.c){ fail('unrecognised'); return; }
  SECLEN = String(P.sec||'').length || 4;
  if(!P.sec){ unlock(true); return; }          /* no PIN set \u2192 open directly */
  buildPad();
  buildCells();
  $('gsub').textContent = LANG==='ta'
    ? (SECLEN+' \u0B87\u0BB2\u0B95\u0BCD\u0B95 '+T('enterPin','')) 
    : ('Enter the '+SECLEN+'-digit PIN shared by '+(P.co&&P.co.n ? P.co.n : 'your contractor'));
  $('gtitle').textContent = T('projectPassbook','Project Passbook');
  try{ document.title = (P.c.pr||P.c.n||'Project')+' \u2014 Passbook'; }catch(e){}
  setTimeout(function(){ try{ $('pin').focus({preventScroll:true}); }catch(e){} }, 400);
}

var FAILMSG = {
  noData: {
    en:['No passbook data found in this link.','Ask your contractor to send the passbook link again \u2014 the part after the # sign is missing.'],
    ta:['இந்த லிங்கில் பாஸ்புக் தகவல் இல்லை.','கண்ட்ராக்டரிடம் பாஸ்புக் லிங்கை மீண்டும் அனுப்பச் சொல்லுங்கள் — # குறியீட்டுக்குப் பின்னுள்ள பகுதி இல்லை.']
  },
  damaged: {
    en:['This passbook link is damaged.','The link was probably cut short when it was forwarded. Please ask for a fresh link \u2014 copy it in full, including everything after the # sign.'],
    ta:['இந்த பாஸ்புக் லிங்க் சேதமடைந்துள்ளது.','அனுப்பும்போது லிங்க் குறைந்திருக்கலாம். புதிய லிங்க் கேளுங்கள் — # குறியீட்டுக்குப் பின்னுள்ள அனைத்தையும் முழுமையாக காப்பி செய்யவும்.']
  },
  unrecognised: {
    en:['Unrecognised passbook link.','This does not look like a BuildLedger passbook link.'],
    ta:['அடையாளம் காணப்படவில்லை.','இது BuildLedger பாஸ்புக் லிங்காக தெரியவில்லை.']
  }
};
function fail(key){
  var m = (FAILMSG[key] && FAILMSG[key][LANG]) || (FAILMSG[key] && FAILMSG[key].en) || ['Something went wrong.',''];
  $('gate').style.display='none';
  var a=$('app'); a.style.display='block';
  a.innerHTML = '<div class="err"><div style="font-size:44px;margin-bottom:12px">\u26A0\uFE0F</div>'
    + '<div style="font-size:17px;font-weight:900;margin-bottom:8px">'+esc(m[0])+'</div>'
    + '<div style="font-size:12.5px;color:var(--text3);line-height:1.7;font-weight:600">'+esc(m[1])+'</div>'
    + '<div class="tog" style="margin-top:18px">'
    +   '<button onclick="location.reload()">\uD83D\uDD04 '+T('reload','Reload')+'</button>'
    +   '<button onclick="setLang(\''+(LANG==='ta'?'en':'ta')+'\')" style="border-color:rgba(0,240,255,.35);color:var(--cyan)">'
    +     (LANG==='ta'?'\uD83C\uDDEC\uD83C\uDDE7 English':'\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD')+'</button>'
    + '</div></div>';
}

/* ── PIN gate ────────────────────────────────────────────── */
function buildCells(){
  var h=''; for(var i=0;i<SECLEN;i++) h += '<div class="cell" data-i="'+i+'"></div>';
  $('cells').innerHTML = h;
}
function buildPad(){
  var keys = ['1','2','3','4','5','6','7','8','9','clr','0','del'];
  $('pad').innerHTML = keys.map(function(k){
    if(k==='clr') return '<button class="key fn" data-k="clr">'+T('clear','Clear')+'</button>';
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
  else $('gmsg').textContent = LANG==='ta'
    ? (T('wrongPin','')+' \u2014 '+(5-tries)+' '+T('attemptsLeft',''))
    : ('Wrong PIN \u2014 '+(5-tries)+' attempt'+(5-tries===1?'':'s')+' left');
  setTimeout(function(){ buf=''; paint(); $('cells').classList.remove('bad'); }, 460);
}
var _lockTick = null;
function startLockTick(){
  clearInterval(_lockTick);
  var tick = function(){
    var left = Math.ceil((lockUntil - Date.now())/1000);
    if(left<=0){ clearInterval(_lockTick); _lockTick=null; $('gmsg').textContent=''; return; }
    $('gmsg').textContent = LANG==='ta' ? (T('lockedFor','')+' '+left+'s')
      : ('Too many attempts \u2014 try again in '+left+'s');
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
  var el = $('livebar'), note = $('offnote');
  if(!el) return;
  el.className = 'live noprint';
  if(note){ note.innerHTML = ''; }
  if(LIVEST==='live'){
    el.style.display = 'inline-flex'; el.classList.add('on');
    el.innerHTML = '<i></i>'+T('live','Live')+' · '+fmtD(P.d);
    el.title = T('live','Live')+' · '+T('updated','updated')+' '+fmtD(P.d);
  } else if(LIVEST==='pending'){
    el.style.display = 'inline-flex';
    el.innerHTML = '<i></i>'+T('checking','Checking for updates…');
  } else if(LIVEST==='offline'){
    el.style.display = 'inline-flex'; el.classList.add('off');
    el.innerHTML = '<i></i>'+T('offline','Offline');
    var msg = P.min ? T('minCardOffline','No internet — this card stores no details of its own. Please reconnect and reopen.')
      : T('snapshotOffline','Offline — showing the details saved on this card')+' ('+fmtD(P.d)+')';
    el.title = msg;
    if(note) note.innerHTML = '<div class="card in" style="margin-top:12px;border-color:color-mix(in srgb,var(--amber) 35%,transparent);background:linear-gradient(135deg,color-mix(in srgb,var(--amber) 12%,var(--glass)),var(--glass));font-size:13px;font-weight:700;color:var(--text2)">📶 '+esc(msg)+'</div>';
  } else {
    el.style.display = 'none';
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
  var voTotal  = (P.vo||[]).reduce(function(s,r){ return s+num(r[3]); },0);
  var contract = (agreed>0 ? agreed : budget) + voTotal;
  var retHeld  = P.rt ? num(P.rt[0]) : 0;
  var balance  = Math.max(contract - net, 0);
  var over     = net - contract;
  var ph = P.ph||[];
  var prog = ph.length ? Math.round(ph.reduce(function(s,r){ return s+num(r[3]); },0)/ph.length) : 0;
  var nextDue = null;
  plan.forEach(function(st){
    var sid=st[0], nm=st[1], amt=num(st[2]), due=st[3];
    var paid = spays.filter(function(p){ return p[0]===sid; }).reduce(function(s,p){ return s+num(p[2]); },0);
    var bal = amt-paid;
    if(bal<=0) return;
    var dueD = parseD(due);
    if(!dueD) return;
    if(!nextDue || dueD < nextDue.dueD){ nextDue = {name:nm, amount:bal, due:due, dueD:dueD}; }
  });
  return {
    py:py, plan:plan, spays:spays, ph:ph,
    received:grossRec, refunded:refunded, net:net,
    budget:budget, agreed:agreed, contract:contract, voTotal:voTotal, retHeld:retHeld,
    balance:balance, over:over, prog:prog, noContract: !(contract>0),
    spent:num(f.sp), matVal:num(f.mv), ncTotal:num(f.nc),
    payPct: contract>0 ? Math.min(Math.round(net/contract*100),100) : 0,
    nextDue:nextDue
  };
}

/* ══ RENDER (Passbook v4 · "Prism") ══════════════════════════════════════
   Same data, same sums as before — only the way it is shown has changed. */
function initials(s){ var w = String(s||'').replace(/[^\p{L}\p{N} ]/gu,'').trim().split(/\s+/).filter(Boolean); return ((w[0]||'B').charAt(0)+(w[1]||'').charAt(0)).toUpperCase(); }
function secOpen(id, nav, icon, title, a1, a2, n, extra){
  return '<section class="sec'+(extra?' '+extra:'')+'" id="'+id+'" data-nav="'+esc(nav)+'">'
    + '<div class="stitle" style="--a1:'+a1+';--a2:'+a2+'"><span class="si">'+icon+'</span><b>'+title+'</b>'
    + (n!=null && n!=='' ? '<span class="n">'+n+'</span>' : '') + '</div>';
}
var ICO = {
  contract:'<svg viewBox="0 0 24 24"><path d="M4 21V9l8-6 8 6v12"/><path d="M9 21v-6h6v6"/></svg>',
  rec:'<svg viewBox="0 0 24 24"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>',
  bal:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18"/><path d="M16 15h2"/></svg>',
  work:'<svg viewBox="0 0 24 24"><path d="M2 20h20"/><path d="M5 20V10l7-5 7 5v10"/><path d="M12 12v4"/><path d="M9 14h6"/></svg>'
};
function spark(K){
  /* running total of money in, oldest first — the shape of the account */
  var ev = [];
  K.py.forEach(function(r){ ev.push([String(r[0]||''), String(r[3]||'').toLowerCase()==='refund' ? -num(r[1]) : num(r[1])]); });
  K.spays.forEach(function(r){ ev.push([String(r[1]||''), num(r[2])]); });
  ev.sort(function(a,b){ return a[0].localeCompare(b[0]); });
  var pts = [0], run = 0; ev.forEach(function(e){ run += e[1]; pts.push(run); });
  if(pts.length < 3) pts = [0, run*0.5, run];
  var W = 120, H = 34, mx = Math.max.apply(null, pts) || 1, mn = Math.min(0, Math.min.apply(null, pts));
  var xy = pts.map(function(v, i){ return [ (i/(pts.length-1))*W, H-3 - ((v-mn)/(mx-mn||1))*(H-8) ]; });
  var d = xy.map(function(p, i){
    if(!i) return 'M'+p[0].toFixed(1)+' '+p[1].toFixed(1);
    var q = xy[i-1], cx = (q[0]+p[0])/2;
    return 'C'+cx.toFixed(1)+' '+q[1].toFixed(1)+' '+cx.toFixed(1)+' '+p[1].toFixed(1)+' '+p[0].toFixed(1)+' '+p[1].toFixed(1);
  }).join(' ');
  var len = 0; for(var i=1;i<xy.length;i++) len += Math.hypot(xy[i][0]-xy[i-1][0], xy[i][1]-xy[i-1][1]);
  var last = xy[xy.length-1];
  return '<svg class="kspark" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" style="--len:'+Math.ceil(len*1.6)+'">'
    + '<defs><linearGradient id="gSp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--a)" stop-opacity=".32"/><stop offset="1" stop-color="var(--a)" stop-opacity="0"/></linearGradient></defs>'
    + '<path class="ar" d="'+d+' L'+W+' '+H+' L0 '+H+' Z" fill="url(#gSp)"/>'
    + '<path class="ln" d="'+d+'" vector-effect="non-scaling-stroke"/>'
    + '<circle cx="'+last[0].toFixed(1)+'" cy="'+last[1].toFixed(1)+'" r="3.2" vector-effect="non-scaling-stroke"/></svg>';
}
function ringSvg(paid, work, both){
  var C1 = 2*Math.PI*52, C2 = 2*Math.PI*38;
  var c = function(r, w, cls, C, pct){ return '<circle class="rbg" cx="60" cy="60" r="'+r+'" stroke-width="'+w+'"/>'
    + '<circle class="'+cls+'" cx="60" cy="60" r="'+r+'" stroke-width="'+w+'" stroke-linecap="round" transform="rotate(-90 60 60)"'
    + ' stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+C.toFixed(1)+'" data-off="'+(C*(1-Math.max(0,Math.min(100,pct))/100)).toFixed(1)+'"/>'; };
  return '<svg viewBox="0 0 120 120"><defs>'
    + '<linearGradient id="gPaid" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#A7F3D0"/></linearGradient>'
    + '<linearGradient id="gWork" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FDE68A"/><stop offset="1" stop-color="#FB923C"/></linearGradient></defs>'
    + (both ? c(52, 9, 'r1', C1, paid) : '') + c(both ? 38 : 50, both ? 7 : 10, 'r2', both ? C2 : 2*Math.PI*50, work) + '</svg>';
}

function render(){
  var c = P.c||{}, co = P.co||{}, K = calc();
  var H = '';
  var stDot = {Active:'#6EE7B7','On Hold':'#FCD34D',Completed:'#67E8F9',Cancelled:'#FDA4AF'}[c.st]||'#E2E8F0';

  /* the printed sheet carries its own masthead */
  H += '<div id="printhead" style="display:none">'
     +   '<div class="ph-tag"><b>Project Passbook</b>'+(hasD(P.d) ? T('asOf','As of')+' '+fmtD(P.d) : '')+'</div>'
     +   '<div class="ph-co">'+esc(co.n||'Project Passbook')+'</div>'
     +   '<div class="ph-sub">'+[co.a, co.p, co.e].filter(Boolean).map(esc).join('  ·  ')+(co.g? '  ·  GSTIN '+esc(co.g) : '')+'</div>'
     +   '<div style="clear:both"></div>'
     + '</div>';

  /* ── hero ── */
  var both = !K.noContract;
  H += '<section class="sec" id="s-top" data-nav="'+esc(T('overview','Overview'))+'" style="margin-top:0">'
     + '<div class="hero">'
     +   '<div class="htop"><div class="hlogo">'+esc(initials(co.n||'BuildLedger'))+'</div>'
     +     '<div class="hco"><small>'+T('projectPassbook','Project Passbook')+'</small>'+esc(co.n||'')+'</div>'
     +     '<span id="livebar" class="live noprint" style="display:none"></span></div>'
     +   '<div class="hmain"><div style="min-width:0">'
     +     '<div class="cname">'+esc(c.n||'Customer')+'</div>'
     +     (c.pr?'<div class="cproj">🏠 '+esc(c.pr)+'</div>':'')
     +   '</div>'
     +   '<div class="noprint"><div class="hring">'+ringSvg(K.payPct, K.prog, both)
     +     '<div class="ctr"><b class="num" data-to="'+(both?K.payPct:K.prog)+'" data-pct="1">0%</b><small>'+(both?T('paidW','paid'):T('workW','work'))+'</small></div></div>'
     +     '<div class="hleg">'+(both?'<span><i style="background:#D1FAE5"></i>'+T('paidW','paid')+'</span>':'')+'<span><i style="background:#FDBA74"></i>'+T('workW','work')+' '+K.prog+'%</span></div></div>'
     +   '</div>'
     +   '<div class="cmeta">'
     +     (c.st?'<span class="chip st" style="--dot:'+stDot+'">'+esc(c.st)+'</span>':'')
     +     (c.ad?'<span class="chip">📍 '+esc(c.ad)+'</span>':'')
     +     (c.sq?'<span class="chip">📐 '+num(c.sq).toLocaleString('en-IN')+' '+T('sqft','sq ft')+'</span>':'')
     +     (c.sd?'<span class="chip">🚀 '+T('started','Started')+' '+fmtD(c.sd)+'</span>':'')
     +     (c.ed?'<span class="chip">🏁 '+T('target','Target')+' '+fmtD(c.ed)+'</span>':'')
     +     (hasD(P.d) ? '<span class="chip">🕒 '+T('asOf','As of')+' '+fmtD(P.d)+'</span>' : '')
     +   '</div>'
     + '</div><div id="offnote" class="noprint"></div>';

  /* ── next payment due ── */
  if(K.nextDue){
    var nd = K.nextDue, diff = daysBetween(nd.dueD, todayD()), overdue = diff<0, dueTod = diff===0;
    var acc = overdue ? 'var(--coral)' : (diff<=7 ? 'var(--amber)' : 'var(--indigo)');
    var when = overdue ? T('overdueBy','Overdue by')+' <b>'+Math.abs(diff)+' '+T('daysWord','days')+'</b>'
      : dueTod ? '<b>'+T('dueToday','Due today')+'</b>'
      : T('dueInDays','Due in')+' <b>'+diff+' '+T('daysWord','days')+'</b>';
    H += '<div class="due noprint'+(overdue?' over':'')+'" style="--a:'+acc+'">'
      + '<div class="cal"><small>'+MO[nd.dueD.getMonth()].toUpperCase()+'</small><b>'+String(nd.dueD.getDate()).padStart(2,'0')+'</b></div>'
      + '<div style="min-width:0"><div class="eb">⏰ '+T('nextPaymentDue','Next Payment Due')+'</div>'
      +   '<div class="nm">'+esc(nd.name)+'</div><div class="wh">'+when+' · '+fmtD(nd.due)+'</div></div>'
      + '<div class="amt"><b class="num">'+fmt(nd.amount)+'</b>'
      +   '<a class="btn pri" href="#payNowSec" style="--a:'+acc+'">'+T('payNow','Pay Now')+' →</a></div>'
      + '</div>';
  }

  /* ── KPI cards ── */
  var doneN = K.ph.filter(function(r){ return r[2]==='Completed'; }).length;
  var balShare = K.contract>0 ? Math.round(Math.min(K.balance/K.contract,1)*100) : 0;
  var kpis = [
    { a:'var(--indigo)', b:'var(--violet)', ic:ICO.contract, l:T('contractValue','Contract Value'),
      raw:K.noContract?null:K.contract, s:K.noContract?T('notSet','not set yet'):(K.agreed>0?T('agreedTotal','agreed stage total'):T('projectBudget','project budget')),
      badge:K.voTotal ? (K.voTotal>0?'+':'−')+fmtS(Math.abs(K.voTotal)) : '',
      viz:K.noContract?'':'<div class="kbar"><i data-w="'+K.payPct+'"></i></div><div class="kfoot"><span>'+T('paidW','paid')+' '+K.payPct+'%</span><span>'+fmtS(K.balance)+' '+T('leftW','left')+'</span></div>' },
    { a:'var(--mint)', b:'var(--cyan)', ic:ICO.rec, l:T('totalReceived','Total Received'), raw:K.net,
      s:K.refunded>0?(T('afterRefund','after refund')+' '+fmtS(K.refunded)):(K.noContract?T('receivedToDate','received to date'):(K.payPct+'% '+T('collectedW','collected'))),
      badge:(K.py.length+K.spays.length)?(K.py.length+K.spays.length)+' '+T('paymentsW','payments'):'', viz:spark(K) },
    K.noContract
      ? { a:'var(--text4)', b:'var(--text3)', ic:ICO.bal, l:T('balanceToPay','Balance to Pay'), raw:null, s:T('askContractor','ask your contractor'), badge:'', viz:'' }
      : (K.over>0
        ? { a:'var(--mint)', b:'var(--teal)', ic:ICO.bal, l:T('advancePaid','Advance Paid'), raw:K.over, s:T('aheadW','paid ahead of the contract'), badge:'✓', viz:'<div class="kbar"><i data-w="100"></i></div>' }
        : { a:K.balance>0?'var(--coral)':'var(--mint)', b:K.balance>0?'var(--pink)':'var(--teal)', ic:ICO.bal,
            l:T('balanceToPay','Balance to Pay'), raw:K.balance, s:K.balance>0?T('stillOut','still outstanding'):T('settledW','fully settled'),
            badge:K.balance>0?balShare+'%':'✓ '+T('settledShort','Settled'),
            viz:'<div class="kbar"><i data-w="'+balShare+'"></i></div><div class="kfoot"><span>'+T('ofW','of')+' '+fmtS(K.contract)+'</span><span>'+balShare+'%</span></div>' }),
    { a:'var(--amber)', b:'var(--orange)', ic:ICO.work, l:T('workProgress','Work Progress'), raw:K.prog, pct:1,
      s:K.ph.length?(doneN+' / '+K.ph.length+' '+T('phasesDone','phases done')):T('noPhases','no phases yet'),
      badge:K.ph.some(function(r){ return r[2]==='In Progress'; })?'▶ '+T('onSite','on site'):'',
      viz:K.ph.length?'<div class="kdots">'+K.ph.slice(0,14).map(function(r, i){ return '<i class="'+(r[2]==='Completed'?'d':num(r[3])>0?'h':'')+'" style="animation-delay:'+(600+i*70)+'ms"></i>'; }).join('')+'</div>':'' }
  ];
  H += '<div class="kpis">'+kpis.map(function(k, i){
    var shown = k.raw===null ? '—' : (k.pct ? k.raw+'%' : fmtS(k.raw));
    return '<div class="kpi" style="--a:'+k.a+';--b:'+k.b+';--d:'+(160+i*110)+'ms" tabindex="0"><span class="spot"></span>'
      + '<div class="khead"><span class="kic">'+k.ic+'</span>'+(k.badge?'<span class="kbadge">'+k.badge+'</span>':'')+'</div>'
      + '<div class="klab">'+k.l+'</div>'
      + '<div class="kval'+(k.raw===null?'':' num')+'"'+(k.raw===null?'':' data-to="'+k.raw+'"'+(k.pct?' data-pct="1"':''))+'>'+shown+'</div>'
      + '<div class="ksub">'+k.s+'</div>'
      + (k.viz?'<div class="kviz">'+k.viz+'</div>':'')
      + '</div>';
  }).join('')+'</div>';

  /* ── payment collected ── */
  if(K.contract>0){
    H += '<div class="card in coll"><div class="row"><b class="t">'+T('paymentCollected','Payment Collected')+'</b><b class="pc num">'+K.payPct+'%</b></div>'
      + '<div class="bigbar bar"><i data-w="'+K.payPct+'"></i></div>'
      + '<div class="lg"><span><b class="num">'+fmt(K.net)+'</b> '+T('receivedW','received')+'</span><span>'+T('totalW','total')+' <b class="num">'+fmt(K.contract)+'</b></span></div></div>';
  }
  H += '</section>';

  /* ── UPI pay now ── */
  if(P.o && P.o.u && co.u && K.balance>0 && /^[A-Za-z0-9._\-]+@[A-Za-z0-9.\-]+$/.test(String(co.u).trim())){
    /* A VPA can only ever contain these characters. Anything else is either a
       typo or an injection attempt, and both must not reach the payment app. */
    var vpa = String(co.u).trim().replace(/[^A-Za-z0-9._\-@]/g,'');
    var amt = K.balance.toFixed(2);
    var pn  = encodeURIComponent(co.n||'Contractor');
    var note= encodeURIComponent('Project payment — '+(c.pr||c.n||''));
    var q   = 'pa='+encodeURIComponent(vpa)+'&pn='+pn+'&am='+encodeURIComponent(amt)+'&cu=INR&tn='+note;
    var waN = String(co.p||'').replace(/[^\d]/g,''); if(waN.length===10) waN='91'+waN;
    var waMsg = encodeURIComponent('Hello '+(co.n||'')+',\n\nI have made a payment for my project *'+(c.pr||c.n||'')+'*.\n\nAmount: '+fmt(K.balance)+'\nUTR / Reference: \n\nPlease confirm receipt. Thank you.');
    H += secOpen('payNowSec', T('payNav','Pay'), '💳', T('payNow','Pay Now'), 'var(--mint)', 'var(--cyan)', fmt(K.balance)+' '+T('due','due'), 'noprint')
      + '<div class="upi">'
      + '<a class="ub" style="--c1:#4285F4;--c2:#34A853" href="tez://upi/pay?'+q+'"><em>G</em>GPay</a>'
      + '<a class="ub" style="--c1:#5F259F;--c2:#8B5CF6" href="phonepe://pay?'+q+'"><em>Pe</em>PhonePe</a>'
      + '<a class="ub" style="--c1:#00BAF2;--c2:#002E6E" href="paytmmp://pay?'+q+'"><em>P</em>Paytm</a>'
      + '<a class="ub" style="--c1:#F97316;--c2:#10B981" href="upi://pay?'+q+'"><em>₹</em>'+T('anyUpi','Any UPI')+'</a>'
      + '</div>'
      + '<div class="payto">'+T('payingTo','Paying to')+' <b>'+esc(vpa)+'</b></div>'
      + (waN?'<a class="ub wide noprint" href="https://wa.me/'+waN+'?text='+waMsg+'"><em>📲</em> '+T('sendConfirm','Send payment confirmation on WhatsApp')+'</a>':'')
      + '</section>';
  }

  /* ── stage payment plan ── */
  if(K.plan.length){
    var coll = K.spays.reduce(function(s,r){ return s+num(r[2]); },0);
    H += secOpen('s-stages', T('stagesNav','Stages'), '🧱', T('stagePaymentPlan','Stage Payment Plan'), 'var(--violet)', 'var(--pink)', K.plan.length+' '+T('stages','stages'))
      + '<div class="tl">';
    K.plan.forEach(function(st, si){
      var sid = st[0], nm = st[1], amt = num(st[2]), due = st[3];
      var paid = K.spays.filter(function(p){ return p[0]===sid; }).reduce(function(s,p){ return s+num(p[2]); },0);
      var pct  = amt>0 ? Math.min(Math.round(paid/amt*100),100) : (paid>0?100:0);
      var done = amt>0 && paid>=amt;
      var dueD = parseD(due), late = (!done && dueD && dueD < todayD());
      var col  = done ? 'var(--mint)' : late ? 'var(--coral)' : paid>0 ? 'var(--amber)' : 'var(--text4)';
      H += '<div class="tli '+(done?'done':paid>0?'part':'')+(late?' late':'')+'" style="--c:'+col+';--p:'+pct+'">'
        + '<span class="dot">'+(done?'✓':paid>0?'':(si+1))+'</span>'
        + '<div class="card"><div class="row"><div style="min-width:0"><div class="t1">'+esc(nm)+'</div>'
        + '<div class="t2">'+(due?(T('dueW','Due')+' '+fmtD(due)+(late?' · <span style="color:var(--coral);font-weight:800">'+daysBetween(todayD(),dueD)+' '+T('daysLate','days overdue')+'</span>':'')):T('noDue','No due date'))+'</div></div>'
        + '<div style="text-align:right;flex-shrink:0"><div class="amt" style="font-size:15px;color:'+col+'">'+fmt(paid)+'</div>'
        + '<div class="t2" style="margin-top:1px">'+T('ofW','of')+' '+fmt(amt)+'</div></div></div>'
        + '<div class="bar"><i data-w="'+pct+'" style="background:linear-gradient(90deg,'+col+',color-mix(in srgb,'+col+' 55%,#fff))"></i></div></div></div>';
    });
    var left = Math.max(K.agreed-coll,0);
    H += '</div><div class="card in"><div class="trio">'
      + '<div><small>'+T('totalAgreed','Total Agreed')+'</small><b>'+fmtS(K.agreed)+'</b></div>'
      + '<div><small>'+T('collected','Collected')+'</small><b style="color:var(--mint)">'+fmtS(coll)+'</b></div>'
      + '<div><small>'+T('balance','Balance')+'</small><b style="color:'+(left>0?'var(--coral)':'var(--mint)')+'">'+fmtS(left)+(left<=0?' ✓':'')+'</b></div>'
      + '</div></div></section>';
  }

  /* ── approved variations ── */
  if((P.vo||[]).length){
    H += secOpen('s-vo', T('changesNav','Changes'), '📝', T('variations','Approved Changes'), 'var(--violet)', 'var(--indigo)', P.vo.length) + '<div class="card in">';
    P.vo.forEach(function(v){
      var neg = num(v[3])<0;
      H += '<div class="row" style="padding:9px 0;border-bottom:1px solid var(--line)"><div style="min-width:0"><div class="t1" style="font-size:13.5px">'+esc(v[2])+'</div>'
        + '<div class="t2">'+esc(v[0])+(hasD(v[1])?' · '+fmtD(v[1]):'')+'</div></div>'
        + '<span class="amt" style="flex-shrink:0;color:'+(neg?'var(--coral)':'var(--violet)')+'">'+(neg?'−':'+')+fmt(Math.abs(num(v[3])))+'</span></div>';
    });
    H += '<div class="tot"><span>'+T('addedToContract','Added to contract')+'</span><span class="amt" style="color:var(--violet)">'+(K.voTotal<0?'−':'+')+fmt(Math.abs(K.voTotal))+'</span></div></div></section>';
  }

  /* ── retention ── */
  if(K.retHeld>0 || (P.rt && num(P.rt[1])>0)){
    H += '<div class="sec"><div class="card in" style="border-color:color-mix(in srgb,var(--cyan) 35%,transparent);background:linear-gradient(135deg,color-mix(in srgb,var(--cyan) 12%,var(--glass)),var(--glass))">'
      + '<div class="row"><div><div class="t2" style="margin:0;font-weight:900;letter-spacing:1.3px;text-transform:uppercase;color:var(--cyan)">🔒 '+T('retention','Retention Held')+'</div>'
      + '<div class="t2">'+T('retentionNote','Held back until the defect liability period ends')+(P.rt[1]?' ('+P.rt[1]+'%)':'')+'</div></div>'
      + '<span class="amt" style="font-size:18px;color:var(--cyan)">'+fmt(K.retHeld)+'</span></div></div></div>';
  }

  /* ── payment ledger ── */
  var allPays = [];
  K.py.forEach(function(r){ allPays.push({d:r[0], a:num(r[1]), m:r[2]||'', t:r[3]||'Payment', ref:r[4]||'', src:''}); });
  K.spays.forEach(function(r){
    var st = K.plan.filter(function(s){ return s[0]===r[0]; })[0];
    allPays.push({d:r[1], a:num(r[2]), m:r[3]||'', t:'Stage', ref:r[4]||'', src:st?st[1]:''});
  });
  allPays.forEach(function(p,i){ p._i = i; });
  allPays.sort(function(a,b){ var byDate = String(b.d||'').localeCompare(String(a.d||'')); return byDate!==0 ? byDate : (a._i - b._i); });
  window._ledger = allPays;
  if(allPays.length){
    H += secOpen('s-ledger', T('paymentsNav','Payments'), '🤝', T('paymentLedger','Payment Ledger'), 'var(--mint)', 'var(--teal)', allPays.length+' '+T('entries','entries'))
      + '<div class="lsearch noprint"><label><input id="ledgerSearch" type="search" placeholder="'+esc(T('searchLedger','Search payments…'))+'" oninput="filterLedger(this.value)"></label>'
      + '<button class="btn gh" onclick="exportLedger()">⬇ '+T('exportLedger','Export')+'</button></div>'
      + '<div class="card in" style="padding:4px 6px 10px"><table class="tbl"><thead><tr>'
      + '<th>'+T('details','Details')+'</th><th class="r">'+T('amount','Amount')+'</th></tr></thead><tbody id="ledgerBody">';
    var run = 0;
    allPays.slice().reverse().forEach(function(p){ p._run = (run += (String(p.t).toLowerCase()==='refund'? -p.a : p.a)); });
    allPays.forEach(function(p, pi){
      var isRef = String(p.t).toLowerCase()==='refund';
      var pc = isRef ? 'var(--coral)' : p.t==='Stage' ? 'var(--violet)' : 'var(--mint)';
      var q = (fmtD(p.d)+' '+(p.src||p.t)+' '+p.m+' '+p.ref).toLowerCase();
      H += '<tr data-q="'+esc(q)+'"><td><div class="lic" style="--c:'+pc+'"><i>'+(isRef?'↗':p.t==='Stage'?'◆':'↙')+'</i><div style="min-width:0">'
        + '<b>'+esc(p.src||p.t)+'</b><small>'+fmtD(p.d)+(p.m?' · '+esc(p.m):'')+(p.ref?' · '+esc(p.ref):'')
        + '</small></div></div></td>'
        + '<td class="r" style="white-space:nowrap"><div class="amt" style="font-size:14.5px;color:'+pc+'">'+(isRef?'−':'+')+fmt(p.a)+'</div>'
        + '<div class="runb">'+T('balW','bal')+' '+fmtS(p._run)+'</div>'
        + (isRef?'':'<button class="rcpt noprint" onclick="printReceipt('+pi+')">🧾 '+T('receipt','Receipt')+'</button>')
        + '</td></tr>';
    });
    H += '<tr id="ledgerEmptyRow" class="noprint" style="display:none"><td colspan="2" class="empty">🔍 '+T('noMatches','No matching payments')+'</td></tr>';
    H += '</tbody></table><div class="tot" style="margin:6px 6px 0"><span>'+T('totalReceived','Total Received')+'</span><span class="amt" style="color:var(--mint)">'+fmt(K.net)+'</span></div></div></section>';
  }

  /* ── work progress ── */
  if(K.ph.length){
    var order = {'In Progress':0,'On Hold':1,'Not Started':2,'Completed':3,'Cancelled':4};
    var phs = K.ph.slice().sort(function(a,b){ return (order[a[2]]==null?9:order[a[2]]) - (order[b[2]]==null?9:order[b[2]]); });
    H += secOpen('s-work', T('workNav','Work'), '🔨', T('workProgressSec','Work Progress'), 'var(--amber)', 'var(--orange)', K.prog+'% '+T('overall','overall'));
    phs.forEach(function(r){
      var nm=r[0], cat=r[1], st=r[2], comp=num(r[3]), sd=r[4], ed=r[5], con=r[6], nt=r[7];
      var col = st==='Completed'?'var(--mint)':st==='In Progress'?'var(--sky)':st==='On Hold'?'var(--amber)':st==='Cancelled'?'var(--coral)':'var(--text4)';
      var edD = parseD(ed), late = (st!=='Completed' && st!=='Cancelled' && edD && edD < todayD());
      H += '<div class="card"><div class="row"><div style="min-width:0"><div class="t1">'+esc(nm)+'</div>'
        + '<div class="t2">'+(cat?esc(cat)+' · ':'')+(sd?fmtD(sd):'')+(sd&&ed?' → ':'')+(ed?fmtD(ed):'')+(con?' · 👷 '+esc(con):'')+'</div></div>'
        + '<span class="pill" style="--c:'+col+'">'+(st==='In Progress'?'▶ ':st==='Completed'?'✓ ':'')+esc(st)+'</span></div>'
        + '<div class="bar"><i data-w="'+comp+'" style="background:linear-gradient(90deg,'+col+',color-mix(in srgb,'+col+' 50%,#fff))"></i></div>'
        + '<div class="row" style="margin-top:7px"><span class="t2" style="margin:0">'
        + (late?'<span style="color:var(--coral);font-weight:800">⚠ '+daysBetween(todayD(),edD)+' '+T('daysLate','days overdue')+'</span>':(nt?esc(nt):''))
        + '</span><b class="amt" style="font-size:13px;color:'+col+'">'+comp+'%</b></div></div>';
    });
    H += '</section>';
  }

  /* ── coming up ── */
  if(P.o && P.o.n && K.ph.length){
    var t0 = todayD(), t1 = new Date(t0.getTime()+21*86400000);
    var soon = K.ph.filter(function(r){
      if(r[2]==='Completed' || r[2]==='Cancelled') return false;
      var sd = parseD(r[4]);
      if(r[2]==='In Progress') return true;
      return sd && sd>=t0 && sd<=t1;
    }).sort(function(a,b){ return String(a[4]||'').localeCompare(String(b[4]||'')); }).slice(0,6);
    if(soon.length){
      H += secOpen('s-next', T('nextNav','Next'), '⏭️', T('comingUp','Coming Up'), 'var(--sky)', 'var(--cyan)', T('next3Weeks','next 3 weeks'));
      soon.forEach(function(r){
        var live = r[2]==='In Progress';
        H += '<div class="card"><div class="row"><div style="min-width:0"><div class="t1" style="font-size:13.5px">'+(live?'▶ ':'○ ')+esc(r[0])+'</div>'
          + '<div class="t2">'+(r[4]?fmtD(r[4]):'')+(r[4]&&r[5]?' → ':'')+(r[5]?fmtD(r[5]):'')+'</div></div>'
          + '<span class="pill" style="--c:'+(live?'var(--mint)':'var(--text3)')+'">'+esc(r[2])+'</span></div></div>';
      });
      H += '</section>';
    }
  }

  /* ── site log ── */
  if((P.sl||[]).length){
    H += secOpen('s-log', T('logNav','Site log'), '📓', T('siteLog','Site Log'), 'var(--amber)', 'var(--pink)', P.sl.length+' '+T('updates','updates')) + '<div class="vt">';
    P.sl.forEach(function(r){
      var d=r[0], w=r[1], wx=r[2], wd=r[3], iss=r[4];
      H += '<div class="vi"><div class="card"><div class="row"><b class="t1" style="font-size:13.5px;color:var(--amber)">'+fmtD(d)+'</b>'
        + '<span style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end">'+(w?'<span class="tag">👷 '+esc(w)+' '+T('workers','workers')+'</span>':'')+(wx?'<span class="tag">☀ '+esc(wx)+'</span>':'')+'</span></div>'
        + (wd?'<div style="font-size:13.5px;color:var(--text2);margin-top:8px;line-height:1.6;font-weight:600">'+esc(wd)+'</div>':'')
        + (iss?'<div class="warn">⚠ '+esc(iss)+'</div>':'')
        + '</div></div>';
    });
    H += '</div></section>';
  }

  /* ── photo gallery ── */
  if((P.pg||[]).length){
    H += secOpen('s-photos', T('photosNav','Photos'), '🖼️', T('sitePhotos','Site Photos'), 'var(--pink)', 'var(--violet)', P.pg.length) + '<div class="gal">';
    P.pg.forEach(function(g,i){
      H += '<div class="galcell shim" data-gal="'+i+'" onclick="openGal('+i+')" title="'+esc(g[2]||'')+'" role="button" tabindex="0"><span class="galspin"></span>'
        + (g[1]||g[2]?'<span class="galtag">'+esc(g[2]||g[1])+'</span>':'') + '</div>';
    });
    H += '</div></section>';
  }
  if((P.pt||[]).length && !(P.pg||[]).length){
    var tot = P.pt.reduce(function(s,r){ return s+num(r[1]); },0);
    H += secOpen('s-photos', T('photosNav','Photos'), '📸', T('sitePhotos','Site Photos'), 'var(--pink)', 'var(--violet)', tot+' '+T('photos','photos'))
      + '<div class="card in"><div style="display:flex;flex-wrap:wrap;gap:7px">'
      + P.pt.map(function(r){ return '<span class="pill" style="--c:var(--pink)">'+esc(r[0])+' · '+num(r[1])+'</span>'; }).join('')
      + '</div><div class="t2" style="margin-top:10px">'+T('photosNote','Photos are kept on file — ask your contractor to share them on WhatsApp.')+'</div></div></section>';
  }

  /* ── measurement register ── */
  if((P.ms||[]).length){
    var msTot = P.ms.reduce(function(t,r){ return t+num(r[2])*num(r[4]); },0);
    H += secOpen('s-ms', T('measNav','Measure'), '📐', T('measurements','Measurements'), 'var(--cyan)', 'var(--sky)', P.ms.length+' '+T('entries','entries'))
      + '<div class="card in" style="padding:4px 6px 10px"><table class="tbl"><thead><tr><th>'+T('item','Item')+'</th><th class="r">'+T('qty','Qty')+'</th><th class="r">'+T('amount','Amount')+'</th></tr></thead><tbody>';
    P.ms.forEach(function(r){
      H += '<tr><td><b style="color:var(--text);font-weight:800">'+esc(r[1])+'</b><div class="runb" style="font-size:11px">'+fmtD(r[0])+'</div></td>'
        + '<td class="r" style="white-space:nowrap">'+num(r[2]).toLocaleString('en-IN')+' <span style="color:var(--text4)">'+esc(r[3])+'</span></td>'
        + '<td class="r amt" style="white-space:nowrap">'+(num(r[4])?fmt(num(r[2])*num(r[4])):'—')+'</td></tr>';
    });
    H += '</tbody></table>'+(msTot>0?'<div class="tot" style="margin:6px 6px 0"><span>'+T('amount','Amount')+'</span><span class="amt" style="color:var(--cyan)">'+fmt(msTot)+'</span></div>':'')+'</div></section>';
  }

  /* ── documents ── */
  if((P.dc||[]).length){
    H += secOpen('s-docs', T('docsNav','Docs'), '📄', T('documents','Documents'), 'var(--violet)', 'var(--indigo)', P.dc.length) + '<div class="card in">';
    P.dc.forEach(function(d,i){
      var openable = !!(d[5] && LIVE), meta = [];
      if(d[1]) meta.push(esc(d[1])); if(hasD(d[2])) meta.push(fmtD(d[2])); if(num(d[3])) meta.push(fmtBytes(d[3]));
      H += '<div class="doc"><span class="fi">'+docIcon(d[4], d[0])+'</span><div class="dm"><b>'+esc(d[0])+'</b>'
        + (meta.length?'<small>'+meta.join(' · ')+'</small>':'')+'<small id="dst'+i+'"></small></div>'
        + (openable?'<button class="ibtn pri" onclick="viewDoc('+i+')" aria-label="'+esc(T('view','View'))+'">👁</button><button class="ibtn" onclick="downloadDoc('+i+')" aria-label="'+esc(T('download','Download'))+'">⬇</button>':'')
        + '</div>';
    });
    H += '<div class="t2" style="margin-top:10px">'+T('docsNote','These are held on file by your contractor.')+'</div></div></section>';
  }

  /* ── approved estimate ── */
  if(P.es){
    var e = P.es;
    H += '<div class="sec"><div class="card in" style="background:linear-gradient(135deg,color-mix(in srgb,var(--amber) 12%,var(--glass)),var(--glass));border-color:color-mix(in srgb,var(--amber) 30%,transparent)">'
      + '<div class="row"><div style="min-width:0"><div class="t2" style="margin:0;font-weight:900;letter-spacing:1.3px;text-transform:uppercase;color:var(--amber)">📋 '+T('estimate','Estimate')+(e.st?' · '+esc(e.st):'')+'</div>'
      + '<div class="t1" style="margin-top:4px">'+esc(e.t)+'</div><div class="t2">'+(hasD(e.d)?fmtD(e.d)+' · ':'')+num(e.n)+' '+T('items','items')+'</div></div>'
      + '<span class="amt" style="font-size:18px;color:var(--amber)">'+fmt(num(e.tot)+num(e.gst))+'</span></div></div></div>';
  }

  /* ── activity ── */
  if((P.ac||[]).length){
    H += secOpen('s-act', T('activityNav','Updates'), '🕓', T('activity','Activity'), 'var(--sky)', 'var(--indigo)', P.ac.length) + '<div class="card in"><div class="vt" style="--x:0">';
    P.ac.forEach(function(a){
      H += '<div class="vi" style="padding-bottom:10px"><div style="font-size:13px;font-weight:700;color:var(--text2);line-height:1.5;padding-top:10px">'+esc(a[2])+'</div>'
        + '<div class="runb" style="font-size:11px">'+fmtD(a[0])+'</div></div>';
    });
    H += '</div></div></section>';
  }

  /* ── contact ── */
  if(P.o && P.o.q && co.p){
    var cw = String(co.p).replace(/[^\d]/g,''); if(cw.length===10) cw = '91'+cw;
    var proj = (c.pr||c.n||'');
    var mQ = encodeURIComponent('Hello '+(co.n||'')+',\n\nI have a question about my project *'+proj+'*:\n\n');
    H += '<div class="sec noprint"><div class="stitle" style="--a1:var(--lime);--a2:var(--mint)"><span class="si">💬</span><b>'+T('needHelp','Need help?')+'</b></div>'
      + '<div class="help">'
      + '<a style="--c1:#6366F1;--c2:#8B5CF6" href="tel:'+esc(String(co.p).replace(/[^\d+]/g,''))+'"><em>📞</em>'+T('requestCall','Request a call')+'</a>'
      + '<a style="--c1:#16A34A;--c2:#10B981" href="https://wa.me/'+cw+'?text='+mQ+'"><em>💬</em>'+T('raiseQuery','Raise a query')+'</a>'
      + '</div></div>';
  }

  /* ── cost summary ── */
  if(K.spent!==0 || K.matVal!==0 || K.ncTotal!==0){
    var _internal = !!(P.f && P.f.i), _rows = 0, _body = '';
    var line = function(l, v){ return '<div class="row" style="padding:7px 0"><span class="t2" style="margin:0;font-size:13px">'+l+'</span><span class="amt">'+fmt(v)+'</span></div>'; };
    if(K.spent!==0){ _rows++; _body += line(T('workExecuted','Work Executed'), K.spent); }
    if(_internal && K.matVal!==0){ _rows++; _body += line(T('materials','Materials'), K.matVal); }
    if(_internal && K.ncTotal!==0){ _rows++; _body += line(T('siteExpenses','Site Expenses'), K.ncTotal); }
    if(_rows>1) _body += '<div class="tot"><span>'+T('totalCost','Total Cost to Date')+'</span><span class="amt" style="color:var(--amber)">'+fmt(K.spent+(_internal?K.matVal+K.ncTotal:0))+'</span></div>';
    if(_rows) H += '<div class="sec"><div class="stitle" style="--a1:var(--text3);--a2:var(--text4)"><span class="si">📊</span><b>'+T('costSummary','Cost Summary')+'</b></div><div class="card in">'+_body+'</div></div>';
  }

  /* ── note ── */
  if(P.c && P.c.nt){
    H += '<div class="sec"><div class="card in" style="border-color:color-mix(in srgb,var(--amber) 35%,transparent);background:linear-gradient(135deg,color-mix(in srgb,var(--amber) 12%,var(--glass)),var(--glass))">'
      + '<div class="t2" style="margin:0 0 6px;font-weight:900;letter-spacing:1.3px;text-transform:uppercase;color:var(--amber)">📌 '+T('note','Note')+'</div>'
      + '<div style="font-size:13.5px;line-height:1.65;color:var(--text2);font-weight:600">'+esc(P.c.nt)+'</div></div></div>';
  }

  /* ── actions + footer ── */
  var thName = {auto:T('themeAuto','Auto'), light:T('themeLight','Light'), dark:T('themeDark','Dark')}[THEME] || 'Auto';
  H += '<div class="tog noprint">'
    + '<button class="hl" onclick="setLang(\''+(LANG==='ta'?'en':'ta')+'\')">'+(LANG==='ta'?'🇬🇧 English':'தமிழ்')+'</button>'
    + '<button id="themebtn" onclick="cycleTheme()">'+(THEME==='dark'?'🌙':THEME==='light'?'☀️':'🌗')+' '+thName+'</button>'
    + '<button id="printbtn" onclick="doPrint()">🖨 '+T('printSave','Print / Save PDF')+'</button>'
    + '<button onclick="location.reload()">🔄 '+T('reload','Reload')+'</button>'
    + '<button id="a2hs" onclick="doInstall()" style="display:none">⬇ '+T('addHome','Add to Home Screen')+'</button>'
    + '</div>';
  H += '<div id="printnote" style="display:none">'+T('printNote','This is a printed snapshot. Documents and site photos can be opened from the online passbook link.')+'</div>';
  H += '<div class="foot">'
    + (co.n?'<div class="fav noprint">'+esc(initials(co.n))+'</div><div class="fco">'+esc(co.n)+'</div>':'')
    + (co.p?'<div><a href="tel:'+esc(String(co.p).replace(/[^\d+]/g,''))+'">📞 '+esc(co.p)+'</a></div>':'')
    + (co.e?'<div>✉️ '+esc(co.e)+'</div>':'')
    + (co.a?'<div>📍 '+esc(co.a)+'</div>':'')
    + (co.g?'<div class="mono" style="font-size:11px">GSTIN '+esc(co.g)+'</div>':'')
    + '<div class="fine">'
    + (hasD(P.d) ? 'This passbook is a snapshot taken on '+fmtD(P.d)+'.<br>' : 'This passbook is a snapshot of your project account.<br>')
    + 'For the latest position please contact your contractor.<br>'
    + '<span style="opacity:.7">Powered by BuildLedger · Passbook v4</span></div>'
    + '</div>';

  $('app').innerHTML = H;
  topbar(c, co, K);
  paintLive();
  animate();
  galMount();
  settleNumerals();
  kpiParallax();
  scrollFx();
}

/* Numerals rise to their value on an ease-out curve. Skipped under
   prefers-reduced-motion, where the final value is simply written. */
var REDUCED = false;
try { REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}
function settleNumerals(){
  document.querySelectorAll('.kval.num, .hring .num').forEach(function(el, i){
    var to = Number(el.getAttribute('data-to'))||0, pct = el.hasAttribute('data-pct');
    var write = function(v){ el.textContent = pct ? Math.round(v)+'%' : fmtS(v); };
    if(REDUCED){ write(to); return; }
    var dur = 1300, start = null, delay = el.closest('.kpi') ? 260 + i*110 : 300;
    write(0);
    setTimeout(function(){
      var step = function(ts){
        if(start===null) start = ts;
        var p = Math.min((ts-start)/dur, 1), e = 1 - Math.pow(1-p, 4);
        write(to*e);
        if(p<1) requestAnimationFrame(step); else { write(to); var k = el.closest('.kpi'); if(k){ k.classList.add('glow'); setTimeout(function(){ k.classList.remove('glow'); }, 2600); } }
      };
      requestAnimationFrame(step);
    }, delay);
  });
}
/* cards lean toward the pointer and catch a light; pointer-fine only */
function kpiParallax(){
  document.querySelectorAll('.kpi').forEach(function(el){
    el.addEventListener('animationend', function(e){ if(e.animationName === 'kin'){ el.style.opacity = 1; el.style.filter = 'none'; el.style.animation = 'none'; el.classList.add('settled'); } });
  });
  if(REDUCED) return;
  try{ if(!window.matchMedia('(pointer:fine)').matches) return; }catch(e){ return; }
  document.querySelectorAll('.kpi').forEach(function(el){
    el.addEventListener('pointermove', function(e){
      var r = el.getBoundingClientRect(), x = (e.clientX-r.left)/r.width - .5, y = (e.clientY-r.top)/r.height - .5;
      el.style.setProperty('--rx', (-y*6).toFixed(2)+'deg'); el.style.setProperty('--ry', (x*6).toFixed(2)+'deg');
      el.style.setProperty('--gx', ((x+.5)*100).toFixed(1)+'%'); el.style.setProperty('--gy', ((y+.5)*100).toFixed(1)+'%');
    });
    el.addEventListener('pointerleave', function(){ el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg'); });
  });
}
/* entrance: bars, rings, sparkline; cards reveal as they scroll in */
function animate(){
  setTimeout(function(){
    document.querySelectorAll('.bar i, .kbar i').forEach(function(el){ el.style.width = (Number(el.getAttribute('data-w'))||0)+'%'; });
    document.querySelectorAll('.hring [data-off]').forEach(function(el){ el.style.strokeDashoffset = el.getAttribute('data-off'); });
    document.querySelectorAll('.kspark').forEach(function(el){ el.classList.add('on'); });
  }, 260);
  var cards = document.querySelectorAll('.card:not(.in)');
  if(!('IntersectionObserver' in window)){ cards.forEach(function(c){ c.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(en){
    en.forEach(function(e,i){ if(e.isIntersecting){ setTimeout(function(){ e.target.classList.add('in'); }, i*55); io.unobserve(e.target); } });
  }, {rootMargin:'0px 0px -30px 0px', threshold:0.04});
  cards.forEach(function(c){ io.observe(c); });
}

/* ── sticky header: who, what is due, and a link to every section ── */
function topbar(c, co, K){
  var tb = $('topbar'); if(!tb) return;
  var bal = K.noContract ? '' : K.balance>0
    ? '<span class="bal" style="color:var(--coral);background:color-mix(in srgb,var(--coral) 12%,transparent)">'+fmtS(K.balance)+' '+T('due','due')+'</span>'
    : '<span class="bal" style="color:var(--mint);background:color-mix(in srgb,var(--mint) 12%,transparent)">✓ '+T('settledShort','Settled')+'</span>';
  var links = [].map.call(document.querySelectorAll('.sec[data-nav]'), function(s){ return '<a href="#'+s.id+'" data-to="'+s.id+'">'+s.getAttribute('data-nav')+'</a>'; }).join('');
  tb.innerHTML = '<div class="tb"><span class="av">'+esc(initials(co.n||c.n))+'</span><div class="who"><b>'+esc(c.n||'')+'</b><small>'+esc(c.pr||co.n||'')+'</small></div>'+bal+'</div><nav id="snav">'+links+'</nav>';
}
var _fx = false, _spy = null;
function scrollFx(){
  var prog = $('prog'), tb = $('topbar');
  var tick = function(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if(prog) prog.style.transform = 'scaleX('+(h>0 ? Math.min(Math.max(window.scrollY/h,0),1) : 0)+')';
    var hero = document.querySelector('.hero');
    if(tb && hero) tb.classList.toggle('show', hero.getBoundingClientRect().bottom < 40);
  };
  if(!_fx){
    _fx = true;
    window.addEventListener('scroll', tick, {passive:true}); window.addEventListener('resize', tick);
    document.addEventListener('click', function(e){
      var a = e.target.closest('#snav a'); if(!a) return;
      e.preventDefault(); var s = $(a.getAttribute('data-to')); if(!s) return;
      var y = s.getBoundingClientRect().top + window.scrollY - (s.id==='s-top' ? 0 : 104);
      window.scrollTo({top:Math.max(0,y), behavior:REDUCED?'auto':'smooth'});
    });
  }
  tick();
  if(_spy) _spy.disconnect();
  if(!('IntersectionObserver' in window)) return;
  _spy = new IntersectionObserver(function(en){
    en.forEach(function(e){
      if(!e.isIntersecting) return;
      var on = document.querySelector('#snav a[data-to="'+e.target.id+'"]'); if(!on) return;
      document.querySelectorAll('#snav a.on').forEach(function(x){ x.classList.remove('on'); });
      on.classList.add('on');
      try{ on.scrollIntoView({block:'nearest', inline:'center', behavior:'smooth'}); }catch(x){}
    });
  }, {rootMargin:'-120px 0px -60% 0px'});
  document.querySelectorAll('.sec[data-nav]').forEach(function(s){ _spy.observe(s); });
}

/* ── light / dark ── a viewing preference only, kept on this phone */
var THEME = 'auto';
try { THEME = localStorage.getItem('blpb_theme') || 'auto'; } catch(e){}
function applyTheme(){
  if(THEME==='auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', THEME);
  var dark = THEME==='dark' || (THEME==='auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var m = document.querySelector('meta[name=theme-color]'); if(m) m.setAttribute('content', dark ? '#080C1B' : '#F2F3FA');
}
window.cycleTheme = function(){
  THEME = THEME==='auto' ? 'light' : THEME==='light' ? 'dark' : 'auto';
  try { localStorage.setItem('blpb_theme', THEME); } catch(e){}
  applyTheme();
  var b = $('themebtn'); if(b) b.textContent = (THEME==='dark'?'🌙':THEME==='light'?'☀️':'🌗')+' '+({auto:T('themeAuto','Auto'), light:T('themeLight','Light'), dark:T('themeDark','Dark')}[THEME]);
};
applyTheme();
try{ window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); }catch(e){}


/* ── add to home screen ─────────────────────────────────────
   Turns the passbook into an icon on the customer's phone so they never have
   to dig the WhatsApp message out again. */
var _installEvt = null;
window.addEventListener('beforeinstallprompt', function(e){
  e.preventDefault(); _installEvt = e;
  var b = $('a2hs'); if(b) b.style.display='inline-block';
});
/* A lazily-loaded thumbnail is an empty box on paper, so pull the whole
   gallery in and let it decode before handing over to the print dialog. */
window.doPrint = function(){
  var cells = document.querySelectorAll('[data-gal]');
  var pending = [];
  cells.forEach(function(el){
    if(el.classList.contains('loaded')) return;
    var i = Number(el.getAttribute('data-gal'));
    pending.push(galFetch(i).then(function(url){
      return new Promise(function(res){
        var im = new Image();
        im.onload = im.onerror = function(){
          el.style.backgroundImage = 'url('+url+')';
          el.classList.add('loaded');
          var sp = el.querySelector('.galspin'); if(sp) sp.remove();
          res();
        };
        im.src = url;
      });
    }, function(){}));
  });
  var go = function(){ setTimeout(function(){ window.print(); }, 250); };
  if(!pending.length){ go(); return; }
  var btn = document.getElementById('printbtn');
  if(btn) btn.textContent = '\u23F3 ' + T('preparing','Preparing\u2026');
  Promise.all(pending).then(go, go).then(function(){
    if(btn) btn.innerHTML = '\uD83D\uDDA8 ' + T('printSave','Print / Save PDF');
  });
};

window.doInstall = function(){
  if(!_installEvt){
    alert(LANG==='ta'
      ? '\u0BAA\u0BCD\u0BB0\u0BC7\u0BBE\u0BB8\u0BB0\u0BCD \u0BAE\u0BC6\u0BA9\u0BC1\u0BB5\u0BBF\u0BB2\u0BCD \u201C\u0BAE\u0BC1\u0B95\u0BAA\u0BCD\u0BAA\u0BC1 \u0BA4\u0BBF\u0BB0\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u201D \u0B85\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD.'
      : 'Use your browser menu and choose \u201CAdd to Home screen\u201D.');
    return;
  }
  _installEvt.prompt();
  _installEvt = null;
};

/* ── go ──────────────────────────────────────────────────── */
boot();

</script>
</body>
</html>

