import BillBoardForm from "./components/billboard-form";
import { findBillboardById } from "@/services";

const CreateBillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await findBillboardById({
    billBoardId: params.billboardId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard} />{" "}
      </div>
    </div>
  );
};

export default CreateBillboardPage;
