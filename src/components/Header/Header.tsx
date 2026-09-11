import "./Header.css";
import {SUBMARK_WEBP} from "@/lib";
import BasketManager from "@/components/BasketManager/BasketManager.tsx";

export default function Header() {
  return (
    <>
      <div className="header-page-space" />
      <div className="header neon-border">
        <a href={"/"} aria-label='Return to "Glow Me!" Home Page'>
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
