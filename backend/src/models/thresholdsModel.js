import { supabase } from "../config/supabaseClient.js";

const TABLE = "threshold_settings";

/**
 * Mengubah value dari string → number
 */
function normalize(row) {
  if (!row) return row;
  return {
    ...row,
    value: row.value === null ? null : Number(row.value),
  };
}

export const ThresholdsModel = {
  /**
   * Ambil list semua threshold (max 100)
   */
  async list() {
    const { data, error } = await supabase
      .from(TABLE)
      .select("id, value, note, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;
    return data.map(normalize);
  },

  /**
   * Ambil threshold terbaru
   */
  async latest() {
    const { data, error } = await supabase
      .from(TABLE)
      .select("id, value, note, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return normalize(data);
  },

  /**
   * Buat threshold baru
   */
  async create(payload) {
    const { value, note } = payload;

    if (typeof value !== "number") {
      throw new Error("value must be a number");
    }

    const row = {
      value,
      note: note?.slice(0, 180) ?? null, // batasi note agar tidak terlalu panjang
    };

    const { data, error } = await supabase
      .from(TABLE)
      .insert(row)
      .select("id, value, note, created_at")
      .single();

    if (error) throw error;
    return normalize(data);
  },
};
