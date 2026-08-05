export interface DressCodePalette {
  id: string;
  name: string;
  colors: string[];
  textColor: string;
  accentColor: string;
  description: string;
  images: string[];
}

// 1. PALETTE UFFICIALI COORDINATE (NON TOCCATE)
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

// PROXY SICURO DRESS_CODE_PALETTES
const PALETTES_BY_KEY: Record<string | number, DressCodePalette> = {};
BASE_PALETTES_ARRAY.forEach((p, idx) => {
  PALETTES_BY_KEY[idx] = p;
  PALETTES_BY_KEY[String(idx)] = p;
  PALETTES_BY_KEY[p.id] = p;
});

export const DRESS_CODE_PALETTES: any = new Proxy(BASE_PALETTES_ARRAY, {
  get(target, prop) {
    if (prop in target) {
      return (target as any)[prop];
    }
    if (typeof prop === "string" || typeof prop === "number") {
      if (PALETTES_BY_KEY[prop]) {
        return PALETTES_BY_KEY[prop];
      }
    }
    return BASE_PALETTES_ARRAY[0];
  }
});

// PROXY SICURO DRESS_CODE_PHOTOS
const PHOTOS_BY_KEY: Record<string | number, string[]> = {};
BASE_PALETTES_ARRAY.forEach((p, idx) => {
  PHOTOS_BY_KEY[idx] = p.images;
  PHOTOS_BY_KEY[String(idx)] = p.images;
  PHOTOS_BY_KEY[p.id] = p.images;
});

export const DRESS_CODE_PHOTOS: Record<string | number, string[]> = new Proxy(PHOTOS_BY_KEY, {
  get(target, prop) {
    if (typeof prop === "string" || typeof prop === "number") {
      if (target[prop]) {
        return target[prop];
      }
    }
    return BASE_PALETTES_ARRAY[0].images;
  }
});

// 2. MODALITÀ DI VISUALIZZAZIONE DATA (RIPRISTINATO SENZA "ITALIANO")
export const DATE_DISPLAY_MODES = [
  { id: "countdown", label: "Conto alla Rovescia Dinamico" },
  { id: "scratch", label: "Gratta col Dito per Scoprire la Data" },
  { id: "text", label: "Data Semplice in Testo Elegante" }
];

// 3. SCHEMI PROGRAMMA ORARI (RIPRISTINATO SENZA "ITALIANO")
export const SCHEDULE_SCHEMAS = [
  { id: "classico", label: "Classico Elegante", description: "Elenco orario con testo descrittivo" },
  { id: "timeline", label: "Timeline Verticale", description: "Linea temporale con orari in sequenza" },
  { id: "schede", label: "Schede a Griglia", description: "Riquadri orari affiancati" },
  { id: "minimal", label: "Minimal essenziale", description: "Testo pulito e lineare" }
];

// 4. EFFETTI DI APERTURA INIZIALE
export const INTRO_START_OPTIONS = [
  { id: "busta", label: "Busta Luxury con Ceralacca 3D" },
  { id: "nuvole", label: "Apertura Nuvole Volumetriche 3D" },
  { id: "expand", label: "Scroll Expand Media a Tutto Schermo" },
  { id: "lago", label: "Specchio d'Acqua con Effetto Onde WebGL" }
];

// 5. STILI CONFERSIONE PARTECIPAZIONE (RSVP)
export const RSVP_STYLES = [
  { id: "classico", label: "Classico con Intolleranze e Menu" },
  { id: "moderno", label: "Moderno Interattivo" },
  { id: "minimal", label: "Minimal Diretto" }
];

// 6. TEMI DELL'EVENTO PRESET
export const EVENT_THEMES = [
  "Luxury Gold & Total White",
  "Boho Chic & Naturale",
  "Romantico & Pastello",
  "Shabby Chic & Provenzale",
  "Modern Minimal & Antracite",
  "Personalizzato (digita a mano)"
];

// 7. PRESET FRASI BENVENUTO
export const WELCOME_PHRASE_PRESETS: string[] = [
  "Due anime, un solo destino. Una storia scritta nel cuore.",
  "Il nostro amore è un viaggio che inizia oggi.",
  "Benvenuti al giorno più bello della nostra vita.",
  "Insieme è il nostro posto preferito.",
  "L'amore non guarda con gli occhi ma con l'anima.",
  "Due cuori, una sola melodia.",
  "Oggi inizia il nostro 'per sempre'.",
  "Festeggiate con noi l'inizio di questa nuova avventura.",
  "Benvenuti al nostro matrimonio.",
  ""
];

// 8. DEMO BRANI AUDIO FF EDIZIONI
export const AUDIO_DEMOS = [
  {
    id: "A",
    title: "Elena & Davide: La Nostra Melodia A",
    url: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3"
  },
  {
    id: "B",
    title: "Francesca & Luca: Quella Fotografia B",
    url: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3"
  }
];
