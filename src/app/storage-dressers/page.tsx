import { createClient } from "@/lib/supabase/server";
import SubCategoryContent from "@/app/display/SubCategoryContent";

interface PageProps {
    searchParams: Promise<{ filter?: string }>;
}

export default async function StorageDressersPage({ searchParams }: PageProps) {
    const { filter } = await searchParams;
    const supabase = await createClient();

    // 1. Fetch all items matching the category 'Storage' from your database
    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "Storage");

    if (error) return <div className="p-12 text-center text-red-500">Error loading storage catalog.</div>;

    const safeProducts = products || [];
    let displayedProducts = safeProducts;
    let titleOverride = "Dressers & Storage";

    // 2. Filter dynamically by product slug keywords based on url parameters
    if (filter) {
        if (filter === "shelf") {
            displayedProducts = safeProducts.filter(p => p.slug?.includes("shelf"));
            titleOverride = "Shelves & Organizers";
        } else if (filter === "change") {
            displayedProducts = safeProducts.filter(p => p.slug?.includes("change"));
            titleOverride = "Changing Units";
        } else if (filter === "chest") {
            displayedProducts = safeProducts.filter(p => p.slug?.includes("chest"));
            titleOverride = "Chest of Drawers";
        } else if (filter === "toy") {
            displayedProducts = safeProducts.filter(p => p.slug?.includes("toy") || p.slug?.includes("puzzle"));
            titleOverride = "Toy Storage";
        } else if (filter === "wardrobe") {
            displayedProducts = safeProducts.filter(p => p.slug?.includes("wardrobe"));
            titleOverride = "Wardrobes";
        }
    }

    return (
        <SubCategoryContent
            initialProducts={displayedProducts}
            overrideTitle={titleOverride}
        />
    );
}