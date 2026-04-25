import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import { StrictMode, useEffect } from "react";
import { LRCContext, trackPageView } from "lordis-react-components";
import { SITE_NAME } from "./lib/consts.ts";
import Checkout from "./pages/Checkout/Checkout.tsx";
import ThankYou from "./pages/ThankYou/ThankYou.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Inner />
    </BrowserRouter>
  );
}

function Inner() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(document.title, document.location.href);
    console.log(
      `Tracked page view for ${document.title} - ${location.pathname}`,
    );
  }, [location]);
  return (
    <LRCContext>
      <meta name="author" content="Sam Knight" />
      <meta name="author" content="Lordimass" />
      <meta name="creator" content="Sam Knight" />
      <meta name="creator" content="Lordimass" />
      <meta name="generator" content="react" />
      <title>{SITE_NAME}</title>
      <StrictMode>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </StrictMode>
    </LRCContext>
  );
}
