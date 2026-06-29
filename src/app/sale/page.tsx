import { createClient } from "@/lib/supabase/server";
import SubCategoryContent from "@/app/display/SubCategoryContent";

export default async function SalePage() {
    const supabase = await createClient();

    // Query elements explicitly flagged as sale inventory
    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_on_sale", true);

    if (error) return <div className="p-12 text-center text-red-500">Error loading sale items.</div>;

    return (
        <SubCategoryContent
            initialProducts={products || []}
            overrideTitle="Exclusive Offers & Sale"
        />
    );
}