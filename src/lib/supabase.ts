import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

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

    if (error) return { success: false, error };
    return { success: true, data: result };
  } catch (err) {
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

    if (error) return { success: false, error };
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
  table_name?: string;
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
          table_name: rsvp.table_name || "Da Assegnare",
        },
      ])
      .select();

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

// 4. LETTURA TUTTI GLI RSVP
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

// 5. ASSEGNAZIONE INVITATO AD UN TAVOLO
export async function updateGuestTable(rsvpId: string, tableName: string) {
  try {
    const { data, error } = await supabase
      .from("love_rsvps")
      .update({ table_name: tableName })
      .eq("id", rsvpId)
      .select();

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

// 6. GESTIONE TABELLA TAVOLI (TABLEAU DE MARIAGE)
export async function fetchLoveTables(experience_slug: string) {
  try {
    const { data, error } = await supabase
      .from("love_tables")
      .select("*")
      .eq("experience_slug", experience_slug)
      .order("created_at", { ascending: true });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function addLoveTable(experience_slug: string, tableName: string, capacity: number = 8) {
  try {
    const { data, error } = await supabase
      .from("love_tables")
      .insert([{ experience_slug, table_name: tableName, seats_capacity: capacity }])
      .select();

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function deleteLoveTable(tableId: string) {
  try {
    const { error } = await supabase.from("love_tables").delete().eq("id", tableId);
    if (error) return { success: false, error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

// 7. GESTIONE BUDGET PLANNER FORNITORI
export async function fetchLoveBudgets(experience_slug: string) {
  try {
    const { data, error } = await supabase
      .from("love_budgets")
      .select("*")
      .eq("experience_slug", experience_slug)
      .order("created_at", { ascending: true });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function addLoveBudgetItem(item: {
  experience_slug: string;
  category: string;
  supplier_name: string;
  estimated_cost: number;
  actual_cost: number;
  is_paid: boolean;
}) {
  try {
    const { data, error } = await supabase
      .from("love_budgets")
      .insert([item])
      .select();

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function deleteLoveBudgetItem(itemId: string) {
  try {
    const { error } = await supabase.from("love_budgets").delete().eq("id", itemId);
    if (error) return { success: false, error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

// 8. SALVATAGGIO FOTO/MESSAGGIO IN GUESTBOOK
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

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

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
