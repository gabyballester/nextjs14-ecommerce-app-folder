import { findProductsByStoreId } from "@/services";
import { ProductClient } from "./components/product-client";
import { ProductColumn } from "./components/table";
import { mapProductToColumn } from "@/mappers";

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await findProductsByStoreId({
    storeId: params.storeId,
    order: "desc",
  });

  const formattedProducts: ProductColumn[] = products.map(mapProductToColumn);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-6 pt-5">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
