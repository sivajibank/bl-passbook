<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="theme-color" content="#07090F">
<title>Project Passbook</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+Tamil:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="manifest" href="data:application/manifest+json,%7B%22name%22%3A%22Project%20Passbook%22%2C%22short_name%22%3A%22Passbook%22%2C%22start_url%22%3A%22.%22%2C%22display%22%3A%22standalone%22%2C%22background_color%22%3A%22%2307090F%22%2C%22theme_color%22%3A%22%2307090F%22%7D">
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
:root{
  /* Cyanotype: the ground is blueprint ink, the marks are chalk and
     surveyor's spray. Nothing here is a stock dashboard colour. */
  --bg1:#0A1622; --bg2:#0E1E2C; --bg3:#132738; --bg4:#193146;
  --b1:rgba(140,200,225,.11); --b2:rgba(140,200,225,.20);
  --text:#EBF2F7; --text2:#B4C8D6; --text3:#8399AA; --text4:#63798A;
  --datum:#4DD8E8;      /* blueprint line          */
  --marking:#FF7A2F;    /* surveyor's spray paint  */
  --rebar:#D9A441;      /* oxidised steel          */
  --verdigris:#3FBFA0;  /* weathered copper        */
  --alarm:#F0544F;      /* hazard tape             */
  --chalk:#C9D6E0;
  /* legacy aliases so existing sections keep their meaning */
  --cyan:var(--datum); --lime:var(--verdigris); --amber:var(--rebar);
  --coral:var(--alarm); --violet:#8E9BE8; --mint:var(--verdigris); --pink:#E87BA8;
  --r:14px;
}
html,body{background:var(--bg1);color:var(--text);font-family:'Outfit','Noto Sans Tamil',system-ui,-apple-system,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
body{min-height:100vh;overflow-x:hidden;padding-bottom:env(safe-area-inset-bottom)}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace;font-variant-numeric:tabular-nums}

/* ── aurora backdrop ───────────────────────────────── */
/* Drafting sheet: a 24px minor grid with a 120px major, plus a soft
   vignette so the centre of the sheet reads brightest. */
#aurora{position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(77,216,232,.10), transparent 62%),
    radial-gradient(90% 60% at 50% 108%, rgba(255,122,47,.07), transparent 60%),
    repeating-linear-gradient(0deg, rgba(140,200,225,.055) 0 1px, transparent 1px 24px),
    repeating-linear-gradient(90deg, rgba(140,200,225,.055) 0 1px, transparent 1px 24px),
    repeating-linear-gradient(0deg, rgba(140,200,225,.075) 0 1px, transparent 1px 120px),
    repeating-linear-gradient(90deg, rgba(140,200,225,.075) 0 1px, transparent 1px 120px);
  mask-image:radial-gradient(120% 100% at 50% 35%, #000 55%, transparent 100%);
  -webkit-mask-image:radial-gradient(120% 100% at 50% 35%, #000 55%, transparent 100%)}
#aurora i{display:none}

/* ── the datum line: signature element ────────────────────────────────
   A plumb line down the sheet. Its bob tracks the read position, and
   every section heading hangs a survey tick off it. */
#datum{position:fixed;left:max(9px, calc(50vw - 380px + 3px));top:0;bottom:0;width:1px;z-index:1;
  background:linear-gradient(180deg,transparent,rgba(77,216,232,.30) 8%,rgba(77,216,232,.30) 92%,transparent);
  pointer-events:none}
#bob{position:absolute;left:50%;top:0;width:9px;height:9px;margin-left:-4.5px;margin-top:-4.5px;
  border-radius:50%;background:var(--marking);box-shadow:0 0 0 3px rgba(255,122,47,.16),0 0 14px rgba(255,122,47,.55);
  transition:transform .12s linear}
@media(max-width:520px){#datum{left:7px}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
  #bob{display:none}}

.wrap{position:relative;z-index:1;max-width:760px;margin:0 auto;padding:18px 14px 60px}

/* ── PIN gate ──────────────────────────────────────── */
#gate{position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;padding:20px;
  background:
    repeating-linear-gradient(0deg, rgba(140,200,225,.05) 0 1px, transparent 1px 24px),
    repeating-linear-gradient(90deg, rgba(140,200,225,.05) 0 1px, transparent 1px 24px),
    radial-gradient(120% 90% at 50% 0%,#12293C 0%,#0A1622 68%);
  transition:opacity .5s ease,transform .5s cubic-bezier(.22,1,.36,1)}
#gate.out{opacity:0;transform:scale(1.06);pointer-events:none}
.gcard{width:100%;max-width:330px;text-align:center}
.glogo{width:70px;height:70px;margin:0 auto 16px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:32px;
  background:linear-gradient(150deg,rgba(77,216,232,.16),rgba(255,122,47,.12));border:1px solid var(--b2);
  box-shadow:0 12px 40px rgba(77,216,232,.14);animation:bob 3.6s ease-in-out infinite;position:relative}
.glogo::after{content:'';position:absolute;inset:6px;border:1px solid rgba(140,200,225,.16);border-radius:9px}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.gtitle{font-size:20px;font-weight:900;letter-spacing:-.4px}
.gsub{font-size:12px;color:var(--text3);margin-top:5px;font-weight:600;line-height:1.5}
.cells{display:flex;gap:10px;justify-content:center;margin:24px 0 6px}
.cell{width:48px;height:60px;border-radius:8px;background:rgba(140,200,225,.05);border:1.5px solid var(--b2);
  display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:var(--cyan);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:all .22s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden}
.cell.on{border-color:rgba(77,216,232,.70);background:rgba(77,216,232,.11);transform:translateY(-3px);box-shadow:0 8px 22px rgba(77,216,232,.20)}
.cell.on::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.35) 50%,transparent 65%);animation:sweep .55s ease}
@keyframes sweep{from{transform:translateX(-120%)}to{transform:translateX(120%)}}
.cells.bad{animation:shake .42s}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-11px)}40%{transform:translateX(9px)}60%{transform:translateX(-6px)}80%{transform:translateX(4px)}}
.cells.bad .cell{border-color:rgba(255,77,109,.75);color:var(--coral);background:rgba(255,77,109,.10)}
#gmsg{font-size:12px;font-weight:700;color:var(--coral);min-height:18px;margin-top:8px}
.pad{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:20px}
.key{height:52px;border-radius:9px;border:1px solid var(--b1);background:rgba(140,200,225,.045);color:var(--text);
  font-size:20px;font-weight:800;font-family:inherit;cursor:pointer;backdrop-filter:blur(10px);transition:transform .1s,background .18s}
.key:active{transform:scale(.93);background:rgba(77,216,232,.17);border-color:rgba(77,216,232,.4)}
.key.fn{font-size:15px;color:var(--text3)}
#pin{position:absolute;opacity:0;pointer-events:none;height:0;width:0}

/* ── header ────────────────────────────────────────── */
.hero{background:linear-gradient(158deg,rgba(77,216,232,.09),rgba(255,122,47,.05) 60%,transparent);
  border:1px solid var(--b1);border-radius:16px;padding:19px 18px 17px;position:relative;overflow:hidden;
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
/* a survey tape along the top edge — measured, not decorative */
.hero::before{content:'';position:absolute;top:0;left:0;right:0;height:6px;
  background:repeating-linear-gradient(90deg,rgba(77,216,232,.55) 0 1px,transparent 1px 9px);
  mask-image:linear-gradient(90deg,#000,#000 62%,transparent);
  -webkit-mask-image:linear-gradient(90deg,#000,#000 62%,transparent)}
@keyframes slide{to{background-position:200% 0}}
@keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.78)}}
.badge{display:inline-flex;align-items:center;gap:5px;font-size:9px;font-weight:800;letter-spacing:2.6px;text-transform:uppercase;
  padding:4px 10px;border-radius:4px;background:rgba(77,216,232,.10);color:var(--datum);
  border:1px solid rgba(77,216,232,.30);font-family:'JetBrains Mono',monospace}
.cname{font-size:25px;font-weight:800;letter-spacing:-.9px;margin-top:12px;line-height:1.1;text-wrap:balance}
.cproj{font-size:13px;color:var(--lime);font-weight:800;margin-top:3px}
.cmeta{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}
.chip{font-size:10.5px;font-weight:700;color:var(--text3);background:rgba(255,255,255,.05);border:1px solid var(--b1);padding:4px 10px;border-radius:20px}

/* ── KPI ───────────────────────────────────────────── */
/* ── KPI title blocks ─────────────────────────────────────────────────
   Modelled on the stamped title block in the corner of a drawing sheet:
   a reference number, a ruled field, and registration ticks at the
   corners. Numerals are monospaced so columns of figures line up. */
.kpis{display:grid;grid-template-columns:repeat(2,1fr);gap:9px;margin-top:13px;perspective:900px}
@media(min-width:560px){.kpis{grid-template-columns:repeat(4,1fr)}}
.kpi{position:relative;padding:13px 12px 12px;border-radius:10px;
  background:linear-gradient(168deg, color-mix(in srgb, var(--acc) 8%, var(--bg2)) 0%, var(--bg2) 62%);
  border:1px solid var(--b1);
  transform-style:preserve-3d;
  transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
  transition:transform .35s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .35s;
  opacity:0;animation:blockIn .72s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards;
  outline:none}
@supports not (background: color-mix(in srgb, red 8%, blue)){ .kpi{background:var(--bg2)} }
@keyframes blockIn{
  0%  {opacity:0;transform:translateY(18px) scale(.965)}
  60% {opacity:1}
  100%{opacity:1;transform:translateY(0) scale(1)}}
.kpi:hover,.kpi:focus-visible{border-color:color-mix(in srgb, var(--acc) 45%, transparent);
  box-shadow:0 10px 28px -14px color-mix(in srgb, var(--acc) 60%, transparent)}
.kpi:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
/* a raking highlight that follows the pointer, like light across a sheet */
.kpi::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:radial-gradient(130px 90px at var(--gx,50%) var(--gy,0%), color-mix(in srgb, var(--acc) 16%, transparent), transparent 70%);
  opacity:0;transition:opacity .35s}
.kpi:hover::before{opacity:1}
/* registration ticks */
.kpi .tick{position:absolute;width:6px;height:6px;border:1px solid color-mix(in srgb, var(--acc) 55%, transparent);opacity:.7}
.kpi .tick.tl{top:5px;left:5px;border-right:0;border-bottom:0}
.kpi .tick.tr{top:5px;right:5px;border-left:0;border-bottom:0}
.kpi .tick.bl{bottom:5px;left:5px;border-right:0;border-top:0}
.kpi .tick.br{bottom:5px;right:5px;border-left:0;border-top:0}
.kpi .kref{font-family:'JetBrains Mono',monospace;font-size:8.5px;font-weight:700;letter-spacing:1px;
  color:color-mix(in srgb, var(--acc) 70%, transparent);opacity:.85}
.kpi .vl{font-family:'JetBrains Mono',monospace;font-size:19px;font-weight:700;margin-top:5px;
  letter-spacing:-.8px;color:var(--acc);font-variant-numeric:tabular-nums;line-height:1.1}
@media(min-width:560px){.kpi .vl{font-size:21px}}
.kpi .krule{height:1px;margin:8px 0 7px;
  background:linear-gradient(90deg, color-mix(in srgb, var(--acc) 55%, transparent), transparent)}
.kpi .lb{font-size:8.5px;font-weight:800;letter-spacing:1.5px;color:var(--text3);text-transform:uppercase}
.kpi .sb{font-size:10px;font-weight:600;color:var(--text4);margin-top:3px;line-height:1.35}

/* ── sections ──────────────────────────────────────── */
.sec{margin-top:22px}
.stitle{display:flex;align-items:center;gap:9px;margin-bottom:11px;position:relative}
.stitle::before{content:'';position:absolute;left:-16px;top:50%;width:11px;height:1px;
  background:linear-gradient(90deg,var(--datum),transparent);opacity:.75}
@media(max-width:520px){.stitle::before{left:-13px;width:9px}}
.stitle b{font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase}
.stitle span.n{margin-left:auto;font-size:10px;font-weight:800;color:var(--text4);background:var(--bg3);border:1px solid var(--b1);padding:3px 9px;border-radius:20px}
.card{background:var(--bg2);border:1px solid var(--b1);border-radius:var(--r);padding:14px;margin-bottom:8px;
  opacity:0;transform:translateY(14px);
  transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1),border-color .3s}
.card:hover{border-color:var(--b2)}
.card.in{opacity:1;transform:none}
.row{display:flex;justify-content:space-between;align-items:center;gap:10px}
.bar{height:7px;border-radius:6px;background:rgba(255,255,255,.07);overflow:hidden;margin-top:9px}
.bar i{display:block;height:100%;border-radius:6px;width:0;
  transition:width 1.25s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden}
/* a pour: the fill carries a faint travelling sheen while it settles */
.bar i::after{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);
  transform:translateX(-100%);animation:pour 1.6s cubic-bezier(.3,0,.2,1) .25s 1 forwards}
@keyframes pour{to{transform:translateX(220%)}}
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

.gal{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
@media(min-width:520px){.gal{grid-template-columns:repeat(4,1fr)}}
.galcell{position:relative;aspect-ratio:1;border-radius:11px;overflow:hidden;cursor:pointer;
  background:var(--bg3) center/cover no-repeat;border:1px solid var(--b1);
  display:flex;align-items:center;justify-content:center;transition:transform .2s,border-color .2s}
.galcell:active{transform:scale(.96)}
.galcell.loaded{border-color:rgba(255,0,153,.28)}
.galspin{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.14);
  border-top-color:var(--pink);animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.galtag{position:absolute;left:5px;bottom:5px;font-size:8.5px;font-weight:800;padding:2px 6px;
  border-radius:10px;background:rgba(4,7,12,.66);color:#fff;backdrop-filter:blur(4px);
  max-width:88%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
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
</style>
</head>
<body>
<div id="aurora"><i></i><i></i><i></i></div>
<div id="datum" aria-hidden="true"><span id="bob"></span></div>

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
    needNet:'\u0B87\u0BA3\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1 \u0BA4\u0BC7\u0BB5\u0BC8'
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

function showLightbox(url, name){
  var lb = document.createElement('div');
  lb.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(4,7,12,.94);display:flex;'
    + 'flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:18px;'
    + 'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)';
  lb.innerHTML = '<img src="'+url+'" style="max-width:100%;max-height:78vh;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6)">'
    + '<div style="font-size:12px;font-weight:800;color:var(--text2);text-align:center;max-width:90%">'+esc(name||'')+'</div>'
    + '<div style="display:flex;gap:9px">'
    +   '<a href="'+url+'" download="'+esc(name||'image')+'" style="padding:9px 16px;border-radius:20px;background:var(--bg3);'
    +     'border:1px solid var(--b2);color:var(--text2);font-size:12px;font-weight:800;text-decoration:none">\u2B07 '+T('download','Download')+'</a>'
    +   '<button style="padding:9px 16px;border-radius:20px;background:var(--bg3);border:1px solid var(--b2);'
    +     'color:var(--text2);font-size:12px;font-weight:800;font-family:inherit;cursor:pointer">\u2715 '+T('close','Close')+'</button>'
    + '</div>';
  var shut = function(){ try{ document.body.removeChild(lb); }catch(e){} };
  lb.addEventListener('click', function(e){ if(e.target===lb) shut(); });
  lb.querySelector('button').addEventListener('click', shut);
  document.body.appendChild(lb);
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
      el.classList.add('loaded');
      var sp = el.querySelector('.galspin'); if(sp) sp.remove();
    }, function(){
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

function showGalBox(i, url, g){
  var total = (P.pg||[]).length;
  var lb = document.createElement('div');
  lb.id = 'galbox';
  lb.style.cssText = 'position:fixed;inset:0;z-index:95;background:rgba(4,7,12,.95);display:flex;'
    + 'flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;'
    + 'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)';
  var cap = [g[2], g[1], hasD(g[3])?fmtD(g[3]):''].filter(Boolean).join(' \u00B7 ');
  lb.innerHTML =
      '<img src="'+url+'" style="max-width:100%;max-height:74vh;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6)">'
    + '<div style="font-size:12px;font-weight:800;color:var(--text2);text-align:center;max-width:92%">'+esc(cap)+'</div>'
    + '<div style="font-size:10.5px;color:var(--text4);font-weight:700">'+(i+1)+' / '+total+'</div>'
    + '<div style="display:flex;gap:9px;align-items:center">'
    +   '<button data-nav="-1" style="padding:9px 15px;border-radius:20px;background:var(--bg3);border:1px solid var(--b2);color:var(--text2);font-size:13px;font-weight:800;font-family:inherit;cursor:pointer">\u2039</button>'
    +   '<a href="'+url+'" download="'+esc((g[2]||'site-photo')+'.jpg')+'" style="padding:9px 16px;border-radius:20px;background:var(--bg3);border:1px solid var(--b2);color:var(--text2);font-size:12px;font-weight:800;text-decoration:none">\u2B07 '+T('download','Download')+'</a>'
    +   '<button data-nav="0" style="padding:9px 16px;border-radius:20px;background:var(--bg3);border:1px solid var(--b2);color:var(--text2);font-size:12px;font-weight:800;font-family:inherit;cursor:pointer">\u2715</button>'
    +   '<button data-nav="1" style="padding:9px 15px;border-radius:20px;background:var(--bg3);border:1px solid var(--b2);color:var(--text2);font-size:13px;font-weight:800;font-family:inherit;cursor:pointer">\u203A</button>'
    + '</div>';
  var shut = function(){ try{ document.body.removeChild(lb); }catch(e){} document.removeEventListener('keydown', keys); };
  var go = function(d){
    var n = (i + d + total) % total;
    shut(); openGal(n);
  };
  var keys = function(e){
    if(e.key==='Escape') shut();
    else if(e.key==='ArrowLeft') go(-1);
    else if(e.key==='ArrowRight') go(1);
  };
  lb.addEventListener('click', function(e){ if(e.target===lb) shut(); });
  lb.querySelectorAll('button').forEach(function(b){
    b.addEventListener('click', function(){
      var d = Number(b.getAttribute('data-nav'));
      if(d===0) shut(); else go(d);
    });
  });
  document.addEventListener('keydown', keys);
  document.body.appendChild(lb);
}

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
  $('gsub').textContent = LANG==='ta'
    ? (SECLEN+' \u0B87\u0BB2\u0B95\u0BCD\u0B95 '+T('enterPin','')) 
    : ('Enter the '+SECLEN+'-digit PIN shared by '+(P.co&&P.co.n ? P.co.n : 'your contractor'));
  $('gtitle').textContent = T('projectPassbook','Project Passbook');
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
  var el = $('livebar');
  if(!el) return;
  if(LIVEST==='live'){
    el.style.display='flex';
    el.style.color='var(--mint)';
    el.style.borderColor='rgba(43,217,166,.30)';
    el.style.background='rgba(43,217,166,.07)';
    el.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:var(--mint);box-shadow:0 0 8px var(--mint);animation:pulseDot 1.8s ease-in-out infinite"></span>'
      + '<span>'+T('live','Live')+' \u00B7 '+T('updated','updated')+' '+fmtD(P.d)+'</span>';
  } else if(LIVEST==='pending'){
    el.style.display='flex';
    el.style.color='var(--text4)';
    el.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:var(--text4)"></span><span>'+T('checking','Checking for updates\u2026')+'</span>';
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
  var voTotal  = (P.vo||[]).reduce(function(s,r){ return s+num(r[3]); },0);
  var contract = (agreed>0 ? agreed : budget) + voTotal;
  var retHeld  = P.rt ? num(P.rt[0]) : 0;
  var balance  = Math.max(contract - net, 0);
  var over     = net - contract;
  var ph = P.ph||[];
  var prog = ph.length ? Math.round(ph.reduce(function(s,r){ return s+num(r[3]); },0)/ph.length) : 0;
  return {
    py:py, plan:plan, spays:spays, ph:ph,
    received:grossRec, refunded:refunded, net:net,
    budget:budget, agreed:agreed, contract:contract, voTotal:voTotal, retHeld:retHeld,
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
  /* Printed sheets travel without the screen around them, so the paper needs
     its own masthead: who issued it, for whom, and as of when. */
  H += '<div id="printhead" style="display:none">'
     +   '<div class="ph-tag"><b>Project Passbook</b>'
     +     (hasD(P.d) ? T('asOf','As of')+' '+fmtD(P.d) : '')
     +   '</div>'
     +   '<div class="ph-co">'+esc(co.n||'Project Passbook')+'</div>'
     +   '<div class="ph-sub">'
     +     [co.a, co.p, co.e].filter(Boolean).map(esc).join('  \u00B7  ')
     +     (co.g? '  \u00B7  GSTIN '+esc(co.g) : '')
     +   '</div>'
     +   '<div style="clear:both"></div>'
     + '</div>';

  H += '<div id="livebar" class="noprint" style="display:none;align-items:center;gap:8px;font-size:11px;font-weight:800;'
     + 'padding:8px 13px;border-radius:20px;border:1px solid var(--b1);background:var(--bg3);margin-bottom:11px;width:fit-content"></div>';

  H += '<div class="hero">'
     + '<span class="badge">\uD83D\uDCD8 '+T('projectPassbook','Project Passbook')+'</span>'
     + '<div class="cname">'+esc(c.n||'Customer')+'</div>'
     + (c.pr?'<div class="cproj">\uD83C\uDFE0 '+esc(c.pr)+'</div>':'')
     + '<div class="cmeta">'
     + (c.st?'<span class="chip" style="color:'+stCol+';border-color:'+stCol+'40">\u25CF '+esc(c.st)+'</span>':'')
     + (c.ad?'<span class="chip">\uD83D\uDCCD '+esc(c.ad)+'</span>':'')
     + (c.sq?'<span class="chip">\uD83D\uDCD0 '+num(c.sq).toLocaleString('en-IN')+' '+T('sqft','sq ft')+'</span>':'')
     + (c.sd?'<span class="chip">\uD83D\uDE80 '+T('started','Started')+' '+fmtD(c.sd)+'</span>':'')
     + (c.ed?'<span class="chip">\uD83C\uDFC1 '+T('target','Target')+' '+fmtD(c.ed)+'</span>':'')
     + (hasD(P.d) ? '<span class="chip">\uD83D\uDD52 '+T('asOf','As of')+' '+fmtD(P.d)+'</span>' : '')
     + '</div></div>';

  /* ── KPIs ── */
  /* Each card is a drawing title block: a stamped field with its own
     reference number, hairline rules and corner registration ticks. The
     numerals settle into place like a levelling instrument finding zero. */
  var kpis = [
    K.noContract
      ? {ref:'01', l:T('contractValue','Contract Value'), raw:null, c:'var(--text3)', s:T('notSet','not set yet')}
      : {ref:'01', l:T('contractValue','Contract Value'), raw:K.contract, c:'var(--marking)', s:K.agreed>0?'agreed stage total':'project budget'},
    {ref:'02', l:T('totalReceived','Total Received'), raw:K.net, c:'var(--datum)',
      s:K.refunded>0?('after '+fmtS(K.refunded)+' refund'):(K.noContract?'received to date':(K.payPct+'% collected'))},
    K.noContract
      ? {ref:'03', l:T('balanceToPay','Balance to Pay'), raw:null, c:'var(--text3)', s:T('askContractor','ask your contractor')}
      : {ref:'03', l:K.over>0?T('advancePaid','Advance Paid'):T('balanceToPay','Balance to Pay'),
         raw:(K.over>0?K.over:K.balance), c:K.balance>0?'var(--alarm)':'var(--verdigris)',
         s:K.balance>0?'still outstanding':'fully settled'},
    {ref:'04', l:T('workProgress','Work Progress'), raw:K.prog, pct:1, c:'var(--rebar)',
      s:K.ph.length?(K.ph.filter(function(r){return r[2]==='Completed';}).length+' of '+K.ph.length+' phases done'):'no phases yet'}
  ];
  H += '<div class="kpis">'+kpis.map(function(k,i){
    var shown = (k.raw===null) ? '\u2014' : (k.pct ? k.raw+'%' : fmtS(k.raw));
    return '<div class="kpi" style="--acc:'+k.c+';--d:'+(i*90)+'ms" tabindex="0">'
      + '<span class="tick tl"></span><span class="tick tr"></span>'
      + '<span class="tick bl"></span><span class="tick br"></span>'
      + '<div class="kref">'+k.ref+'</div>'
      + '<div class="vl'+(k.raw===null?'':' num')+'"'
      +   (k.raw===null?'':' data-to="'+k.raw+'"'+(k.pct?' data-pct="1"':''))+'>'+shown+'</div>'
      + '<div class="krule"></div>'
      + '<div class="lb">'+k.l+'</div>'
      + '<div class="sb">'+k.s+'</div></div>';
  }).join('')+'</div>';

  /* ── payment progress bar ── */
  if(K.contract>0){
    H += '<div class="card in" style="margin-top:12px">'
      + '<div class="row"><b style="font-size:11.5px;letter-spacing:1.4px;color:var(--text3);text-transform:uppercase">'+T('paymentCollected','Payment Collected')+'</b>'
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
    H += '<div class="sec noprint"><div class="stitle"><b style="color:var(--mint)">\uD83D\uDCB3 '+T('payNow','Pay Now')+'</b>'
      + '<span class="n">'+fmt(K.balance)+' '+T('due','due')+'</span></div>'
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
    H += '<div class="sec"><div class="stitle"><b style="color:var(--violet)">\uD83D\uDCB3 '+T('stagePaymentPlan','Stage Payment Plan')+'</b><span class="n">'+K.plan.length+' '+T('stages','stages')+'</span></div>';
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
      + '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">'+T('totalAgreed','Total Agreed')+'</span><span class="mono">'+fmt(K.agreed)+'</span></div>'
      + '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">'+T('collected','Collected')+'</span><span class="mono" style="color:var(--lime)">'+fmt(coll)+'</span></div>'
      + '<div class="tot"><span>'+T('balance','Balance')+'</span><span class="mono" style="color:'+(K.agreed-coll>0?'var(--coral)':'var(--mint)')+'">'+fmt(Math.max(K.agreed-coll,0))+(K.agreed-coll<=0?' \u2705':'')+'</span></div>'
      + '</div></div>';
  }

  /* ── approved variations ── */
  if((P.vo||[]).length){
    H += '<div class="sec"><div class="stitle"><b style="color:var(--violet)">\uD83D\uDCDD '+T('variations','Approved Changes')+'</b>'
      + '<span class="n">'+P.vo.length+'</span></div><div class="card in">';
    P.vo.forEach(function(v){
      var neg = num(v[3])<0;
      H += '<div class="row" style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,.045)">'
        + '<div style="min-width:0"><div style="font-size:12px;font-weight:800">'+esc(v[2])+'</div>'
        + '<div style="font-size:10px;color:var(--text4);font-weight:700;margin-top:2px">'
        +   esc(v[0])+(hasD(v[1])?' \u00B7 '+fmtD(v[1]):'')+'</div></div>'
        + '<span class="mono" style="font-weight:900;flex-shrink:0;color:'+(neg?'var(--coral)':'var(--violet)')+'">'
        +   (neg?'\u2212':'+')+fmt(Math.abs(num(v[3])))+'</span></div>';
    });
    H += '<div class="tot"><span>'+T('addedToContract','Added to contract')+'</span>'
      + '<span class="mono" style="color:var(--violet)">'+(K.voTotal<0?'\u2212':'+')+fmt(Math.abs(K.voTotal))+'</span></div>'
      + '</div></div>';
  }

  /* ── retention ── */
  if(K.retHeld>0){
    H += '<div class="sec"><div class="card in" style="border-color:rgba(0,240,255,.25);background:rgba(0,240,255,.05)">'
      + '<div style="font-size:10px;font-weight:900;letter-spacing:1.6px;color:var(--cyan);text-transform:uppercase;margin-bottom:6px">\uD83D\uDD12 '+T('retention','Retention Held')+'</div>'
      + '<div class="row"><span style="font-size:12px;color:var(--text3);font-weight:600">'
      +   T('retentionNote','Held back until the defect liability period ends')
      +   (P.rt[1]? ' ('+P.rt[1]+'%)' : '')+'</span>'
      + '<span class="mono" style="font-size:15px;font-weight:900;color:var(--cyan)">'+fmt(K.retHeld)+'</span></div>'
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
  window._ledger = allPays;
  if(allPays.length){
    H += '<div class="sec"><div class="stitle"><b style="color:var(--lime)">\uD83E\uDD1D '+T('paymentLedger','Payment Ledger')+'</b><span class="n">'+allPays.length+' '+T('entries','entries')+'</span></div>'
      + '<div class="card in" style="padding:4px 4px 8px"><table class="tbl"><thead><tr>'
      + '<th>'+T('date','Date')+'</th><th>'+T('details','Details')+'</th><th class="r">'+T('amount','Amount')+'</th></tr></thead><tbody>';
    var run = 0;
    allPays.slice().reverse().forEach(function(p){ p._run = (run += (String(p.t).toLowerCase()==='refund'? -p.a : p.a)); });
    allPays.forEach(function(p, pi){
      var isRef = String(p.t).toLowerCase()==='refund';
      var pcol  = isRef ? 'var(--coral)' : 'var(--lime)';
      H += '<tr><td class="mono" style="white-space:nowrap;font-size:11px">'+fmtD(p.d)+'</td>'
        + '<td><div style="font-weight:800;color:var(--text)">'+esc(p.src||p.t)+'</div>'
        + '<div style="font-size:10px;color:var(--text4);margin-top:2px">'+esc(p.m)+(p.ref?' \u00B7 '+esc(p.ref):'')
        + (isRef?'':' <button class="noprint" onclick="printReceipt('+pi+')" style="margin-left:4px;padding:1px 7px;border-radius:12px;border:1px solid var(--b2);background:var(--bg3);color:var(--text3);font-size:9px;font-weight:800;font-family:inherit;cursor:pointer">\uD83E\uDDFE '+T('receipt','Receipt')+'</button>')
        + '</div></td>'
        + '<td class="r mono" style="font-weight:900;color:'+pcol+';white-space:nowrap">'+(isRef?'\u2212':'')+fmt(p.a)
        + '<div style="font-size:9.5px;color:var(--text4);font-weight:700;margin-top:2px">bal '+fmtS(p._run)+'</div></td></tr>';
    });
    H += '</tbody></table>'
      + '<div class="tot"><span>'+T('totalReceived','Total Received')+'</span><span class="mono" style="color:var(--lime)">'+fmt(K.net)+'</span></div>'
      + '</div></div>';
  }

  /* ── work progress ── */
  if(K.ph.length){
    var order = {'In Progress':0,'On Hold':1,'Not Started':2,'Completed':3,'Cancelled':4};
    var phs = K.ph.slice().sort(function(a,b){ return (order[a[2]]==null?9:order[a[2]]) - (order[b[2]]==null?9:order[b[2]]); });
    H += '<div class="sec"><div class="stitle"><b style="color:var(--cyan)">\uD83D\uDD28 '+T('workProgressSec','Work Progress')+'</b><span class="n">'+K.prog+'% '+T('overall','overall')+'</span></div>';
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
    H += '<div class="sec"><div class="stitle"><b style="color:var(--amber)">\uD83D\uDCD3 '+T('siteLog','Site Log')+'</b><span class="n">'+P.sl.length+' '+T('updates','updates')+'</span></div>';
    P.sl.forEach(function(r){
      var d=r[0], w=r[1], wx=r[2], wd=r[3], iss=r[4];
      H += '<div class="card"><div class="row">'
        + '<b style="font-size:12.5px;color:var(--amber)">'+fmtD(d)+'</b>'
        + '<span style="font-size:10.5px;color:var(--text4);font-weight:700">'+(w?'\uD83D\uDC77 '+esc(w)+' '+T('workers','workers'):'')+(w&&wx?' \u00B7 ':'')+(wx?esc(wx):'')+'</span></div>'
        + (wd?'<div style="font-size:12px;color:var(--text2);margin-top:8px;line-height:1.6;font-weight:600">'+esc(wd)+'</div>':'')
        + (iss?'<div style="font-size:11.5px;color:var(--coral);margin-top:7px;font-weight:700">\u26A0 '+esc(iss)+'</div>':'')
        + '</div>';
    });
    H += '</div>';
  }

  /* ── photo gallery ── */
  if((P.pg||[]).length){
    H += '<div class="sec"><div class="stitle"><b style="color:var(--pink)">\uD83D\uDDBC\uFE0F '+T('sitePhotos','Site Photos')+'</b>'
      + '<span class="n">'+P.pg.length+'</span></div>'
      + '<div class="gal">';
    P.pg.forEach(function(g,i){
      H += '<div class="galcell" data-gal="'+i+'" onclick="openGal('+i+')" title="'+esc(g[2]||'')+'">'
        + '<span class="galspin"></span>'
        + (g[1]?'<span class="galtag">'+esc(g[1])+'</span>':'')
        + '</div>';
    });
    H += '</div></div>';
  }

  /* ── photos summary ── */
  if((P.pt||[]).length && !(P.pg||[]).length){
    var tot = P.pt.reduce(function(s,r){ return s+num(r[1]); },0);
    H += '<div class="sec"><div class="stitle"><b style="color:var(--pink)">\uD83D\uDCF8 '+T('sitePhotos','Site Photos')+'</b><span class="n">'+tot+' '+T('photos','photos')+'</span></div>'
      + '<div class="card in"><div style="display:flex;flex-wrap:wrap;gap:7px">'
      + P.pt.map(function(r){
          return '<span class="chip" style="color:var(--text2)">'+esc(r[0])+' \u00B7 <b style="color:var(--pink)">'+num(r[1])+'</b></span>';
        }).join('')
      + '</div><div style="font-size:10.5px;color:var(--text4);margin-top:10px;font-weight:600">'+T('photosNote','Photos are kept on file \u2014 ask your contractor to share them on WhatsApp.')+'</div></div></div>';
  }


  /* ── coming up: derived from the phase dates, costs nothing in the link ── */
  if(P.o && P.o.n && K.ph.length){
    var t0 = todayD(), t1 = new Date(t0.getTime()+21*86400000);
    var soon = K.ph.filter(function(r){
      if(r[2]==='Completed' || r[2]==='Cancelled') return false;
      var sd = parseD(r[4]), ed = parseD(r[5]);
      if(r[2]==='In Progress') return true;
      return sd && sd>=t0 && sd<=t1;
    }).sort(function(a,b){ return String(a[4]||'').localeCompare(String(b[4]||'')); }).slice(0,6);
    if(soon.length){
      H += '<div class="sec"><div class="stitle"><b style="color:var(--mint)">\u23ED\uFE0F '+T('comingUp','Coming Up')+'</b>'
        + '<span class="n">'+T('next3Weeks','next 3 weeks')+'</span></div>';
      soon.forEach(function(r){
        var live = r[2]==='In Progress';
        H += '<div class="card"><div class="row">'
          + '<div style="min-width:0"><div style="font-size:12.5px;font-weight:800">'+(live?'\u25B6 ':'\u25CB ')+esc(r[0])+'</div>'
          + '<div style="font-size:10.5px;color:var(--text4);margin-top:3px;font-weight:700">'
          + (r[4]?fmtD(r[4]):'')+(r[4]&&r[5]?' \u2192 ':'')+(r[5]?fmtD(r[5]):'')+'</div></div>'
          + '<span class="pill" style="background:'+(live?'rgba(43,217,166,.15)':'rgba(255,255,255,.05)')+';color:'+(live?'var(--mint)':'var(--text3)')+'">'
          + esc(r[2])+'</span></div></div>';
      });
      H += '</div>';
    }
  }

  /* ── measurement register ────────────────────────────────────────────── */
  if((P.ms||[]).length){
    var msTot = P.ms.reduce(function(t,r){ return t+num(r[2])*num(r[4]); },0);
    H += '<div class="sec"><div class="stitle"><b style="color:var(--cyan)">\uD83D\uDCD0 '+T('measurements','Measurements')+'</b>'
      + '<span class="n">'+P.ms.length+' '+T('entries','entries')+'</span></div>'
      + '<div class="card in" style="padding:4px 4px 8px"><table class="tbl"><thead><tr>'
      + '<th>'+T('date','Date')+'</th><th>'+T('item','Item')+'</th>'
      + '<th class="r">'+T('qty','Qty')+'</th><th class="r">'+T('amount','Amount')+'</th></tr></thead><tbody>';
    P.ms.forEach(function(r){
      H += '<tr><td class="mono" style="white-space:nowrap;font-size:10.5px">'+fmtD(r[0])+'</td>'
        + '<td style="font-weight:700;color:var(--text)">'+esc(r[1])+'</td>'
        + '<td class="r mono" style="white-space:nowrap">'+num(r[2]).toLocaleString('en-IN')+' <span style="color:var(--text4)">'+esc(r[3])+'</span></td>'
        + '<td class="r mono" style="font-weight:800;white-space:nowrap">'+(num(r[4])?fmt(num(r[2])*num(r[4])):'\u2014')+'</td></tr>';
    });
    H += '</tbody></table>'
      + (msTot>0?'<div class="tot"><span>'+T('amount','Amount')+'</span><span class="mono" style="color:var(--cyan)">'+fmt(msTot)+'</span></div>':'')
      + '</div></div>';
  }

  /* ── documents on file (names only, never the files) ─────────────────── */
  if((P.dc||[]).length){
    H += '<div class="sec"><div class="stitle"><b style="color:var(--violet)">\uD83D\uDCC4 '+T('documents','Documents')+'</b>'
      + '<span class="n">'+P.dc.length+'</span></div><div class="card in">';
    P.dc.forEach(function(d,i){
      var openable = !!(d[5] && LIVE);
      var meta = [];
      if(d[1]) meta.push(esc(d[1]));
      if(hasD(d[2])) meta.push(fmtD(d[2]));
      if(num(d[3])) meta.push(fmtBytes(d[3]));
      H += '<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.045)">'
        + '<div class="row">'
        +   '<div style="min-width:0"><div style="font-size:12px;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'
        +     docIcon(d[4], d[0])+' '+esc(d[0])+'</div>'
        +     (meta.length?'<div style="font-size:10px;color:var(--text4);font-weight:700;margin-top:2px">'+meta.join(' \u00B7 ')+'</div>':'')
        +   '</div>'
        +   (openable
              ? '<div style="display:flex;gap:6px;flex-shrink:0">'
                + '<button onclick="viewDoc('+i+')" style="padding:5px 11px;border-radius:16px;border:1px solid rgba(0,240,255,.35);background:rgba(0,240,255,.08);color:var(--cyan);font-size:10.5px;font-weight:800;font-family:inherit;cursor:pointer">\uD83D\uDC41 '+T('view','View')+'</button>'
                + '<button onclick="downloadDoc('+i+')" style="padding:5px 11px;border-radius:16px;border:1px solid var(--b2);background:var(--bg3);color:var(--text2);font-size:10.5px;font-weight:800;font-family:inherit;cursor:pointer">\u2B07</button>'
                + '</div>'
              : '')
        + '</div>'
        + '<div id="dst'+i+'" style="font-size:10px;font-weight:700;margin-top:4px;min-height:12px;color:var(--text4)"></div>'
        + '</div>';
    });
    H += '<div style="font-size:10.5px;color:var(--text4);margin-top:10px;font-weight:600">'
      + T('docsNote','These are held on file by your contractor.')+'</div></div></div>';
  }

  /* ── approved estimate ───────────────────────────────────────────────── */
  if(P.es){
    var e = P.es;
    H += '<div class="sec"><div class="stitle"><b style="color:var(--amber)">\uD83D\uDCCB '+T('estimate','Estimate')+'</b>'
      + (e.st?'<span class="n">'+esc(e.st)+'</span>':'')+'</div>'
      + '<div class="card in">'
      + '<div style="font-size:13px;font-weight:900">'+esc(e.t)+'</div>'
      + '<div style="font-size:10.5px;color:var(--text4);font-weight:700;margin-top:3px">'
      + (hasD(e.d)?fmtD(e.d)+' \u00B7 ':'')+e.n+' '+T('items','items')+'</div>'
      + '<div class="tot" style="margin-top:9px"><span>'+T('amount','Amount')+'</span>'
      + '<span class="mono" style="color:var(--amber)">'+fmt(num(e.tot)+num(e.gst))+'</span></div>'
      + '</div></div>';
  }

  /* ── activity timeline ───────────────────────────────────────────────── */
  if((P.ac||[]).length){
    H += '<div class="sec"><div class="stitle"><b style="color:var(--text3)">\uD83D\uDD53 '+T('activity','Activity')+'</b>'
      + '<span class="n">'+P.ac.length+'</span></div><div class="card in">';
    P.ac.forEach(function(a,i){
      H += '<div style="display:flex;gap:10px;padding:6px 0">'
        + '<div style="flex-shrink:0;width:7px;height:7px;border-radius:50%;background:var(--cyan);margin-top:6px;opacity:'+(1-i*0.04)+'"></div>'
        + '<div style="min-width:0"><div style="font-size:11.5px;font-weight:700;color:var(--text2);line-height:1.5">'+esc(a[2])+'</div>'
        + '<div class="mono" style="font-size:9.5px;color:var(--text4);margin-top:2px">'+fmtD(a[0])+'</div></div></div>';
    });
    H += '</div></div>';
  }

  /* ── contact the contractor ──────────────────────────────────────────── */
  if(P.o && P.o.q && co.p){
    var cw = String(co.p).replace(/[^\d]/g,'');
    if(cw.length===10) cw = '91'+cw;
    var proj = (c.pr||c.n||'');
    var mCall = encodeURIComponent('Hello '+(co.n||'')+',\n\nCould you please call me regarding my project *'+proj+'*?\n\nThank you.');
    var mQ    = encodeURIComponent('Hello '+(co.n||'')+',\n\nI have a question about my project *'+proj+'*:\n\n');
    H += '<div class="sec noprint"><div class="stitle"><b style="color:var(--lime)">\uD83D\uDCAC '+T('needHelp','Need help?')+'</b></div>'
      + '<div class="upi">'
      + '<a class="ub" style="border-color:rgba(200,255,0,.3)" href="tel:'+esc(String(co.p).replace(/[^\d+]/g,''))+'"><em>\uD83D\uDCDE</em>'+T('requestCall','Request a call')+'</a>'
      + '<a class="ub" style="border-color:rgba(37,211,102,.3);color:#25D366" href="https://wa.me/'+cw+'?text='+mQ+'"><em>\uD83D\uDCAC</em>'+T('raiseQuery','Raise a query')+'</a>'
      + '</div></div>';
  }

  /* ── cost summary ── */
  if(K.spent!==0 || K.matVal!==0 || K.ncTotal!==0){
    var _internal = !!(P.f && P.f.i);          /* were internal figures opted in? */
    var _rows = 0;
    var _body = '';
    if(K.spent!==0){ _rows++;
      _body += '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">'+T('workExecuted','Work Executed')+'</span><span class="mono">'+fmt(K.spent)+'</span></div>'; }
    if(_internal && K.matVal!==0){ _rows++;
      _body += '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">'+T('materials','Materials')+'</span><span class="mono">'+fmt(K.matVal)+'</span></div>'; }
    if(_internal && K.ncTotal!==0){ _rows++;
      _body += '<div class="tot" style="border:none;padding-top:0"><span style="color:var(--text3)">'+T('siteExpenses','Site Expenses')+'</span><span class="mono">'+fmt(K.ncTotal)+'</span></div>'; }
    /* a one-line "total" that just repeats the line above it is noise */
    if(_rows>1) _body += '<div class="tot"><span>'+T('totalCost','Total Cost to Date')+'</span><span class="mono" style="color:var(--amber)">'+fmt(K.spent+(_internal?K.matVal+K.ncTotal:0))+'</span></div>';
    if(_rows) H += '<div class="sec"><div class="stitle"><b style="color:var(--text3)">\uD83D\uDCCA '+T('costSummary','Cost Summary')+'</b></div>'
      + '<div class="card in">'+_body+'</div></div>';
  }

  /* ── note ── */
  if(P.c && P.c.nt){
    H += '<div class="sec"><div class="card in" style="border-color:rgba(255,176,32,.28);background:rgba(255,176,32,.06)">'
      + '<div style="font-size:10px;font-weight:900;letter-spacing:1.6px;color:var(--amber);text-transform:uppercase;margin-bottom:7px">\uD83D\uDCCC '+T('note','Note')+'</div>'
      + '<div style="font-size:12.5px;line-height:1.65;color:var(--text2);font-weight:600">'+esc(P.c.nt)+'</div></div></div>';
  }

  /* ── actions + footer ── */
  H += '<div class="tog noprint">'
    + '<button onclick="setLang(\''+(LANG==='ta'?'en':'ta')+'\')" style="border-color:rgba(0,240,255,.35);color:var(--cyan)">'
    +   (LANG==='ta'?'\uD83C\uDDEC\uD83C\uDDE7 English':'\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD')+'</button>'
    + '<button id="printbtn" onclick="doPrint()">\uD83D\uDDA8 '+T('printSave','Print / Save PDF')+'</button>'
    + '<button onclick="location.reload()">\uD83D\uDD04 '+T('reload','Reload')+'</button>'
    + '<button id="a2hs" onclick="doInstall()" style="display:none;border-color:rgba(155,93,229,.35);color:#B68AFF">\u2B07 '+T('addHome','Add to Home Screen')+'</button>'
    + '</div>';

  H += '<div id="printnote" style="display:none">'
     + T('printNote','This is a printed snapshot. Documents and site photos can be opened from the online passbook link.')
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
    + '<span style="opacity:.6">Powered by BuildLedger \u00B7 Passbook v3.1</span></div>'
    + '</div>';

  $('app').innerHTML = H;
  paintLive();
  animate();
  galMount();
  settleNumerals();
  kpiParallax();
  datumLine();
}

/* Numerals rise to their value on an ease-out curve, so the eye lands on
   the figure rather than being handed it. Skipped entirely under
   prefers-reduced-motion, where the final value is simply written. */
var REDUCED = false;
try { REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}

function settleNumerals(){
  document.querySelectorAll('.vl.num').forEach(function(el, i){
    var to = Number(el.getAttribute('data-to'))||0;
    var pct = el.hasAttribute('data-pct');
    var write = function(v){ el.textContent = pct ? Math.round(v)+'%' : fmtS(v); };
    if(REDUCED){ write(to); return; }
    var dur = 1050, start = null, delay = i*90;
    write(0);
    setTimeout(function(){
      var step = function(ts){
        if(start===null) start = ts;
        var p = Math.min((ts-start)/dur, 1);
        var e = 1 - Math.pow(1-p, 4);          /* easeOutQuart */
        write(to*e);
        if(p<1) requestAnimationFrame(step); else write(to);
      };
      requestAnimationFrame(step);
    }, delay+140);
  });
}

/* Title blocks lift slightly toward the pointer — a drawing sheet catching
   the light. Pointer-fine only, so it never interferes with touch. */
function kpiParallax(){
  if(REDUCED) return;
  try{ if(!window.matchMedia('(pointer:fine)').matches) return; }catch(e){ return; }
  document.querySelectorAll('.kpi').forEach(function(el){
    el.addEventListener('pointermove', function(e){
      var r = el.getBoundingClientRect();
      var x = (e.clientX-r.left)/r.width - .5, y = (e.clientY-r.top)/r.height - .5;
      el.style.setProperty('--rx', (-y*5).toFixed(2)+'deg');
      el.style.setProperty('--ry', ( x*5).toFixed(2)+'deg');
      el.style.setProperty('--gx', ((x+.5)*100).toFixed(1)+'%');
      el.style.setProperty('--gy', ((y+.5)*100).toFixed(1)+'%');
    });
    el.addEventListener('pointerleave', function(){
      el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg');
    });
  });
}

/* The datum line: a plumb line down the page whose bob tracks the read
   position, with a survey tick at every section heading. */
function datumLine(){
  var bob = $('bob'); if(!bob) return;
  var tick = function(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h>0 ? Math.min(Math.max(window.scrollY/h, 0), 1) : 0;
    bob.style.transform = 'translateY('+(p*100)+'vh)';
  };
  window.addEventListener('scroll', tick, {passive:true});
  window.addEventListener('resize', tick);
  tick();
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
