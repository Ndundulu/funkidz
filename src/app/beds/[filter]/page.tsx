import { createClient } from "@/lib/supabase/server";
import SubCategoryContent from "./SubCategoryContent";

interface PageProps {
    params: Promise<{ filter: string }>;
}

export default async function SubCategoryPage({ params }: PageProps) {
    const { filter } = await params;
    const supabase = await createClient();

    const filterMap: Record<string, string> = {
        "toddler": "Toddler Beds",
        "twin": "Kids and Teen Beds",
        "bunk": "Bunk & Loft Beds",
    };

    const dbCategoryValue = filterMap[filter] || filter;

    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", dbCategoryValue);

    if (error) return <div className="p-12 text-center text-red-500">Error loading products.</div>;

    // Return ONLY the client component directly. Let it handle its own full-width layout wrappers!
    return (
        <SubCategoryContent
            initialProducts={products || []}
            overrideTitle={dbCategoryValue}
        />
    );
}