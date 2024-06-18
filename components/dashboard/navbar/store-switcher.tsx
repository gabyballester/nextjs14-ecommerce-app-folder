"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { useStoreModal } from "@/hooks";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/index";
import { cn } from "@/lib";

import type { Store } from "@prisma/client";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface Props extends PopoverTriggerProps {
  items: Store[];
}

type ListItem = {
  label: string;
  value: string;
};

export const StoreSwitcher = ({ className, items }: Props) => {
  const { onOpen } = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems: ListItem[] = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params?.storeId,
  );

  const [open, setOpen] = useState<boolean>(false);

  const onStoreSelect = (store: ListItem) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No stores found!</CommandEmpty>
            <CommandGroup heading="Store selector..">
              {formattedItems.map((store) => (
                <CommandItem
                  onSelect={() => onStoreSelect(store)}
                  key={store.value}
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onOpen();
                }}
                className="w-full justify-end"
              >
                <p>Add Store</p>
                <PlusCircle className="ml-2 h-4 w-4 cursor-pointer" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
