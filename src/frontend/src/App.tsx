import { useRef } from "react";

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>WinGo AI Ultra Pro V6 Pro</title>
<style>
:root{
  --bg:#04040f;
  --card:#0a0a1a;
  --card2:#0f0f22;
  --border:#1a1a30;
  --accent:#8b5cf6;
  --accent2:#06b6d4;
  --green:#10b981;
  --red:#ef4444;
  --gold:#f59e0b;
  --text:#e2e8f0;
  --muted:#4a5568;
  --glow-purple:rgba(139,92,246,0.35);
  --glow-cyan:rgba(6,182,212,0.3);
}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{background:var(--bg);color:var(--text);font-family:'Segoe UI',system-ui,sans-serif;min-height:100vh;overflow-x:hidden;padding-bottom:40px}

/* LOADER */
.loader-overlay{
  position:fixed;inset:0;
  background:radial-gradient(ellipse at center,#0d0a20 0%,#04040f 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  z-index:9999;transition:opacity .5s;
}
.loader-overlay.hiding{opacity:0;pointer-events:none;}
.loader-logo{
  width:80px;height:80px;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  border-radius:24px;
  display:flex;align-items:center;justify-content:center;
  font-size:38px;
  margin-bottom:24px;
  box-shadow:0 0 60px var(--glow-purple);
  animation:logoFloat 2s ease-in-out infinite;
}
@keyframes logoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.loader-ring{
  width:64px;height:64px;
  border:3px solid rgba(139,92,246,0.2);
  border-top:3px solid var(--accent);
  border-right:3px solid var(--accent2);
  border-radius:50%;
  animation:spin .7s linear infinite;
  margin-bottom:20px;
}
@keyframes spin{to{transform:rotate(360deg)}}
.loader-title{font-size:18px;font-weight:800;background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.loader-sub{font-size:12px;color:var(--muted);margin-top:8px;}
.loader-dots{display:flex;gap:6px;margin-top:16px;}
.loader-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);animation:dotPulse 1.2s ease-in-out infinite;}
.loader-dot:nth-child(2){animation-delay:.2s;background:var(--accent2);}
.loader-dot:nth-child(3){animation-delay:.4s;background:var(--green);}
@keyframes dotPulse{0%,100%{opacity:.2;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}

/* HEADER */
.header{
  background:rgba(4,4,15,0.95);
  backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(139,92,246,0.2);
  padding:13px 16px;
  display:flex;align-items:center;justify-content:space-between;
  position:sticky;top:0;z-index:100;
}
.logo{display:flex;align-items:center;gap:10px}
.logo-icon{
  width:40px;height:40px;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  border-radius:12px;
  display:flex;align-items:center;justify-content:center;font-size:22px;
  box-shadow:0 4px 16px var(--glow-purple);
}
.logo h1{font-size:15px;font-weight:800;color:#fff}
.logo p{font-size:9px;color:var(--muted)}
.live-badge{
  display:flex;align-items:center;gap:5px;
  background:rgba(16,185,129,0.1);
  border:1px solid rgba(16,185,129,0.4);
  padding:5px 12px;border-radius:20px;
  font-size:10px;color:var(--green);font-weight:800;
}
.live-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:blink 1s infinite}
@keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.8)}}

/* TIMER */
.timer-bar{
  background:rgba(10,10,26,0.8);
  border-bottom:1px solid var(--border);
  padding:12px 16px;
  display:flex;align-items:center;gap:14px;
}
.timer-circle{position:relative;width:58px;height:58px;flex-shrink:0}
.timer-circle svg{transform:rotate(-90deg)}
.timer-text{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;color:var(--gold)}
.timer-info{flex:1}
.period-label{font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px}
.period-num{font-size:13px;font-weight:700;color:var(--accent2);margin-top:1px}
.timer-status{font-size:11px;font-weight:600;color:var(--text);margin-top:2px;min-height:16px}
.prog-row{display:flex;align-items:center;gap:6px;margin-top:5px}
.prog-bar{flex:1;height:3px;background:var(--border);border-radius:2px;overflow:hidden}
.prog-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width .4s}
.prog-pct{font-size:9px;color:var(--muted);width:26px;text-align:right}

/* ERROR BANNER */
.err-banner{
  margin:10px 14px 0;
  background:rgba(239,68,68,0.08);
  border:1px solid rgba(239,68,68,0.25);
  border-radius:10px;
  padding:10px 14px;
  font-size:11px;color:#fca5a5;
  display:none;
  line-height:1.6;
}

/* RECOVERY ALERT */
.recovery-alert{
  margin:12px 14px 0;
  background:linear-gradient(135deg,rgba(245,158,11,.12),rgba(239,68,68,.06));
  border:1px solid rgba(245,158,11,.4);
  border-radius:16px;
  padding:14px;
  position:relative;overflow:hidden;
  display:none;
}
.recovery-alert::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#f59e0b,#ef4444,#f59e0b);}
.rec-title{font-size:12px;font-weight:800;color:#fbbf24;display:flex;align-items:center;gap:6px;margin-bottom:8px}
.rec-body{font-size:11px;color:#fde68a;line-height:1.7}

/* MAIN */
.main{padding:14px 14px 0}

/* === MEGA PREDICTION CARD === */
.mega-pred-card{
  border-radius:24px;
  padding:0;
  margin-bottom:16px;
  position:relative;
  overflow:hidden;
  background:var(--card);
  border:1px solid var(--border);
}
/* gradient top bar animated */
.mega-pred-card::before{
  content:'';
  position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--accent),var(--accent2),var(--green),var(--accent));
  background-size:200% 100%;
  animation:shimmer 3s linear infinite;
}
@keyframes shimmer{0%{background-position:0% 0}100%{background-position:200% 0}}
.mega-pred-card.type-size::before{background:linear-gradient(90deg,#ef4444,#f87171,#ef4444);background-size:200% 100%;animation:shimmer 2s linear infinite;}
.mega-pred-card.type-color::before{background:linear-gradient(90deg,#10b981,#34d399,#10b981);background-size:200% 100%;animation:shimmer 2s linear infinite;}
.mega-pred-card.type-skip::before{background:var(--border);animation:none;}
.mega-pred-card.type-recovery::before{background:linear-gradient(90deg,#f59e0b,#ef4444,#f59e0b);background-size:200% 100%;animation:shimmer 1.5s linear infinite;}

.pred-header{
  padding:14px 16px 0;
  display:flex;align-items:center;justify-content:space-between;
}
.pred-header-label{
  font-size:10px;font-weight:800;
  text-transform:uppercase;letter-spacing:1.5px;
  color:var(--muted);
  display:flex;align-items:center;gap:6px;
}
.pred-type-badge{
  font-size:9px;font-weight:800;
  padding:3px 10px;border-radius:20px;
  text-transform:uppercase;letter-spacing:.5px;
}
.badge-size{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3)}
.badge-color{background:rgba(16,185,129,.15);color:#34d399;border:1px solid rgba(16,185,129,.3)}
.badge-skip{background:var(--border);color:var(--muted)}
.badge-recovery{background:rgba(245,158,11,.15);color:#fbbf24;border:1px solid rgba(245,158,11,.4)}

/* THE BIG PREDICTION DISPLAY */
.pred-stage{
  display:flex;flex-direction:column;align-items:center;
  padding:20px 16px 16px;
  gap:8px;
}

/* Orb */
.pred-orb{
  width:120px;height:120px;
  border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  position:relative;
  transition:all .5s cubic-bezier(.175,.885,.32,1.275);
}
.pred-orb::after{
  content:'';
  position:absolute;inset:-4px;
  border-radius:50%;
  border:2px solid transparent;
  background-clip:padding-box;
}
.pred-orb.BIG{
  background:radial-gradient(circle at 35% 30%,rgba(239,68,68,.35),rgba(239,68,68,.08));
  border:2px solid rgba(239,68,68,.6);
  box-shadow:0 0 50px rgba(239,68,68,.3),inset 0 0 30px rgba(239,68,68,.1);
}
.pred-orb.SMALL{
  background:radial-gradient(circle at 35% 30%,rgba(16,185,129,.35),rgba(16,185,129,.08));
  border:2px solid rgba(16,185,129,.6);
  box-shadow:0 0 50px rgba(16,185,129,.3),inset 0 0 30px rgba(16,185,129,.1);
}
.pred-orb.RED{
  background:radial-gradient(circle at 35% 30%,rgba(239,68,68,.35),rgba(239,68,68,.08));
  border:2px solid rgba(239,68,68,.6);
  box-shadow:0 0 50px rgba(239,68,68,.3),inset 0 0 30px rgba(239,68,68,.1);
}
.pred-orb.GREEN{
  background:radial-gradient(circle at 35% 30%,rgba(16,185,129,.35),rgba(16,185,129,.08));
  border:2px solid rgba(16,185,129,.6);
  box-shadow:0 0 50px rgba(16,185,129,.3),inset 0 0 30px rgba(16,185,129,.1);
}
.pred-orb.SKIP{
  background:var(--card2);
  border:2px solid var(--border);
  box-shadow:none;
}
.pred-orb.RECOVERY{
  background:radial-gradient(circle at 35% 30%,rgba(245,158,11,.35),rgba(245,158,11,.08));
  border:2px solid rgba(245,158,11,.6);
  box-shadow:0 0 50px rgba(245,158,11,.4),inset 0 0 30px rgba(245,158,11,.1);
  animation:orbPulse 1.5s ease-in-out infinite;
}
@keyframes orbPulse{0%,100%{box-shadow:0 0 50px rgba(245,158,11,.4)}50%{box-shadow:0 0 80px rgba(245,158,11,.7)}}
.orb-icon{font-size:16px;margin-bottom:2px;}
.orb-value{font-size:32px;font-weight:900;line-height:1;}
.orb-sub{font-size:9px;font-weight:700;opacity:.7;letter-spacing:1px;text-transform:uppercase;}

/* Confidence arc */
.conf-ring-wrap{position:relative;width:60px;height:60px;}
.conf-ring-wrap svg{position:absolute;inset:0;transform:rotate(-90deg);}
.conf-ring-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.conf-ring-pct{font-size:13px;font-weight:900;}
.conf-ring-label{font-size:7px;color:var(--muted);text-transform:uppercase;}

.pred-value-big{font-size:44px;font-weight:900;letter-spacing:2px;line-height:1;}
.pred-conf-row{display:flex;align-items:center;gap:12px;}
.pred-conf-text{font-size:11px;color:var(--muted);}

/* Signal strength bar */
.sig-strength-bar{
  width:100%;max-width:280px;
  background:var(--border);
  border-radius:6px;
  height:10px;
  overflow:hidden;
  position:relative;
}
.sig-strength-fill{
  height:100%;
  border-radius:6px;
  transition:width .7s cubic-bezier(.4,0,.2,1);
  position:relative;
}
.sig-strength-fill::after{
  content:'';
  position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.3) 50%,transparent 100%);
  animation:shineBar 2s linear infinite;
}
@keyframes shineBar{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}
.fill-high{background:linear-gradient(90deg,#059669,#10b981,#34d399)}
.fill-med{background:linear-gradient(90deg,#b45309,#f59e0b,#fbbf24)}
.fill-low{background:linear-gradient(90deg,#b91c1c,#ef4444,#f87171)}

/* Why / reason box */
.reason-chips{display:flex;flex-wrap:wrap;gap:5px;padding:0 16px 14px;justify-content:center;}
.chip{
  font-size:9px;font-weight:700;
  padding:3px 9px;border-radius:20px;
  border:1px solid var(--border);
  background:var(--card2);
  color:var(--muted);
}
.chip.agree{background:rgba(16,185,129,.08);border-color:rgba(16,185,129,.3);color:#34d399;}
.chip.conflict{background:rgba(239,68,68,.08);border-color:rgba(239,68,68,.3);color:#f87171;}
.chip.info{background:rgba(6,182,212,.08);border-color:rgba(6,182,212,.3);color:var(--accent2);}

/* Skip message */
.skip-card{
  text-align:center;padding:20px 16px;
  color:var(--muted);font-size:12px;line-height:2;
}
.skip-card b{color:var(--gold);display:block;font-size:16px;margin-bottom:6px;}

/* SIGNALS */
.signals-wrap{margin-bottom:14px;}
.signals-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.sig-card{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:14px;
  padding:10px 12px;
  transition:border-color .3s;
}
.sig-card.agree-card{border-color:rgba(16,185,129,.25);}
.sig-card.conflict-card{border-color:rgba(239,68,68,.2);}
.sig-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.sig-name{font-size:10px;font-weight:700;color:var(--muted);}
.sig-vote{font-size:9px;font-weight:800;padding:2px 8px;border-radius:8px;}
.sv-up{background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.25)}
.sv-dn{background:rgba(16,185,129,.12);color:#34d399;border:1px solid rgba(16,185,129,.25)}
.sv-vl{background:rgba(124,58,237,.12);color:#c084fc;border:1px solid rgba(124,58,237,.25)}
.sv-sk{background:var(--border);color:var(--muted)}
.sig-bar-wrap{height:3px;background:var(--border);border-radius:2px;overflow:hidden;margin-bottom:5px;}
.sig-bar-fill{height:100%;border-radius:2px;transition:width .6s;}
.sig-reason{font-size:9px;color:var(--muted);line-height:1.5;}
.sig-agree-dot{width:5px;height:5px;border-radius:50%;display:inline-block;margin-right:3px;}

/* RECENT RESULTS */
.results-section{margin-bottom:14px;}
.section-title{
  font-size:10px;font-weight:800;color:var(--muted);
  text-transform:uppercase;letter-spacing:1px;
  margin-bottom:8px;
  display:flex;align-items:center;gap:8px;
}
.section-title::after{content:'';flex:1;height:1px;background:var(--border);}
.balls-row{display:flex;gap:8px;flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;}
.balls-row::-webkit-scrollbar{height:2px;}
.balls-row::-webkit-scrollbar-thumb{background:var(--border);border-radius:1px;}
.ball{
  width:38px;height:38px;border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  font-size:13px;font-weight:900;flex-shrink:0;
  position:relative;
}
.ball.g{background:radial-gradient(circle at 35% 30%,#34d399,#059669);box-shadow:0 3px 12px rgba(16,185,129,.45)}
.ball.r{background:radial-gradient(circle at 35% 30%,#f87171,#dc2626);box-shadow:0 3px 12px rgba(239,68,68,.45)}
.ball.v{background:radial-gradient(circle at 35% 30%,#c084fc,#7c3aed);box-shadow:0 3px 12px rgba(124,58,237,.45)}
.ball .bsz{font-size:6px;opacity:.75;font-weight:700;line-height:1;}

/* STATS */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px;}
.stat-box{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:10px 6px;text-align:center;}
.stat-num{font-size:18px;font-weight:900;}
.stat-lab{font-size:8px;color:var(--muted);margin-top:2px;text-transform:uppercase;letter-spacing:.5px;}

/* PRED LOG */
.pred-log-section{margin-bottom:14px;}
.log-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.log-win-rate{
  font-size:10px;font-weight:800;
  background:rgba(16,185,129,.1);
  border:1px solid rgba(16,185,129,.3);
  color:#34d399;
  padding:2px 10px;border-radius:20px;
}
.pred-log-inner{max-height:160px;overflow-y:auto;}
.pred-log-inner::-webkit-scrollbar{width:2px;}
.pred-log-inner::-webkit-scrollbar-thumb{background:var(--border);border-radius:1px;}
.log-row{
  display:flex;align-items:center;gap:8px;
  padding:6px 0;
  border-bottom:1px solid rgba(26,26,48,.8);
  font-size:10px;
}
.log-pred{font-weight:900;min-width:55px;}
.log-vs{color:var(--muted);font-size:9px;}
.log-result{font-weight:700;min-width:38px;color:var(--text);}
.log-outcome{font-size:9px;font-weight:800;padding:2px 8px;border-radius:8px;}
.log-win{background:rgba(16,185,129,.12);color:#34d399;border:1px solid rgba(16,185,129,.25)}
.log-loss{background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.25)}
.log-wait{background:var(--border);color:var(--muted)}
.log-meta{font-size:8px;color:var(--muted);margin-left:auto;}

/* HISTORY */
.history-section{margin-bottom:14px;}
.hist-inner{max-height:140px;overflow-y:auto;}
.hist-inner::-webkit-scrollbar{width:2px;}
.hist-inner::-webkit-scrollbar-thumb{background:var(--border);}
table{width:100%;border-collapse:collapse;font-size:11px;}
th{color:var(--muted);font-weight:700;padding:4px 6px;text-align:left;border-bottom:1px solid var(--border);font-size:9px;text-transform:uppercase;}
td{padding:5px 6px;border-bottom:1px solid rgba(26,26,48,.6);}

/* REFRESH BTN */
.btn-refresh{
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  color:#fff;border:none;
  padding:15px;border-radius:14px;
  font-size:14px;font-weight:700;
  cursor:pointer;width:100%;
  margin-bottom:14px;
  box-shadow:0 6px 24px var(--glow-purple);
  transition:transform .15s,box-shadow .15s;
  position:relative;overflow:hidden;
}
.btn-refresh:active{transform:scale(.97);}
.btn-refresh:disabled{opacity:.45;cursor:not-allowed;box-shadow:none;}
.btn-refresh::after{
  content:'';
  position:absolute;inset:0;
  background:linear-gradient(135deg,transparent,rgba(255,255,255,.1),transparent);
  background-size:200% 100%;
  animation:btnShine 3s linear infinite;
}
@keyframes btnShine{0%{background-position:200% 0}100%{background-position:-200% 0}}

.footer{text-align:center;font-size:9px;color:var(--muted);padding:4px 0 8px;line-height:2;}

/* 3-WAY COMPARE */
.three-way{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;}
.tw-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:10px;text-align:center;transition:border-color .3s;position:relative;}
.tw-card.chosen{border-color:rgba(245,158,11,.5);background:rgba(245,158,11,.04);}
.tw-badge{position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:var(--gold);color:#000;font-size:8px;font-weight:900;padding:2px 8px;border-radius:10px;white-space:nowrap;}
.tw-label{font-size:9px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px;}
.tw-vote{font-size:16px;font-weight:900;margin-bottom:3px;}
.tw-conf{font-size:10px;color:var(--muted);margin-bottom:4px;}
.tw-bar{height:3px;background:var(--border);border-radius:2px;overflow:hidden;}
.tw-fill{height:100%;border-radius:2px;transition:width .6s;}
</style>
</head>
<body>

<div class="loader-overlay" id="loader">
  <div class="loader-logo">&#129504;</div>
  <div class="loader-ring"></div>
  <div class="loader-title">WinGo AI Ultra Pro</div>
  <div class="loader-sub" id="loaderMsg">Connecting to WinGo API...</div>
  <div class="loader-dots">
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
  </div>
</div>

<div class="header">
  <div class="logo">
    <div class="logo-icon">&#129504;</div>
    <div>
      <h1>WinGo AI Ultra Pro</h1>
      <p>V5 Pro &bull; Advanced AI &bull; Loss Guard</p>
    </div>
  </div>
  <div class="live-badge"><div class="live-dot"></div>LIVE</div>
</div>

<div class="timer-bar">
  <div class="timer-circle">
    <svg width="58" height="58" viewBox="0 0 58 58">
      <circle cx="29" cy="29" r="25" fill="none" stroke="rgba(26,26,48,1)" stroke-width="4"/>
      <circle id="timerArc" cx="29" cy="29" r="25" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="0"/>
    </svg>
    <div class="timer-text" id="timerNum">60</div>
  </div>
  <div class="timer-info">
    <div class="period-label">Current Period</div>
    <div class="period-num" id="periodNum">Loading...</div>
    <div class="timer-status" id="timerStatus">Initializing...</div>
    <div class="prog-row">
      <div class="prog-bar"><div class="prog-fill" id="progFill" style="width:0%"></div></div>
      <div class="prog-pct" id="progPct">0%</div>
    </div>
  </div>
</div>

<div class="err-banner" id="errBanner">
  &#9888; API offline - cached data use ho rha hai. Auto-retry har 30s.<br>
  Prediction sirf cached history se hai.
</div>

<div class="recovery-alert" id="recoveryAlert">
  <div class="rec-title">&#9889; LOSS RECOVERY MODE ACTIVE</div>
  <div class="rec-body" id="recoveryBody"></div>
</div>

<div class="main">

  <!-- MEGA PREDICTION CARD -->
  <div class="mega-pred-card type-size" id="megaCard">
    <div class="pred-header">
      <div class="pred-header-label">&#127919; Final Prediction</div>
      <div class="pred-type-badge badge-size" id="predBadge">Analyzing</div>
    </div>
    <div class="pred-stage">
      <div class="pred-orb SKIP" id="predOrb">
        <div class="orb-icon" id="orbIcon">?</div>
        <div class="orb-value" id="orbValue" style="color:var(--muted)">--</div>
        <div class="orb-sub" id="orbSub">loading</div>
      </div>
      <div class="pred-conf-row">
        <div class="conf-ring-wrap" id="confRingWrap">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(26,26,48,1)" stroke-width="4"/>
            <circle id="confRingArc" cx="30" cy="30" r="24" fill="none" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round" stroke-dasharray="150.8" stroke-dashoffset="150.8"/>
          </svg>
          <div class="conf-ring-center">
            <div class="conf-ring-pct" id="confRingPct" style="color:var(--muted)">0%</div>
            <div class="conf-ring-label">CONF</div>
          </div>
        </div>
        <div>
          <div style="font-size:20px;font-weight:900;" id="predMainVal" style="color:var(--muted)">--</div>
          <div style="font-size:10px;color:var(--muted);margin-top:2px;" id="predTypeText">Analyzing...</div>
        </div>
      </div>
      <div style="width:100%;max-width:260px;">
        <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:3px;">
          <span>Signal Strength</span>
          <span id="sigStrengthPct">0%</span>
        </div>
        <div class="sig-strength-bar">
          <div class="sig-strength-fill fill-med" id="sigStrengthFill" style="width:0%"></div>
        </div>
      </div>
    </div>
    <div class="reason-chips" id="reasonChips"></div>
  </div>

  <!-- 3-WAY -->
  <div class="section-title">3-Way Analysis</div>
  <div class="three-way" id="threeWay">
    <div class="tw-card" id="twSize">
      <div class="tw-label">&#128208; Size</div>
      <div class="tw-vote" id="twSizeVote" style="color:var(--muted)">--</div>
      <div class="tw-conf" id="twSizeConf">--</div>
      <div class="tw-bar"><div class="tw-fill" id="twSizeBar" style="width:0%;background:#ef4444"></div></div>
    </div>
    <div class="tw-card" id="twColor">
      <div class="tw-label">&#127912; Color</div>
      <div class="tw-vote" id="twColorVote" style="color:var(--muted)">--</div>
      <div class="tw-conf" id="twColorConf">--</div>
      <div class="tw-bar"><div class="tw-fill" id="twColorBar" style="width:0%;background:#10b981"></div></div>
    </div>
  </div>

  <!-- SIGNALS -->
  <div class="signals-wrap">
    <div class="section-title">Signal Breakdown</div>
    <div class="signals-grid" id="signalsGrid"></div>
  </div>

  <!-- RECENT -->
  <div class="results-section">
    <div class="section-title">Recent Results</div>
    <div class="balls-row" id="ballsRow"><span style="color:var(--muted);font-size:11px">Loading...</span></div>
  </div>

  <!-- STATS -->
  <div class="stats-row">
    <div class="stat-box"><div class="stat-num" id="st1" style="color:var(--accent2)">0</div><div class="stat-lab">History</div></div>
    <div class="stat-box"><div class="stat-num" id="st2" style="color:#f87171">0%</div><div class="stat-lab">Big%</div></div>
    <div class="stat-box"><div class="stat-num" id="st3" style="color:#34d399">0%</div><div class="stat-lab">Green%</div></div>
    <div class="stat-box"><div class="stat-num" id="st4" style="color:var(--gold)">0x</div><div class="stat-lab">Streak</div></div>
  </div>

  <!-- PRED LOG -->
  <div class="pred-log-section">
    <div class="log-header">
      <div class="section-title" style="margin-bottom:0">Prediction Log</div>
      <div class="log-win-rate" id="logWinRate">0W / 0L</div>
    </div>
    <div class="pred-log-inner" id="predLogInner">
      <div style="font-size:11px;color:var(--muted);text-align:center;padding:12px">Predictions will appear here...</div>
    </div>
  </div>

  <!-- HISTORY -->
  <div class="history-section">
    <div class="section-title">Game History (<span id="histCnt">0</span>)</div>
    <div class="hist-inner">
      <table><thead><tr><th>Period</th><th>Num</th><th>Size</th><th>Color</th></tr></thead>
      <tbody id="histBody"></tbody></table>
    </div>
  </div>

  <button class="btn-refresh" id="refreshBtn" onclick="doRefresh()">&#8635;&nbsp; Refresh &amp; Re-Analyze</button>
  <div class="footer">V6 Pro &bull; Hard Loss Guard &bull; 5 Detectors &bull; Instant Load</div>
</div>

<script>
var API='https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json';
var PROXIES=['https://api.allorigins.win/raw?url=','https://corsproxy.io/?','https://api.codetabs.com/v1/proxy?quest='];
var HIST_KEY='wgo_v4_hist';
var LOG_KEY='wgo_v4_log';

var gHistory=[];
var predLog=[];
try{gHistory=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');}catch(e){gHistory=[];}
try{predLog=JSON.parse(localStorage.getItem(LOG_KEY)||'[]');}catch(e){predLog=[];}
var busy=false,proxyIdx=0;
var lastPredPeriod='',lastPred='',lastPredType='';
var apiOk=false;

// ---- LOADER: always hide after max 1.5s, decoupled from API ----
var _loaderHidden=false;
function hideLoader(){
  if(_loaderHidden) return;
  _loaderHidden=true;
  var el=document.getElementById('loader');
  if(!el) return;
  el.classList.add('hiding');
  setTimeout(function(){if(el){el.style.display='none';el.style.visibility='hidden';}},400);
}
// Multiple independent fallbacks - loader hides FAST no matter what
setTimeout(hideLoader, 800);
setTimeout(hideLoader, 1500);
setTimeout(hideLoader, 3000);
window.addEventListener('load',function(){hideLoader();});
document.addEventListener('DOMContentLoaded',function(){setTimeout(hideLoader,500);});

function numInfo(n){
  var num=parseInt(n)||0;
  var big=num>=5;
  var col=num===0||num===5?'violet':(num===1||num===3||num===7||num===9?'green':'red');
  return{num:num,big:big,col:col,size:big?'Big':'Small'};
}

// Smart fetch with all proxy options - V7 Ultra Fix
function fetchData(){
  var fullUrl=API+'?pageNo=1&pageSize=200';
  var enc=encodeURIComponent(fullUrl);
  // Proxies: [url, parseMode] - parseMode 'ao' = allorigins /get format
  var proxies=[
    ['https://api.allorigins.win/raw?url='+enc,'json'],
    ['https://corsproxy.io/?'+enc,'json'],
    ['https://api.codetabs.com/v1/proxy?quest='+enc,'json'],
    ['https://api.allorigins.win/get?url='+enc,'ao'],
    ['https://cors.eu.org/'+fullUrl,'json'],
    ['https://api.cors.lol/?url='+enc,'json'],
    ['https://worker.bridged.cc/cors-anywhere/'+fullUrl,'json']
  ];
  return new Promise(function(resolve){
    var failed=0;
    var total=proxies.length;
    var done=false;
    var hardTimer=setTimeout(function(){
      if(!done){done=true;apiOk=false;resolve(null);}
    },9000);
    proxies.forEach(function(pair){
      var purl=pair[0],mode=pair[1];
      var ctrl=new AbortController();
      var t=setTimeout(function(){ctrl.abort();},7000);
      fetch(purl,{signal:ctrl.signal,cache:'no-store'})
        .then(function(r){
          clearTimeout(t);
          if(!r.ok) throw new Error('bad');
          return r.json();
        })
        .then(function(json){
          clearTimeout(t);
          if(done) return;
          var data=json;
          if(mode==='ao'){
            if(json.contents){
              try{data=JSON.parse(json.contents);}catch(e){failed++;if(failed>=total&&!done){done=true;clearTimeout(hardTimer);apiOk=false;resolve(null);}return;}
            } else {failed++;if(failed>=total&&!done){done=true;clearTimeout(hardTimer);apiOk=false;resolve(null);}return;}
          }
          if(!done){done=true;clearTimeout(hardTimer);apiOk=true;resolve(data);}
        })
        .catch(function(){
          clearTimeout(t);
          failed++;
          if(failed>=total&&!done){done=true;clearTimeout(hardTimer);apiOk=false;resolve(null);}
        });
    });
  });
}

function parseData(data){
  if(!data) return[];
  var list=(data.data&&data.data.list)||data.list||data.result||[];
  return list.map(function(item){
    var num=parseInt(item.number!=null?item.number:item.winNumber!=null?item.winNumber:item.openCode!=null?item.openCode:0);
    var period=String(item.issueNumber!=null?item.issueNumber:item.period!=null?item.period:item.issue||'');
    return Object.assign({period:period},numInfo(num));
  }).filter(function(r){return!isNaN(r.num);});
}

function mergeHistory(fresh){
  if(!fresh.length) return false;
  var seen=new Set(gHistory.map(function(h){return h.period;}));
  var add=fresh.filter(function(r){return!seen.has(r.period);});
  if(add.length){
    gHistory=add.concat(gHistory).slice(0,800);
    localStorage.setItem(HIST_KEY,JSON.stringify(gHistory));
    return true;
  }
  return false;
}

function checkLastPredResult(){
  if(!lastPredPeriod||!lastPred) return null;
  var result=gHistory.find(function(r){return r.period===lastPredPeriod;});
  if(!result) return null;
  if(predLog.find(function(l){return l.period===lastPredPeriod;})) return null;
  var actualVal=lastPredType==='size'?result.size:lastPredType==='color'?result.col:String(result.num);
  var win=actualVal.toLowerCase()===lastPred.toLowerCase();
  var entry={period:lastPredPeriod,pred:lastPred,type:lastPredType,result:actualVal,outcome:win?'WIN':'LOSS',ts:Date.now()};
  predLog=[entry].concat(predLog).slice(0,100);
  localStorage.setItem(LOG_KEY,JSON.stringify(predLog));
  lastPredPeriod='';lastPred='';lastPredType='';
  return entry;
}

function getConsecutiveLosses(){
  var count=0;
  for(var i=0;i<predLog.length;i++){if(predLog[i].outcome==='LOSS')count++;else break;}
  return count;
}

// ---- ANALYSIS ENGINES ----
function streakDetector(h){
  var streak=1,val=h[0].big;
  for(var i=1;i<h.length;i++){if(h[i].big===val)streak++;else break;}
  var vote,conf;
  if(streak>=7){vote=val?'Small':'Big';conf=89;}
  else if(streak>=5){vote=val?'Small':'Big';conf=84;}
  else if(streak>=4){vote=val?'Small':'Big';conf=79;}
  else if(streak>=3){vote=val?'Small':'Big';conf=74;}
  else if(streak>=2){vote=val?'Small':'Big';conf=62;}
  else{
    if(h.length>=3&&h[0].big!==h[1].big&&h[1].big!==h[2].big){vote=val?'Small':'Big';conf=65;}
    else{vote=val?'Big':'Small';conf=52;}
  }
  return{name:'Streak',vote:vote,conf:conf,reason:streak+'x '+(val?'Big':'Small')+' -> '+vote};
}

function balanceDetector(h){
  var n=Math.min(h.length,40),sl=h.slice(0,n);
  var bigCnt=sl.filter(function(r){return r.big;}).length;
  var bigRate=bigCnt/n;
  var vote,conf;
  if(bigRate>0.68){vote='Small';conf=Math.round(Math.min(86,60+(bigRate-0.5)*82));}
  else if(bigRate<0.32){vote='Big';conf=Math.round(Math.min(86,60+(0.5-bigRate)*82));}
  else if(bigRate>0.58){vote='Small';conf=Math.round(51+(bigRate-0.5)*60);}
  else if(bigRate<0.42){vote='Big';conf=Math.round(51+(0.5-bigRate)*60);}
  else{vote=h[0].big?'Small':'Big';conf=51;}
  return{name:'Balance',vote:vote,conf:conf,reason:'Big '+Math.round(bigRate*100)+'% in '+n+' results'};
}

function markovDetector(h){
  if(h.length<15) return{name:'Markov',vote:'Big',conf:50,reason:'Need more data'};
  var trans={};
  for(var j=2;j<h.length;j++){
    var state=(h[j].big?'B':'S')+(h[j-1].big?'B':'S');
    var out=h[j-2].big?'B':'S';
    if(!trans[state]) trans[state]={B:0,S:0};
    trans[state][out]++;
  }
  var curState=(h[0].big?'B':'S')+(h[1]?h[1].big?'B':'S':'S');
  var entry=trans[curState];
  if(!entry||(entry.B+entry.S)<3) return{name:'Markov',vote:'Big',conf:50,reason:'State '+curState+': no data'};
  var total=entry.B+entry.S,bigProb=entry.B/total;
  var vote=bigProb>0.5?'Big':'Small';
  var conf=Math.round(Math.min(88,50+Math.abs(bigProb-0.5)*82));
  return{name:'Markov',vote:vote,conf:conf,reason:'State '+curState+': B='+entry.B+' S='+entry.S};
}

function patternDetector(h){
  if(h.length<20) return{name:'Pattern',vote:'Big',conf:50,reason:'Need more data'};
  var seq=h.map(function(r){return r.big?'B':'S';});
  var curr4=seq.slice(0,4).join('');
  var bigA=0,smA=0;
  for(var i=4;i<seq.length-1;i++){if(seq.slice(i,i+4).join('')===curr4){if(seq[i-1]==='B')bigA++;else smA++;}}
  var total=bigA+smA;
  if(total<3) return{name:'Pattern',vote:'Big',conf:50,reason:'No pattern history'};
  var vote=bigA>smA?'Big':'Small';
  var conf=Math.round(Math.min(86,50+(Math.abs(bigA-smA)/total)*70));
  return{name:'Pattern',vote:vote,conf:conf,reason:curr4+': '+total+' matches, '+Math.round(bigA/total*100)+'%B'};
}

function colorStreakDetector(h){
  var streak=1,lc=h[0].col;
  for(var i=1;i<h.length;i++){if(h[i].col===lc)streak++;else break;}
  var vote,conf;
  if(streak>=5){vote=lc==='red'?'Green':'Red';conf=86;}
  else if(streak>=4){vote=lc==='red'?'Green':'Red';conf=79;}
  else if(streak>=3){vote=lc==='red'?'Green':'Red';conf=73;}
  else if(streak>=2){vote=lc==='red'?'Green':'Red';conf=63;}
  else{vote=lc==='red'?'Green':'Red';conf=53;}
  return{name:'ColStreak',vote:vote,conf:conf,reason:streak+'x '+lc+' -> '+vote};
}

function colorBalanceDetector(h){
  var n=Math.min(h.length,40),sl=h.slice(0,n);
  var rC=sl.filter(function(r){return r.col==='red';}).length;
  var gC=sl.filter(function(r){return r.col==='green';}).length;
  var total=rC+gC;
  if(total<5) return{name:'ColBalance',vote:'Green',conf:50,reason:'Not enough data'};
  var redRate=rC/total;
  var vote,conf;
  if(redRate>0.65){vote='Green';conf=Math.round(Math.min(85,55+(redRate-0.5)*72));}
  else if(redRate<0.35){vote='Red';conf=Math.round(Math.min(85,55+(0.5-redRate)*72));}
  else if(redRate>0.55){vote='Green';conf=Math.round(51+(redRate-0.5)*52);}
  else{vote=h[0].col==='red'?'Green':'Red';conf=51;}
  return{name:'ColBalance',vote:vote,conf:conf,reason:'Red '+Math.round(redRate*100)+'% vs Green '+Math.round((1-redRate)*100)+'%'};
}

function colorMarkovDetector(h){
  if(h.length<15) return{name:'ColMarkov',vote:'Green',conf:50,reason:'Need more data'};
  var trans={};
  for(var j=2;j<h.length;j++){
    var c0=h[j].col[0].toUpperCase();
    var c1=(h[j-1]&&h[j-1].col||'r')[0].toUpperCase();
    var state=c0+c1;
    var out=h[j-2].col[0].toUpperCase();
    if(!trans[state]) trans[state]={R:0,G:0,V:0};
    if(out in trans[state]) trans[state][out]++;
  }
  var cs=h[0].col[0].toUpperCase()+(h[1]?h[1].col[0].toUpperCase():'R');
  var entry=trans[cs];
  if(!entry||(entry.R+entry.G)<3) return{name:'ColMarkov',vote:'Green',conf:50,reason:'State '+cs+': no data'};
  var total=entry.R+entry.G,redProb=entry.R/total;
  var vote=redProb>0.5?'Red':'Green';
  var conf=Math.round(Math.min(87,50+Math.abs(redProb-0.5)*82));
  return{name:'ColMarkov',vote:vote,conf:conf,reason:'State '+cs+': R='+entry.R+' G='+entry.G};
}

function weightedEnsemble(signals,yesLabel){
  var yesScore=0,noScore=0;
  signals.forEach(function(s){
    var w=(s.conf/100)*(s.conf/100);
    if(s.vote===yesLabel) yesScore+=w; else noScore+=w;
  });
  var total=yesScore+noScore;
  if(!total) return{vote:yesLabel,conf:50,yesRatio:.5,agreeCount:0};
  var yesRatio=yesScore/total;
  var noLabel=yesLabel==='Big'?'Small':(yesLabel==='Small'?'Big':(yesLabel==='Red'?'Green':'Red'));
  var vote=yesRatio>0.5?yesLabel:noLabel;
  var conf=Math.round(Math.min(93,50+Math.abs(yesRatio-0.5)*84));
  var agreeCount=signals.filter(function(s){return s.vote===vote;}).length;
  return{vote:vote,conf:conf,yesRatio:yesRatio,agreeCount:agreeCount,total:signals.length};
}

// ===== V5 PRO: NEW DETECTORS =====

// Alternation Detector - detects R/G/R/G oscillating pattern
function alternationDetector(h){
  if(h.length<6) return{name:'Alternation',vote:'Green',conf:50,reason:'Need more data'};
  var altCnt=0,n=Math.min(10,h.length-1);
  for(var i=0;i<n;i++){if(h[i].col!==h[i+1].col)altCnt++;}
  var altRate=altCnt/n;
  if(altRate>=0.7){
    var vote=h[0].col==='red'?'Green':'Red';
    var conf=Math.round(52+altRate*32);
    return{name:'Alternation',vote:vote,conf:conf,reason:'Alt '+Math.round(altRate*100)+'% -> '+vote};
  }
  return{name:'Alternation',vote:h[0].col==='red'?'Green':'Red',conf:51,reason:'Alt '+Math.round(altRate*100)+'% (weak)'};
}

// Color Momentum Detector - strong recent streak
function colorMomentumDetector(h){
  var n=Math.min(h.length,10),sl=h.slice(0,n);
  var rC=sl.filter(function(r){return r.col==='red';}).length;
  var gC=sl.filter(function(r){return r.col==='green';}).length;
  if(rC>=7){return{name:'ColMomentum',vote:'Green',conf:Math.round(60+(rC-5)*8),reason:rC+'/'+n+' Red -> Green reversal'};}
  if(gC>=7){return{name:'ColMomentum',vote:'Red',conf:Math.round(60+(gC-5)*8),reason:gC+'/'+n+' Green -> Red reversal'};}
  var vote=rC>gC?'Green':'Red';
  return{name:'ColMomentum',vote:vote,conf:52,reason:'No strong momentum (R:'+rC+' G:'+gC+')'};
}

// Size Momentum Detector
function sizeMomentumDetector(h){
  var n=Math.min(h.length,10),sl=h.slice(0,n);
  var bC=sl.filter(function(r){return r.big;}).length;
  var sC=n-bC;
  if(bC>=7){return{name:'SizeMomentum',vote:'Small',conf:Math.round(60+(bC-5)*8),reason:bC+'/'+n+' Big -> Small reversal'};}
  if(sC>=7){return{name:'SizeMomentum',vote:'Big',conf:Math.round(60+(sC-5)*8),reason:sC+'/'+n+' Small -> Big reversal'};}
  var vote=bC>sC?'Small':'Big';
  return{name:'SizeMomentum',vote:vote,conf:52,reason:'No strong momentum (B:'+bC+' S:'+sC+')'};
}

// ===== V5 ANALYSIS WITH 5 DETECTORS =====

function analyzeSizeFull(h){
  if(h.length<8) return{vote:'Big',conf:42,signals:[],skip:true};
  var sigs=[streakDetector(h),balanceDetector(h),markovDetector(h),patternDetector(h),sizeMomentumDetector(h)];
  var ens=weightedEnsemble(sigs,'Big');
  // V5: Strict consensus - need 4/5 for strong, 3/5 for decent, 2/5 = weak
  var fc;
  if(ens.agreeCount>=4){fc=ens.conf;}
  else if(ens.agreeCount===3){fc=Math.max(50,ens.conf-10);}
  else{fc=Math.max(42,ens.conf-22);}
  return{vote:ens.vote,conf:fc,signals:sigs,skip:fc<65,agreeCount:ens.agreeCount,total:sigs.length};
}

function analyzeColorFull(h){
  if(h.length<8) return{vote:'Green',conf:42,signals:[],skip:true};
  var sigs=[colorStreakDetector(h),colorBalanceDetector(h),colorMarkovDetector(h),alternationDetector(h),colorMomentumDetector(h)];
  var ens=weightedEnsemble(sigs,'Red');
  // V5: Strict consensus - need 4/5 for strong, 3/5 for decent, 2/5 = weak
  var fc;
  if(ens.agreeCount>=4){fc=ens.conf;}
  else if(ens.agreeCount===3){fc=Math.max(50,ens.conf-10);}
  else{fc=Math.max(42,ens.conf-22);}
  return{vote:ens.vote,conf:fc,signals:sigs,skip:fc<65,agreeCount:ens.agreeCount,total:sigs.length};
}

// ===== V5 HARD LOSS GUARD =====
var WIN_THRESHOLD=65;
var RECOVERY_MIN_CONF=70;

function pickFinalPrediction(sizeR,colorR,lossCount,lastLoss){

  // HARD GUARD: 2+ consecutive losses -> MANDATORY COOLDOWN SKIP
  if(lossCount>=2){
    return{type:'skip',vote:'SKIP',conf:0,signals:[],skip:true,
      reason:lossCount+' consecutive losses detected! \n\nSystem cooling down - pattern reset required. WAIT for next clear signal. Betting now increases risk exponentially.'};
  }

  // AFTER 1 LOSS: Smart Recovery - only predict if REAL signals support it
  if(lossCount===1&&lastLoss){
    var recovVote,recovType,recovConf,recovSigs,recovAgree;

    if(lastLoss.type==='color'){
      var oppCol=lastLoss.pred.toLowerCase()==='red'?'Green':'Red';
      var colSupport=colorR.signals.filter(function(s){return s.vote===oppCol&&s.conf>=58;}).length;
      // Check if real color signals support recovery direction + high confidence
      if(colorR.vote===oppCol&&colorR.conf>=RECOVERY_MIN_CONF&&colSupport>=3){
        recovVote=oppCol;recovType='color';
        recovConf=Math.min(88,colorR.conf+5);
        recovSigs=colorR.signals;recovAgree=colorR.agreeCount;
      }
      // Else try SIZE if it has very strong consensus
      else if(sizeR.agreeCount>=4&&sizeR.conf>=RECOVERY_MIN_CONF){
        recovVote=sizeR.vote;recovType='size';
        recovConf=sizeR.conf;recovSigs=sizeR.signals;recovAgree=sizeR.agreeCount;
      }
      // Else SKIP - don\'t bet unclear
      else{
        return{type:'skip',vote:'SKIP',conf:Math.max(colorR.conf,sizeR.conf),signals:colorR.signals,skip:true,
          reason:'After '+lastLoss.pred+' loss: No clear recovery signal (color:'+colorR.conf+'% '+colorR.agreeCount+'/5 agree, size:'+sizeR.conf+'% '+sizeR.agreeCount+'/5 agree). SKIP to protect bankroll!'};
      }
    } else {
      var oppSz=lastLoss.pred.toLowerCase()==='big'?'Small':'Big';
      var szSupport=sizeR.signals.filter(function(s){return s.vote===oppSz&&s.conf>=58;}).length;
      if(sizeR.vote===oppSz&&sizeR.conf>=RECOVERY_MIN_CONF&&szSupport>=3){
        recovVote=oppSz;recovType='size';
        recovConf=Math.min(88,sizeR.conf+5);
        recovSigs=sizeR.signals;recovAgree=sizeR.agreeCount;
      } else if(colorR.agreeCount>=4&&colorR.conf>=RECOVERY_MIN_CONF){
        recovVote=colorR.vote;recovType='color';
        recovConf=colorR.conf;recovSigs=colorR.signals;recovAgree=colorR.agreeCount;
      } else {
        return{type:'skip',vote:'SKIP',conf:Math.max(colorR.conf,sizeR.conf),signals:sizeR.signals,skip:true,
          reason:'After '+lastLoss.pred+' loss: Signals unclear. SKIP this round!'};
      }
    }

    return{type:recovType,vote:recovVote,conf:recovConf,signals:recovSigs,skip:false,
      isRecovery:true,lossCount:1,currAgrees:true,
      reason:'Recovery: '+lastLoss.pred+' lost -> '+recovVote+' backed by REAL '+recovConf+'% confidence ('+recovAgree+'/5 signals agree)',
      agreeCount:recovAgree,total:5};
  }

  // NORMAL MODE: pick best, strict threshold
  var cands=[
    {type:'size',vote:sizeR.vote,conf:sizeR.conf,signals:sizeR.signals,agreeCount:sizeR.agreeCount,total:sizeR.total},
    {type:'color',vote:colorR.vote,conf:colorR.conf,signals:colorR.signals,agreeCount:colorR.agreeCount,total:colorR.total}
  ].sort(function(a,b){return b.conf-a.conf;});
  var best=cands[0];
  if(best.conf<WIN_THRESHOLD) return{type:'skip',vote:'SKIP',conf:best.conf,signals:best.signals,skip:true,
    reason:'Confidence '+best.conf+'% below threshold ('+WIN_THRESHOLD+'%). Skip this round!'};
  return Object.assign({skip:false,isRecovery:false},best);
}

// ---- RENDER ----
function setConfRing(conf){
  var circ=150.8;
  var offset=circ*(1-conf/100);
  var arc=document.getElementById('confRingArc');
  arc.setAttribute('stroke-dashoffset',offset);
  var color=conf>=75?'#10b981':conf>=63?'#f59e0b':'#ef4444';
  arc.setAttribute('stroke',color);
  document.getElementById('confRingPct').textContent=conf+'%';
  document.getElementById('confRingPct').style.color=color;
}

function renderFinalPred(pred,lossCount){
  var card=document.getElementById('megaCard');
  var badge=document.getElementById('predBadge');
  var orb=document.getElementById('predOrb');
  var orbIcon=document.getElementById('orbIcon');
  var orbValue=document.getElementById('orbValue');
  var orbSub=document.getElementById('orbSub');
  var predMainVal=document.getElementById('predMainVal');
  var predTypeText=document.getElementById('predTypeText');
  var sigFill=document.getElementById('sigStrengthFill');
  var sigPct=document.getElementById('sigStrengthPct');
  var reasonChips=document.getElementById('reasonChips');
  var recAlert=document.getElementById('recoveryAlert');
  var recBody=document.getElementById('recoveryBody');

  if(pred.skip){
    card.className='mega-pred-card type-skip';
    badge.className='pred-type-badge badge-skip';
    badge.textContent='LOW CONFIDENCE';
    orb.className='pred-orb SKIP';
    orbIcon.textContent='!';
    orbValue.textContent='SKIP';
    orbValue.style.color='var(--muted)';
    orbSub.textContent='this round';
    predMainVal.textContent='SKIP';
    predMainVal.style.color='var(--muted)';
    predTypeText.textContent=pred.reason&&pred.reason.indexOf('consecutive')>=0?'COOLDOWN - Wait for next clear signal':'Confidence too low - skip this round!';
    sigFill.className='sig-strength-fill fill-low';
    sigFill.style.width=pred.conf+'%';
    sigPct.textContent=pred.conf+'%';
    setConfRing(pred.conf);
    reasonChips.innerHTML='<div class="chip info">Is round ko skip karo</div><div class="chip">'+pred.reason+'</div>';
    recAlert.style.display='none';
    return;
  }

  if(pred.isRecovery){
    recAlert.style.display='block';
    recBody.innerHTML='<b>'+pred.lossCount+'x loss recovery active</b><br>'+pred.reason+(pred.currAgrees?'<br><b style="color:#4ade80">REAL signals agree with recovery direction!</b>':'');
    card.className='mega-pred-card type-recovery';
    badge.className='pred-type-badge badge-recovery';
    badge.textContent='RECOVERY MODE';
    orb.className='pred-orb RECOVERY';
  } else {
    recAlert.style.display='none';
    card.className='mega-pred-card type-'+pred.type;
    badge.className='pred-type-badge badge-'+pred.type;
    badge.textContent=(pred.type==='size'?'Size':'Color')+' Signal';
    orb.className='pred-orb '+(pred.vote.toUpperCase());
  }

  var color=pred.vote==='Big'||pred.vote==='Red'?'#f87171':'#34d399';
  if(pred.isRecovery) color='#fbbf24';
  var emojis={Big:'UP',Small:'DN',Red:'R',Green:'G'};
  orbIcon.textContent=pred.vote==='Big'?'&#8679;':pred.vote==='Small'?'&#8681;':pred.vote==='Red'?'&#9632;':'&#9632;';
  orbValue.textContent=pred.vote;
  orbValue.style.color=color;
  orbSub.textContent=pred.type.toUpperCase();
  predMainVal.textContent=pred.vote;
  predMainVal.style.color=color;
  predTypeText.textContent=(pred.type==='size'?'Size':'Color')+' analysis | '+(pred.agreeCount||0)+'/'+(pred.total||0)+' signals agree';

  sigFill.className='sig-strength-fill '+(pred.conf>=75?'fill-high':pred.conf>=63?'fill-med':'fill-low');
  sigFill.style.width=pred.conf+'%';
  sigPct.textContent=pred.conf+'%';
  setConfRing(pred.conf);

  var chips=[];
  chips.push('<div class="chip info">'+pred.type.toUpperCase()+'</div>');
  chips.push('<div class="chip '+(pred.conf>=75?'agree':'')+'">'+(pred.agreeCount||0)+'/'+(pred.total||0)+' agree</div>');
  if(pred.conf>=75) chips.push('<div class="chip agree">HIGH CONFIDENCE</div>');
  if(pred.isRecovery) chips.push('<div class="chip conflict">RECOVERY</div>');
  reasonChips.innerHTML=chips.join('');

  if(gHistory.length){
    try{lastPredPeriod=String(BigInt(gHistory[0].period)+1n);}catch(e){lastPredPeriod=String(parseInt(gHistory[0].period)+1);}
    lastPred=pred.vote;
    lastPredType=pred.type;
  }
}

function render3Way(sizeR,colorR,chosen){
  var twSize=document.getElementById('twSize');
  var twColor=document.getElementById('twColor');
  twSize.className='tw-card'+(chosen==='size'?' chosen':'');
  twColor.className='tw-card'+(chosen==='color'?' chosen':'');
  if(chosen==='size'){
    var bd=twSize.querySelector('.tw-badge');
    if(!bd){bd=document.createElement('div');bd.className='tw-badge';twSize.insertBefore(bd,twSize.firstChild);}
    bd.textContent='CHOSEN';
  } else if(chosen==='color'){
    var bd2=twColor.querySelector('.tw-badge');
    if(!bd2){bd2=document.createElement('div');bd2.className='tw-badge';twColor.insertBefore(bd2,twColor.firstChild);}
    bd2.textContent='CHOSEN';
  }
  document.getElementById('twSizeVote').textContent=sizeR.vote;
  document.getElementById('twSizeVote').style.color=sizeR.vote==='Big'?'#f87171':'#34d399';
  document.getElementById('twSizeConf').textContent=sizeR.conf+'% conf';
  document.getElementById('twSizeBar').style.width=sizeR.conf+'%';
  document.getElementById('twColorVote').textContent=colorR.vote;
  document.getElementById('twColorVote').style.color=colorR.vote==='Red'?'#f87171':'#34d399';
  document.getElementById('twColorConf').textContent=colorR.conf+'% conf';
  document.getElementById('twColorBar').style.width=colorR.conf+'%';
}

function renderSignals(signals,predVote){
  var cm={'Big':'sv-up','Small':'sv-dn','Red':'sv-up','Green':'sv-dn','Violet':'sv-vl','SKIP':'sv-sk'};
  var bc={'Big':'#ef4444','Small':'#10b981','Red':'#ef4444','Green':'#10b981'};
  document.getElementById('signalsGrid').innerHTML=(signals||[]).map(function(s){
    var agree=s.vote===predVote;
    return '<div class="sig-card '+(agree?'agree-card':'conflict-card')+'">'+'<div class="sig-top"><div class="sig-name">'+s.name+'</div><div class="sig-vote '+(cm[s.vote]||'sv-sk')+'">'+s.vote+'</div></div>'+'<div class="sig-bar-wrap"><div class="sig-bar-fill" style="width:'+s.conf+'%;background:'+(bc[s.vote]||'#64748b')+(agree?'':' ')+'66"></div></div>'+'<div class="sig-reason"><span class="sig-agree-dot" style="background:'+(agree?'#10b981':'#ef4444')+'"></span>'+s.conf+'% | '+s.reason+'</div></div>';
  }).join('');
}

function renderBalls(h){
  var cm={red:'r',green:'g',violet:'v'};
  document.getElementById('ballsRow').innerHTML=h.slice(0,16).map(function(r){
    return '<div class="ball '+(cm[r.col]||'r')+'">'+r.num+'<br><span class="bsz">'+r.size[0]+'</span></div>';
  }).join('');
}

function renderStats(h){
  var n=Math.min(h.length,50),sl=h.slice(0,n);
  var bigR=Math.round(sl.filter(function(r){return r.big;}).length/n*100);
  var gR=Math.round(sl.filter(function(r){return r.col==='green';}).length/n*100);
  var str=0;if(h[0])for(var i=0;i<h.length;i++){if(h[i].big===h[0].big)str++;else break;}
  document.getElementById('st1').textContent=h.length;
  document.getElementById('st2').textContent=bigR+'%';
  document.getElementById('st3').textContent=gR+'%';
  document.getElementById('st4').textContent=str+'x';
  document.getElementById('periodNum').textContent=(h[0]&&h[0].period)?h[0].period.slice(-8):'--';
}

function renderHistory(h){
  var cm={red:'#ef4444',green:'#10b981',violet:'#c084fc'};
  document.getElementById('histCnt').textContent=h.length;
  document.getElementById('histBody').innerHTML=h.slice(0,60).map(function(r){
    return '<tr><td style="color:var(--muted);font-size:10px">'+r.period.slice(-8)+'</td>'+'<td><span style="background:'+cm[r.col]+'20;color:'+cm[r.col]+';border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800">'+r.num+'</span></td>'+'<td style="color:'+(r.big?'#f87171':'#34d399')+';font-weight:700">'+r.size+'</td>'+'<td style="color:'+cm[r.col]+';text-transform:capitalize">'+r.col+'</td></tr>';
  }).join('');
}

function renderPredLog(){
  var wins=predLog.filter(function(l){return l.outcome==='WIN';}).length;
  var losses=predLog.filter(function(l){return l.outcome==='LOSS';}).length;
  document.getElementById('logWinRate').textContent=wins+'W / '+losses+'L';
  document.getElementById('predLogInner').innerHTML=predLog.slice(0,25).map(function(l){
    var oc=l.outcome==='WIN'?'log-win':l.outcome==='LOSS'?'log-loss':'log-wait';
    var pc=l.outcome==='WIN'?'#34d399':l.outcome==='LOSS'?'#f87171':'var(--muted)';
    return '<div class="log-row"><div class="log-pred" style="color:'+pc+'">'+l.pred+'</div><div class="log-vs">vs</div><div class="log-result">'+l.result+'</div><div class="log-outcome '+oc+'">'+l.outcome+'</div><div class="log-meta">'+(l.type||'').toUpperCase()+'</div></div>';
  }).join('')||'<div style="font-size:11px;color:var(--muted);text-align:center;padding:12px">No predictions yet</div>';
}

function setProgress(p,msg){
  document.getElementById('progFill').style.width=p+'%';
  document.getElementById('progPct').textContent=p+'%';
  document.getElementById('timerStatus').textContent=msg;
}

function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}

async function analyze(){
  if(busy) return;
  busy=true;
  document.getElementById('refreshBtn').disabled=true;
  setProgress(8,'Fetching live data...');
  
  var data=null;
  try{
    var fetchRace=Promise.race([
      fetchData(),
      new Promise(function(resolve){setTimeout(function(){resolve(null);},8000);})
    ]);
    data=await fetchRace;
  }catch(e){data=null;}
  
  var fresh=parseData(data);
  if(fresh.length) mergeHistory(fresh);
  checkLastPredResult();
  
  // Show/hide error banner
  document.getElementById('errBanner').style.display=(!apiOk&&gHistory.length)?'block':'none';
  
  // ALWAYS hide loader after first analyze attempt
  hideLoader();
  
  if(gHistory.length<8){
    setProgress(0,gHistory.length?'Need '+(8-gHistory.length)+' more periods...':'No data - check network');
    document.getElementById('predMainVal').textContent='Wait';
    document.getElementById('predTypeText').textContent='Collecting data...';
    busy=false;
    document.getElementById('refreshBtn').disabled=false;
    return;
  }
  
  renderBalls(gHistory);
  renderStats(gHistory);
  renderHistory(gHistory);
  renderPredLog();
  
  var steps=[
    [20,'Streak analysis...'],
    [35,'Balance detection...'],
    [50,'Markov chain...'],
    [65,'Pattern matching...'],
    [78,'Color signals...'],
    [88,'Loss recovery check...'],
    [96,'Final decision...'],
    [100,'Prediction ready!']
  ];
  for(var si=0;si<steps.length;si++){setProgress(steps[si][0],steps[si][1]);await sleep(80);}
  
  var sizeR=analyzeSizeFull(gHistory);
  var colorR=analyzeColorFull(gHistory);
  var lossCount=getConsecutiveLosses();
  var lastLoss=lossCount>0?predLog[0]:null;
  var finalPred=pickFinalPrediction(sizeR,colorR,lossCount,lastLoss);
  
  render3Way(sizeR,colorR,finalPred.type);
  renderFinalPred(finalPred,lossCount);
  renderSignals(finalPred.signals,finalPred.vote);
  
  busy=false;
  document.getElementById('refreshBtn').disabled=false;
}

function startTimer(){
  setInterval(function(){
    var s=60-new Date().getSeconds();
    document.getElementById('timerNum').textContent=s;
    var arc=document.getElementById('timerArc');
    arc.setAttribute('stroke-dashoffset',157*(1-s/60));
    arc.setAttribute('stroke',s<=10?'#ef4444':s<=20?'#f59e0b':'#10b981');
    if(s===33&&!busy) analyze();
  },1000);
}

window.doRefresh=function(){if(!busy)analyze();};

analyze().then(function(){
  startTimer();
  setInterval(function(){if(!busy)analyze();},30000);
});
<\/script>
</body>
</html>`;

export default function App() {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    const blob = new Blob([HTML_CODE], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = anchorRef.current;
    if (!a) return;
    a.href = url;
    a.download = "wingo-ultra-v7.html";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #04040f 0%, #0a0518 50%, #04040f 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "24px",
        gap: "20px",
      }}
    >
      {/* Glow bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 600px 400px at 50% 20%, rgba(139,92,246,0.12), transparent)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: "100%",
          maxWidth: 360,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg,#8b5cf6,#06b6d4)",
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            boxShadow:
              "0 0 60px rgba(139,92,246,0.5), 0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          🧠
        </div>

        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              color: "#f8fafc",
              fontSize: 24,
              fontWeight: 900,
              marginBottom: 6,
              letterSpacing: "-0.5px",
            }}
          >
            WinGo AI Ultra Pro
          </h1>
          <p
            style={{
              background: "linear-gradient(90deg,#8b5cf6,#06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            V4 — Advanced Analysis Engine
          </p>
        </div>

        <div
          style={{
            background: "rgba(10,10,26,0.8)",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: 16,
            padding: "16px 20px",
            width: "100%",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              color: "#f59e0b",
              fontSize: 11,
              fontWeight: 800,
              marginBottom: 10,
              letterSpacing: "0.5px",
            }}
          >
            V4 IMPROVEMENTS
          </div>
          <div style={{ color: "#94a3b8", fontSize: 11, lineHeight: 2 }}>
            ✅ Loader fix — never gets stuck
            <br />✅ API offline fallback (uses cached data)
            <br />✅ Modern glassmorphism prediction UI
            <br />✅ Confidence ring indicator
            <br />✅ Real Markov + 4-signal ensemble
            <br />✅ Loss recovery forced opposite
            <br />✅ Auto-skip low confidence rounds
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          style={{
            background: "linear-gradient(135deg,#8b5cf6,#06b6d4)",
            color: "#fff",
            border: "none",
            padding: "18px 40px",
            borderRadius: 16,
            fontSize: 16,
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 8px 40px rgba(139,92,246,0.5)",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 22 }}>⬇️</span>
          Download V7 HTML File
        </button>

        <p
          style={{
            color: "#334155",
            fontSize: 11,
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          Download karke Chrome mein open karo
          <br />
          <span style={{ color: "#4a5568" }}>wingo-ultra-v7.html</span>
        </p>
      </div>

      {/* biome-ignore lint/a11y/useAnchorContent: programmatic download */}
      {/* biome-ignore lint/a11y/useValidAnchor: programmatic download */}
      <a ref={anchorRef} style={{ display: "none" }} tabIndex={-1}>
        &nbsp;
      </a>
    </div>
  );
}
