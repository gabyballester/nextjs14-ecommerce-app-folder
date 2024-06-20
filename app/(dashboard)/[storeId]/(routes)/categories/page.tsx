import { findCategoriesByStoreIdIncludingBillboard } from "@/services";
import { CategoriesClient } from "./components/categories-client";
import { mapCategoryToColumn } from "@/mappers";
import { CategoryColumn } from "./components/table";
import { CategoryIncludingBillboard } from "@/types";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories: CategoryIncludingBillboard[] =
    await findCategoriesByStoreIdIncludingBillboard({
      storeId: params.storeId,
      order: "desc",
    });

  const formattedCategories: CategoryColumn[] =
    categories.map(mapCategoryToColumn);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-6 pt-5">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
