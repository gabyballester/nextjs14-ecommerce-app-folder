import { findBillboardsByStoreId } from "@/services";
import { mapBillboardToColumn } from "@/mappers";
import { BillboardClient } from "./components/billboard-client";
import { BillboardColumn } from "./components/table";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await findBillboardsByStoreId({
    storeId: params.storeId,
    order: "desc",
  });

  const formattedBillboards: BillboardColumn[] =
    billboards.map(mapBillboardToColumn);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-6 pt-5">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
