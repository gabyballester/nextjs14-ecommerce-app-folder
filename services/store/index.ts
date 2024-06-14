import { prismadb } from "@/prisma/prisma.client";

export async function findStoreByStoreOrUserId({
  storeId,
  userId,
}: {
  storeId?: string;
  userId?: string;
}) {
  try {
    if (!storeId && !userId) {
      throw new Error("At least one of storeId or userId must be provided");
    }

    const whereClause: { id?: string; userId?: string } = {};
    if (storeId) whereClause.id = storeId;
    if (userId) whereClause.userId = userId;

    const store = await prismadb.store.findFirst({
      where: whereClause,
    });
    return store;
  } catch (error) {
    console.error("[FIND_STORE]", error);
    return null;
  }
}

export async function getStoresByUserId(userId: string) {
  return await prismadb.store.findMany({ where: { userId } });
}
