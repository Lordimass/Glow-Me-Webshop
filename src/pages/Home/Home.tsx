import Page from "../../components/Page/Page.tsx";
import "./Home.css";
import {
  GHOST_FACTORY_1,
  GHOST_FACTORY_2,
  GHOST_FACTORY_3,
  PRIMARY_PNG,
} from "../../assets/assets.ts";
import Dots from "../../assets/Dots.tsx";

export default function Home() {
  return (
    <Page id={"home"}>
      <div className={"home-title-container"}>
        <div className={"layer1"} />
        <div className={"layer2"}>
          <Dots />
        </div>
        <div className={"layer3"}>
          <img
            src={PRIMARY_PNG}
            alt={
              "A logo showing a cartoony neon sign that reads 'GLOW ME!'. There are two translucent glowing ghosts flanking the text."
            }
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
          imperfections, and love put into it by us 💜
        </p>
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
          <img src={GHOST_FACTORY_1} />
        </div>
        <div className={"text-block"}>
          <img src={GHOST_FACTORY_2} />
        </div>
        <div className={"text-block"}>
          <img src={GHOST_FACTORY_3} />
        </div>
      </div>
    </Page>
  );
}
