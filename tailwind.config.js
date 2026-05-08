/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Base "void" palette — deep blacks with cool undertones
        ink: {
          950: "#05060A",
          900: "#0A0B12",
          800: "#10121C",
          700: "#171A28",
          600: "#1F2333",
          500: "#2A2F45",
        },
        // Neon accent — restrained, used sparingly
        neon: {
          cyan: "#5EEAD4",      // primary accent
          violet: "#A78BFA",    // secondary accent
          amber: "#FCD34D",     // tertiary, for CTAs
          rose: "#FB7185",      // alert / energy
        },
        // Glass surfaces
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.04)",
          hi: "rgba(255, 255, 255, 0.08)",
          lo: "rgba(255, 255, 255, 0.02)",
          stroke: "rgba(255, 255, 255, 0.10)",
          strokeHi: "rgba(255, 255, 255, 0.18)",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        // Editorial display sizes for hero/headlines
        "display-xl": ["clamp(3.5rem, 9vw, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1.0",  letterSpacing: "-0.035em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
      },
      boxShadow: {
        // Layered depth — not the typical flat shadow
        "deep":      "0 30px 80px -20px rgba(0,0,0,0.8), 0 12px 30px -10px rgba(0,0,0,0.6)",
        "glass":     "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 40px -20px rgba(0,0,0,0.6)",
        "neon-cyan": "0 0 0 1px rgba(94,234,212,0.25), 0 8px 28px -8px rgba(94,234,212,0.45)",
        "neon-vio":  "0 0 0 1px rgba(167,139,250,0.25), 0 8px 28px -8px rgba(167,139,250,0.45)",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "32px",
        "3xl": "56px",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        "radial-fade":
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(94,234,212,0.10), transparent 70%)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
        "grid-64": "64px 64px",
      },
      transitionTimingFunction: {
        // Apple-style easing
        "apple": "cubic-bezier(0.22, 1, 0.36, 1)",
        "spring-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
