import { findCategoriesByStoreIdIncludingBillboard } from "@/services";
import { CategoryClient } from "./components/category-client";
import { mapCategoryToColumn } from "@/mappers";
import { CategoryColumn } from "./components/table";
import { CategoryExtended } from "@/types";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories: CategoryExtended[] =
    await findCategoriesByStoreIdIncludingBillboard({
      storeId: params.storeId,
      order: "desc",
    });

  const formattedCategories: CategoryColumn[] =
    categories.map(mapCategoryToColumn);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-6 pt-5">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
