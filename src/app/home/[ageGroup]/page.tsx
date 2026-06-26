import { getProducts } from "@/lib/domain/resolvers";
import SubCategoryContent from "@/app/beds/[filter]/SubCategoryContent";

interface PageProps {
    params: { ageGroup: string };
}

export default async function Page({ params }: PageProps) {
    const { ageGroup } = params;

    const { products, error } = await getProducts(
        "home",
        "ageGroups",
        ageGroup
    );

    if (error) {
        return <div>Error loading products</div>;
    }

    // fallback title (since backend does not provide it)
    const overrideTitle =
        ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1);

    return (
        <SubCategoryContent
            initialProducts={products}
            overrideTitle={overrideTitle}
        />
    );
}