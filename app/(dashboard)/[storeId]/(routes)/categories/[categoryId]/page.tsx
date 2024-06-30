import CategoryForm from "./components/category-form";
import { findBillboardsByStoreId, findCategorydById } from "@/services";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await findCategorydById({
    categoryId: params.categoryId,
  });

  const billboards = await findBillboardsByStoreId({
    storeId: params.storeId,
    order: "asc",
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
