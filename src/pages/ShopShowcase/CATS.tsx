import ShopShowcase from "./ShopShowcase.tsx";
import {
  SUBMARK_CATS_WEBP,
  SUPABASE_GLOW_ME_STORAGE,
} from "../../../shared/assets.ts";

interface CATSProps {}

export default function CATS({}: CATSProps) {
  return (
    <ShopShowcase
      shopName={"CATS"}
      mapEmbed="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=GLOW CATS, 6 Stonegate, York&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      description={
        <span>
          CATS is located between York Minster and the Museum Gardens.
          <br />
          <br />
          The main room is brightly lit and is scattered with glowing cats. But
          this shop is hiding our secret glow room in the back! Bring your cats
          into the black light dark room through the curtain at the back of the
          shop to see them fluoresce under the blacklights.
          <br />
          <br />
          <i>
            (Note that blacklights are not required, we just use them in the
            shop to keep them glowing 24/7!)
          </i>
        </span>
      }
      images={[
        {
          uri: SUPABASE_GLOW_ME_STORAGE + "/CATS/glow-me-51.webp",
        },
        {
          uri: SUPABASE_GLOW_ME_STORAGE + "/CATS/glow-me-22.webp",
        },
        {
          uri: SUPABASE_GLOW_ME_STORAGE + "/CATS/glow-me-49.webp",
        },
        {
          uri: SUPABASE_GLOW_ME_STORAGE + "/CATS/glow-me-1.webp",
        },
      ]}
      submark={{
        uri: SUBMARK_CATS_WEBP,
        alt: "An icon of a translucent blue-green cat with a colourful radial glow",
      }}
      tags={["cat"]}
    />
  );
}
