"use client";

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";

import { useOrigin } from "@/hooks";
import type { Store } from "@prisma/client";
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
  ApiCardUrlInfo,
} from "@/components/index";
import { capitalize } from "@/lib";

type SettingsFormProps = {
  initialData: Store;
};

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingFormValues = z.infer<typeof formSchema>;

const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleUpdate = async (data: SettingFormValues) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/stores/${params?.storeId}`,
        data,
      );
      if (response.statusText !== "OK") throw new Error();

      router.push(`/${params?.storeId}`);
      router.refresh();
      toast.success("Store updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/stores/${params?.storeId}`);
      if (response.statusText !== "OK") throw new Error();

      router.push("/"); //todo: ¿hace falta 2?
      router.refresh();
      toast.success("Store deleted");
    } catch (error) {
      toast.error("Remove all products and categories first");
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
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="w-full space-y-4"
        >
          <div className="grid-col-3 grid gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{capitalize(field.name)}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
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
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiCardUrlInfo
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params?.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
