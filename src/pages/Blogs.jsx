import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

/* ============================================================
   BLOG POSTS — LeetCode pattern writeups
   Replace dummy entries with real posts as you write them.
   ============================================================ */

const POSTS = [
  {
    id: "01",
    title: "Two Sum",
    leetcodeNum: "1",
    difficulty: "easy",
    pattern: "Hash Map",
    intuition:
      "Brute force checks every pair (O(n²)). Trade space for time: store seen values in a hash map, then for each new number ask 'has its complement appeared before?'",
    approach: "Single-pass hash map. For each nums[i], check if target − nums[i] exists in the map.",
    complexity: { time: "O(n)", space: "O(n)" },
    href: "https://github.com/mayurpatle",
    date: "Aug 2025",
    featured: true,
    tags: ["array", "hashmap"],
  },
  {
    id: "02",
    title: "Longest Substring Without Repeating Characters",
    leetcodeNum: "3",
    difficulty: "medium",
    pattern: "Sliding Window",
    intuition:
      "When a duplicate appears, the window's left edge must jump just past the previous occurrence. Track last-seen index per character.",
    approach: "Sliding window with a hash map of char → last index. Move left to max(left, lastSeen[char] + 1).",
    complexity: { time: "O(n)", space: "O(min(n, m))" },
    href: "https://github.com/mayurpatle",
    date: "Aug 2025",
    tags: ["string", "sliding-window"],
  },
  {
    id: "03",
    title: "Number of Islands",
    leetcodeNum: "200",
    difficulty: "medium",
    pattern: "Graphs",
    intuition:
      "Every '1' you haven't visited starts a new island. Sink the entire connected component before counting the next.",
    approach: "Iterate the grid; on unvisited '1', DFS in 4 directions and mark cells visited. Increment count per outer entry.",
    complexity: { time: "O(m·n)", space: "O(m·n)" },
    href: "https://github.com/mayurpatle",
    date: "Sep 2025",
    tags: ["matrix", "dfs", "bfs"],
  },
  {
    id: "04",
    title: "Coin Change",
    leetcodeNum: "322",
    difficulty: "medium",
    pattern: "Dynamic Programming",
    intuition:
      "Bottom-up: for each amount from 1 to N, minimum coins is 1 + min(dp[amount − coin]) across all coins. Build smaller answers first.",
    approach: "1D DP array of size amount+1. Initialize to amount+1 (sentinel), dp[0]=0. Fill in O(amount × |coins|).",
    complexity: { time: "O(amount · n)", space: "O(amount)" },
    href: "https://github.com/mayurpatle",
    date: "Sep 2025",
    tags: ["dp", "unbounded-knapsack"],
  },
  {
    id: "05",
    title: "Top K Frequent Elements",
    leetcodeNum: "347",
    difficulty: "medium",
    pattern: "Heap",
    intuition:
      "Heap gives O(n log k) — fine. But bucket sort by frequency hits O(n) since frequencies are bounded by n.",
    approach: "Count frequencies → bucket-sort into array indexed by frequency → walk from high to low, collect first k.",
    complexity: { time: "O(n)", space: "O(n)" },
    href: "https://github.com/mayurpatle",
    date: "Oct 2025",
    tags: ["heap", "bucket-sort"],
  },
  {
    id: "06",
    title: "Course Schedule",
    leetcodeNum: "207",
    difficulty: "medium",
    pattern: "Graphs",
    intuition:
      "Detect a cycle in a directed graph. Kahn's algorithm processes nodes with zero in-degree; if you can't process all, there's a cycle.",
    approach: "Build adjacency list + in-degree array. Queue zero in-degree nodes, remove edges, repeat. Cycle iff processed < total.",
    complexity: { time: "O(V + E)", space: "O(V + E)" },
    href: "https://github.com/mayurpatle",
    date: "Oct 2025",
    tags: ["graph", "topo-sort", "cycle-detection"],
  },
  {
    id: "07",
    title: "Trapping Rain Water",
    leetcodeNum: "42",
    difficulty: "hard",
    pattern: "Two Pointers",
    intuition:
      "Water above bar i = min(maxLeft, maxRight) − height[i]. Two pointers track these maxes from both ends, moving the smaller side inward.",
    approach: "Two pointers. Maintain leftMax, rightMax. Always process the smaller side; update its max or accumulate water.",
    complexity: { time: "O(n)", space: "O(1)" },
    href: "https://github.com/mayurpatle",
    date: "Nov 2025",
    tags: ["array", "two-pointers"],
  },
  {
    id: "08",
    title: "Validate Binary Search Tree",
    leetcodeNum: "98",
    difficulty: "medium",
    pattern: "Trees",
    intuition:
      "Local left < node < right isn't enough — a deep right-grandchild can violate the global BST invariant. Pass down min/max bounds.",
    approach: "Recursive DFS with (low, high) range. Each node must satisfy low < node.val < high; recurse with tightened bounds.",
    complexity: { time: "O(n)", space: "O(h)" },
    href: "https://github.com/mayurpatle",
    date: "Nov 2025",
    tags: ["tree", "dfs", "bst"],
  },
];

const PATTERNS = ["All", "Hash Map", "Sliding Window", "Graphs", "Dynamic Programming", "Heap", "Two Pointers", "Trees"];

const difficultyMap = {
  easy:   { color: "#34D399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.35)" },
  medium: { color: "#FCD34D", bg: "rgba(252,211,77,0.12)", border: "rgba(252,211,77,0.35)" },
  hard:   { color: "#FB7185", bg: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.35)" },
};

/* ============================================================
   FEATURED POST — large hero card at top
   ============================================================ */

function FeaturedPost({ post }) {
  const cardRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sy = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 6);
    rx.set(-(py - 0.5) * 5);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const d = difficultyMap[post.difficulty];

  return (
    <motion.a
      href={post.href}
      target="_blank"
      rel="noreferrer"
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", transformPerspective: 1400 }}
      className="group relative col-span-1 block md:col-span-2"
    >
      <div className="glass relative overflow-hidden rounded-3xl p-7 transition-all duration-700 ease-apple group-hover:border-white/20 md:p-10">

        {/* Violet gradient mesh background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(168,85,247,0.35), transparent 55%)," +
              "radial-gradient(circle at 20% 90%, rgba(124,58,237,0.25), transparent 55%)",
          }}
        />

        {/* Big problem number watermark */}
        <div
          className="pointer-events-none absolute -right-8 -top-12 font-display text-[16rem] leading-none text-white/[0.04]"
          style={{ transform: "translateZ(40px)" }}
        >
          #{post.leetcodeNum}
        </div>

        {/* Featured badge */}
        <div className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-neon-violet/30 bg-neon-violet/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neon-violet">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-violet animate-pulse" />
          Featured · pattern study
        </div>

        <div className="relative grid gap-6 md:grid-cols-2" style={{ transform: "translateZ(30px)" }}>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neon-violet">
              LC #{post.leetcodeNum} · {post.pattern}
            </p>
            <h3 className="mt-2 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              {post.title}
            </h3>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className="rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
                style={{ color: d.color, background: d.bg, borderColor: d.border }}
              >
                {post.difficulty}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {post.date}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                Intuition
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {post.intuition}
              </p>
              <br />
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                Approach
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {post.approach}
              </p>
            </div>

            <div className="font-mono text-xs">
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                  <p className="text-[9px] uppercase tracking-widest text-white/40">Time</p>
                  <p className="mt-0.5 text-neon-violet">{post.complexity.time}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                  <p className="text-[9px] uppercase tracking-widest text-white/40">Space</p>
                  <p className="mt-0.5 text-neon-violet">{post.complexity.space}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-white/55">↗ View solution on GitHub</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all group-hover:border-neon-violet group-hover:bg-neon-violet group-hover:text-ink-950">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.a>
  );
}

/* ============================================================
   STANDARD POST CARD
   ============================================================ */

function PostCard({ post }) {
  const cardRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sy = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 6);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const d = difficultyMap[post.difficulty];

  return (
    <motion.a
      href={post.href}
      target="_blank"
      rel="noreferrer"
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", transformPerspective: 1200 }}
      className="group relative block"
    >
      <div className="glass relative h-full min-h-[320px] overflow-hidden rounded-3xl p-6 transition-all duration-700 ease-apple group-hover:border-white/20">
        {/* Violet hover glow */}
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-neon-violet opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30" />

        <div className="relative flex h-full flex-col justify-between gap-5" style={{ transform: "translateZ(20px)" }}>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-neon-violet">
                LC #{post.leetcodeNum}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {post.pattern}
              </span>
            </div>

            <h3 className="font-display text-2xl leading-tight tracking-tight">
              {post.title}
            </h3>

            <div className="mt-3 flex items-center gap-2">
              <span
                className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                style={{ color: d.color, background: d.bg, borderColor: d.border }}
              >
                {post.difficulty}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">
                {post.date}
              </span>
            </div>
            <br />
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                Intuition
              </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {post.intuition}
            </p>
            <br />
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                Approach
              </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {post.approach}
            </p>
          </div>

          <div>
            <div className="mb-3 grid grid-cols-2 gap-2 font-mono text-[10px]">
              <div className="rounded border border-white/10 bg-white/[0.03] px-2 py-1.5">
                <span className="text-white/40">Time</span>
                <span className="ml-2 text-neon-violet">{post.complexity.time}</span>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.03] px-2 py-1.5">
                <span className="text-white/40">Space</span>
                <span className="ml-2 text-neon-violet">{post.complexity.space}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs">
              <span className="text-white/55">↗ Solution</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all group-hover:border-neon-violet group-hover:bg-neon-violet group-hover:text-ink-950">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* ============================================================
   PATTERN FILTER CHIPS
   ============================================================ */

function PatternFilter({ active, setActive, counts }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PATTERNS.map((p) => {
        const isActive = active === p;
        const count = counts[p] || 0;
        return (
          <button
            key={p}
            data-cursor="hover"
            onClick={() => setActive(p)}
            className={`group relative rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all ${
              isActive
                ? "border-neon-violet/50 bg-neon-violet/15 text-neon-violet"
                : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white/85"
            }`}
            style={isActive ? {
              boxShadow: "inset 0 0 0 1px rgba(168,85,247,0.25), 0 0 24px rgba(168,85,247,0.18)",
            } : {}}
          >
            <span>{p}</span>
            <span className={`ml-2 text-[9px] ${isActive ? "text-neon-violet/70" : "text-white/35"}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   STATS BAR — violet themed
   ============================================================ */

function StatsBar() {
  const stats = [
    { k: POSTS.length.toString(), l: "writeups" },
    { k: "08", l: "patterns covered" },
    { k: "500+", l: "problems solved" },
    { k: "Java", l: "primary language" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {stats.map((s, i) => (
        <motion.div
          key={s.l}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-2 border-neon-violet/40 pl-4"
        >
          <div className="font-display text-3xl text-white md:text-4xl">{s.k}</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/45">
            {s.l}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function Blogs() {
  const [activePattern, setActivePattern] = useState("All");

  const counts = useMemo(() => {
    const c = { All: POSTS.length };
    POSTS.forEach((p) => {
      c[p.pattern] = (c[p.pattern] || 0) + 1;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    if (activePattern === "All") return POSTS;
    return POSTS.filter((p) => p.pattern === activePattern);
  }, [activePattern]);

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== (featured && featured.id));

  return (
    <main className="relative z-10 min-h-screen pb-20 pt-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">

        {/* Back link */}
        <Reveal>
          <Link
            to="/"
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back home
          </Link>
        </Reveal>

        {/* HERO */}
        <div className="mt-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-violet">
              [ Notebook · pattern study ]
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="mt-5 font-display leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", letterSpacing: "-0.035em" }}
            >
              How I think
              <br />
              <span className="italic-display text-white/45">in patterns.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-6 max-w-2xl text-base text-white/60 md:text-lg">
              Short writeups on data-structure problems. Pattern, intuition, optimal approach,
              complexity. Each one links to the working code.{" "}
              <span className="text-white/85">Brevity is the point.</span>
            </p>
          </Reveal>
        </div>

        {/* STATS */}
        <Reveal delay={0.35}>
          <div className="mt-10 border-y border-white/10 py-7">
            <StatsBar />
          </div>
        </Reveal>

        {/* PATTERN FILTER */}
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <PatternFilter active={activePattern} setActive={setActivePattern} counts={counts} />

            <AnimatePresence mode="wait">
              <motion.p
                key={activePattern}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-xs uppercase tracking-widest text-white/45"
              >
                {`// ${filtered.length} ${filtered.length === 1 ? "writeup" : "writeups"}`}
                {activePattern !== "All" && ` · ${activePattern.toLowerCase()}`}
              </motion.p>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* POSTS GRID */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePattern}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 md:grid-cols-2"
            >
              {featured && <FeaturedPost post={featured} />}
              {rest.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                No writeups for this pattern yet.
              </p>
              <p className="mt-3 font-display italic-display text-xl text-white/55">
                More coming soon.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="mt-24 border-t border-white/10 pt-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-violet">
              [ Want the full notebook? ]
            </p>
            <h2
              className="mt-5 font-display"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", lineHeight: "1.05", letterSpacing: "-0.025em" }}
            >
              500+ problems. <em className="italic-display text-white/55">All on GitHub.</em>
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-white/60">
              Every solution committed with notes, alternative approaches, and edge-case tests.
              The blog posts here are the curated highlights.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <a
                  href="https://github.com/mayurpatle"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-neon-violet px-6 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-white"
                >
                  Browse the repo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="https://leetcode.com/u/mayurpatle/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:text-white"
                >
                  LeetCode profile
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>

      </div>
    </main>
  );
}