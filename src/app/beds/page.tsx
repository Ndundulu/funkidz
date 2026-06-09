import { createClient } from "@/lib/supabase/server";
import BedsPageContent from "./BedsPageContent";

export default async function BedsPage() {
    const supabase = await createClient();

    // Fetch all products that belong to any of the bed variations
    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .in("category", ["Toddler Beds", "Kids and Teen Beds", "Bunk & Loft Beds"]);

    if (error) return <div className="p-12 text-center text-red-500">Error loading beds catalog.</div>;

    return (
        <BedsPageContent initialProducts={products || []} />
    );
}