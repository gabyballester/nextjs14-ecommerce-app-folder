import { FC } from "react";
import { getStoreByStoreIdAndOrUserId } from "@/services";

interface Props {
  params: { storeId: string };
}

const DashboardPage: FC<Props> = async ({ params }) => {
  const store = await getStoreByStoreIdAndOrUserId({
    storeId: params.storeId,
  });

  return <div>Active store: {store?.name}</div>;
};

export default DashboardPage;
