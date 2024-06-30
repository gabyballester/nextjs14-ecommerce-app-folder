import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import type { Color } from "@prisma/client";
import {
  createColor,
  findColorsByStoreId,
  getStoreByStoreIdAndOrUserId,
} from "@/services";
import { handleError } from "@/lib";

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/colors
 */
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Color>> {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { name, value }: Color = await req.json();

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

    const color = await createColor({
      storeId: params.storeId,
      data: { name, value },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_POST]", error);
    return handleError(error);
  }
}

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/storeId/colors
 */
export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Color[]>> {
  try {
    const colors = await findColorsByStoreId({
      storeId: params.storeId,
      order: "desc",
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return handleError(error);
  }
}
