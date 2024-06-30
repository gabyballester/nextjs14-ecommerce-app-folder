import ColorForm from "./components/color-form";
import { findColorById } from "@/services";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const colors = await findColorById({
    colorId: params.colorId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={colors} />
      </div>
    </div>
  );
};

export default ColorPage;
