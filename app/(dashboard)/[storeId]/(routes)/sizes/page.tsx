import { findSizesByStoreId } from "@/services";
import { mapSizeToColumn } from "@/mappers";
import { SizeClient } from "./components/size-client";
import { SizeColumn } from "./components/table";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await findSizesByStoreId({
    storeId: params.storeId,
    order: "desc",
  });

  const formattedSizes: SizeColumn[] = sizes.map(mapSizeToColumn);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-6 pt-5">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
