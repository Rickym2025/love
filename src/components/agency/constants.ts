export interface PartnerStore {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
}

export const AUDIO_TRACK_PRESETS = [
  { name: "🎵 Colonna Sonora d'Autore 1 - FF Edizioni", url: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/love-song-1.mp3" },
  { name: "🎵 Colonna Sonora d'Autore 2 - FF Edizioni", url: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/love-song-2.mp3" },
  { name: "🎵 Marcia Nuziale Romantica - FF Edizioni", url: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/love-song-3.mp3" },
  { name: "🔗 Personalizzata (Inserisci Link MP3 sotto)", url: "" },
];

export const WELCOME_PHRASE_PRESETS = [
  "Due anime, un solo destino. Una storia scritta nel cuore.",
  "L'amore non consiste nello guardarsi l'un l'altro, ma nel guardare insieme nella stessa direzione.",
  "Niente è per caso, ogni passo ci ha condotti qui. Unisciti alla nostra gioia.",
  "Oggi inizia il nostro 'per sempre'. Siete i benvenuti a celebrare con noi.",
  "Due cuori, una sola melodia. Festeggia il nostro giorno speciale!",
  "Con gioia e gratitudine vi invitiamo a condividere l'inizio della nostra vita insieme.",
  "L'amore è la forza che muove l'universo. Benvenuti al nostro matrimonio.",
  "Amore, risate e ricordi indimenticabili: grazie per essere con noi.",
  "Un giorno di festa, una vita d'amore. Benvenuti al giorno più bello.",
  "Personalizzata (scrivi la tua frase nel campo sottostante)",
];

export const INTRO_START_PRESETS = [
  { id: "arco", name: "🏛️ Arco Romano & Cigni sul Lago" },
  { id: "busta", name: "✉️ Busta d'Epoca 3D con Ceralacca" },
  { id: "nuvole", name: "☁️ Nuvole 3D Volumetriche (Apertura allo Scroll)" },
  { id: "lago", name: "🌊 Rifrazione Liquida Acqua del Lago" },
];

export const DATE_DISPLAY_MODES = [
  { id: "countdown", name: "⏳ Countdown Timer in Tempo Reale" },
  { id: "scratch", name: "🎰 Gratta la Data col Dito (HTML5 Canvas)" },
  { id: "text", name: "📜 Data Fissa Elegant (Testo Grande Dorato)" },
];

export const SCHEDULE_SCHEMAS = [
  { id: "classico", name: "🏛️ Classico Elegante" },
  { id: "timeline", name: "📍 Timeline Verticale con Nodi Dorati" },
  { id: "schede", name: "🎴 Schede Card Separati" },
  { id: "minimal", name: "📜 Minimal Serif Pulito" },
  { id: "orizzontale", name: "↔️ Timeline Orizzontale Scorrevole" },
];

export const EVENT_THEME_PRESETS = [
  "Luxury Gold & Total White",
  "Shabby Chic & Provenzale",
  "Botanico & Greenery",
  "Country Elegant",
  "BOHO Chic & Terracotta",
  "Minimal Modern",
  "Tropical Romance",
  "Personalizzato (digita a mano)",
];

export const DRESS_CODE_PALETTES = [
  { id: "1", name: "Pastello Romantico", colors: ["#FAF7F2", "#FDE68A", "#FCA5A5", "#93C5FD", "#60A5FA"] },
  { id: "2", name: "Oro & Champagne", colors: ["#FAF7F2", "#F3EDE2", "#D4AF37", "#B8860B", "#1E293B"] },
  { id: "3", name: "Smeraldo & Salvia", colors: ["#F0FDF4", "#A7F3D0", "#34D399", "#059669", "#064E3B"] },
  { id: "4", name: "Rose Gold & Cipria", colors: ["#FFF1F2", "#FECDD3", "#FB7185", "#E11D48", "#881337"] },
  { id: "5", name: "Blu Notte & Zaffiro", colors: ["#F0F9FF", "#93C5FD", "#3B82F6", "#1D4ED8", "#0F172A"] },
  { id: "6", name: "Sabbia & Terracotta", colors: ["#FFF7ED", "#FED7AA", "#FB923C", "#EA580C", "#7C2D12"] },
  { id: "7", name: "Lavanda & Lillà", colors: ["#F5F3FF", "#DDD6FE", "#A78BFA", "#7C3AED", "#4C1D95"] },
  { id: "8", name: "Bianco & Minimal", colors: ["#FFFFFF", "#F8FAFC", "#E2E8F0", "#94A3B8", "#0F172A"] },
];

// Gallerie Unsplash Direct ad Alta Fedeltà Cromatica
export const DRESS_CODE_PHOTOS: Record<number, string[]> = {
  0: [ // Pastello Romantico
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80",
  ],
  1: [ // Oro & Champagne
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
  ],
  2: [ // Smeraldo & Salvia
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
  ],
  3: [ // Rose Gold & Cipria
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=400&q=80",
  ],
  4: [ // Blu Notte & Zaffiro
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
  ],
  5: [ // Sabbia & Terracotta
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80",
  ],
  6: [ // LAVANDA & LILLÀ RIGOROSA (ESCLUSIVAMENTE VIOLA/LILLA)
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
  ],
  7: [ // Bianco & Minimal
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
  ],
};
