import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import type { Category } from "@prisma/client";
import {
  createCategory,
  findCategoriesByStoreId,
  getStoreByStoreIdAndOrUserId,
} from "@/services";
import { handleError } from "@/lib";

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/categories
 */
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Category>> {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { name, billboardId }: Category = await req.json();

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

    if (!params?.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const storeByUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const category = await createCategory({
      storeId: params.storeId,
      data: { name, billboardId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return handleError(error);
  }
}

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/categories
 */
export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Category[]>> {
  try {
    const categories = await findCategoriesByStoreId({
      storeId: params.storeId,
      order: "desc",
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return handleError(error);
  }
}
