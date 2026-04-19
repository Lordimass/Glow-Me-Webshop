import Page from "../../components/Page/Page.tsx";
import "./Home.scss";
import {
  GHOST_FACTORY_1,
  GHOST_FACTORY_2,
  GHOST_FACTORY_3,
  PRIMARY_WEBP,
} from "../../assets/assets.ts";
import Dots from "../../assets/Dots.tsx";
import { useGetProducts } from "../../lib/supabaseRPC.ts";
import { ProductData, Products } from "lordis-react-components";

export default function Home() {
  const products: ProductData[] = useGetProducts();

  return (
    <Page id={"home"}>
      <div className={"home-title-container"}>
        <div className={"layer1"} />
        <div className={"layer2"}>
          <Dots />
        </div>
        <div className={"layer3"}>
          <img
            src={PRIMARY_WEBP}
            alt={
              "A logo showing a cartoony neon sign that reads 'GLOW ME!'. There are two translucent glowing ghosts flanking the text."
            }
            fetchPriority={"high"}
          />
        </div>
      </div>
      <div className={"spacer"} />

      <div></div>
      <div className={"text-block"}>
        <h1>Work In Progress!</h1>
        <p>
          We hand-craft glow in the dark models using resin and a variety of
          different glowing powders and colours. Each has its own personality,
          imperfections, and love put into it by us
        </p>
        <p>❤️🧡💛💚💙💜</p>
        <p>
          This website will be used to showcase and sell our models, once it's
          set up. But for now, if you're dying to get your hands on one, you can
          visit one of our shops in York:
          <br />
          <br />
          <a href={"https://maps.app.goo.gl/VYgvgztjZpTGZHz4A"}>GHOSTS</a>
          <br />
          <a href={"https://maps.app.goo.gl/4K2Td9WSWWxjDewj8"}>CATS</a>
        </p>
      </div>

      <div className={"ghost-factory-showcase"}>
        <div className={"text-block"}>
          <img
            src={GHOST_FACTORY_1}
            alt={
              "An angled photo of a bunch of colourful silicone moulds filled with unset resin."
            }
            fetchPriority={"high"}
          />
        </div>
        <div className={"text-block"}>
          <img
            src={GHOST_FACTORY_2}
            alt={
              "An angled photo of lots of translucent swirled peach-white paired resin ghosts. The paired ghosts are holding a red heart between them."
            }
          />
        </div>
        <div className={"text-block"}>
          <img
            src={GHOST_FACTORY_3}
            alt={
              "A photo focused on a colourful resin cat with black eyes. Embossed text at its base reads 'YORK'. The model is part of a lineup of lots of others in a line behind and to either side of it."
            }
          />
        </div>
      </div>

      <Products prods={products} />
    </Page>
  );
}
