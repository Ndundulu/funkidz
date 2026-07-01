// app/search/page.tsx
import SubCategoryContent from "@/app/display/SubCategoryContent";
import {createClient} from "@/lib/supabase/client";

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedParams = await searchParams;
    const query = resolvedParams.q || "";

    const supabase = createClient();
    let matchedProducts: any[] = [];

    if (query.trim()) {
        const { data, error } = await supabase
            .from("products")
            .select("id, name, price, original_price, image, category, slug, description, stock")
            .ilike("name", `%${query}%`);

        if (!error && data) {
            matchedProducts = data;
        }
    }

    return (
        <SubCategoryContent
            initialProducts={matchedProducts}
            overrideTitle={`Search Results for: "${query}"`}
        />
    );
}