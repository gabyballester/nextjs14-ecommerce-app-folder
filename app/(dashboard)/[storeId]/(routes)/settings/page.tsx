import { FC } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { findStoreByStoreOrUserId } from "@/services/store";
import SettingsForm from "./components/settings-form";

interface Props {
  params: { storeId: string };
}

const SettingsPage: FC<Props> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await findStoreByStoreOrUserId({
    storeId: params.storeId,
    userId,
  });

  if (!store) redirect("/");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-6 pt-5">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
