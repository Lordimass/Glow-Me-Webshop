import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import { StrictMode, useEffect } from "react";

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
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: document.location.href,
    });
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
