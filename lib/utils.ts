import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type Primitive = string | number | boolean | null | undefined | symbol | bigint;

export const handleError = <T extends Record<string, Primitive>>(
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
