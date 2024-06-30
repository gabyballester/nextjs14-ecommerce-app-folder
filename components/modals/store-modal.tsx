"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useStoreModal } from "@/hooks";

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
} from "@/components/index";

const storeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type FormValues = z.infer<typeof storeFormSchema>;

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(false);

      const response = await axios.post("api/stores", values);
      if (response.statusText !== "OK") throw new Error();

      toast.success("Store created.");
      //incorrecto - redirecciona a la actual (si no existe no puede redirigir)
      // window.location.assign(`/${params?.storeId}`);

      //correcto - redirecciona a la creada
      window.location.assign(`/${response.data.id}`);
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
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
                <Button disabled={loading} variant="outline" onClick={onClose}>
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
