import { findBillboardsByStoreId } from "@/services";
import { BillboardClient } from "./components/billboard-client";
import { mapBillboardToColumn } from "@/mappers";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await findBillboardsByStoreId({
    storeId: params.storeId,
  });

  const formattedBillboards = billboards.map(mapBillboardToColumn);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-6 pt-5">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
