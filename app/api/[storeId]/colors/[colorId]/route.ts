import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { handleError } from "@/lib";

import type { Color } from "@prisma/client";
import {
  deleteColor,
  findColorById,
  getStoreByStoreIdAndOrUserId,
  updateColor,
} from "@/services";

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X GET http://localhost:3000/api/storeId/colors/colorId
 */
export async function GET(
  _req: Request,
  { params }: { params: { colorId: string } },
): Promise<NextResponse<Color>> {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const color = await findColorById({
      colorId: params.colorId,
    });

    if (!color) {
      return new NextResponse("Color not updated", { status: 404 });
    }

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X PATCH http://localhost:3000/api/storeId/colors/colorId
 */
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } },
): Promise<NextResponse<Color>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const { name, value }: Color = await req.json();

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value url is required", { status: 400 });
    }

    const storeByStoreIdAndUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByStoreIdAndUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color: Color = await updateColor({
      colorId: params.colorId,
      data: { name, value },
    });

    if (!color) {
      return new NextResponse("Color not updated", { status: 404 });
    }

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_UPDATE]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X DELETE http://localhost:3000/api/storeId/colors/colorId
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; colorId: string } },
): Promise<NextResponse<Color>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const storeByStoreIdAndUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByStoreIdAndUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color: Color = await deleteColor({
      colorId: params.colorId,
    });

    if (!color) {
      return new NextResponse("Color not updated", { status: 404 });
    }

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return handleError(error);
  }
}
