"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ApiUrlList, Button, Heading, Separator } from "@/components/index";
import { ProductColumn, ProductDataTable, productColumns } from "./table";

interface Props {
  data: ProductColumn[];
}

export const ProductClient: FC<Props> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button
          size="sm"
          disabled={false}
          onClick={() => router.push(`/${params?.storeId}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <ProductDataTable
        searchKey="name"
        showPagination={true}
        columns={productColumns}
        data={data}
      />
      <Heading title={"API"} description={"API calls for Products"}></Heading>
      <Separator />
      <ApiUrlList entityName={"products"} entityIdName={"productId"} />
    </>
  );
};
