export interface DressCodePalette {
  id: string;
  name: string;
  colors: string[]; // Palette di 5 pallini
  description: string;
  images: string[]; // Foto di outfit rigorosamente dello stesso colore
}

export const DRESS_CODE_PALETTES: Record<string, DressCodePalette> = {
  lavanda_lilla: {
    id: "lavanda_lilla",
    name: "Lavanda & Lillà d'Autore",
    colors: ["#FFFFFF", "#F3E8FF", "#E9D5FF", "#8B5CF6", "#3B0764"],
    description: "Toni eleganti del viola, lilla e lavanda con dettagli scuri.",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80", // Abito lungo viola/lilla d'alta moda
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80", // Abito lilla elegante da cerimonia
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"  // Abito scuro con dettagli violetto
    ]
  },
  rosa_cipria: {
    id: "rosa_cipria",
    name: "Rosa Cipria & Seta",
    colors: ["#FFFFFF", "#FFF1F2", "#FCE7F3", "#EC4899", "#831843"],
    description: "Sfumature delicate di rosa cipria, magentino e bordeaux elegante.",
    images: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80", // Abito rosa cipria in seta
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80", // Vestito rosa elegante da sera
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80"  // Outfit rosa cipria sofisticato
    ]
  },
  oro_champagne: {
    id: "oro_champagne",
    name: "Oro Bruciato & Champagne",
    colors: ["#FFFFFF", "#FDFBF7", "#E6D5AC", "#B8860B", "#2A2415"],
    description: "Palette calda nei toni dorati, avorio, champagne e rame scuro.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80", // Abito champagne/oro elegante
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80", // Completo beige/dorato formale
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80"  // Vestito luxury tono su tono bronzo/oro
    ]
  },
  verde_smeraldo: {
    id: "verde_smeraldo",
    name: "Verde Smeraldo & Salvia",
    colors: ["#FFFFFF", "#F0FDF4", "#A7F3D0", "#059669", "#064E3B"],
    description: "Tonalità botaniche fresche e sofisticate dal salvia allo smeraldo profondo.",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80", // Abito verde smeraldo elegante
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80", // Completo abito salvia/smeraldo uomo
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80"  // Abito verde bosco da cerimonia
    ]
  },
  blu_notte: {
    id: "blu_notte",
    name: "Blu Notte & Azzurro Polvere",
    colors: ["#FFFFFF", "#F0F9FF", "#BAE6FD", "#0284C7", "#0C4A6E"],
    description: "Eleganza senza tempo con azzurro pastello e blu zaffiro profondo.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80", // Abito azzurro polvere da cerimonia
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80", // Smoking / Abito Blu Notte classico
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"  // Abito blu zaffiro brillante
    ]
  },
  bordeaux_marsala: {
    id: "bordeaux_marsala",
    name: "Bordeaux & Marsala Deep",
    colors: ["#FFFFFF", "#FFF1F2", "#FECDD3", "#E11D48", "#4C0519"],
    description: "Toni intensi del rosso rubino, marsala e bordeaux scuro d'epoca.",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80", // Vestito da sera bordeaux/rosso scuro
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80", // Abito marsala sartoriale
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"  // Dettaglio bordeaux luxury
    ]
  },
  monocromo_black: {
    id: "monocromo_black",
    name: "Black Tie & Monocromo",
    colors: ["#FFFFFF", "#F3F4F6", "#9CA3AF", "#374151", "#111827"],
    description: "Il classico formale per eccellenza: scala di grigi, bianco puro e nero smokey.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80", // Smoking Nero d'autore
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80", // Abito nero sartoriale donna
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80"  // Completo antracite/nero
    ]
  },
  terracotta_rust: {
    id: "terracotta_rust",
    name: "Terracotta & Rame Caldo",
    colors: ["#FFFFFF", "#FFF7ED", "#FFEDD5", "#EA580C", "#7C2D12"],
    description: "Cromie mediterranee dal color ruggine alla terracotta bruciata.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80", // Abito terracotta/arancio bruciato
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80", // Completo tono ruggine rame
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80"  // Vestito satin terracotta
    ]
  }
};
