import { prismadb } from "@/prisma/prisma.client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  if (!params.storeId) redirect("/");
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) redirect("/");

  return (
    <>
      <div className="navbar">Navbar</div>
      {children}
    </>
  );
}
