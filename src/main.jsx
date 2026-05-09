import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Work from "./pages/Work";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<WorkLayout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

/**
 * Work page wrapper — keeps the global Backdrop + Cursor + FAB consistent
 * so /work feels like the same site, not a separate destination.
 */
function WorkLayout() {
  // Lazy import to keep the same components used on the home page
  const Cursor = React.lazy(() => import("./components/Cursor"));
  const Nav = React.lazy(() => import("./components/Nav"));
  const FAB = React.lazy(() => import("./components/FAB"));
  const Backdrop = React.lazy(() => import("./components/Backdrop"));

  return (
    <React.Suspense fallback={null}>
      <Backdrop />
      <Cursor />
      <Nav />
      <FAB />
      <Work />
    </React.Suspense>
  );
}