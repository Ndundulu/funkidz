import { createClient } from "@/lib/supabase/server";
import SubCategoryContent from "../beds/[filter]/SubCategoryContent";

export default async function DressersStoragePage() {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .in("category", ["Dressers", "Bookcases", "Toy Boxes", "Storage"]); // Matches your exact database strings

    if (error) return <div className="p-12 text-center text-red-500">Error loading storage catalog.</div>;

    return (
        <SubCategoryContent
            initialProducts={products || []}
            overrideTitle="Dressers & Storage"
        />
    );
}