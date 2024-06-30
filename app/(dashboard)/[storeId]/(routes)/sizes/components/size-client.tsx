"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ApiUrlList, Button, Heading, Separator } from "@/components/index";
import { SizeColumn, SizeDataTable, sizeColumns } from "./table";

interface Props {
  data: SizeColumn[];
}

export const SizeClient: FC<Props> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button
          size="sm"
          disabled={false}
          onClick={() => router.push(`/${params?.storeId}/sizes/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <SizeDataTable
        searchKey="name"
        showPagination={true}
        columns={sizeColumns}
        data={data}
      />
      <Heading title={"API"} description={"API calls for Sizes"}></Heading>
      <Separator />
      <ApiUrlList entityName={"sizes"} entityIdName={"sizeId"} />
    </>
  );
};
