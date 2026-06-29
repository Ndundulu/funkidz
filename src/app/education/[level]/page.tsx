import { getProducts } from "@/lib/domain/resolvers";
import SubCategoryContent from "@/app/display/SubCategoryContent";

interface PageProps {
    params: { level: string };
}

export default async function Page({ params }: PageProps) {
    const { level } = params;

    const { products, error } = await getProducts(
        "education",
        "levels",
        level
    );

    if (error) {
        return <div>Coming soon</div>;
    }

    // simple UI title fallback (since backend doesn't return title)
    const overrideTitle =
        level.charAt(0).toUpperCase() + level.slice(1);

    return (
        <SubCategoryContent
            initialProducts={products}
            overrideTitle={overrideTitle}
        />
    );
}