import { createClient } from "@/lib/supabase/server";
import SubCategoryContent from "@/app/beds/[filter]/SubCategoryContent";

interface PageProps {
    params: Promise<{ category?: string[] }>;
}

export default async function ShopAllPage({ params }: PageProps) {
    const supabase = await createClient();
    const resolvedParams = await params;

    // Catch-all parameters come back as an array. e.g., ["home"]
    const categorySlug = resolvedParams.category?.[0];

    // 1. Base query for all items
    let query = supabase.from("products").select("*");
    let pageTitle = "Shop All Products";

    // 2. Conditionally apply filter if a category is present in the URL path
    if (categorySlug) {
        query = query.ilike("category", categorySlug);

        // Capitalize the slug cleanly for display (e.g., "home" -> "Home")
        const capitalizedCategory = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
        pageTitle = `Shop All ${capitalizedCategory}`;
    }

    const { data: products, error } = await query;

    if (error) {
        return <div className="p-12 text-center text-red-500">Error loading catalog.</div>;
    }

    return (
        <SubCategoryContent
            initialProducts={products || []}
            overrideTitle={pageTitle}
        />
    );
}