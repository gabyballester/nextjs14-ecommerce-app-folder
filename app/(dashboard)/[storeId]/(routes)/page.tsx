import { FC } from "react";
import { findStoreByStoreOrUserId } from "@/services/store";

interface Props {
  params: { storeId: string };
}

const DashboardPage: FC<Props> = async ({ params }) => {
  const store = await findStoreByStoreOrUserId({ storeId: params.storeId });

  return <div>Active store: {store?.name}</div>;
};

export default DashboardPage;
