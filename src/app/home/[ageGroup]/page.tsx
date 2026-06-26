import { getProducts } from "@/lib/domain/resolvers";
import SubCategoryContent from "@/app/beds/[filter]/SubCategoryContent";

interface PageProps {
    params: Promise<{ ageGroup: string }>;
}

export default async function Page({ params }: PageProps) {
    const { ageGroup } = await params;

    const { products, title, error } = await getProducts(
        "home",
        "ageGroups",
        ageGroup
    );

    if (error) {
        return <div>Error loading products</div>;
    }

    return (
        <SubCategoryContent
            initialProducts={products}
            overrideTitle={title}
        />
    );
}