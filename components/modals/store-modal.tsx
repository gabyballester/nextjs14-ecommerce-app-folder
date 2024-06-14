"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useStoreModal } from "@/hooks/use-store-modal";

import {
  Input,
  Button,
  Modal,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";

const formSchema = z.object({
  name: z.string().min(1),
});

// const baseUrl = "http://localhost:3000/api";

// const endpoint = {
//   stores: "/stores",
// };

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(false);
      // const response = await axios.get(baseUrl + endpoint.stores);
      const response = await axios.post("api/stores", values);
      console.log(response);

      // status: 200
      // statusText: "OK"
      // data: {
      //   createdAt: "2024-06-14T11:07:04.083Z";
      //   id: "4b72d105-4a52-49e2-8d06-bee5900b584a";
      //   name: "asdfasdf";
      //   updatedAt: "2024-06-14T11:07:04.083Z";
      //   userId: "user_2hooOC1uU7VskShExxX8i2I6ggd";
      // }
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={() => storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end space-x-2 pt-6">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
