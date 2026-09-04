import {useEffect, useState} from "react";
import "./ProductPageComponent.css";
import {ProductContext} from "./lib";
import {ProductData, ProductGroup, snakeToTitleCase} from "../../../lib";
import SquareImageBox from "../../SquareImageBox/SquareImageBox";
import {BasketModifier, GoHome, Tags} from "../../index";
import ProductGroupComponent from "./ProductGroup";
import Markdown from "react-markdown";
import ProductPrice from "../../Price/ProductPrice/ProductPrice";

interface ProductPageComponentProps {
  /** Product to display */
  p_product: ProductData;
  /** Group that this product is part of to display */
  group?: ProductGroup;
  /** Whether tags should be clickable to go to a /tag/TAG_NAME page. Defaults to `true` */
  clickableTags?: boolean;
}

/** A full screen component giving information on a product. Designed to be used on a dedicated page. */
export default function ProductPageComponent({
  p_product = ProductData.NULL,
  group,
  clickableTags = true,
}: ProductPageComponentProps) {
  // The product being viewed
  const [product, setProduct] = useState<ProductData>(p_product);
  // Displays the first image of the hovered product in place of the carousel if set.
  const [hoveredVariant, setHoveredVariant] = useState<ProductData>();

  // Images to display on the carousel
  const images = group ? group.getCarouselImages(product.sku) : product.images;

  // When the parameter changes, update the selected product to match. This is also useful to allow late updating of the
  // product data if content is still loading
  useEffect(() => {
    setProduct(p_product);
  }, [p_product]);

  return (
    <div className={"product-page-component"}>
      <ProductContext.Provider
        value={{
          product,
          setProduct,
          hoveredVariant,
          setHoveredVariant,
          group,
        }}
      >
        {/* Above actual product. */}
        <GoHome />

        {/* Actual box containing this product's primary information */}
        <div className="product-box">
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
    <div className="product-box additional-product-information">
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
