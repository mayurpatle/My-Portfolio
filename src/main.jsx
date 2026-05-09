import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Work from "./pages/Work";
import Blogs from "./pages/Blogs";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<WorkLayout />} />
        <Route path="/blogs" element={<BlogsLayout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

function WorkLayout() {
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

function BlogsLayout() {
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
      <Blogs />
    </React.Suspense>
  );
}