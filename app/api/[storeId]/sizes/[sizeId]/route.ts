import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { handleError } from "@/lib";

import type { Size } from "@prisma/client";
import {
  deleteSize,
  findSizeById,
  getStoreByStoreIdAndOrUserId,
  updateSize,
} from "@/services";

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X GET http://localhost:3000/api/storeId/sizes/sizeId
 */
export async function GET(
  _req: Request,
  { params }: { params: { sizeId: string } },
): Promise<NextResponse<Size>> {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const size = await findSizeById({
      sizeId: params.sizeId,
    });

    if (!size) {
      return new NextResponse("Size not updated", { status: 404 });
    }

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X PATCH http://localhost:3000/api/storeId/sizes/sizeId
 */
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
): Promise<NextResponse<Size>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const { name, value }: Size = await req.json();

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

    const size: Size = await updateSize({
      sizeId: params.sizeId,
      data: { name, value },
    });

    if (!size) {
      return new NextResponse("Size not updated", { status: 404 });
    }

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_UPDATE]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X DELETE http://localhost:3000/api/storeId/sizes/sizeId
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
): Promise<NextResponse<Size>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByStoreIdAndUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByStoreIdAndUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size: Size = await deleteSize({
      sizeId: params.sizeId,
    });

    if (!size) {
      return new NextResponse("Size not updated", { status: 404 });
    }

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return handleError(error);
  }
}
