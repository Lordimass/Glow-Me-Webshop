import { createContext, Dispatch, SetStateAction } from "react";
import { ProductData, ProductGroup } from "../../../lib";

export const ProductContext = createContext<{
  setProduct?: Dispatch<SetStateAction<ProductData>>;
  product: ProductData;
  group?: ProductGroup;
  hoveredVariant?: ProductData;
  setHoveredVariant?: Dispatch<SetStateAction<ProductData | undefined>>;
}>({ product: ProductData.NULL });

/**
 * Extract the product SKU from the URL
 */
export function extractSKU(): number {
  // SKU is the last part of the subdirectory
  const path = window.location.pathname.split("/");
  const skuString = path[path.length - 1];
  // Convert to number type and return
  return skuString as unknown as number;
}
