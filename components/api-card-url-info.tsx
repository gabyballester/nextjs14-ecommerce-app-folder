"use client";

import React, { FC } from "react";
import { Alert, AlertDescription, AlertTitle, Button } from "./ui";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./ui/badge";
import { toast } from "react-hot-toast";

export interface ApiCardUrlInfoProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiCardUrlInfoProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<
  ApiCardUrlInfoProps["variant"],
  BadgeProps["variant"]
> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiCardUrlInfo: FC<ApiCardUrlInfoProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to the clipboard.");
  };

  return (
    <Alert>
      <Server className="h-3 w-3" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
