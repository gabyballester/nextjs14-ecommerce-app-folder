import { Billboard, Color, Size } from "@prisma/client";
import { format } from "date-fns";
import { BillboardColumn } from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/table";
import { CategoryColumn } from "@/app/(dashboard)/[storeId]/(routes)/categories/components/table";
import { ColorColumn } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/table";
import { ProductColumn } from "@/app/(dashboard)/[storeId]/(routes)/products/components/table";
import { SizeColumn } from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/table";
import { CategoryExtended, ProductWithCategoryColorSize } from "@/types";
import { currency } from "@/lib";

export const mapBillboardToColumn = (item: Billboard): BillboardColumn => ({
  id: item.id,
  label: item.label,
  createdAt: format(item.createdAt, "MMMM do, yyyy"),
});

export const mapCategoryToColumn = (
  item: CategoryExtended,
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

export const mapProductToColumn = (
  item: ProductWithCategoryColorSize,
): ProductColumn => ({
  id: item.id,
  name: item.name,
  price: currency.format(item.price.toNumber()),
  size: item.size.value,
  isFeatured: item.isFeatured,
  isArchived: item.isArchived,
  category: item.category.name,
  color: item.color.value,
  createdAt: format(item.createdAt, "MMMM do, yyyy"),
});
