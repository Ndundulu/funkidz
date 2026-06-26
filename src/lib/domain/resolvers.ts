import { createClient } from "@/lib/supabase/server";
import { domains } from "./categories";

export async function getProducts(
    domain: keyof typeof domains,
    key: string,
    value: string
) {
    const supabase = await createClient();

    // 1. Cast the specific domain object to a flexible nested Record type
    const domainConfig = domains[domain] as Record<string, Record<string, any>>;

    // 2. Safe dynamic lookup using optional chaining
    const config = domainConfig?.[key]?.[value];

    // 3. Fallback if the key/value combination doesn't exist
    if (!config) {
        return {
            error: "Invalid filter",
            products: [],
        };
    }

    let query = supabase
        .from("products")
        .select("*")
        .eq("domain", config.db);

    // Apply category/filter if it exists
    if (config.category) {
        query = query.eq("category", config.category);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Supabase error:", error);
        return {
            error: error.message,
            products: [],
        };
    }

    return {
        error: null,
        products: data ?? [],
    };
}