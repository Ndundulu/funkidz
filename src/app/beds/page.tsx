import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import SubCategoryContent from "@/app/beds/[filter]/SubCategoryContent";

interface SubCategoryPageProps {
    params: Promise<{ filter: string }>;
}

export default async function BedSubCategoryPage({ params }: SubCategoryPageProps) {
    const resolvedParams = await params;
    const currentFilter = resolvedParams.filter.toLowerCase();

    // Verify filter parameters against database keys
    const validFilters = ["toddler", "twin", "bunk", "junior"];
    if (!validFilters.includes(currentFilter)) {
        notFound();
    }

    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "Beds")
        .eq("filter_slug", currentFilter)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase dynamic category filter fetching error:", error);
    }

    // Configure display headers
    const titleMapping: Record<string, string> = {
        toddler: "Toddler Beds",
        twin: "Kids & Teen Beds",
        bunk: "Bunk & Loft Beds",
        junior: "Junior Beds",
    };

    return (
        <SubCategoryContent
            initialProducts={products || []}
            overrideTitle={titleMapping[currentFilter]}
        />
    );
}