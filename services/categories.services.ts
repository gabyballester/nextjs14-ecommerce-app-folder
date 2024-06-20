import { prismadb } from "@/prisma/prisma.client";
import { CategoryIncludingBillboard } from "@/types";
import { Category } from "@prisma/client";

export async function findCategorydById({
  categoryId,
}: {
  categoryId: string;
}): Promise<Category | null> {
  if (!categoryId) {
    throw new Error("Category id must be provided");
  }

  return await prismadb.category.findUnique({
    where: { id: categoryId },
  });
}

export async function findCategoriesByStoreId({
  storeId,
  order,
}: {
  storeId: string;
  order: "asc" | "desc";
}): Promise<Category[]> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.category.findMany({
    where: { storeId },
    orderBy: {
      createdAt: order,
    },
  });
}

export async function findCategoriesByStoreIdIncludingBillboard({
  storeId,
  order,
}: {
  storeId: string;
  order: "asc" | "desc";
}): Promise<CategoryIncludingBillboard[]> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.category.findMany({
    where: { storeId },
    include: { billboard: true },
    orderBy: {
      createdAt: order,
    },
  });
}

export async function createCategory({
  storeId,
  data,
}: {
  storeId: string;
  data: { name: string; billboardId: string };
}): Promise<Category> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.category.create({
    data: { ...data, storeId },
  });
}

export async function updateCategory({
  categoryId,
  data,
}: {
  categoryId: string;
  data: { name: string; billboardId: string };
}): Promise<Category> {
  if (!categoryId) {
    throw new Error("Billboard id must be provided");
  }

  return await prismadb.category.update({
    where: { id: categoryId },
    data,
  });
}

export async function deleteCategory({
  categoryId,
}: {
  categoryId: string;
}): Promise<Category> {
  if (!categoryId) {
    throw new Error("Billboard id must be provided");
  }

  return await prismadb.category.delete({
    where: { id: categoryId },
  });
}
