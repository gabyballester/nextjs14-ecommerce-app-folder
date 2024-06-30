"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ApiUrlList, Button, Heading, Separator } from "@/components/index";
import { ColorColumn, ColorDataTable, colorColumns } from "./table";

interface Props {
  data: ColorColumn[];
}

export const ColorClient: FC<Props> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button
          size="sm"
          disabled={false}
          onClick={() => router.push(`/${params?.storeId}/colors/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <ColorDataTable
        searchKey="name"
        showPagination={true}
        columns={colorColumns}
        data={data}
      />
      <Heading title={"API"} description={"API calls for Colors"}></Heading>
      <Separator />
      <ApiUrlList entityName={"colors"} entityIdName={"ColorId"} />
    </>
  );
};
