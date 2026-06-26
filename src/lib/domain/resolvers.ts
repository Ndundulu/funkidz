import { createClient } from "@/lib/supabase/server";
import { domains } from "./categories";

export async function getProducts(domain: string, key: string, value: string) {
    const supabase = await createClient();

    const config =
        domains[domain as keyof typeof domains]?.[key]?.[value];

    if (!config) return { error: "Invalid filter", products: [] };

    let query = supabase
        .from("products")
        .select("*")
        .eq("category", config.db);

    if (key === "ageGroups") {
        // Change .cs() to .contains()
        query = query.contains("sub_category", [value.toLowerCase()]);
    }

    const { data, error } = await query;

    return {
        error,
        products: data || [],
        title: config.label,
    };
}