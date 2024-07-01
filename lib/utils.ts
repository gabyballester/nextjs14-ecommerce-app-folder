import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = <T extends Record<string, any>>(
  error: unknown,
): NextResponse<T> => {
  let errorMessage = "Internal error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  return new NextResponse(`Internal error: ${errorMessage}`, {
    status: 500,
  });
};

export const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});
