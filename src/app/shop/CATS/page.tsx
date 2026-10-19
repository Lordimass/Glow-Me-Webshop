import ShopShowcase from "../ShopShowcase.tsx";

export const props: Parameters<typeof ShopShowcase> = [{
    shopName: "CATS",
    metaDescription: "CATS is located between York Minster and the Museum Gardens. The " +
        "main room is brightly lit and is scattered with glowing cats. But " +
        "this shop is hiding our secret glow room in the back! Bring your " +
        "cats into the black light dark room through the curtain at the back " +
        "of the shop to see them fluoresce under the blacklights.",
    tags: ["cat"]
}];

export default function Page() {
    return (
        <ShopShowcase {...props[0]}/>
    );
}
