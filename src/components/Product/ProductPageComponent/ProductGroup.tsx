import {useContext, useEffect, useRef} from "react";
import {ProductContext} from "./lib";
import DineroFactory from "dinero.js";
import {getProductPagePath, ProductData} from "@/lib";
import {LocaleContext} from "@/lib/context/locale.tsx";
import SquareImageBox from "@/components/SquareImageBox/SquareImageBox.tsx";
import Price from "@/components/Price/Price.tsx";
import {trackViewItemAutoConvert} from "@/lib/ga/helpers.ts";

export default function ProductGroup() {
  const { product, group, hoveredVariant, setHoveredVariant } = useContext(ProductContext);
  const groupRef = useRef<HTMLDivElement>(null);

  // Only change back to normal after mouse leaves this box
  useEffect(() => {
    if (!groupRef.current || !setHoveredVariant) return;
    groupRef.current.addEventListener("mouseleave", () =>
      setHoveredVariant(undefined),
    );
    return () =>
      groupRef.current?.removeEventListener("mouseleave", () =>
        setHoveredVariant(undefined),
      );
  }, [groupRef.current]);

  /**
   * The name of the current hovered variant, or the selected product if none is hovered.
   * Prioritises the variant_name first, then the full product name if that doesn't exist.
   */
  const name =
      hoveredVariant?.metadata.variant_name ??
      hoveredVariant?.name ??
      product.metadata.variant_name ??
      product.name;
  if (!setHoveredVariant || !group || group.products.length <= 1) return null;
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
