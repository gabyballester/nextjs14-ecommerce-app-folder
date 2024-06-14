import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { Navbar } from "@/components/dashboard";
import { findStoreByStoreOrUserId } from "@/services/store";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = findStoreByStoreOrUserId({ storeId: params.storeId, userId });

  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
