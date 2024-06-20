import { Billboard, Category } from "@prisma/client";

export type CategoryIncludingBillboard = Category & { billboard: Billboard };

