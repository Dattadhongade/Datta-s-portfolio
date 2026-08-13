import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, Briefcase } from "lucide-react";

export default function VfxIntro({ onComplete, profileName = "Datta Dhongade", profileRole = "Full Stack Software Engineer" }) {
  const codeRainRef = useRef(null);
  const burstFieldRef = useRef(null);
  const orbitDustRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const TOTAL_DURATION = 10000; // 12 seconds full cinematic experience

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);
  };

  useEffect(() => {
    // Timer for auto redirect
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      setProgress(pct);
      if (elapsed >= TOTAL_DURATION) {
        clearInterval(interval);
        handleFinish();
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rand = (min, max) => Math.random() * (max - min) + min;

    // 1. Matrix Code Rain
    const codeRain = codeRainRef.current;
    if (codeRain) {
      codeRain.innerHTML = "";
      const codeChars = "01{}<>/;=()[]#$&%*+~!?".split("");
      const colCount = Math.max(14, Math.floor(window.innerWidth / 40));
      
      for (let i = 0; i < colCount; i++) {
        const col = document.createElement("div");
        col.className = "vfx-code-col";
        col.style.left = `${(i / colCount) * 100}%`;
        let str = "";
        const len = Math.floor(rand(14, 28));
        for (let j = 0; j < len; j++) {
          str += codeChars[Math.floor(rand(0, codeChars.length))] + "\n";
        }
        col.textContent = str;
        col.style.opacity = rand(0.12, 0.35);
        col.style.animationDuration = `${rand(7, 14)}s`;
        col.style.animationDelay = `${-rand(0, 10)}s`;
        codeRain.appendChild(col);
      }
    }

    // 2. Shockwave Burst Particles
    const burstField = burstFieldRef.current;
    if (burstField) {
      burstField.innerHTML = "";
      for (let i = 0; i < 75; i++) {
        const p = document.createElement("div");
        p.className = "vfx-particle";
        p.style.background = Math.random() > 0.5 ? "var(--vfx-cyan)" : "var(--vfx-magenta)";
        p.style.boxShadow = "0 0 8px currentColor";
        const angle = rand(0, Math.PI * 2);
        const tilt = rand(-0.5, 0.5);
        const dist = rand(180, 650);
        p.style.setProperty("--ex", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--ey", `${Math.sin(angle) * dist * 0.6}px`);
        p.style.setProperty("--ez", `${tilt * 320}px`);
        p.style.animationDuration = `${rand(0.7, 1.3)}s`;
        p.style.animationDelay = `${1.18 + rand(0, 0.25)}s`;
        burstField.appendChild(p);
      }
    }

    // 3. Orbiting Dust Glyphs
    const orbitDust = orbitDustRef.current;
    if (orbitDust) {
      orbitDust.innerHTML = "";
      const dustGlyphs = ["<", ">", "/", "{", "}", "0", "1", ";", "=>", "[]"];
      for (let i = 0; i < 24; i++) {
        const p = document.createElement("div");
        p.className = "vfx-orbit-particle";
        p.textContent = dustGlyphs[Math.floor(rand(0, dustGlyphs.length))];
        const angle = (i / 24) * Math.PI * 2 + rand(-0.15, 0.15);
        const radius = rand(120, 180);
        p.style.left = `${Math.cos(angle) * radius}px`;
        p.style.top = `${Math.sin(angle) * radius * 0.45}px`;
        p.style.animationDelay = `${2.6 + rand(0, 1.2)}s`;
        orbitDust.appendChild(p);
      }
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 z-99999 overflow-hidden select-none bg-[#020306] text-[#f3fbff] transition-all duration-700 ease-out ${
        isExiting
          ? "opacity-0 scale-105 filter blur-md pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        "--vfx-bg": "#020306",
        "--vfx-cyan": "#28f4ff",
        "--vfx-magenta": "#ff2e88",
        "--vfx-white": "#f3fbff",
        "--vfx-dim": "#64748b",
        "--vfx-display": "'Orbitron', sans-serif",
        "--vfx-mono": "'JetBrains Mono', monospace",
        fontFamily: "var(--vfx-mono)",
      }}
    >
      <style>{`
        .vfx-screen {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          background: radial-gradient(ellipse at 50% 45%, #030a12 0%, #020306 72%);
          overflow: hidden;
          perspective: 1000px;
        }
        .vfx-shake {
          position: absolute;
          inset: 0;
          animation: vfxShake 0.45s linear;
          animation-delay: 1.15s;
        }
        @keyframes vfxShake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-6px, 3px); }
          20% { transform: translate(5px, -4px); }
          30% { transform: translate(-4px, 5px); }
          40% { transform: translate(6px, -2px); }
          50% { transform: translate(-3px, -3px); }
          60% { transform: translate(4px, 4px); }
          70% { transform: translate(-5px, 1px); }
          80% { transform: translate(3px, -3px); }
          90% { transform: translate(-2px, 2px); }
        }
        .vfx-scanlines {
          position: absolute;
          inset: 0;
          z-index: 22;
          pointer-events: none;
          background: repeating-linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.03) 0px,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 2px,
            transparent 3px
          );
          opacity: 0.5;
        }
        .vfx-scanbar {
          position: absolute;
          left: 0;
          right: 0;
          height: 120px;
          z-index: 21;
          pointer-events: none;
          background: linear-gradient(180deg, transparent, rgba(40, 244, 255, 0.08), transparent);
          animation: vfxScanbar 5s linear infinite;
        }
        @keyframes vfxScanbar {
          0% { top: -120px; }
          100% { top: 100%; }
        }
        .vfx-vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 20vw 5vw rgba(0, 0, 0, 0.88);
          pointer-events: none;
          z-index: 20;
        }
        .vfx-code-rain {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          overflow: hidden;
          animation: vfxRainFade 1.5s ease forwards;
          animation-delay: 0.2s;
        }
        @keyframes vfxRainFade {
          to { opacity: 1; }
        }
        .vfx-code-col {
          position: absolute;
          top: -40%;
          width: 16px;
          font-family: var(--vfx-mono);
          font-size: 11px;
          line-height: 1.4;
          white-space: pre;
          color: var(--vfx-cyan);
          text-align: center;
          animation-name: vfxRainFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes vfxRainFall {
          from { transform: translateY(0); }
          to { transform: translateY(160vh); }
        }
        .vfx-snippet {
          position: absolute;
          font-family: var(--vfx-mono);
          font-size: 11px;
          line-height: 1.5;
          color: #94a3b8;
          background: rgba(4, 12, 24, 0.75);
          border: 1px solid rgba(40, 244, 255, 0.2);
          border-radius: 6px;
          padding: 8px 12px;
          white-space: pre;
          z-index: 4;
          opacity: 0;
          animation: vfxSnippetIn 0.9s ease forwards, vfxSnippetFloat 7s ease-in-out infinite;
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        @keyframes vfxSnippetIn {
          to { opacity: 0.75; }
        }
        @keyframes vfxSnippetFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .vfx-snippet .kw { color: var(--vfx-magenta); font-weight: 600; }
        .vfx-snippet .fn { color: var(--vfx-cyan); font-weight: 600; }

        .vfx-core-wrap {
          position: absolute;
          left: 50%;
          top: 44%;
          transform: translate(-50%, -50%);
          z-index: 6;
          animation: vfxCoreDisappear 0.2s ease forwards;
          animation-delay: 1.2s;
        }
        @keyframes vfxCoreDisappear {
          to { opacity: 0; visibility: hidden; }
        }
        .vfx-core {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--vfx-cyan);
          box-shadow: 0 0 15px var(--vfx-cyan);
          animation: vfxCoreCharge 1.15s ease-in forwards;
        }
        @keyframes vfxCoreCharge {
          0% { width: 4px; height: 4px; box-shadow: 0 0 8px var(--vfx-cyan); opacity: 0.8; }
          90% { width: 22px; height: 22px; box-shadow: 0 0 40px 15px var(--vfx-cyan); opacity: 1; }
          100% { width: 0; height: 0; opacity: 0; box-shadow: none; }
        }
        .vfx-charge-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          border: 1px solid var(--vfx-cyan);
          opacity: 0;
          animation: vfxRingIn 1.1s ease-in forwards;
        }
        .vfx-charge-ring.r1 { width: 260px; height: 260px; margin: -130px 0 0 -130px; animation-delay: 0s; }
        .vfx-charge-ring.r2 { width: 180px; height: 180px; margin: -90px 0 0 -90px; animation-delay: 0.15s; }
        .vfx-charge-ring.r3 { width: 120px; height: 120px; margin: -60px 0 0 -60px; animation-delay: 0.3s; }
        @keyframes vfxRingIn {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.15); }
        }

        .vfx-flash {
          position: absolute;
          inset: 0;
          background: #ffffff;
          opacity: 0;
          z-index: 23;
          pointer-events: none;
          animation: vfxFlashPop 0.5s ease forwards;
          animation-delay: 1.15s;
        }
        @keyframes vfxFlashPop {
          0% { opacity: 0; }
          12% { opacity: 0.9; }
          35% { opacity: 0; }
          100% { opacity: 0; }
        }

        .vfx-shockwave {
          position: absolute;
          left: 50%;
          top: 44%;
          width: 20px;
          height: 20px;
          margin: -10px 0 0 -10px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          z-index: 7;
          opacity: 0;
          animation: vfxShockOut 1.1s cubic-bezier(0.15, 0.8, 0.3, 1) forwards;
          animation-delay: 1.2s;
        }
        @keyframes vfxShockOut {
          0% { opacity: 1; transform: scale(1); border-color: #ffffff; }
          100% { opacity: 0; transform: scale(65); border-color: var(--vfx-cyan); }
        }

        .vfx-burst-field {
          position: absolute;
          left: 50%;
          top: 44%;
          width: 0;
          height: 0;
          z-index: 5;
        }
        .vfx-particle {
          position: absolute;
          left: 0;
          top: 0;
          width: 3.5px;
          height: 3.5px;
          border-radius: 50%;
          opacity: 0;
          animation-name: vfxBurst;
          animation-timing-function: cubic-bezier(0.15, 0.8, 0.3, 1);
          animation-fill-mode: forwards;
        }
        @keyframes vfxBurst {
          0% { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translate3d(var(--ex), var(--ey), var(--ez)) scale(1); opacity: 0; }
        }

        .vfx-orbit-dust {
          position: absolute;
          left: 50%;
          top: 44%;
          width: 0;
          height: 0;
          z-index: 6;
          animation: vfxDustSpin 18s linear infinite;
          animation-delay: 2.6s;
          transform-style: preserve-3d;
        }
        @keyframes vfxDustSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .vfx-orbit-particle {
          position: absolute;
          font-family: var(--vfx-mono);
          font-size: 11px;
          color: var(--vfx-magenta);
          text-shadow: 0 0 6px var(--vfx-magenta);
          opacity: 0;
          animation: vfxDustFade 0.6s ease forwards;
        }
        @keyframes vfxDustFade {
          to { opacity: 0.8; }
        }

        .vfx-globe-wrap {
          position: absolute;
          left: 50%;
          top: 44%;
          transform: translate(-50%, -50%) scale(0.3);
          z-index: 8;
          opacity: 0;
          animation: vfxGlobeIn 1.1s cubic-bezier(0.2, 0.9, 0.25, 1) forwards;
          animation-delay: 2.0s;
        }
        @keyframes vfxGlobeIn {
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .vfx-globe-spin {
          animation: vfxGlobeSpin 14s linear infinite;
          animation-delay: 2s;
          transform-style: preserve-3d;
        }
        @keyframes vfxGlobeSpin {
          from { transform: rotateY(0deg) rotateX(10deg); }
          to { transform: rotateY(360deg) rotateX(10deg); }
        }
        .vfx-globe-spin svg {
          width: 240px;
          height: 240px;
          overflow: visible;
        }
        .vfx-globe-spin ellipse, .vfx-globe-spin circle:not(.node) {
          fill: none;
          stroke: var(--vfx-cyan);
          stroke-width: 0.8;
          opacity: 0.55;
        }
        .vfx-globe-spin .eq {
          stroke: var(--vfx-magenta);
          opacity: 0.85;
          stroke-width: 1.2;
        }
        .vfx-globe-spin .node {
          fill: var(--vfx-cyan);
          stroke: none;
          opacity: 0.85;
          filter: drop-shadow(0 0 4px var(--vfx-cyan));
        }
        .vfx-globe-spin .glyph {
          fill: #ffffff;
          font-family: var(--vfx-mono);
          font-size: 11px;
          opacity: 0.85;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        .vfx-hud-corner {
          position: absolute;
          width: 44px;
          height: 44px;
          z-index: 24;
          opacity: 0;
          animation: vfxHudIn 0.5s ease forwards;
        }
        .vfx-hud-corner svg {
          width: 100%;
          height: 100%;
          stroke: var(--vfx-cyan);
          stroke-width: 1.8;
          fill: none;
          opacity: 0.85;
          filter: drop-shadow(0 0 6px var(--vfx-cyan));
        }
        .vfx-hud-corner.tl { left: 24px; top: 24px; animation-delay: 3.7s; }
        .vfx-hud-corner.tr { right: 24px; top: 24px; animation-delay: 3.8s; transform: scaleX(-1); }
        .vfx-hud-corner.bl { left: 24px; bottom: 24px; animation-delay: 3.9s; transform: scaleY(-1); }
        .vfx-hud-corner.br { right: 24px; bottom: 24px; animation-delay: 4.0s; transform: scale(-1, -1); }
        @keyframes vfxHudIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .vfx-hud-tag {
          position: absolute;
          z-index: 24;
          font-family: var(--vfx-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: #94a3b8;
          text-transform: uppercase;
          opacity: 0;
          animation: vfxHudIn 0.5s ease forwards;
          animation-delay: 4.2s;
        }
        .vfx-hud-tag.left { left: 32px; top: 76px; }
        .vfx-hud-tag.right { right: 32px; top: 76px; text-align: right; }
        .vfx-hud-tag .dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--vfx-cyan);
          box-shadow: 0 0 8px var(--vfx-cyan);
          margin-right: 6px;
          animation: vfxPulseDot 1.4s ease-in-out infinite;
        }
        @keyframes vfxPulseDot {
          50% { opacity: 0.3; }
        }

        .vfx-title-card {
          position: absolute;
          left: 0;
          right: 0;
          top: 47%;
          transform: translateY(-50%);
          text-align: center;
          z-index: 12;
          pointer-events: auto;
        }
        .vfx-title-wrap {
          position: relative;
          display: inline-block;
        }
        .vfx-title {
          margin: 0;
          font-family: var(--vfx-display);
          font-weight: 800;
          font-size: clamp(1.35rem, 3.8vw, 2.5rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          position: relative;
          color: #f8fafc;
          opacity: 0;
          animation: vfxTitleSettle 0.1s linear forwards;
          animation-delay: 4.6s;
          text-shadow: 0 0 20px rgba(40, 244, 255, 0.45);
        }
        @keyframes vfxTitleSettle {
          to { opacity: 1; }
        }
        .vfx-title.ghost {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          opacity: 0;
          pointer-events: none;
        }
        .vfx-title.cy {
          color: var(--vfx-cyan);
          animation: vfxGlitchCy 0.6s steps(2, end) forwards;
          animation-delay: 4.4s;
        }
        .vfx-title.mg {
          color: var(--vfx-magenta);
          animation: vfxGlitchMg 0.6s steps(2, end) forwards;
          animation-delay: 4.4s;
        }
        @keyframes vfxGlitchCy {
          0% { opacity: 0.8; transform: translate(-10px, 2px); }
          40% { opacity: 0.7; transform: translate(6px, -2px); }
          70% { opacity: 0.6; transform: translate(-3px, 1px); }
          100% { opacity: 0; transform: translate(0, 0); }
        }
        @keyframes vfxGlitchMg {
          0% { opacity: 0.8; transform: translate(10px, -2px); }
          40% { opacity: 0.7; transform: translate(-6px, 2px); }
          70% { opacity: 0.6; transform: translate(3px, -1px); }
          100% { opacity: 0; transform: translate(0, 0); }
        }

        .vfx-role {
          margin-top: 10px;
          font-family: var(--vfx-mono);
          font-size: clamp(10px, 1.5vw, 12px);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--vfx-cyan);
          opacity: 0;
          animation: vfxFadeUp 0.6s ease forwards;
          animation-delay: 5.2s;
          text-shadow: 0 0 10px rgba(40, 244, 255, 0.5);
        }
        @keyframes vfxFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .vfx-cta-row {
          margin-top: 48px;
          display: flex;
          gap: 14px;
          justify-content: center;
          align-items: center;
          opacity: 0;
          animation: vfxFadeUp 0.6s ease forwards;
          animation-delay: 5.6s;
          z-index: 12;
          position: relative;
        }
        .vfx-cta {
          font-family: var(--vfx-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: #020306;
          background: var(--vfx-cyan);
          padding: 10px 22px;
          border-radius: 4px;
          font-weight: 600;
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
        }
        .vfx-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 24px rgba(40, 244, 255, 0.6);
        }
        .vfx-cta.ghost {
          background: rgba(15, 23, 42, 0.6);
          color: #f8fafc;
          border: 1px solid rgba(40, 244, 255, 0.3);
          clip-path: none;
          backdrop-filter: blur(6px);
        }
        .vfx-cta.ghost:hover {
          border-color: var(--vfx-cyan);
          box-shadow: 0 0 18px rgba(40, 244, 255, 0.3);
        }

        @media (max-width: 640px) {
          .vfx-globe-spin svg { width: 140px; height: 140px; }
          .vfx-hud-corner { width: 24px; height: 24px; }
          .vfx-hud-corner.tl { left: 14px; top: 14px; }
          .vfx-hud-corner.tr { right: 14px; top: 14px; }
          .vfx-hud-corner.bl { left: 14px; bottom: 16px; }
          .vfx-hud-corner.br { right: 14px; bottom: 16px; }
          .vfx-hud-tag {
            font-size: 7.5px !important;
            letter-spacing: 0.05em !important;
            white-space: nowrap !important;
            line-height: 1 !important;
          }
          .vfx-hud-tag.left { left: 12px !important; top: 48px !important; }
          .vfx-hud-tag.right { right: 12px !important; top: 48px !important; text-align: right !important; }
          .vfx-snippet {
            display: block !important;
            font-size: 8px !important;
            padding: 4px 7px !important;
            line-height: 1.3 !important;
            border-radius: 4px !important;
            background: rgba(3, 10, 20, 0.6) !important;
            backdrop-filter: blur(4px) !important;
            border-color: rgba(40, 244, 255, 0.15) !important;
            opacity: 0.45 !important;
            max-width: 125px;
            z-index: 5;
          }
          .vfx-title { font-size: clamp(1.1rem, 4.8vw, 1.45rem) !important; letter-spacing: 0.06em !important; }
          .vfx-role { font-size: 9.5px !important; letter-spacing: 0.2em !important; margin-top: 6px !important; }
          .vfx-cta-row {
            margin-top: 48px !important;
            gap: 8px !important;
            padding: 0 10px;
          }
          .vfx-cta {
            font-size: 9px !important;
            padding: 6px 12px !important;
            letter-spacing: 0.05em !important;
            border-radius: 3px !important;
            clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px) !important;
          }
          .vfx-cta.ghost {
            clip-path: none !important;
          }
        }
      `}</style>



      <div className="vfx-screen">
        {/* Code Rain Matrix Effect */}
        <div className="vfx-code-rain" ref={codeRainRef}></div>

        {/* Floating Developer Snippet Cards (Responsive on Mobile & Desktop) */}
        <div
          className="vfx-snippet"
          style={{ left: "5%", top: "25%", animationDelay: "4.6s, 0s" }}
        >
          const <span className="fn">build</span> = () =&gt; &#123;
          <br />
          &nbsp;&nbsp;<span className="kw">return</span> deploy();
          <br />
          &#125;
        </div>

        <div
          className="vfx-snippet"
          style={{ right: "5%", top: "62%", animationDelay: "4.9s, 1s" }}
        >
          git commit -m
          <br />
          &nbsp;&nbsp;<span className="kw">"ship apps"</span>
        </div>

        <div
          className="vfx-snippet"
          style={{ left: "5%", bottom: "12%", animationDelay: "5.2s, 2s" }}
        >
          status: <span className="fn">200</span> <span className="kw">OK</span>
        </div>

        {/* Shockwave & Burst Explosions */}
        <div className="vfx-shake">
          <div className="vfx-core-wrap">
            <div className="vfx-charge-ring r1"></div>
            <div className="vfx-charge-ring r2"></div>
            <div className="vfx-charge-ring r3"></div>
            <div className="vfx-core"></div>
          </div>
          <div className="vfx-shockwave"></div>
          <div className="vfx-burst-field" ref={burstFieldRef}></div>
          <div className="vfx-orbit-dust" ref={orbitDustRef}></div>

          {/* 3D Wireframe Globe with Brackets */}
          <div className="vfx-globe-wrap">
            <div className="vfx-globe-spin">
              <svg viewBox="-115 -115 230 230">
                <circle r="95"></circle>
                <ellipse className="eq" rx="95" ry="30"></ellipse>
                <ellipse rx="95" ry="55"></ellipse>
                <ellipse rx="60" ry="95"></ellipse>
                <ellipse rx="30" ry="95"></ellipse>
                <circle className="node" cx="0" cy="0" r="2.5"></circle>
                <text className="glyph" x="-95" y="0">
                  &lt;
                </text>
                <text className="glyph" x="95" y="0">
                  &gt;
                </text>
                <text className="glyph" x="0" y="-95">
                  &#123;
                </text>
                <text className="glyph" x="0" y="95">
                  &#125;
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* HUD Corner Tech Brackets */}
        <div className="vfx-hud-corner tl">
          <svg viewBox="0 0 46 46">
            <path d="M2 20 V2 H20" />
          </svg>
        </div>
        <div className="vfx-hud-corner tr">
          <svg viewBox="0 0 46 46">
            <path d="M2 20 V2 H20" />
          </svg>
        </div>
        <div className="vfx-hud-corner bl">
          <svg viewBox="0 0 46 46">
            <path d="M2 20 V2 H20" />
          </svg>
        </div>
        <div className="vfx-hud-corner br">
          <svg viewBox="0 0 46 46">
            <path d="M2 20 V2 H20" />
          </svg>
        </div>

        {/* Telemetry Tags */}
        <div className="vfx-hud-tag left">
          <span className="dot"></span>
          <span className="inline sm:hidden">BUILD: PASSING · REACT/NODE</span>
          <span className="hidden sm:inline">BUILD: PASSING<br />NODE · REACT · TS · MONGO</span>
        </div>
        <div className="vfx-hud-tag right">
          <span className="inline sm:hidden">ONLINE · v2.4</span>
          <span className="hidden sm:inline">SYSTEM: ONLINE · v2.4<br />NASHIK, INDIA · 2026</span>
        </div>

        {/* Main Glitch Title & Reveal */}
        <div className="vfx-title-card">
          <div className="vfx-title-wrap">
            <h1 className="vfx-title ghost cy">{profileName}</h1>
            <h1 className="vfx-title ghost mg">{profileName}</h1>
            <h1 className="vfx-title">{profileName}</h1>
          </div>
          <div className="vfx-role">{profileRole}</div>
          
          <div className="vfx-cta-row">
            <button onClick={handleFinish} className="vfx-cta group">
              <span>Enter Portfolio</span>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={handleFinish} className="vfx-cta ghost">
              <Briefcase className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-cyan-400" />
              <span>Explore Work</span>
            </button>
          </div>
        </div>

        {/* Optical Overlays */}
        <div className="vfx-flash"></div>
        <div className="vfx-scanlines"></div>
        <div className="vfx-scanbar"></div>
        <div className="vfx-vignette"></div>

        {/* Bottom Loading / Transition Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900/60 z-30">
          <div
            className="h-full bg-linear-to-r from-cyan-500 via-pink-500 to-cyan-400 transition-all duration-75 shadow-[0_0_10px_rgba(40,244,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
