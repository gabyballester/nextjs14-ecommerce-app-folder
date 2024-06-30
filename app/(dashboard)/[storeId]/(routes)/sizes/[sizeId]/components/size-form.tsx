"use client";

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";

import type { Size } from "@prisma/client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  Input,
  Separator,
  ConfirmModal,
} from "@/components/index";
import { capitalize } from "@/lib";

type Props = {
  initialData: Size | null;
};

const sizeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
});

type FormValues = z.infer<typeof sizeFormSchema>;

const SizeForm: FC<Props> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const emptySize: Partial<Size> = {
    name: "",
    value: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit a size" : "Create a size";
  const toastMessage = initialData ? "Size updated" : "Size created";
  const action = initialData ? "Update" : "Create";

  const form = useForm<FormValues>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: initialData ?? emptySize,
  });

  if (!params || !params.storeId || !params.sizeId) return null;

  const onSubmit = async (data: FormValues) => {
    const updateUrl = `/api/${params?.storeId}/sizes/${params?.sizeId}`;
    const createUrl = `/api/${params?.storeId}/sizes`;

    let response;

    try {
      setLoading(true);
      if (initialData) {
        response = await axios.patch(updateUrl, data);
      } else {
        response = await axios.post(createUrl, data);
      }

      if (response.statusText !== "OK") throw new Error();

      router.push(`/${params?.storeId}/sizes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/${params?.storeId}/sizes/${params?.sizeId}`,
      );
      if (response.statusText !== "OK") throw new Error();

      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success("Size deleted");
    } catch (error) {
      toast.error("Remove all products using this size first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{capitalize(field.name)}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{capitalize(field.name)}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="w-full sm:ml-auto sm:w-auto"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
