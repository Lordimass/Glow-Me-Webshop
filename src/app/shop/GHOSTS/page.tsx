import ShopShowcase from "../ShopShowcase.tsx";
import {GHOST_WEBP, SUPABASE_GLOW_ME_STORAGE} from "@/lib";

export const props: Parameters<typeof ShopShowcase> = [{
  shopName: "GHOSTS",
  mapEmbed: "GHOSTS, 74 Low Petergate, York",
  description: <><span>
          <i>
            "All of the ghosts here died in 1599 and are waiting to be set free
            and sent home to you ever since. It's said that they can only leave
            with kind people."
          </i>{" "}
    - Xander Platz <br/>
    </span><hr/><span>
          This is the first shop owned by the Platz siblings, and it sure does
          have some history! Formerly part of the Talbot Inn, with 15th Century
          origins, Xander and Claire transformed the gift shop into their very
          own <i>Sherlock Holmes Imaginarium</i>, then a gay bar, then a café,
          and now it's GHOSTS!
  </span></>,
  metaDescription: '"All of the ghosts here died in 1599 and are waiting to be set free' +
      "and sent home to you ever since. It's said that they can only leave" +
      'with kind people." - Xander Platz" This is the first shop owned by ' +
      "the Platz siblings, and it sure does have some history! Formerly " +
      "part of the Talbot Inn, with 15th Century origins, Xander and " +
      "Claire transformed the gift shop into their very own Sherlock " +
      "Holmes Imaginarium, then a gay bar, then a café, and now it's GHOSTS!",
  images: [
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
  ],
  submark: {
    uri: GHOST_WEBP,
    alt: "A vector graphic of a smiling ghost with a gold outline and glow",
  },
  tags: ["ghosts"]
}];

export default function Page() {
  return (
    <ShopShowcase {...props[0]}/>
  );
}
