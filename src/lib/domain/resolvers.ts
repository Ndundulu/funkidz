import { createClient } from "@/lib/supabase/server";
import { domains } from "./categories";

export async function getProducts(
    domain: keyof typeof domains,
    key: string,
    value: string
) {
    const supabase = await createClient();

    const domainConfig = domains[domain];

    // Type-safe way to access nested config
    const config = domainConfig && typeof domainConfig === "object"
        ? (domainConfig as Record<string, any>)[key]?.[value]
        : undefined;

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