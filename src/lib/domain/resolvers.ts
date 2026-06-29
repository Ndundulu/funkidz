import { createClient } from "@/lib/supabase/server";
import { domains } from "./categories";

type DomainKey = keyof typeof domains;
type InnerConfig = (typeof domains)[DomainKey];
type InnerKey = keyof InnerConfig;

type ConfigValue = {
    label: string;
    db: string;
};

export async function getProducts(domain: string, key: string, value: string) {
    const supabase = await createClient();

    const domainConfig = domains[domain as DomainKey];
    const config = domainConfig?.[key as InnerKey]?.[value as any] as ConfigValue | undefined;

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