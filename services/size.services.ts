import { prismadb } from "@/prisma/prisma.client";
import { Size } from "@prisma/client";

export async function findSizeById({
  sizeId,
}: {
  sizeId: string;
}): Promise<Size | null> {
  if (!sizeId) {
    throw new Error("Size id must be provided");
  }

  return await prismadb.size.findUnique({
    where: { id: sizeId },
  });
}

export async function findManySizes(): Promise<Size[]> {
  return (await prismadb.size.findMany()) || [];
}

export async function findSizesByStoreId({
  storeId,
  order,
}: {
  storeId: string;
  order: "asc" | "desc";
}): Promise<Size[]> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.size.findMany({
    where: { storeId },
    orderBy: {
      createdAt: order,
    },
  });
}

export async function createSize({
  storeId,
  data,
}: {
  storeId: string;
  data: { name: string; value: string };
}): Promise<Size> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.size.create({
    data: { ...data, storeId },
  });
}

export async function updateSize({
  sizeId,
  data,
}: {
  sizeId: string;
  data: { name: string; value: string };
}): Promise<Size> {
  if (!sizeId) {
    throw new Error("Size id must be provided");
  }

  return await prismadb.size.update({
    where: { id: sizeId },
    data,
  });
}

export async function deleteSize({
  sizeId,
}: {
  sizeId: string;
}): Promise<Size> {
  if (!sizeId) {
    throw new Error("Size id must be provided");
  }

  return await prismadb.size.delete({
    where: { id: sizeId },
  });
}
