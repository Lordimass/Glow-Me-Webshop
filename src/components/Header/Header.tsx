import { SUBMARK_PNG } from "../../assets/assets.ts";
import "./Header.scss";

export default function Header() {
  return (
    <>
      <div className="header">
        <a href={"/"} aria-label='Return to "This Shop Is So Gay" Home Page'>
          <img
            className="logo"
            src={SUBMARK_PNG}
            alt="An icon of a translucent purple ghost with a radial rainbow glow"
          />
        </a>
        <div className="header-spacer"></div>
      </div>
    </>
  );
}
