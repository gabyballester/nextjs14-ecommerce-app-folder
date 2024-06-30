import { BillboardColumn } from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/table";
import { CategoryColumn } from "@/app/(dashboard)/[storeId]/(routes)/categories/components/table";
import { ColorColumn } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/table";
import { SizeColumn } from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/table";
import { CategoryIncludingBillboard } from "@/types";

import { Billboard, Color, Size } from "@prisma/client";
import { format } from "date-fns";

export const mapBillboardToColumn = (item: Billboard): BillboardColumn => ({
  id: item.id,
  label: item.label,
  createdAt: format(item.createdAt, "MMMM do, yyyy"),
});

export const mapCategoryToColumn = (
  item: CategoryIncludingBillboard,
): CategoryColumn => ({
  id: item.id,
  name: item.name,
  billboardLabel: item.billboard.label,
  createdAt: format(item.createdAt, "MMMM do, yyyy"),
});

export const mapSizeToColumn = (item: Size): SizeColumn => ({
  id: item.id,
  name: item.name,
  value: item.value,
  createdAt: format(item.createdAt, "MMMM do, yyyy"),
});

export const mapColorToColumn = (item: Color): ColorColumn => ({
  id: item.id,
  name: item.name,
  value: item.value,
  createdAt: format(item.createdAt, "MMMM do, yyyy"),
});
