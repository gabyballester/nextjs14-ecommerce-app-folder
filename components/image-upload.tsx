"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/components/index";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {
  CldUploadWidget,
  CldUploadWidgetProps,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

interface Props {
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: (_event: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRemove: (_event: string) => void;
  value: string[];
}

export const ImageUpload: FC<Props> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSuccess: CldUploadWidgetProps["onSuccess"] = async (
    results: CloudinaryUploadWidgetResults,
  ) => {
    try {
      const info = results.info;
      if (info && typeof info !== "string" && info.secure_url) {
        onChange(info.secure_url);
      } else {
        console.error("Unexpected result format:", results);
      }
    } catch (error) {
      console.error("Error processing upload results:", error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={handleSuccess} uploadPreset="ugkwntqs">
        {({ open }) => (
          <Button
            type="button"
            disabled={disabled}
            variant="secondary"
            onClick={() => open()}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Upload an Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};
