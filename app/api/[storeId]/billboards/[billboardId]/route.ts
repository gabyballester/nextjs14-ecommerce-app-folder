import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { handleError } from "@/lib";

import type { Billboard } from "@prisma/client";
import {
  deleteBillboard,
  findBillboardById,
  getStoreByStoreIdAndOrUserId,
  updateBillboard,
} from "@/services";

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X GET http://localhost:3000/api/storeId/billboards/billboardId
 */
export async function GET(
  _req: Request,
  { params }: { params: { billboardId: string } },
): Promise<NextResponse<Billboard>> {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const billboard = await findBillboardById({
      billboardId: params.billboardId,
    });

    if (!billboard) {
      return new NextResponse("Billboard not updated", { status: 404 });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X PATCH http://localhost:3000/api/storeId/billboards/billboardId
 */
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
): Promise<NextResponse<Billboard>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const { label, imageUrl }: Billboard = await req.json();

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image url is required", { status: 400 });
    }

    const storeByStoreIdAndUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByStoreIdAndUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard: Billboard = await updateBillboard({
      billboardId: params.billboardId,
      data: { label, imageUrl },
    });

    if (!billboard) {
      return new NextResponse("Billboard not updated", { status: 404 });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_UPDATE]", error);
    return handleError(error);
  }
}

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X DELETE http://localhost:3000/api/storeId/billboards/billboardId
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
): Promise<NextResponse<Billboard>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const storeByStoreIdAndUserId = await getStoreByStoreIdAndOrUserId({
      storeId: params.storeId,
      userId,
    });

    if (!storeByStoreIdAndUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard: Billboard = await deleteBillboard({
      billboardId: params.billboardId,
    });

    if (!billboard) {
      return new NextResponse("Billboard not updated", { status: 404 });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return handleError(error);
  }
}
