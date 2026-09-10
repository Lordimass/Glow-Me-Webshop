"use server";

import "./global.css";
import type {ReactNode} from "react";
import {Carousel, CarouselItem} from "react-bootstrap";
import {MinimalImage} from "@/lib";
import Products from "../../components/Product/Products/Products.tsx";
import GoHome from "../../components/GoHome/GoHome.tsx";
import {getGroupedProducts} from "@/lib/functions/supabaseRPC.ts";
import {createClient} from "@/lib/supabase/server.ts";
import {GoogleMapsEmbed} from "@next/third-parties/google";

interface ShopShowcaseProps {
  /** The name of the shop */
  shopName: string;
  description: ReactNode;
  metaDescription: string;
  /** Google Maps query for the location of the shop */
  mapEmbed: string;
  images?: MinimalImage[];
  /** Submark logo */
  submark: MinimalImage;
  /** Possible tags for products to display on this page */
  tags?: string[];
}

export default async function ShopShowcase(props: ShopShowcaseProps) {
  const groups = await getGroupedProducts(
      await createClient(),
      undefined,
      undefined,
      process.env.NODE_ENV === "production",
      props.tags
  );

  return (
    <div
      id={`shop-showcase`}
    >
      <GoHome />
      <h1 className={"shop-title"}>
        <hr />{props.shopName}<hr />
      </h1>
      <div className={"split"}>
        <div className={"left"}>
          <p>{props.description}</p>
        </div>
        <div className={"gmap_iframe right neon-border"}>
          <GoogleMapsEmbed
              mode={"place"}
              apiKey={process.env.GOOGLE_MAPS_SECRET_KEY!}
              q={props.mapEmbed}
              style={"width: 100%; height: 100%"}
              height={1}
          />
        </div>

        {/*<iframe*/}
        {/*  className="gmap_iframe right neon-border"*/}
        {/*  width="100%"*/}
        {/*  src={props.mapEmbed}*/}
        {/*/>*/}
      </div>
      <div className={"split"}>
        <div className={"left carousel-outer neon-border"}>
          <Carousel>
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
      {groups ? <Products prods={JSON.stringify(groups)} /> : null}
    </div>
  );
}
