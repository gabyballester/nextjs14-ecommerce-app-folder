import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getStoreByStoreIdAndOrUserId } from "@/services";

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await getStoreByStoreIdAndOrUserId({ userId });

  if (store) redirect(`/${store.id}`);

  return children;
}
