import clsx from "clsx";
import { ClassValue, clsx as clsxType } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
