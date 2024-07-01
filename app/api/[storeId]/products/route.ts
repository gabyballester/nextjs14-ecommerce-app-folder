import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import type { Product } from "@prisma/client";
import { getStoreByStoreIdAndOrUserId } from "@/services";
import { handleError } from "@/lib";
import { prismadb } from "@/prisma/prisma.client";

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/products
 */
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params?.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = await req.json();

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!price) return new NextResponse("Price is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("Category id is required", { status: 400 });
    if (!colorId)
      return new NextResponse("Color id is required", { status: 400 });
    if (!sizeId)
      return new NextResponse("Size id is required", { status: 400 });
    if (!images || !images.length)
      return new NextResponse("Images are required", { status: 400 });

    const storeByUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = prismadb.product.create({
      data: {
        name,
        price: price.toString(),
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => ({ url: image.url })),
          },
        },
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return handleError(error);
  }
}

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/products
 */
export async function GET(req: Request): Promise<NextResponse<Product[]>> {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    const products = await prismadb.product.findMany({
      where: {
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return handleError(error);
  }
}
