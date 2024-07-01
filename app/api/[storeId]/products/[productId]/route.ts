import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { handleError } from "@/lib";

import type { Product } from "@prisma/client";
import {
  deleteProduct,
  findProductById,
  getStoreByStoreIdAndOrUserId,
} from "@/services";
import { prismadb } from "@/prisma/prisma.client";

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X GET http://localhost:3000/api/storeId/products/productId
 */
export async function GET(
  _req: Request,
  { params }: { params: { productId: string } },
): Promise<NextResponse<Product>> {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await findProductById({
      productId: params.productId,
    });

    if (!product) {
      return new NextResponse("Product not updated", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X PATCH http://localhost:3000/api/storeId/products/productId
 */
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
): Promise<NextResponse<Product>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

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

    const storeByStoreIdAndUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByStoreIdAndUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await prismadb.product.update({
      where: { id: params.productId },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product: Product = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: images.map((image: { url: string }) => ({ url: image.url })),
          },
        },
      },
    });

    if (!product) {
      return new NextResponse("Product not updated", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_UPDATE]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X DELETE http://localhost:3000/api/storeId/products/productId
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } },
): Promise<NextResponse<Product>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByStoreIdAndUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByStoreIdAndUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product: Product = await deleteProduct({
      productId: params.productId,
    });

    if (!product) {
      return new NextResponse("Product not updated", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return handleError(error);
  }
}
