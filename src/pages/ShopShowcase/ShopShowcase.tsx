import Page from "../../components/Page/Page.tsx";
import "./ShopShowcase.scss";
import type { ReactNode } from "react";
import { GoHome, MinimalImage } from "../../../../Lordis-React-Components";
import { Carousel, CarouselItem } from "react-bootstrap";
import { useGetGroupedProducts } from "../../lib/supabaseRPC.ts";
import { Products } from "lordis-react-components";

interface ShopShowcaseProps {
  /** The name of the shop */
  shopName: string;
  description: ReactNode;
  /**
   * Google Maps embed link for the location of the shop
   * @example https://maps.google.com/maps?amp;hl=en&amp;q=GHOSTS, 74 Low Petergate, York&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed
   */
  mapEmbed: string;
  images?: MinimalImage[];
  /** Submark logo */
  submark: MinimalImage;
  /** Possible tags for products to display on this page */
  tags?: string[];
}

export default function ShopShowcase(props: ShopShowcaseProps) {
  const groups = useGetGroupedProducts(undefined, undefined, props.tags).data;

  return (
    <Page id={`shop-showcase`}>
      <GoHome />
      <h1 className={"shop-title"}>
        <hr />
        {props.shopName}
        <hr />
      </h1>
      <div className={"split"}>
        <div className={"left"}>
          <p>{props.description}</p>
        </div>
        <iframe
          className="gmap_iframe right"
          width="100%"
          src={props.mapEmbed}
        />
      </div>
      <div className={"split"}>
        <div className={"left carousel-outer"}>
          <Carousel data-bs-theme={"light"}>
            {props.images?.map((img, i) => (
              <CarouselItem key={i}>
                <div
                  className={"carousel-image"}
                  style={{
                    backgroundImage: `url(${img.uri})`,
                  }}
                />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
        <div className={"right"}>
          <img
            className="submark"
            src={props.submark.uri}
            alt={props.submark.alt}
          />
        </div>
      </div>
      {groups ? <Products prods={groups} /> : null}
    </Page>
  );
}
