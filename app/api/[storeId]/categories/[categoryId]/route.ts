import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { handleError } from "@/lib";

import type { Category } from "@prisma/client";
import {
  deleteCategory,
  findCategorydById,
  getStoreByStoreIdAndOrUserId,
  updateCategory,
} from "@/services";

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X GET http://localhost:3000/api/storeId/categories/categoryId
 */
export async function GET(
  _req: Request,
  { params }: { params: { categoryId: string } },
): Promise<NextResponse<Category>> {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await findCategorydById({
      categoryId: params.categoryId,
    });

    if (!category) {
      return new NextResponse("Category not updated", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X PATCH http://localhost:3000/api/storeId/categories/categoryId
 */
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } },
): Promise<NextResponse<Category>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const { name, billboardId }: Category = await req.json();

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard is required", { status: 400 });
    }

    const storeByStoreIdAndUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByStoreIdAndUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category: Category = await updateCategory({
      categoryId: params.categoryId,
      data: { name, billboardId },
    });

    if (!category) {
      return new NextResponse("Category not updated", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_UPDATE]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X DELETE http://localhost:3000/api/storeId/categories/categoryId
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; categoryId: string } },
): Promise<NextResponse<Category>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const storeByStoreIdAndUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByStoreIdAndUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category: Category = await deleteCategory({
      categoryId: params.categoryId,
    });

    if (!category) {
      return new NextResponse("Category not updated", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return handleError(error);
  }
}
