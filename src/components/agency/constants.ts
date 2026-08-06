export interface BackgroundPreset {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  unsplashPageUrl: string;
  isDark?: boolean;
  isPremium?: boolean; // true = foto Unsplash+ (a pagamento), servita da plus.unsplash.com
}

/**
 * NOTA IMPORTANTE SU QUESTA FUNZIONE:
 * In passato questa funzione tentava di "convertire" il link della pagina Unsplash
 * (es. https://unsplash.com/it/foto/nome-slug-KcsKWw77Ovw) in un URL CDN diretto,
 * assumendo che l'ultimo blocco dello slug (KcsKWw77Ovw) fosse riusabile nell'URL
 * images.unsplash.com/photo-<id>.
 *
 * Questo è SBAGLIATO: lo slug della pagina e l'id usato dalla CDN
 * (es. 1516541196182-6bdb0516ed27) sono due identificativi indipendenti.
 * Non esiste un modo per derivare l'uno dall'altro via regex/codice client-side.
 * Da qui derivavano i mismatch tra il nome del preset e la foto mostrata.
 *
 * Questa funzione ora fa solo da guardia: se le passi già un URL CDN valido
 * (images.unsplash.com o plus.unsplash.com) lo restituisce invariato.
 * Se le passi un link di pagina Unsplash (unsplash.com/it/foto/...), NON prova
 * a indovinare nulla e restituisce l'input as-is, così un URL sbagliato
 * salta subito all'occhio invece di produrre un'immagine muta ma errata.
 *
 * COME AGGIUNGERE UNA NUOVA IMMAGINE IN FUTURO (unico modo affidabile):
 * 1. Apri la pagina della foto su unsplash.com
 * 2. Click destro sull'immagine principale > "Copia indirizzo immagine"
 *    (oppure: tasto destro > Ispeziona > cerca il tag <meta property="og:image">)
 * 3. Incolla quel link (inizia con https://images.unsplash.com/photo-...
 *    oppure https://plus.unsplash.com/premium_photo-... se è Unsplash+)
 *    direttamente nel campo `url` del preset qui sotto.
 * 4. Se il dominio è plus.unsplash.com, marca isPremium: true.
 */
export function parseUnsplashImageUrl(urlOrId: string): string {
  if (!urlOrId || urlOrId === "#FFFFFF" || urlOrId === "palette") return urlOrId;

  // Già un URL CDN diretto (gratuito o Unsplash+): usalo così com'è.
  if (urlOrId.includes("images.unsplash.com") || urlOrId.includes("plus.unsplash.com")) {
    return urlOrId;
  }

  // Link alla pagina Unsplash (non a un'immagine diretta): non è convertibile
  // in modo affidabile, quindi lo lasciamo invariato e chi lo usa se ne accorge.
  if (urlOrId.includes("unsplash.com/")) {
    console.warn(
      `[background-presets] "${urlOrId}" è un link pagina Unsplash, non un URL CDN diretto. ` +
      `Sostituiscilo con l'og:image reale (vedi istruzioni sopra la funzione).`
    );
    return urlOrId;
  }

  return urlOrId;
}

// 9 TEXTURE AD ALTA RISOLUZIONE — URL CDN risolti manualmente dalle pagine Unsplash ufficiali
export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: "sfondo_bianco",
    name: "Sfondo Bianco Intonaco",
    unsplashPageUrl: "https://unsplash.com/it/foto/superficie-murale-in-intonaco-a-texture-bianca-KcsKWw77Ovw",
    url: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "palette_sync",
    name: "Coordinato alla Palette",
    unsplashPageUrl: "",
    url: "palette",
    thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "seta_avorio",
    name: "Seta Avorio",
    unsplashPageUrl: "https://unsplash.com/it/foto/un-primo-piano-di-un-lenzuolo-bianco-su-un-letto-GVvrdV-oj40",
    url: "https://plus.unsplash.com/premium_photo-1701191571962-020565a4f0c1?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://plus.unsplash.com/premium_photo-1701191571962-020565a4f0c1?auto=format&fit=crop&w=200&q=80",
    isDark: false,
    isPremium: true,
  },
  {
    id: "marmo",
    name: "Marmo Naturale",
    unsplashPageUrl: "https://unsplash.com/it/foto/sfondo-astratto-a-motivo-bianco-di-marmo-naturale-Yrw8oyReyh8",
    url: "https://plus.unsplash.com/premium_photo-1764687797170-8139372a9005?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://plus.unsplash.com/premium_photo-1764687797170-8139372a9005?auto=format&fit=crop&w=200&q=80",
    isDark: false,
    isPremium: true,
  },
  {
    id: "luci_dorate",
    name: "Luci Dorate Bokeh",
    unsplashPageUrl: "https://unsplash.com/it/foto/una-foto-sfocata-di-un-telefono-cellulare-su-un-tavolo-zcg3ge_-4CI",
    url: "https://plus.unsplash.com/premium_photo-1664274132563-58233267f8e8?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://plus.unsplash.com/premium_photo-1664274132563-58233267f8e8?auto=format&fit=crop&w=200&q=80",
    isDark: false,
    isPremium: true,
  },
  {
    id: "seta_rosa",
    name: "Seta Rosa",
    unsplashPageUrl: "https://unsplash.com/it/foto/tessuto-verde-su-tavolo-di-legno-marrone-cQL1GrZIJ9s",
    url: "https://images.unsplash.com/photo-1613503350178-0854b98bdbe8?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1613503350178-0854b98bdbe8?auto=format&fit=crop&w=200&q=80",
    isDark: false,
  },
  {
    id: "blu_notte",
    name: "Blu Notte",
    unsplashPageUrl: "https://unsplash.com/it/foto/gemme-sfaccettate-di-un-blu-brillante-scintillano-intensamente-CEYBFW1gRjw",
    url: "https://images.unsplash.com/photo-1783771686998-0af6c0efec6e?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1783771686998-0af6c0efec6e?auto=format&fit=crop&w=200&q=80",
    isDark: true,
  },
  {
    id: "terracotta",
    name: "Terracotta",
    unsplashPageUrl: "https://unsplash.com/it/foto/un-giocatore-di-baseball-che-tiene-una-mazza-in-cima-a-un-campo-sohjKKHhguk",
    url: "https://plus.unsplash.com/premium_photo-1672152804608-1740ffa01da0?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://plus.unsplash.com/premium_photo-1672152804608-1740ffa01da0?auto=format&fit=crop&w=200&q=80",
    isDark: true,
    isPremium: true,
  },
  {
    id: "fiori",
    name: "Fiori",
    unsplashPageUrl: "https://unsplash.com/it/foto/un-mazzo-di-fiori-seduto-sopra-un-tavolo-di-legno-ElxBX6bsAgQ",
    url: "https://plus.unsplash.com/premium_photo-1676475964992-6404b8db0b53?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://plus.unsplash.com/premium_photo-1676475964992-6404b8db0b53?auto=format&fit=crop&w=200&q=80",
    isDark: false,
    isPremium: true,
  },
  {
    id: "carta_pergamena",
    name: "Carta Pergamena",
    unsplashPageUrl: "https://unsplash.com/it/foto/texture-di-carta-pergamena-beige-invecchiata-_YgmNICHdss",
    url: "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?auto=format&fit=crop&w=200&q=80",
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
    colors: ["#FAF5FF", "#FFFFFF", "#E9D5FF", "#8B5CF6", "#3B0764"],
    textColor: "#3B0764",
    accentColor: "#8B5CF6",
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
    colors: ["#FFF1F2", "#FFFFFF", "#FCE7F3", "#EC4899", "#831843"],
    textColor: "#831843",
    accentColor: "#EC4899",
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
    colors: ["#FAF7F2", "#FFFFFF", "#E6D5AC", "#B8860B", "#1E293B"],
    textColor: "#1E293B",
    accentColor: "#B8860B",
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
    colors: ["#F0FDF4", "#FFFFFF", "#A7F3D0", "#059669", "#064E3B"],
    textColor: "#064E3B",
    accentColor: "#059669",
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
    colors: ["#F0F9FF", "#FFFFFF", "#BAE6FD", "#0284C7", "#0C4A6E"],
    textColor: "#0C4A6E",
    accentColor: "#0284C7",
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
    colors: ["#FFF1F2", "#FFFFFF", "#FECDD3", "#E11D48", "#4C0519"],
    textColor: "#4C0519",
    accentColor: "#E11D48",
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
    colors: ["#F9FAFB", "#FFFFFF", "#E5E7EB", "#374151", "#111827"],
    textColor: "#111827",
    accentColor: "#374151",
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
    colors: ["#FFF7ED", "#FFFFFF", "#FFEDD5", "#EA580C", "#7C2D12"],
    textColor: "#7C2D12",
    accentColor: "#EA580C",
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
  { id: "classico", label: "Classico Elegante", value: "classico", title: "Classico Elegante", description: "Elenco orario con testo descrittivo" },
  { id: "howitworks", label: "Timeline a Carte con Spillo 3D", value: "howitworks", title: "Timeline a Carte con Spillo 3D", description: "Design moderno con schede orientate" },
  { id: "timeline", label: "Timeline Verticale", value: "timeline", title: "Timeline Verticale", description: "Linea temporale con orari in sequenza" },
  { id: "schede", label: "Schede a Griglia", value: "schede", title: "Schede a Griglia", description: "Riquadri orari affiancati" },
  { id: "minimal", label: "Minimal essenziale", value: "minimal", title: "Minimal essenziale", description: "Testo pulito e lineare" }
];

export const INTRO_START_OPTIONS = [
  { id: "busta", label: "Busta Luxury con Ceralacca 3D", value: "busta", title: "Busta Luxury con Ceralacca 3D" },
  { id: "nuvole", label: "Apertura Nuvole Volumetriche 3D", value: "nuvole", title: "Apertura Nuvole Volumetriche 3D" },
  { id: "expand", label: "Zoom Multimediale allo Scroll", value: "expand", title: "Zoom Multimediale allo Scroll" },
  { id: "lago", label: "Specchio d'Acqua con Effetto Onde WebGL", value: "lago", title: "Specchio d'Acqua con Effetto Onde WebGL" },
  { id: "cosmos", label: "Orizzonte Cosmico 3D (Stars & Nebula)", value: "cosmos", title: "Orizzonte Cosmico 3D (Stars & Nebula)" }
];
export const START_EFFECTS = INTRO_START_OPTIONS;

export const RSVP_STYLES = [
  { id: "classico", label: "Classico Formale (Menu Carne/Pesce + Intolleranze)", value: "classico", title: "Classico Formale" },
  { id: "moderno", label: "Moderno Interattivo (Pulsanti Glow & Counter)", value: "moderno", title: "Moderno Interattivo" },
  { id: "minimal", label: "Minimal Diretto (Senza Riquadri)", value: "minimal", title: "Minimal Diretto" },
  { id: "luxury_gold", label: "Luxury Gold d'Autore (Dettagliato)", value: "luxury_gold", title: "Luxury Gold d'Autore" },
  { id: "bento_chic", label: "Bento Box Chic (Griglia Intolleranze)", value: "bento_chic", title: "Bento Box Chic" },
  { id: "boheme_vintage", label: "Bohémien d'Epoca (Testo Calligrafico)", value: "boheme_vintage", title: "Bohémien d'Epoca" }
];

export const EVENT_THEMES = [
  "Luxury Gold & Total White",
  "Boho Chic & Naturale",
  "Romantico & Pastello",
  "Shabby Chic & Provenzale",
  "Modern Minimal & Antracite",
  "Personalizzato (digita a mano)"
];
export const EVENT_THEME_PRESETS = EVENT_THEMES;

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
  "Personalizzato (digita la tua frase)"
];

export const AUDIO_DEMOS = [
  {
    id: "A",
    title: "Elena & Davide: La Nostra Melodia A",
    label: "Elena & Davide: La Nostra Melodia A",
    url: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3",
    value: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3"
  },
  {
    id: "B",
    title: "Francesca & Luca: Quella Fotografia B",
    label: "Francesca & Luca: Quella Fotografia B",
    url: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3",
    value: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3"
  }
];
export const SOUNDTRACKS = AUDIO_DEMOS;
