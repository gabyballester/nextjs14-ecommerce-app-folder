import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import type { Billboard } from "@prisma/client";
import {
  createBillboard,
  findBillboardsByStoreId,
  getStoreByStoreIdAndOrUserId,
} from "@/services";
import { handleError } from "@/lib";

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/billboards
 */
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Billboard>> {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { label, imageUrl }: Billboard = await req.json();

    if (!label) return new NextResponse("Label is required", { status: 400 });

    if (!imageUrl)
      return new NextResponse("Image url is required", { status: 400 });

    if (!params?.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const storeByUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const billboard = await createBillboard({
      storeId: params.storeId,
      data: { label, imageUrl },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return handleError(error);
  }
}

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/billboards
 */
export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Billboard[]>> {
  try {
    const billboards = await findBillboardsByStoreId({
      storeId: params.storeId,
      order: "desc",
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return handleError(error);
  }
}
