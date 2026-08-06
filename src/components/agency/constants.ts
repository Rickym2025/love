export interface BackgroundPreset {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  isDark?: boolean;
}

// 10 TEXTURE AD ALTA RISOLUZIONE DAI LINK UNSPLASH UFFICIALI FORNITI
export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: "sfondo_bianco",
    name: "Sfondo Bianco Intonaco",
    url: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "palette_sync",
    name: "Coordinato alla Palette",
    url: "palette",
    thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "seta_avorio",
    name: "Seta Avorio",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "marmo",
    name: "Marmo Naturale",
    url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "luci_dorate",
    name: "Luci Dorate Bokeh",
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "seta_rosa",
    name: "Seta Rosa",
    url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "blu_notte",
    name: "Blu Notte Zaffiro",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80",
    isDark: true,
  },
  {
    id: "terracotta",
    name: "Terracotta & Rame",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80",
    isDark: true,
  },
  {
    id: "fiori",
    name: "Mazzo di Fiori",
    url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "carta_pergamena",
    name: "Carta Pergamena",
    url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
];

export interface DressCodePalette {
  id: string;
  name: string;
  colors: string[];
  textColor: string;
  accentColor: string;
  description: string;
  images: string[];
}

const BASE_PALETTES_ARRAY: DressCodePalette[] = [
  {
    id: "lavanda_lilla",
    name: "Lavanda & Lillà d'Autore",
    colors: ["#FFFFFF", "#F3E8FF", "#E9D5FF", "#8B5CF6", "#3B0764"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
    description: "Toni eleganti del viola, lilla e lavanda con dettagli scuri.",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "rosa_cipria",
    name: "Rosa Cipria & Seta",
    colors: ["#FFFFFF", "#FFF1F2", "#FCE7F3", "#EC4899", "#831843"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
    description: "Sfumature delicate di rosa cipria, magentino e bordeaux elegante.",
    images: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "oro_champagne",
    name: "Oro Bruciato & Champagne",
    colors: ["#FFFFFF", "#FDFBF7", "#E6D5AC", "#B8860B", "#2A2415"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
    description: "Palette calda nei toni dorati, avorio, champagne e rame scuro.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "verde_smeraldo",
    name: "Verde Smeraldo & Salvia",
    colors: ["#FFFFFF", "#F0FDF4", "#A7F3D0", "#059669", "#064E3B"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
    description: "Tonalità botaniche fresche e sofisticate dal salvia allo smeraldo profondo.",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "blu_notte",
    name: "Blu Notte & Azzurro Polvere",
    colors: ["#FFFFFF", "#F0F9FF", "#BAE6FD", "#0284C7", "#0C4A6E"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
    description: "Eleganza senza tempo con azzurro pastello e blu zaffiro profondo.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "bordeaux_marsala",
    name: "Bordeaux & Marsala Deep",
    colors: ["#FFFFFF", "#FFF1F2", "#FECDD3", "#E11D48", "#4C0519"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
    description: "Toni intensi del rosso rubino, marsala e bordeaux scuro d'epoca.",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "monocromo_black",
    name: "Black Tie & Monocromo",
    colors: ["#FFFFFF", "#F3F4F6", "#9CA3AF", "#374151", "#111827"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
    description: "Il classico formale per eccellenza: scala di grigi, bianco puro e nero smokey.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "terracotta_rust",
    name: "Terracotta & Rame Caldo",
    colors: ["#FFFFFF", "#FFF7ED", "#FFEDD5", "#EA580C", "#7C2D12"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
    description: "Cromie mediterranee dal color ruggine alla terracotta bruciata.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80"
    ]
  }
];

const PALETTES_BY_KEY: Record<string | number, DressCodePalette> = {};
BASE_PALETTES_ARRAY.forEach((p, idx) => {
  PALETTES_BY_KEY[idx] = p;
  PALETTES_BY_KEY[String(idx)] = p;
  PALETTES_BY_KEY[p.id] = p;
});

export const DRESS_CODE_PALETTES: any = new Proxy(BASE_PALETTES_ARRAY, {
  get(target, prop) {
    if (prop in target) return (target as any)[prop];
    if (typeof prop === "string" || typeof prop === "number") {
      if (PALETTES_BY_KEY[prop]) return PALETTES_BY_KEY[prop];
    }
    return BASE_PALETTES_ARRAY[0];
  }
});

const PHOTOS_BY_KEY: Record<string | number, string[]> = {};
BASE_PALETTES_ARRAY.forEach((p, idx) => {
  PHOTOS_BY_KEY[idx] = p.images;
  PHOTOS_BY_KEY[String(idx)] = p.images;
  PHOTOS_BY_KEY[p.id] = p.images;
});

export const DRESS_CODE_PHOTOS: Record<string | number, string[]> = new Proxy(PHOTOS_BY_KEY, {
  get(target, prop) {
    if (typeof prop === "string" || typeof prop === "number") {
      if (target[prop]) return target[prop];
    }
    return BASE_PALETTES_ARRAY[0].images;
  }
});

export const DATE_DISPLAY_MODES = [
  { id: "countdown", label: "Conto alla Rovescia Dinamico", value: "countdown", title: "Conto alla Rovescia Dinamico" },
  { id: "scratch", label: "Gratta col Dito per Scoprire la Data", value: "scratch", title: "Gratta col Dito per Scoprire la Data" },
  { id: "text", label: "Data Semplice in Testo Elegante", value: "text", title: "Data Semplice in Testo Elegante" }
];

export const SCHEDULE_SCHEMAS = [
  { id: "classico", label: "Classico Elegante", value: "classico",
