import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Layout",
  description: "Auth Layout",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
}
