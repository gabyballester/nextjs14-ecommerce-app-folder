"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export const ModalProvider = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  // const [isMounted, setIsMounted] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) return null;

  return <StoreModal />;
};
