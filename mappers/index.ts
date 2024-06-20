import { BillboardColumn } from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/table/columns";
import { Billboard } from "@prisma/client";
import { format } from "date-fns";

export const mapBillboardToColumn = (item: Billboard): BillboardColumn => ({
  id: item.id,
  label: item.label,
  createdAt: format(item.createdAt, "MMMM do, yyyy"),
});
