import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import type { Store } from "@prisma/client";
import { handleError } from "@/lib";
import { createStore, getStores } from "@/services";

/**
 * Handles GET requests to fetch all stores.
 * @example curl -X GET http://localhost:3000/api/stores
 */
export async function GET(): Promise<NextResponse<Store[]>> {
  try {
    const stores = await getStores();

    if (!stores || stores.length === 0) {
      return new NextResponse("No stores found", { status: 404 });
    }

    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    console.error("[STORES_GET]", error);
    return handleError(error);
  }
}

/**
 * Handles POST requests to create a new store.
 * @example curl -X POST http://localhost:3000/api/stores
 */
export async function POST(req: Request): Promise<NextResponse<Store>> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { name }: Store = await req.json();
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await createStore({
      name,
      userId,
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return handleError(error);
  }
}
