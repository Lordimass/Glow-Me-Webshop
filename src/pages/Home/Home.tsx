import Page from "../../components/Page/Page.tsx";
import "./Home.scss";
import { useGetGroupedProducts } from "../../lib/supabaseRPC.ts";
import { Products } from "lordis-react-components";
import {
  GHOST_FACTORY_1,
  GHOST_FACTORY_2,
  GHOST_FACTORY_3,
  PRIMARY_AI_JPEG,
  SUBMARK_CATS_WEBP,
  SUBMARK_WEBP,
} from "../../../shared/assets.ts";
import { Button } from "react-bootstrap";

export default function Home() {
  const groups = useGetGroupedProducts().data;

  return (
    <Page id={"home"}>
      <div className={"home-title-container"}>
        <div className={"layer3"}>
          <img
            src={PRIMARY_AI_JPEG}
            alt={
              'A logo which reads "Glow Me". It has gold sparkles, a ghost, a black cat, and a pumpkin nearby.'
            }
            fetchPriority={"high"}
          />
        </div>
      </div>
      <div className={"text-block"}>
        <h1>Welcome!</h1>
        <p>
          We hand-craft glow in the dark models using resin and a variety of
          different glowing powders and colours. Each has its own personality,
          imperfections, and love put into it by us.
        </p>
        <p>🧡💛🧡💛🧡💛🧡💛🧡💛</p>
        <p>
          This website is a showcase of our models, as well as a place to buy
          them! We have two shops in York, England called GHOSTS and CATS
          (you'll never guess what they sell) where you can go to see our full
          selection of Glows, or find out more about each shop and see the full
          selection from each on their pages below:
        </p>
      </div>

      <div id={"shop-navigator"}>
        <Button
          className={"ratio-1x1"}
          id={"ghosts-navigator"}
          href={"/GHOSTS"}
        >
          <img
            src={SUBMARK_WEBP}
            alt="An icon of a translucent purple ghost with a radial rainbow glow"
          />
          <h1>Ghosts</h1>
        </Button>
        <Button id={"cats-navigator"} className={"ratio-1x1"} href={"/CATS"}>
          <img
            src={SUBMARK_CATS_WEBP}
            alt="An icon of a translucent blue-green cat with a colourful radial glow"
          />
          <h1>Cats</h1>
        </Button>
      </div>

      {groups ? <Products prods={groups} /> : null}

      <div className={"ghost-factory-showcase"}>
        <div className={"showcase-item"}>
          <img
            src={GHOST_FACTORY_1}
            alt={
              "An angled photo of a bunch of colourful silicone moulds filled with unset resin."
            }
            fetchPriority={"high"}
          />
        </div>
        <div className={"showcase-item"}>
          <img
            src={GHOST_FACTORY_2}
            alt={
              "An angled photo of lots of translucent swirled peach-white paired resin ghosts. The paired ghosts are holding a red heart between them."
            }
          />
        </div>
        <div className={"showcase-item"}>
          <img
            src={GHOST_FACTORY_3}
            alt={
              "A photo focused on a colourful resin cat with black eyes. Embossed text at its base reads 'YORK'. The model is part of a lineup of lots of others in a line behind and to either side of it."
            }
          />
        </div>
      </div>
    </Page>
  );
}
