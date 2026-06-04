import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import { StrictMode } from "react";
import { LRCContext, useConsentMode } from "lordis-react-components";
import { SITE_NAME } from "./lib/consts.ts";
import Checkout from "./pages/Checkout/Checkout.tsx";
import ThankYou from "./pages/ThankYou/ThankYou.tsx";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";
import Page404 from "./pages/Page404/Page404.tsx";
import GHOSTS from "./pages/ShopShowcase/GHOSTS.tsx";
import CATS from "./pages/ShopShowcase/CATS.tsx";
import Policy from "./pages/Policies/Policy.tsx";
import { usePageViewTracking, useSiteSettings } from "./AppHooks.tsx";
import TagPage from "./pages/TagPage/TagPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <LRCContext getLRCRemoteSettingsHook={useSiteSettings}>
        <Inner />
      </LRCContext>
    </BrowserRouter>
  );
}

function Inner() {
  useConsentMode();
  usePageViewTracking();

  return (
    <>
      <meta name="author" content="Sam Knight" />
      <meta name="author" content="Lordimass" />
      <meta name="creator" content="Sam Knight" />
      <meta name="creator" content="Lordimass" />
      <meta name="generator" content="react" />
      <title>{SITE_NAME}</title>
      <StrictMode>
        <Routes>
          <Route index element={<Home />} />
          <Route path={"/GHOSTS"} element={<GHOSTS />} />
          <Route path={"/CATS"} element={<CATS />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/products/*" element={<ProductPage />} />
          <Route path="/tag/*" element={<TagPage />} />
          <Route path="*" element={<Page404 />} />

          <Route
            path={"privacy"}
            element={
              <Policy
                file_name="privacy-policy"
                title="Privacy Policy"
                canonical="privacy"
              />
            }
          />
          <Route
            path={"refunds"}
            element={
              <Policy
                file_name="returns"
                title="Refunds & Returns Policy"
                canonical="returns"
              />
            }
          />
          <Route
            path={"returns"}
            element={
              <Policy
                file_name="returns"
                title="Refunds & Returns Policy"
                canonical="returns"
              />
            }
          />
          <Route
            path={"cancellations"}
            element={
              <Policy
                file_name="cancellation"
                title="Cancellation Policy"
                canonical="cancellation"
              />
            }
          />
          <Route
            path={"/shipping"}
            element={
              <Policy
                file_name="shipping"
                title="Shipping Policy"
                canonical="shipping"
              />
            }
          />
        </Routes>
      </StrictMode>
    </>
  );
}
