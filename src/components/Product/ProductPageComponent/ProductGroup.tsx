import { useContext, useEffect, useRef } from "react";
import { ProductContext } from "./lib";
import DineroFactory from "dinero.js";
import {
  getProductPagePath,
  LocaleContext,
  ProductData,
  trackViewItemAutoConvert,
} from "../../../lib";
import { Price, SquareImageBox } from "../../index";

export default function ProductGroup() {
  const { product, group, hoveredVariant, setHoveredVariant } =
    useContext(ProductContext);
  const groupRef = useRef<HTMLDivElement>(null);
  /**
   * The name of the current hovered variant, or the selected product if none is hovered.
   * Prioritises the variant_name first, then the full product name if that doesn't exist.
   */
  const name =
    hoveredVariant?.metadata.variant_name ??
    hoveredVariant?.name ??
    product.metadata.variant_name ??
    product.name;
  if (!setHoveredVariant) return <></>;

  // Only change back to normal after mouse leaves this box
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.addEventListener("mouseleave", () =>
      setHoveredVariant(undefined),
    );
    return () =>
      groupRef.current?.removeEventListener("mouseleave", () =>
        setHoveredVariant(undefined),
      );
  }, [groupRef.current]);

  if (!group || group.products.length === 0) {
    return <></>;
  }
  return (
    <>
      <p className="p-small">Variant: {name}</p>
      <div className="product-group" ref={groupRef}>
        {group.products.map((p) => (
          <ProductVariant product={p} key={p.sku} />
        ))}
      </div>
    </>
  );
}

function ProductVariant({ product }: { product: ProductData }) {
  const { currency } = useContext(LocaleContext);
  const { group } = useContext(ProductContext);

  async function changeProduct() {
    if (!setProduct) return;
    setProduct(product);
    window.history.pushState(
      undefined,
      product.name,
      getProductPagePath(product.sku),
    );
    trackViewItemAutoConvert(currency, product);
  }

  const {
    product: mainProduct,
    setProduct,
    setHoveredVariant,
  } = useContext(ProductContext);
  if (!setHoveredVariant) return <></>;

  const priceUnits = Math.round(product.price * 100);
  const dinero = DineroFactory({
    amount: priceUnits,
    currency: "GBP",
    precision: 2,
  });

  return (
    <button
      className={
        "product-variant" +
        (product.sku === mainProduct.sku ? " selected-product-variant" : "")
      }
      onMouseEnter={() => setHoveredVariant(product)}
      onClick={changeProduct}
    >
      <SquareImageBox image={group?.getVariantIcon(product.sku)} size="100px" />
      <Price baseDinero={dinero} />
    </button>
  );
}
