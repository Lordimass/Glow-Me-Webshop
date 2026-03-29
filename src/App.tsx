import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import { StrictMode, useEffect } from "react";
import { trackPageView } from "lordis-react-components";

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
    <>
      <meta name="author" content="Sam Knight" />
      <meta name="author" content="Lordimass" />
      <meta name="creator" content="Sam Knight" />
      <meta name="creator" content="Lordimass" />
      <meta name="generator" content="react" />
      <StrictMode>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </StrictMode>
    </>
  );
}
