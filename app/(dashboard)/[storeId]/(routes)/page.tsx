import { prismadb } from "@/prisma/prisma.client";
import React, { FC } from "react";

interface Props {
  params: { storeId: string };
}

const DashboardPage: FC<Props> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId },
  });

  return <div>Active store: {store?.name}</div>;
};

export default DashboardPage;
