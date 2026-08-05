export interface PartnerStore {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
}

export interface PaletteItem {
  id: string;
  name: string;
  colors: string[];
  textColor: string;
  accentColor: string;
}

export const AUDIO_TRACK_PRESETS = [
  { name: "🎵 Demo 1 — Elena & Davide ('La Nostra Melodia')", url: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3" },
  { name: "🎵 Demo 2 — Francesca & Luca ('Quella Fotografia')", url: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3" },
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

// PALETTE COLORI CON TESTO SCURO AD ALTO CONTRASTO GARANTITO (textColor)
export const DRESS_CODE_PALETTES: PaletteItem[] = [
  {
    id: "1",
    name: "Pastello Romantico",
    colors: ["#FAF7F2", "#FFF0F5", "#FCE7F0", "#D87093", "#3A1C24"],
    textColor: "#3A1C24",
    accentColor: "#C97082",
  },
  {
    id: "2",
    name: "Oro & Champagne",
    colors: ["#FAF7F2", "#F3EDE2", "#E6C687", "#C5A059", "#2C261E"],
    textColor: "#2C261E",
    accentColor: "#C5A059",
  },
  {
    id: "3",
    name: "Salvia & Smeraldo Soft",
    colors: ["#F0F7F4", "#E2ECE9", "#A3C9A8", "#52796F", "#19352D"],
    textColor: "#19352D",
    accentColor: "#52796F",
  },
  {
    id: "4",
    name: "Rose Gold & Cipria",
    colors: ["#FFF5F5", "#FCE7F0", "#F4ACB7", "#C97082", "#4A1521"],
    textColor: "#4A1521",
    accentColor: "#C97082",
  },
  {
    id: "5",
    name: "Blu Zaffiro & Polvere",
    colors: ["#F0F4F8", "#D9E2EC", "#B0C4DE", "#334E68", "#102A43"],
    textColor: "#102A43",
    accentColor: "#334E68",
  },
  {
    id: "6",
    name: "Sabbia & Terracotta Chiara",
    colors: ["#FFF8F0", "#F7EBDF", "#E8D3C3", "#B26752", "#422018"],
    textColor: "#422018",
    accentColor: "#B26752",
  },
  {
    id: "7",
    name: "Lavanda & Lillà Delicato",
    colors: ["#F7F5FC", "#EDE7F6", "#D8B4F8", "#8A5CF5", "#2D1552"],
    textColor: "#2D1552",
    accentColor: "#8A5CF5",
  },
  {
    id: "8",
    name: "Bianco & Minimal Avorio",
    colors: ["#FFFFFF", "#FAF7F2", "#E2E8F0", "#64748B", "#0F172A"],
    textColor: "#0F172A",
    accentColor: "#64748B",
  },
];

// IMMAGINI UNSPLASH RIGOROSAMENTE COORDINATE AI COLORI DELLA PALETTE
export const DRESS_CODE_PHOTOS: Record<number, string[]> = {
  0: [ // Pastello Romantico
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80",
  ],
  1: [ // Oro & Champagne
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
  ],
  2: [ // Salvia & Smeraldo
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
  ],
  3: [ // Rose Gold & Cipria
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=400&q=80",
  ],
  4: [ // Blu Zaffiro & Polvere
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
