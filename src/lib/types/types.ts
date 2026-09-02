import { BasketProduct } from "lordis-react-components";

export type StockDiscrepency = Pick<
  BasketProduct,
  "sku" | "name" | "stock" | "basketQuantity"
>;
