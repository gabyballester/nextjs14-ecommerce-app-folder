"use client";

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

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
} from "@/components/ui";
import { toast } from "react-hot-toast";
import axios from "axios";

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
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(open);

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

      router.refresh();
      toast.success("Store updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => {
            setOpen(true);
          }}
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
                  <FormLabel>Name</FormLabel>
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
          <Button disabled={loading} type="submit" className="ml-auto">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
