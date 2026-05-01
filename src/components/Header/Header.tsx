import "./Header.scss";
import { BasketManager } from "lordis-react-components";
import { SUBMARK_WEBP } from "../../../shared/assets.ts";

export default function Header() {
  return (
    <>
      <div className="header">
        <a href={"/"} aria-label='Return to "This Shop Is So Gay" Home Page'>
          <img
            className="logo"
            src={SUBMARK_WEBP}
            alt="An icon of a translucent purple ghost with a radial rainbow glow"
          />
        </a>
        <div className="header-spacer"></div>
        <BasketManager />
      </div>
    </>
  );
}
