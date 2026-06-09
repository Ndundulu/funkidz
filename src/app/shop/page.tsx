import { createClient } from "@/lib/supabase/server";
import SubCategoryContent from "@/app/beds/[filter]/SubCategoryContent";

export default async function ShopAllPage() {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select("*");

    if (error) {
        return <div className="p-12 text-center text-red-500">Error loading catalog.</div>;
    }

    return (
        <SubCategoryContent
            initialProducts={products || []}
            overrideTitle="Shop All Products"
        />
    );
}