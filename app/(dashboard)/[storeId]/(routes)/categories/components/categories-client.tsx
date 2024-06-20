"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ApiUrlList, Button, Heading, Separator } from "@/components/index";
import { CategoryColumn, DataTable, columns } from "./table";

interface Props {
  data: CategoryColumn[];
}

export const CategoriesClient: FC<Props> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories on your store"
        />
        <Button
          size="sm"
          disabled={false}
          onClick={() => router.push(`/${params?.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        showPagination={true}
        columns={columns}
        data={data}
      />
      <Heading title={"API"} description={"API calls for Categories"}></Heading>
      <Separator />
      <ApiUrlList entityName={"categories"} entityIdName={"categoryId"} />
    </>
  );
};
