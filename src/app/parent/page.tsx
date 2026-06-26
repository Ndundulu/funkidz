import { getProducts } from "@/lib/domain/resolvers";
import SubCategoryContent from "@/app/beds/[filter]/SubCategoryContent";

interface PageProps {
    params: Promise<{ level: string }>;
}

export default async function Page({ params }: PageProps) {
    const { level } = await params;

    const { products, title, error } = await getProducts(
        "education",
        "levels",
        level
    );

    if (error) {
        return <div>Coming soon.</div>;
    }

    return (
        <SubCategoryContent
            initialProducts={products}
            overrideTitle={title}
        />
    );
}