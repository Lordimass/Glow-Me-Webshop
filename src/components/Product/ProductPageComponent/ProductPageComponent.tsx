"use client";

import {useContext, useEffect, useRef, useState} from "react";
import "./ProductPageComponent.css";
import {ProductContext} from "./lib";
import {ProductData, ProductGroup, snakeToTitleCase} from "@/lib";
import SquareImageBox from "../../SquareImageBox/SquareImageBox";
import ProductGroupComponent from "./ProductGroup";
import Markdown from "react-markdown";
import ProductPrice from "../../Price/ProductPrice/ProductPrice";
import GoHome from "@/components/GoHome/GoHome.tsx";
import BasketModifier from "@/components/Ticker/BasketModifier/BasketModifier.tsx";
import Tags from "@/components/Tag/Tags.tsx";
import {trackViewItemAutoConvert, trackViewItemListAutoConvert} from "@/lib/ga/helpers.ts";
import {LocaleContext} from "@/lib/context/locale.tsx";

interface ProductPageComponentProps {
  /** Product to display, or serialised string representing {@link ProductData}*/
  p_product: ProductData | string;
  /** Group that this product is part of to display, or serialised string representing {@link ProductGroup} */
  p_group?: ProductGroup | string;
  /** Whether tags should be clickable to go to a /tag/TAG_NAME page. Defaults to `true` */
  clickableTags?: boolean;
}

/** A full screen component giving information on a product. Designed to be used on a dedicated page. */
export default function ProductPageComponent({
  p_product = ProductData.NULL,
  p_group,
  clickableTags = true,
}: ProductPageComponentProps) {
  const {currency} = useContext(LocaleContext);

  const [product, _setProduct] = useState<ProductData>(ProductData.NULL);
  const [group, setGroup] = useState<ProductGroup | undefined>();
  const [hoveredVariant, setHoveredVariant] = useState<ProductData>();
  const images = group ? group.getCarouselImages(product.sku) : product.images;

  const groupAnalyticsTriggered = useRef<boolean>(false);

  // When the parameter changes, update the selected product to match. This is also useful to allow late updating of the
  // product data if content is still loading
  useEffect(() => {
    setProduct(typeof p_product === "string"
        ? ProductData.deserialize(p_product)
        : p_product);
  }, [p_product]);

  useEffect(() => {
    const newGroup = typeof p_group === "string"
        ? ProductGroup.deserialize(p_group)
        : p_group
    setGroup(newGroup);
    if (newGroup && !groupAnalyticsTriggered.current) {
      trackViewItemListAutoConvert(currency, newGroup?.products, newGroup.groupName, newGroup.groupName);
      groupAnalyticsTriggered.current = true;
    }
  }, [p_group]);

  function setProduct(newProduct: ProductData) {
    if (newProduct.sku != product.sku) trackViewItemAutoConvert(currency, newProduct);
    _setProduct(newProduct);
  }

  return (
    <div className={"product-page-component"}>
      <ProductContext.Provider
        value={{
          product, setProduct,
          hoveredVariant, setHoveredVariant,
          group,
        }}
      >
        {/* Above actual product. */}
        <GoHome />

        {/* Actual box containing this product's primary information */}
        <div className="product-box neon-border">
          <div className="image">
            <SquareImageBox
              image={
                hoveredVariant
                  ? group?.getCarouselImages(hoveredVariant.sku)[0]
                  : images
              }
              size="100%"
              loading="eager"
            />
          </div>

          <h1 className="title">{product.groupName ?? product.name}</h1>

          <div className="price-container">
            <ProductPrice prod={product} />
          </div>

          {product.metadata.tags ? (
            <Tags tags={product.metadata.tags} clickable={clickableTags} />
          ) : null}

          <div className="desc">
            <Markdown>{product.metadata.description}</Markdown>
          </div>

          <div className="prod-ticker">
            <ProductGroupComponent />
            <BasketModifier
              inputId={"prod-page-basket-modifier"}
              product={product}
              height={"50px"}
            />
          </div>
        </div>

        <AdditionalInformation prod={product} />
      </ProductContext.Provider>
    </div>
  );
}

/** Displays additional information about the given product */
function AdditionalInformation({ prod }: { prod: ProductData }) {
  const data = {
    SKU: prod.sku,
    weight: prod.metadata.weight
      ? prod.metadata.weight > 500
        ? Math.round(prod.metadata.weight / 100) / 10 + "kg"
        : prod.metadata.weight + "g"
      : undefined,
    category: prod.metadata.category,
    ...prod.metadata.customer_metadata,
  };
  const keys = Object.keys(data);

  return (
    <div className="product-box additional-product-information neon-border">
      <h2>Item Details</h2>
      <div className="additional-product-information-container">
        {keys.map((key) => {
          const value = data[key as keyof typeof data];
          return value ? (
            <div key={key}>
              <span>{snakeToTitleCase(key)}</span>
              <span>{data[key as keyof typeof data]}</span>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
