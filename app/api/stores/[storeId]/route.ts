import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prismadb } from "@/prisma/prisma.client";
import { z } from "zod";
import { handleError } from "@/lib";
import type { Store } from "@prisma/client";

const StoreUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

/**
 * Handles patch requests to update store by storeId.
 * @example curl -X PATCH http://localhost:3000/api/stores/storeId
 */
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Store>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { name }: Store = await req.json();
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const zodValidation = StoreUpdateSchema.safeParse({ name });
    if (!zodValidation.success) {
      return new NextResponse(
        zodValidation.error.errors.map((e) => e.message).join(", "),
        { status: 400 },
      );
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const existingStore = await prismadb.store.findUnique({
      where: { id: params.storeId, userId },
    });

    if (!existingStore) {
      return new NextResponse(
        "Store not found or you don't have access to this store",
        { status: 404 },
      );
    }

    const store: Store = await prismadb.store.update({
      where: { id: params.storeId, userId },
      data: { name },
    });

    if (!store) {
      return new NextResponse("Store not updated", { status: 404 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH]", error);
    return handleError(error);
  }
}

/**
 * Handles delete requests to delete store by storeId.
 * @example curl -X DELETE http://localhost:3000/api/stores/storeId
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } },
): Promise<NextResponse<Store>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const existingStore = await prismadb.store.findUnique({
      where: { id: params.storeId, userId },
    });

    if (!existingStore) {
      return new NextResponse(
        "Store not found or you don't have access to this store",
        { status: 404 },
      );
    }

    const store: Store = await prismadb.store.delete({
      where: { id: params.storeId, userId },
    });

    if (!store) {
      return new NextResponse("Store not deleted", { status: 404 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_DELETE]", error);
    return handleError(error);
  }
}
