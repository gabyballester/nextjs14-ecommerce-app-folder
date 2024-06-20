"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button, Heading, Separator } from "@/components/index";
import { BillboardColumn, DataTable, columns } from "./table";

interface Props {
  data: BillboardColumn[];
}

export const BillboardClient: FC<Props> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          size="sm"
          disabled={false}
          onClick={() => router.push(`/${params?.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="label"
        showPagination={true}
        columns={columns}
        data={data}
      />
    </>
  );
};
