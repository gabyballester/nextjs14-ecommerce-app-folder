import { prismadb } from "@/prisma/prisma.client";
import { Color } from "@prisma/client";

export async function findColorById({
  colorId,
}: {
  colorId: string;
}): Promise<Color | null> {
  if (!colorId) {
    throw new Error("Color id must be provided");
  }

  return await prismadb.color.findUnique({
    where: { id: colorId },
  });
}

export async function findManyColors(): Promise<Color[]> {
  return (await prismadb.color.findMany()) || [];
}

export async function findColorsByStoreId({
  storeId,
  order,
}: {
  storeId: string;
  order: "asc" | "desc";
}): Promise<Color[]> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.color.findMany({
    where: { storeId },
    orderBy: {
      createdAt: order,
    },
  });
}

export async function createColor({
  storeId,
  data,
}: {
  storeId: string;
  data: { name: string; value: string };
}): Promise<Color> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.color.create({
    data: { ...data, storeId },
  });
}

export async function updateColor({
  colorId,
  data,
}: {
  colorId: string;
  data: { name: string; value: string };
}): Promise<Color> {
  if (!colorId) {
    throw new Error("Color id must be provided");
  }

  return await prismadb.color.update({
    where: { id: colorId },
    data,
  });
}

export async function deleteColor({
  colorId,
}: {
  colorId: string;
}): Promise<Color> {
  if (!colorId) {
    throw new Error("Color id must be provided");
  }

  return await prismadb.color.delete({
    where: { id: colorId },
  });
}
