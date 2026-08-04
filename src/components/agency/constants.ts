export interface PartnerStore {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
}

export const AUDIO_TRACK_PRESETS = [
  { name: "🎵 Marcia Nuziale d'Autore - FF Edizioni (F. Fusetti)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { name: "🎵 Inedito d'Amore 'Due Anime' - FF Edizioni", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { name: "🎵 Sinfonia Romantica 'Il Nostro Per Sempre' - FF Edizioni", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
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
  { id: "busta", name: "✉️ Busta d'Epoca & Sigillo Ceralacca (Busta 3D)" },
  { id: "nuvole", name: "☁️ Cielo & Nuvole 3D Volumetriche (Apertura allo Scroll)" },
  { id: "lago", name: "🌊 Rifrazione Acqua & Lago Romantico" },
];

export const DATE_DISPLAY_MODES = [
  { id: "scratch", name: "🎰 Gratta la Data col Dito (HTML5 Canvas)" },
  { id: "countdown", name: "⏳ Countdown Timer in Tempo Reale" },
  { id: "text", name: "📜 Data Fissa Elegant (Testo Grande Dorato)" },
];

export const SCHEDULE_SCHEMAS = [
  { id: "classico", name: "🏛️ Classico Elegante" },
  { id: "timeline", name: "📍 Timeline Verticale con Nodi Dorati" },
  { id: "nuvole", name: "☁️ Programma tra le Nuvole 3D" },
  { id: "schede", name: "🎴 Schede Card Separati" },
  { id: "minimal", name: "📜 Minimal Serif Pulito" },
];

export const RSVP_STYLES = [
  { id: "classico", name: "📜 Classico Elegante (Modulo con Menu & Intolleranze)" },
  { id: "ceralacca", name: "✉️ Sigillo Ceralacca Pop-Up (Con Ceralacca)" },
  { id: "pastello", name: "🎨 Pastello Minimal (Bottoni Pillola)" },
];

export const EVENT_THEME_PRESETS = [
  "Shabby Chic & Provenzale",
  "Botanico & Greenery",
  "Country Elegant",
  "Luxury Gold & Total White",
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

// Gallerie Pexels Ad Alta Fedeltà Cromatica
export const DRESS_CODE_PHOTOS: Record<number, string[]> = {
  0: [ // Pastello Romantico
    "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],
  1: [ // Oro & Champagne
    "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],
  2: [ // Smeraldo & Salvia
    "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],
  3: [ // Rose Gold & Cipria
    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],
  4: [ // Blu Notte & Zaffiro
    "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],
  5: [ // Sabbia & Terracotta
    "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],
  6: [ // LAVANDA & LILLÀ RIGOROSAMENTE VIOLA/LILLA
    "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],
  7: [ // Bianco & Minimal
    "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],
};
