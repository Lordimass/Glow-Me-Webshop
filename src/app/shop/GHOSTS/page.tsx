import ShopShowcase from "../ShopShowcase.tsx";

export const props: Parameters<typeof ShopShowcase> = [{
  shopName: "GHOSTS",
  metaDescription: '"All of the ghosts here died in 1599 and are waiting to be set free' +
      "and sent home to you ever since. It's said that they can only leave" +
      'with kind people." - Xander Platz" This is the first shop owned by ' +
      "the Platz siblings, and it sure does have some history! Formerly " +
      "part of the Talbot Inn, with 15th Century origins, Xander and " +
      "Claire transformed the gift shop into their very own Sherlock " +
      "Holmes Imaginarium, then a gay bar, then a café, and now it's GHOSTS!",
  tags: ["ghosts"]
}];

export default function Page() {
  return (
    <ShopShowcase {...props[0]}/>
  );
}
