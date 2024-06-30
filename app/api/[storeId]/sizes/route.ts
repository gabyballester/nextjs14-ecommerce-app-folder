import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import type { Size } from "@prisma/client";
import {
  createSize,
  findSizesByStoreId,
  getStoreByStoreIdAndOrUserId,
} from "@/services";
import { handleError } from "@/lib";

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/sizes
 */
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Size>> {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { name, value }: Size = await req.json();

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!value)
      return new NextResponse("Value url is required", { status: 400 });

    if (!params?.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const storeByUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const size = await createSize({
      storeId: params.storeId,
      data: { name, value },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return handleError(error);
  }
}

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/sizes
 */
export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Size[]>> {
  try {
    const sizes = await findSizesByStoreId({
      storeId: params.storeId,
      order: "desc",
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return handleError(error);
  }
}
