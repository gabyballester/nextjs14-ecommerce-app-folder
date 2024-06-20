import { prismadb } from "@/prisma/prisma.client";
import { Billboard } from "@prisma/client";

export async function findBillboardById({
  billboardId,
}: {
  billboardId: string;
}): Promise<Billboard | null> {
  if (!billboardId) {
    throw new Error("Billboard id must be provided");
  }

  return await prismadb.billboard.findUnique({
    where: { id: billboardId },
  });
}

export async function findManyBillboards(): Promise<Billboard[]> {
  return (await prismadb.billboard.findMany()) || [];
}

export async function findBillboardsByStoreId({
  storeId,
  order,
}: {
  storeId: string;
  order: "asc" | "desc";
}): Promise<Billboard[]> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.billboard.findMany({
    where: { storeId },
    orderBy: {
      createdAt: order,
    },
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
