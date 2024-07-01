import { Billboard, Category, Product, Color, Size } from "@prisma/client";

export type CategoryExtended = Category & { billboard: Billboard };
export type ProductWithCategoryColorSize = Product & {
  category: Category;
  color: Color;
  size: Size;
};

export type ProductWithImages = Product & {
  images: Image[];
};
