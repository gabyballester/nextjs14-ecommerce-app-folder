"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/components/index";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface Props {
  disabled?: boolean;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
  value: string[];
}

interface CloudinaryUploadWidgetInfo {
  secure_url: string;
}

interface CloudinaryUploadWidgetResults {
  info: CloudinaryUploadWidgetInfo;
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

  const handleUpdateImage = (results: CloudinaryUploadWidgetResults) => {
    if (results.info?.secure_url) {
      onChange(results.info.secure_url);
    } else {
      // Considerar manejar este error de manera diferente
      console.error("Unexpected result format:", results);
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
      <CldUploadWidget
        onSuccess={() => handleUpdateImage}
        uploadPreset="ugkwntqs"
      >
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
