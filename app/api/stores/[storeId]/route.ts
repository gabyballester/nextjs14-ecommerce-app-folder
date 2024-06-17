import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prismadb } from "@/prisma/prisma.client";
import { z } from "zod";

import type { Store } from "@prisma/client";
import { handleError } from "@/lib";

const StoreUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  console.log("__________________encontrado___________________");

  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const json = await req.json();
    const result = StoreUpdateSchema.safeParse(json);
    if (!result.success) {
      return new NextResponse(
        result.error.errors.map((e) => e.message).join(", "),
        { status: 400 },
      );
    }

    const { name } = result.data;

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Check if the store exists and belongs to the user
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
    return handleError(error);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

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
    return handleError(error);
  }
}
