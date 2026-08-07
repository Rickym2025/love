import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aqrpkjwywepsfjdkolcr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcHJramd3eXdlcHNmamRrb2xjciIsInJvbGUiOiJhb24iLCJpYXQiOjE3MDk4NTUwMDB9.EXAMPLE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 1. SALVATAGGIO / AGGIORNAMENTO ESPERIENZA MATRIMONIO
export async function saveLoveExperience(data: {
  slug: string;
  couple_names: string;
  wedding_date: string;
  location_name?: string;
  location_address?: string;
  iban?: string;
  modules_config?: any;
  owner_email?: string;
}) {
  try {
    const { data: result, error } = await supabase
      .from("love_experiences")
      .upsert(
        {
          slug: data.slug,
          couple_names: data.couple_names,
          wedding_date: data.wedding_date,
          location_name: data.location_name || "",
          location_address: data.location_address || "",
          iban: data.iban || "",
          modules_config: data.modules_config || {},
          owner_email: data.owner_email || "",
          is_active: true,
        },
        { onConflict: "slug" }
      )
      .select();

    if (error) {
      console.error("Errore salvataggio Supabase experience:", error);
      return { success: false, error };
    }
    return { success: true, data: result };
  } catch (err) {
    console.error("Eccezione Supabase experience:", err);
    return { success: false, error: err };
  }
}

// 2. LETTURA ESPERIENZA MATRIMONIO DA SLUG
export async function fetchLoveExperience(slug: string) {
  try {
    const { data, error } = await supabase
      .from("love_experiences")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

// 3. SALVATAGGIO CONFERMA PARTECIPAZIONE (RSVP)
export async function saveLoveRsvp(rsvp: {
  experience_slug: string;
  guest_name: string;
  attending: boolean;
  guests_count?: number;
  dietary_notes?: string;
  menu_preference?: string;
  song_request?: string;
}) {
  try {
    const { data, error } = await supabase
      .from("love_rsvps")
      .insert([
        {
          experience_slug: rsvp.experience_slug,
          guest_name: rsvp.guest_name,
          attending: rsvp.attending,
          guests_count: rsvp.guests_count || 1,
          dietary_notes: rsvp.dietary_notes || "",
          menu_preference: rsvp.menu_preference || "carne",
          song_request: rsvp.song_request || "",
        },
      ])
      .select();

    if (error) {
      console.error("Errore salvataggio RSVP:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

// 4. LETTURA TUTTI GLI RSVP PER CATERING / EXCEL
export async function fetchLoveRsvps(experience_slug: string) {
  try {
    const { data, error } = await supabase
      .from("love_rsvps")
      .select("*")
      .eq("experience_slug", experience_slug)
      .order("created_at", { ascending: false });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

// 5. SALVATAGGIO FOTO/MESSAGGIO IN GUESTBOOK E PHOTO WALL
export async function saveLoveGuestbookItem(item: {
  experience_slug: string;
  author_name: string;
  message?: string;
  photo_url?: string;
}) {
  try {
    const { data, error } = await supabase
      .from("love_guestbook")
      .insert([
        {
          experience_slug: item.experience_slug,
          author_name: item.author_name,
          message: item.message || "",
          photo_url: item.photo_url || "",
        },
      ])
      .select();

    if (error) {
      console.error("Errore salvataggio Guestbook:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

// 6. LETTURA TUTTE LE FOTO DELLA FESTA DALLA TABELLA GUESTBOOK
export async function fetchLoveGuestbookItems(experience_slug: string) {
  try {
    const { data, error } = await supabase
      .from("love_guestbook")
      .select("*")
      .eq("experience_slug", experience_slug)
      .order("created_at", { ascending: false });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
