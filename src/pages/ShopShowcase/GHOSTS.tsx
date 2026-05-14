import ShopShowcase from "./ShopShowcase.tsx";
import {
  SUBMARK_WEBP,
  SUPABASE_GLOW_ME_STORAGE,
} from "../../../shared/assets.ts";

interface GHOSTSProps {}

export default function GHOSTS({}: GHOSTSProps) {
  return (
    <ShopShowcase
      shopName={"GHOSTS"}
      description={
        <span>
          <i>
            "All of the ghosts here died in 1599 and are waiting to be set free
            and sent home to you ever since. It's said that they can only leave
            with kind people."
          </i>{" "}
          - Xander Platz <br />
          <hr />
          This is the first shop owned by the Platz siblings, and it sure does
          have some history! Formerly part of the Talbot Inn, with 15th Century
          origins, Xander and Claire transformed the gift shop into their very
          own <i>Sherlock Holmes Imaginarium</i>, then a gay bar, then a café,
          and now it's GHOSTS!
        </span>
      }
      mapEmbed={`https://maps.google.com/maps?amp;hl=en&amp;q=GHOSTS, 74 Low Petergate, York&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}
      images={[
        {
          uri: SUPABASE_GLOW_ME_STORAGE + "/GHOSTS/shop-front.webp",
        },
        {
          uri: SUPABASE_GLOW_ME_STORAGE + "/GHOSTS/glow-ghost-display.webp",
        },
        {
          uri: SUPABASE_GLOW_ME_STORAGE + "/GHOSTS/glow-ghost-display-2.webp",
        },
        {
          uri: SUPABASE_GLOW_ME_STORAGE + "/GHOSTS/big-glow-ghost-display.webp",
        },
      ]}
      submark={{
        uri: SUBMARK_WEBP,
        alt: "An icon of a translucent purple ghost with a radial rainbow glow",
      }}
      tags={["ghosts"]}
    />
  );
}
