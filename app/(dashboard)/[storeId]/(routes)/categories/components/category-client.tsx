"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ApiUrlList, Button, Heading, Separator } from "@/components/index";
import { CategoryColumn, CategoryDataTable, categoryColumns } from "./table";

interface Props {
  data: CategoryColumn[];
}

export const CategoryClient: FC<Props> = ({ data }) => {
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
      <CategoryDataTable
        searchKey="name"
        showPagination={true}
        columns={categoryColumns}
        data={data}
      />
      <Heading title={"API"} description={"API calls for Categories"} />
      <Separator />
      <ApiUrlList entityName={"categories"} entityIdName={"categoryId"} />
    </>
  );
};
