import { createClient } from "@/lib/supabase/server";
import SubCategoryContent from "../beds/[filter]/SubCategoryContent";

interface PageProps {
    searchParams: Promise<{ filter?: string }>;
}

export default async function CribsPage({ searchParams }: PageProps) {
    const { filter } = await searchParams;
    const supabase = await createClient();

    // Fetch only crib products
    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .in("category", ["Convertible Crib", "Standard Crib"]);

    if (error) {
        return <div className="p-12 text-center text-red-500">Error loading cribs.</div>;
    }

    // Updated filter mapping to match your actual database values
    const filterMap: Record<string, string> = {
        "convertible": "Convertible Crib",
        "convertable": "Convertible Crib",        // handle misspelling
        "conversion-kits": "Convertible Crib",
        "standard": "Standard Crib",
        "Standard": "Standard Crib",
    };

    const activeCategory = filter
        ? filterMap[filter.toLowerCase()]
        : null;

    const safeProducts = products || [];

    const displayedProducts = activeCategory
        ? safeProducts.filter((p) => p.category === activeCategory)
        : safeProducts;

    return (
        <SubCategoryContent
            initialProducts={displayedProducts}
            overrideTitle={
                activeCategory
                    ? activeCategory.replace(" Crib", " Cribs")
                    : "Shop All Cribs"
            }
        />
    );
}