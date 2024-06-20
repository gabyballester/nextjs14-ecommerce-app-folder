import { prismadb } from "@/prisma/prisma.client";
import { Store } from "@prisma/client";

export async function getStoreByStoreIdAndOrUserId({
  storeId,
  userId,
}: {
  storeId?: string;
  userId?: string;
}): Promise<Store | null> {
  if (!storeId && !userId) {
    throw new Error("At least one of storeId or userId must be provided");
  }

  const whereClause: { id?: string; userId?: string } = {};
  if (storeId) whereClause.id = storeId;
  if (userId) whereClause.userId = userId;

  return await prismadb.store.findFirst({
    where: whereClause,
  });
}

export async function getStoresByUserId(userId: string) {
  return await prismadb.store.findMany({ where: { userId } });
}

export async function getStores() {
  return await prismadb.store.findMany();
}

export async function createStore({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
  return await prismadb.store.create({
    data: { name, userId },
  });
}

export async function findStoreByStoreIdUserId({
  storeId,
  userId,
}: {
  storeId: string;
  userId: string;
}) {
  return prismadb.store.findUnique({
    where: { id: storeId, userId },
  });
}

export async function updateStore({
  storeId,
  userId,
  data,
}: {
  storeId: string;
  userId: string;
  data: Partial<Store>;
}) {
  return await prismadb.store.update({
    where: { id: storeId, userId },
    data,
  });
}

export async function deleteStore({
  storeId,
  userId,
}: {
  storeId: string;
  userId: string;
}) {
  return prismadb.store.delete({
    where: { id: storeId, userId },
  });
}
