import Page from "../../components/Page/Page.tsx";
import "./Home.css";
import { PRIMARY_PNG } from "../../assets/assets.ts";
import Dots from "../../assets/Dots.tsx";

export default function Home() {
  return (
    <Page>
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
    </Page>
  );
}
