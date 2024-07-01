import { prismadb } from "@/prisma/prisma.client";
import { ProductWithCategoryColorSize, ProductWithImages } from "@/types";
import { Product } from "@prisma/client";

export async function findProductById({
  productId,
}: {
  productId: string;
}): Promise<ProductWithImages | null> {
  if (!productId) {
    throw new Error("Product id must be provided");
  }

  return await prismadb.product.findUnique({
    where: { id: productId },
    include: { images: true, category: true, size: true, color: true },
  });
}

export async function findManyProducts(): Promise<Product[]> {
  return (await prismadb.product.findMany()) || [];
}

export async function findProductsByStoreId({
  storeId,
  order,
}: {
  storeId: string;
  order: "asc" | "desc";
}): Promise<ProductWithCategoryColorSize[]> {
  if (!storeId) {
    throw new Error("Store id must be provided");
  }

  return await prismadb.product.findMany({
    where: { storeId },
    include: { category: true, size: true, color: true },
    orderBy: {
      createdAt: order,
    },
  });
}

export async function deleteProduct({
  productId,
}: {
  productId: string;
}): Promise<Product> {
  if (!productId) {
    throw new Error("Product id must be provided");
  }

  return await prismadb.product.delete({
    where: { id: productId },
  });
}
