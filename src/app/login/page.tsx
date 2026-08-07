"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, KeyRound, ArrowRight, ShieldCheck, Building2, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  
  // STATO PER TOGGLE SCHEDA (LOGIN vs REGISTRAZIONE)
  const [mode, setMode] = useState<"login" | "register">("login");

  // CAMPI FORM LOGIN
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // CAMPI FORM REGISTRAZIONE
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regSlug, setRegSlug] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // GESTIONE ACCESSO (LOGIN)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    const cleanInput = loginId.trim().toLowerCase().replace(/[^a-z0-9-@.]/g, "");

    // ACCESSO SPECIALE MASTER ADMIN (RICCARDO MODENA)
    if (cleanInput === "admin" || cleanInput === "riccardo@rmstudio.app") {
      router.push("/admin");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("love_agencies")
        .select("*")
        .or(`agency_id.eq.${cleanInput},email.eq.${cleanInput}`)
        .single();

      if (data) {
        // Accesso consentito
        router.push(`/agency/${data.agency_id}`);
      } else {
        // Se non trovata, suggerisce di registrarsi
        setErrorMsg("ID Agenzia o Email non trovata. Clicca sulla scheda 'Registra Nuova Agenzia' per creare il tuo account!");
      }
    } catch (err) {
      // Fallback
      router.push(`/agency/${cleanInput || "sposi-in-love"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // GESTIONE NUOVA REGISTRAZIONE AGENZIA
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMsg("Compila tutti i campi obbligatori per completare la registrazione.");
      setIsLoading(false);
      return;
    }

    // Auto-genera lo slug URL se lasciato vuoto
    const cleanSlug = (regSlug || regName)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");

    try {
      // Registra la nuova agenzia su Supabase con 0/10 Matrimoni
      const { error: insertError } = await supabase.from("love_agencies").insert([
        {
          agency_id: cleanSlug,
          agency_name: regName.trim().toUpperCase(),
          email: regEmail.trim(),
          used_count: 0,
          limit_count: 10,
          status: "attivo",
        },
      ]);

      if (!insertError) {
        // Redireziona all'Agency Studio appena creato
        router.push(`/agency/${cleanSlug}`);
      } else {
        // Se lo slug esiste già, apre comunque lo studio
        router.push(`/agency/${cleanSlug}`);
      }
    } catch (err) {
      router.push(`/agency/${cleanSlug}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans select-none">
      {/* SFONDO LUSSO SCURO */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />

      <div className="max-w-lg w-full bg-slate-900/95 backdrop-blur-2xl border-2 border-[#D4AF37] p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 relative z-10 text-center my-auto">
        
        {/* LOGO & TESTATA CON TESTI GRANDI */}
        <div className="space-y-2">
          <div className="relative w-16 h-14 mx-auto drop-shadow-2xl">
            <Image src="/logo.png" alt="LOVE Logo" fill className="object-contain" priority unoptimized />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> White-Label Agency Hub
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">LOVE Studio B2B</h1>
          <p className="text-xs md:text-sm text-slate-300 font-serif">
            Piattaforma riservata a Wedding Planner e Agenzie di Eventi.
          </p>
        </div>

        {/* SELETTORE CHIARO TRA ACCEDI E REGISTRATI (FONT 14PX) */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMsg("");
            }}
            className={`py-3 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "login"
                ? "bg-[#D4AF37] text-slate-950 shadow-lg scale-102"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LogIn className="w-4 h-4" /> Accedi (Login)
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("register");
              setErrorMsg("");
            }}
            className={`py-3 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "register"
                ? "bg-[#D4AF37] text-slate-950 shadow-lg scale-102"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UserPlus className="w-4 h-4" /> Registra Nuova Agenzia
          </button>
        </div>

        {/* MSG ERRORE IN EVIDENZA */}
        {errorMsg && (
          <div className="p-3 bg-rose-950/80 border border-rose-600 rounded-xl text-xs font-bold text-rose-200 text-left">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* MODALITÀ 1: FORM LOGIN PER AGENZIE ESISTENTI */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4 text-left animate-fade-in">
            <div>
              <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> ID Agenzia o Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full text-sm p-4 rounded-xl border-2 border-slate-700 bg-slate-950 text-white font-mono font-bold focus:border-[#D4AF37] outline-none"
                  placeholder="es. sposi-in-love oppure la tua email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1.5 flex items-center gap-1.5">
                <Lock className="w-4 h-4" /> Password Riservata
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full text-sm p-4 rounded-xl border-2 border-slate-700 bg-slate-950 text-white font-mono font-bold focus:border-[#D4AF37] outline-none"
                  placeholder="Inserisci la tua password..."
                />
                <KeyRound className="w-5 h-5 text-slate-500 absolute right-4 top-4" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#D4AF37] text-slate-950 font-bold text-sm md:text-base rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>Accedi allo Studio Agenzia</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* MODALITÀ 2: REGISTRAZIONE NUOVA AGENZIA */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-4 text-left animate-fade-in">
            <div>
              <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> Nome Commerciale Agenzia *
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => {
                  setRegName(e.target.value);
                  if (!regSlug) {
                    setRegSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                  }
                }}
                className="w-full text-sm p-3.5 rounded-xl border-2 border-slate-700 bg-slate-950 text-white font-bold focus:border-[#D4AF37] outline-none"
                placeholder="es. Luxe Wedding Studio"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> Email Aziendale per Notifiche *
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full text-sm p-3.5 rounded-xl border-2 border-slate-700 bg-slate-950 text-white font-mono font-bold focus:border-[#D4AF37] outline-none"
                placeholder="info@nomeagenzia.it"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1">
                ID Unico URL (Personalizza l&apos;indirizzo del tuo pannello):
              </label>
              <div className="flex items-center bg-slate-950 rounded-xl border-2 border-slate-700 px-3 py-1">
                <span className="text-xs text-slate-500 font-mono">love.rmstudio.app/agency/</span>
                <input
                  type="text"
                  value={regSlug}
                  onChange={(e) => setRegSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="flex-1 text-sm p-2 bg-transparent text-amber-300 font-mono font-bold focus:outline-none"
                  placeholder="luxe-wedding"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                <Lock className="w-4 h-4" /> Scegli una Password per la tua Agenzia *
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full text-sm p-3.5 rounded-xl border-2 border-slate-700 bg-slate-950 text-white font-mono font-bold focus:border-[#D4AF37] outline-none"
                placeholder="Crea una password sicura..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#D4AF37] text-slate-950 font-bold text-sm md:text-base rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>Crea Account &amp; Attiva 10 Matrimoni</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>RM Studio B2B Security • Licenza 10 Matrimoni Inclusa</span>
        </div>
      </div>
    </div>
  );
}
