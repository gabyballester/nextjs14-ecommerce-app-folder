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
