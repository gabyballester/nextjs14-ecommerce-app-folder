import { findColorsByStoreId } from "@/services";
import { mapColorToColumn } from "@/mappers";
import { ColorClient } from "./components/color-client";
import { ColorColumn } from "./components/table";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await findColorsByStoreId({
    storeId: params.storeId,
    order: "desc",
  });

  const formattedColors: ColorColumn[] = colors.map(mapColorToColumn);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-6 pt-5">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
