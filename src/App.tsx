import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";

function App() {
  return (
    <>
      <meta name="author" content="Sam Knight" />
      <meta name="author" content="Lordimass" />
      <meta name="creator" content="Sam Knight" />
      <meta name="creator" content="Lordimass" />
      <meta name="generator" content="react" />

      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
