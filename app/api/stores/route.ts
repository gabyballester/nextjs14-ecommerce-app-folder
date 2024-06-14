import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Store } from "@prisma/client";

import { prismadb } from "@/prisma/prisma.client";

/**
 * Handles GET requests to fetch all stores.
 * @example curl -X GET http://localhost:3000/api/stores
 */
export async function GET(): Promise<NextResponse<Store[]>> {
  try {
    const stores = await prismadb.store.findMany();

    if (!stores || stores.length === 0) {
      return new NextResponse("No stores found", { status: 404 });
    }

    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    console.error("[STORES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/stores
 */
export async function POST(req: Request): Promise<NextResponse<Store>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { name } = await req.json();
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await prismadb.store.create({
      data: { name, userId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
