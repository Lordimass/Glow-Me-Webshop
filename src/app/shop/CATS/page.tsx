import ShopShowcase from "../ShopShowcase.tsx";
import {CAT_WEBP, SUPABASE_GLOW_ME_STORAGE} from "@/lib";

export const props: Parameters<typeof ShopShowcase> = [{
    shopName: "CATS",
    mapEmbed: "GLOW CATS, 6 Stonegate, York",
    description: <span>
        CATS is located between York Minster and the Museum Gardens.
        <br/>
        <br/>
          The main room is brightly lit and is scattered with glowing cats. But
          this shop is hiding our secret glow room in the back! Bring your cats
          into the black light dark room through the curtain at the back of the
          shop to see them fluoresce under the blacklights.
        <br/>
        <br/>
        <i>
            (Note that blacklights are not required, we just use them in the
            shop to keep them glowing 24/7!)
        </i>
    </span>,
    metaDescription: "CATS is located between York Minster and the Museum Gardens. The " +
        "main room is brightly lit and is scattered with glowing cats. But " +
        "this shop is hiding our secret glow room in the back! Bring your " +
        "cats into the black light dark room through the curtain at the back " +
        "of the shop to see them fluoresce under the blacklights.",
    images: [
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
        }
    ],
    submark: {
        uri: CAT_WEBP,
        alt: "A vector graphic of a happy black cat with a gold glow",
    },
    tags: ["cat"]
}];

export default function Page() {
    return (
        <ShopShowcase {...props[0]}/>
    );
}
