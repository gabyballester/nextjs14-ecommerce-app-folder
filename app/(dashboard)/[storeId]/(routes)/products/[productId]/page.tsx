import ProductForm from "./components/product-form";
import {
  findCategoriesByStoreId,
  findColorsByStoreId,
  findProductById,
  findSizesByStoreId,
} from "@/services";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await findProductById({
    productId: params.productId,
  });

  const categories = await findCategoriesByStoreId({
    storeId: params.storeId,
    order: "desc",
  });

  const sizes = await findSizesByStoreId({
    storeId: params.storeId,
    order: "desc",
  });

  const colors = await findColorsByStoreId({
    storeId: params.storeId,
    order: "desc",
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
