"use client";

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";

import type { Billboard } from "@prisma/client";
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
  ImageUpload,
} from "@/components/index";
import { capitalize } from "@/lib";

type Pros = {
  initialData: Billboard | null;
};

const billboardFormSchema = z.object({
  label: z.string().min(1, "Label is required"),
  imageUrl: z.string().min(1, "Image is required"),
});

type FormValues = z.infer<typeof billboardFormSchema>;

const BillboardForm: FC<Pros> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const emptyBillboard: Partial<Billboard> = {
    label: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Create a billboard";
  const toastMessage = initialData ? "Billboard updated" : "Billboard created";
  const action = initialData ? "Update" : "Create";

  const form = useForm<FormValues>({
    resolver: zodResolver(billboardFormSchema),
    defaultValues: initialData ?? emptyBillboard,
  });

  if (!params || !params.storeId || !params.billboardId) return null;

  const onSubmit = async (data: FormValues) => {
    const updateUrl = `/api/${params?.storeId}/billboards/${params?.billboardId}`;
    const createUrl = `/api/${params?.storeId}/billboards`;

    let response;

    try {
      setLoading(true);
      if (initialData) {
        response = await axios.patch(updateUrl, data);
      } else {
        response = await axios.post(createUrl, data);
      }

      if (response.statusText !== "OK") throw new Error();

      router.push(`/${params?.storeId}/billboards`);
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
        `/api/${params?.storeId}/billboards/${params?.billboardId}`,
      );
      if (response.statusText !== "OK") throw new Error();

      router.push(`/${params.storeId}/billboards`);
      router.refresh();
      toast.success("Billboard deleted");
    } catch (error) {
      toast.error("Remove all categories using this billboard first.");
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{capitalize(field.name)}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url: string) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
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

export default BillboardForm;
