"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BillboardCellAction } from "./billboard-cell-action";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const billboardColumns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <BillboardCellAction data={row.original} />,
  },
];
