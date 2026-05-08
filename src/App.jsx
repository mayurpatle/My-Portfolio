import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import FAB from "./components/FAB";
import Marquee from "./components/Marquee";
import Backdrop from "./components/Backdrop";

import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Stack from "./sections/Stack";
import About from "./sections/About";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <>
      {/* Global atmosphere — fixed layer behind everything */}
      <Backdrop />

      <Cursor />
      <Nav />
      <FAB />

      {/* Content sits above the backdrop */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Marquee />
        <Stack />
        <About />
        <Footer />
      </main>
    </>
  );
}