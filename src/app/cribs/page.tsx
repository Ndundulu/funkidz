import { createClient } from "@/lib/supabase/server";
import SubCategoryContent from "../beds/[filter]/SubCategoryContent";

export default async function CribsPage() {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .ilike("category", "%crib%"); // Dynamically pulls anything matching Cribs

    if (error) return <div className="p-12 text-center text-red-500">Error loading cribs.</div>;

    return (
        <SubCategoryContent
            initialProducts={products || []}
            overrideTitle="Shop All Cribs"
        />
    );
}