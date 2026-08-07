"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, KeyRound, ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [agencyId, setAgencyId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    const cleanInput = agencyId.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");

    // 1. LOGIN SPECIALE MASTER ADMIN (RICCARDO MODENA)
    if (cleanInput === "admin" || cleanInput === "riccardo@rmstudio.app") {
      router.push("/admin");
      return;
    }

    // 2. VERIFICA O CREAZIONE AUTONOMA PER NUOVE AGENZIE
    try {
      const { data, error } = await supabase
        .from("love_agencies")
        .select("*")
        .eq("agency_id", cleanInput)
        .single();

      if (data) {
        // Agenzia esistente -> Entra nello Studio
        router.push(`/agency/${data.agency_id}`);
      } else {
        // Se è una nuova agenzia, la registra con 0/10 matrimoni usati
        const { error: insertError } = await supabase.from("love_agencies").insert([
          {
            agency_id: cleanInput || "nuova-agenzia",
            agency_name: cleanInput.replace(/-/g, " ").toUpperCase(),
            email: `${cleanInput}@agenzia.it`,
            used_count: 0,
            limit_count: 10,
            status: "attivo",
          },
        ]);

        if (!insertError) {
          router.push(`/agency/${cleanInput}`);
        } else {
          router.push(`/agency/${cleanInput || "sposi-in-love"}`);
        }
      }
    } catch (err) {
      // Fallback per entrare subito nello studio
      router.push(`/agency/${cleanInput || "sposi-in-love"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* SFONDO LUSSO CON BORDI ORO */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border-2 border-[#D4AF37] p-8 rounded-3xl shadow-2xl space-y-6 relative z-10 text-center">
        {/* LOGO */}
        <div className="space-y-2">
          <div className="relative w-14 h-14 mx-auto drop-shadow-xl">
            <Image src="/logo.png" alt="LOVE Logo" fill className="object-contain" priority unoptimized />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Accesso Agency Hub White-Label
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">LOVE Studio B2B</h1>
          <p className="text-xs text-slate-400 font-serif">
            Inserisci il tuo ID Agenzia per accedere al tuo Configuratore Riservato.
          </p>
        </div>

        {/* FORM LOGIN */}
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-[#D4AF37] mb-1">ID Agenzia / Codice Riservato *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={agencyId}
                onChange={(e) => setAgencyId(e.target.value)}
                className="w-full text-xs p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono font-bold focus:border-[#D4AF37] outline-none"
                placeholder="es. white-wedding-studio"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Se sei una nuova agenzia, inserisci il tuo nome per accedere al tuo pannello.
            </span>
          </div>

          {errorMsg && <p className="text-xs text-rose-400 font-bold">{errorMsg}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>Accedi allo Studio Agenzia</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>RM Studio B2B Security • SSL 256-Bit</span>
        </div>
      </div>
    </div>
  );
}
