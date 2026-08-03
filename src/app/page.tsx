"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [orbitHtml, setOrbitHtml] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    // Fetch del template orbitale da public/
    fetch("/orbit-template.html?v=" + new Date().getTime())
      .then((res) => res.text())
      .then((html) => setOrbitHtml(html))
      .catch((err) => console.error("Errore nel caricamento del file orbitale:", err));
  }, []);

  // Gestione vCard (Salvataggio Contatto)
  const handleVCardClick = () => {
    const link = document.createElement("a");
    link.href = "/contact.vcf";
    link.download = "Riccardo_Modena_RMStudio.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Gestione Form Contatti via Web3Forms
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const button = form.querySelector("button[type='submit']") as HTMLButtonElement;
    
    if (!button) return;
    const originalText = button.innerText;
    button.innerText = "Invio in corso...";
    button.disabled = true;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Messaggio inviato con successo! Ti risponderò entro 24 ore.");
        form.reset();
      } else {
        alert("Errore nell'invio. Riprova più tardi.");
      }
    } catch {
      alert("Errore di rete. Controlla la connessione.");
    } finally {
      button.innerText = originalText;
      button.disabled = false;
    }
  };

  return (
    <>
      <Head>
        <title>RM Studio - Creative AI Suite</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Script esterni GSAP e ScrollTrigger caricati tramite Next.js Script */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />

      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #050505;
          color: #FFFFFF;
          overflow-x: hidden;
        }
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        html {
          scrollbar-width: none;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .scene-card {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* Stili Sistema Orbitale */
        @keyframes orbit-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes counter-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes pulse-ring-optimized {
          0%, 100% { opacity: 0.2; transform: scale(0.95); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .pulse-ring-element {
          position: absolute;
          width: 380px;
          height: 380px;
          background-color: rgba(242, 210, 139, 0.05);
          filter: blur(48px);
          border-radius: 9999px;
          will-change: transform, opacity;
          animation: pulse-ring-optimized 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .orbit-ring {
          position: relative;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.05);
          animation: orbit-rotation 40s linear infinite;
        }
        .orbit-wrapper {
          position: absolute;
          width: 64px;
          height: 64px;
          transform: translate(-50%, -50%);
        }
        .orbit-item {
          position: relative;
          width: 100%;
          height: 100%;
          animation: counter-rotation 40s linear infinite;
          transform-origin: center;
        }
        .orbit-link {
          display: flex;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          box-sizing: border-box;
          transition: 0.3s;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-decoration: none;
        }
        .orbit-link:hover {
          border-color: #F2D28B;
          box-shadow: 0 0 15px rgba(242, 210, 139, 0.4);
        }
        .orbit-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .orbit-img.cover { object-fit: cover; }
        .orbit-img.rounded { border-radius: 9999px; }
        .orbit-center-photo {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 4px solid #F2D28B;
          padding: 4px;
          background: #000;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8);
          z-index: 10;
          box-sizing: border-box;
        }
        .orbit-center-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      `}</style>

      {/* HEADER MINIMALISTA FISSO */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/5 bg-black/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img src="/loghi/logo_rm.png" alt="RM Studio Logo" className="w-6 h-6 object-contain" />
          <span className="font-serif text-lg tracking-widest uppercase text-[#F2D28B]">RM Studio</span>
        </div>
        <a href="#trigger-11" className="border border-[#F2D28B]/40 text-[#F2D28B] hover:bg-[#F2D28B] hover:text-black transition-all duration-300 px-5 py-2 text-[10px] tracking-widest uppercase font-mono">
          CONTATTI
        </a>
      </header>

      {/* CONTENITORE IMMERSIVO CANVAS & VIDEO HTML5 */}
      <div id="app-container" className="relative w-full bg-[#020205]">
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-black">
          <canvas id="immersive-canvas" className="absolute inset-0 w-full h-full opacity-90 md:block hidden" style={{ willChange: "transform" }}></canvas>
          <video id="immersive-video" className="absolute inset-0 w-full h-full object-cover opacity-90 md:hidden block" playsInline webkit-playsinline="true" muted loop preload="auto" style={{ pointerEvents: "none" }}>
            <source src="/frames/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 100%)" }}></div>
        </div>

        {/* SCHEDE EDITORIALI */}
        <div id="text-overlays" className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-center items-center">
          {/* SCHEDA 0: HERO START */}
          <div className="scene-card absolute inset-0 flex justify-center items-center text-center p-6 md:p-12">
            <div className="w-full max-w-5xl bg-[#07070a]/92 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl flex flex-col items-center gap-6">
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#F2D28B] font-mono">Ecosistema AI</span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#F6F3F0] tracking-wide">RM Studio</h2>
              <p className="text-base text-neutral-300 max-w-xl font-light">
                Risolviamo colli di bottiglia operativi sviluppando ecosistemi AI su misura. Riduciamo lo sforzo d&apos;uso, azzeriamo l&apos;errore umano ed espandiamo i tuoi canali commerciali.
              </p>
              <button onClick={handleVCardClick} className="inline-flex items-center gap-3 bg-white text-black text-xs font-bold uppercase px-8 py-4 rounded-full hover:scale-105 pointer-events-auto">
                <span>SALVA CONTATTO (vCard)</span>
              </button>
            </div>
          </div>

          {/* SCHEDA 10: THE UNION (SINTESI ORBITALE) */}
          <div className="scene-card absolute inset-0 flex justify-center items-center text-center p-6">
            <div className="w-full max-w-5xl bg-[#07070a]/92 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6">
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#F2D28B] font-mono">The Synthesis</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F6F3F0]">Ecosistema Connesso</h2>
              <p className="text-sm text-neutral-300 max-w-lg font-light">
                La convergenza di nove canali autonomi integrati sotto un&apos;unica direzione tecnica. Sincronizzazione automatica tramite database relazionali.
              </p>
              
              {/* INIEZIONE DINAMICA ORBITALE */}
              <div id="orbit-container-target" className="relative w-[360px] h-[360px] flex items-center justify-center scale-90 pointer-events-auto mt-4">
                {orbitHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: orbitHtml }} />
                ) : (
                  <div className="text-xs font-mono text-[#F2D28B]">Caricamento Ruota Orbitale SaaS...</div>
                )}
              </div>
            </div>
          </div>

          {/* SCHEDA 11: CONTATTI */}
          <div className="scene-card absolute inset-0 flex justify-center items-center text-center p-6">
            <div className="w-full max-w-xl bg-[#07070a]/92 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4">
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#F2D28B] font-mono">The Connection</span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#F6F3F0]">Parliamo del tuo Progetto</h2>
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 pointer-events-auto w-full text-left mt-2">
                <input type="hidden" name="access_key" value="9013a8d5-0901-42a0-b9e6-4c45553f960d" />
                <input type="text" name="name" required placeholder="Nome Completo" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#F2D28B]" />
                <input type="email" name="email" required placeholder="Email Aziendale" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#F2D28B]" />
                <textarea name="message" required rows={3} placeholder="Quale processo vuoi automatizzare?" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#F2D28B] resize-none"></textarea>
                <button type="submit" className="bg-[#F2D28B] text-black text-xs font-black uppercase py-4 rounded-xl hover:bg-white transition cursor-pointer w-full font-mono">
                  Invia Messaggio Aziendale
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* TRIGGER INVISIBILI PER LO SCROLL */}
        <div id="scroll-triggers" className="relative z-20 w-full pointer-events-none">
          <section id="trigger-0" className="w-full" style={{ height: "150vh" }}></section>
          <section id="trigger-1" className="w-full" style={{ height: "150vh" }}></section>
          <section id="trigger-10" className="w-full" style={{ height: "150vh" }}></section>
          <section id="trigger-11" className="w-full" style={{ height: "150vh" }}></section>
          <div style={{ height: "100vh" }} className="w-full"></div>
        </div>
      </div>

      {/* FLOATING DOCK IN BASSO */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-black/40 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md pointer-events-auto shadow-2xl">
        <a href="#trigger-0" className="text-[10px] font-mono text-[#F2D28B] uppercase tracking-widest">Intro</a>
        <span className="text-white/10 text-[10px]">|</span>
        <a href="#trigger-10" className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Ecosistemi</a>
        <span className="text-white/10 text-[10px]">|</span>
        <a href="#trigger-11" className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Contatti</a>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-6 left-10 z-40 text-[10px] text-white/20 uppercase tracking-widest hidden md:block font-mono pointer-events-auto">
        © {currentYear} Riccardo Modena • RM STUDIO • Crafted with Intention
      </div>
    </>
  );
}
