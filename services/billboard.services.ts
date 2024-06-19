import { prismadb } from "@/prisma/prisma.client";
import { Billboard } from "@prisma/client";

export async function findBillboardById({
  billBoardId,
}: {
  billBoardId: string;
}): Promise<Billboard | null> {
  if (!billBoardId) {
    throw new Error("Billboard id must be provided");
  }

  return await prismadb.billboard.findUnique({
    where: { id: billBoardId },
  });
}

export async function findBillboardsByStoreId({
  storeId,
}: {
  storeId: string;
}): Promise<Billboard[]> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.billboard.findMany({
    where: { storeId },
  });
}

export async function createBillboard({
  storeId,
  data,
}: {
  storeId: string;
  data: { label: string; imageUrl: string };
}): Promise<Billboard> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.billboard.create({
    data: { ...data, storeId },
  });
}

export async function updateBillboard({
  billboardId,
  data,
}: {
  billboardId: string;
  data: { label: string; imageUrl: string };
}): Promise<Billboard> {
  if (!billboardId) {
    throw new Error("Billboard id must be provided");
  }

  return await prismadb.billboard.update({
    where: { id: billboardId },
    data,
  });
}

export async function deleteBillboard({
  billboardId,
}: {
  billboardId: string;
}): Promise<Billboard> {
  if (!billboardId) {
    throw new Error("Billboard id must be provided");
  }

  return await prismadb.billboard.delete({
    where: { id: billboardId },
  });
}
