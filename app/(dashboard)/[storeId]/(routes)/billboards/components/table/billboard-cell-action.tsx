"use client";

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { BillboardColumn } from "./billboard-columns";
import {
  ConfirmModal,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/index";

interface Props {
  data: BillboardColumn;
}

export const BillboardCellAction: FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  if (!params || !params.storeId || !data) return null;

  const onEdit = () => {
    router.push(`/${params.storeId}/billboards/${data.id}`);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success(`Billboard Id ${data.id} copied to the clipboard.`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/${params?.storeId}/billboards/${data.id}`,
      );
      if (response.statusText !== "OK") throw new Error();

      router.refresh();
      toast.success("Billboard deleted");
    } catch (error) {
      toast.error("Remove all categories using this billboard first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <ConfirmModal
        isOpen={open}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenModal}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
