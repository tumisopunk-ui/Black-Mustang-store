import React, { useState } from "react";
import {
  ShoppingCart, Menu, X, Star, Plus, Minus, Check, ChevronDown,
  ChevronRight, ChevronLeft, Truck, Leaf, ShieldCheck, Lock, ArrowRight,
} from "lucide-react";
import logoImg from "./assets/logo.jpg";
import brandVideo from "./assets/brand-video.mp4";
import brandVideoPoster from "./assets/brand-video-poster.jpg";

/* ---------------------------------- THEME ---------------------------------- */
const C = {
  bg: "#0B0B0D",
  bgAlt: "#131315",
  card: "#18181B",
  cardAlt: "#1E1E22",
  red: "#C4122F",
  redDark: "#7A0C1F",
  redGlow: "#E8203F",
  silver: "#CDD1D8",
  silverDim: "#8B8E95",
  text: "#F1EFEC",
  textDim: "#A6A4A0",
  border: "#28282C",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
.bm-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background:${C.bg}; color:${C.text}; }
.bm-display { font-family: 'Oswald', sans-serif; }
.bm-scroll::-webkit-scrollbar{ width:6px; }
.bm-scroll::-webkit-scrollbar-thumb{ background:${C.border}; border-radius:4px; }
`;

const PRODUCT = {
  name: "Black Mustang",
  sub: "Mpesu Root Powder",
  tagline: "Unleash Natural Strength",
  price: 29.99,
  comparePrice: 39.99,
  rating: 4.8,
  reviewCount: 312,
  weight: "12g Trial Pack",
};

const REVIEWS = [
  { initials: "J.M.", rating: 5, text: "Noticed a real lift in energy within the first week. Mixes clean into coffee, no grit." },
  { initials: "D.O.", rating: 5, text: "Been using traditional root before, this is the first packaged version that actually tastes and feels like the real thing." },
  { initials: "T.K.", rating: 4, text: "Trial pack is a good way to test it before committing to a bigger order. Already reordered." },
];

const FAQS = [
  { q: "How do I take it?", a: "Mix one level scoop (about 500mg–1g) into water, juice, or your usual drink, once daily. Best taken with a meal." },
  { q: "Is it safe?", a: "Black Mustang is a single-ingredient, wild-harvested root powder with no fillers. It's not intended for anyone under 18, and if you're pregnant, nursing, on medication, or managing a condition, check with a healthcare professional first." },
  { q: "What's actually in the pouch?", a: "100% pure Mpesu root powder (Bridelia cathartica). Nothing else — vegan, non-GMO, gluten-free." },
  { q: "How fast does it ship?", a: "Orders placed before 2pm ship the same day in discreet, unmarked packaging." },
];

/* --------------------------------- ICONS/ART -------------------------------- */
function Horseshoe({ size = 32, color = C.silver, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={style}>
      <path
        d="M50 6 C75 6 92 25 92 50 C92 69 81 84 68 93 L68 75 C77 67 82 58 82 48 C82 29 69 17 50 17 C31 17 18 29 18 48 C18 58 23 67 32 75 L32 93 C19 84 8 69 8 50 C8 25 25 6 50 6 Z"
        fill={color}
      />
      <circle cx="29" cy="86" r="4.5" fill={color} />
      <circle cx="71" cy="86" r="4.5" fill={color} />
    </svg>
  );
}

function Wordmark({ size = 1, color = C.silver, accent = C.red }) {
  return (
    <div className="bm-display" style={{ lineHeight: 0.95, color }}>
      <div style={{ fontSize: 12 * size, letterSpacing: 3 * size, fontWeight: 500, color: C.textDim }}>BLACK</div>
      <div style={{ fontSize: 26 * size, fontWeight: 700, letterSpacing: 1 * size, display: "flex", alignItems: "center", gap: 6 * size }}>
        MUSTANG
        <span style={{ display: "inline-block", width: 10 * size, height: 3 * size, background: accent, transform: "skewX(-20deg)" }} />
      </div>
    </div>
  );
}

function OctagonBadge({ top, big, bottom, size = 92 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        clipPath: "polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%, 71% 100%, 29% 100%, 0% 71%, 0% 29%)",
        background: `linear-gradient(155deg, ${C.cardAlt}, #0d0d0f)`,
        border: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 6,
        flexShrink: 0,
      }}
    >
      {top && <div className="bm-display" style={{ fontSize: 10, color: C.textDim, fontWeight: 500 }}>{top}</div>}
      <div className="bm-display" style={{ fontSize: 20, color: C.silver, fontWeight: 700, lineHeight: 1 }}>{big}</div>
      {bottom && <div className="bm-display" style={{ fontSize: 9, color: C.textDim, fontWeight: 500, marginTop: 2 }}>{bottom}</div>}
    </div>
  );
}

/* Stylised pouch illustration standing in for the product photo */
function PouchArt({ face = "front", width = 260 }) {
  const h = width * 1.32;
  return (
    <svg width={width} height={h} viewBox="0 0 260 344" fill="none">
      <defs>
        <linearGradient id="pouchBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c1c1f" />
          <stop offset="55%" stopColor="#0e0e10" />
          <stop offset="100%" stopColor="#050506" />
        </linearGradient>
        <linearGradient id="redSlash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.redGlow} />
          <stop offset="100%" stopColor={C.redDark} />
        </linearGradient>
      </defs>
      <path d="M18 40 Q18 14 46 14 L214 14 Q242 14 242 40 L250 300 Q250 330 218 330 L42 330 Q10 330 10 300 Z" fill="url(#pouchBody)" stroke="#000" strokeWidth="1" />
      <rect x="14" y="10" width="232" height="26" rx="8" fill="#0a0a0b" />
      <polygon points="150,14 246,14 250,60 190,110" fill="url(#redSlash)" opacity="0.92" />
      <polygon points="10,300 70,330 30,330 10,320" fill="url(#redSlash)" opacity="0.92" />
      {face === "front" ? (
        <>
          <Horseshoe size={54} color={C.silver} style={{ transform: "translate(103px,74px)" }} />
          <text x="130" y="168" textAnchor="middle" fontFamily="Oswald" fontSize="14" fill={C.textDim} letterSpacing="3">BLACK</text>
          <text x="130" y="196" textAnchor="middle" fontFamily="Oswald" fontSize="27" fontWeight="700" fill={C.silver} letterSpacing="1">MUSTANG</text>
          <text x="130" y="220" textAnchor="middle" fontFamily="Inter" fontSize="10.5" fontWeight="600" fill={C.textDim} letterSpacing="1.5">MPESU ROOT POWDER</text>
          <text x="130" y="238" textAnchor="middle" fontFamily="Inter" fontSize="9.5" fontWeight="600" fill={C.red} letterSpacing="1">UNLEASH NATURAL STRENGTH</text>
          <text x="130" y="300" textAnchor="middle" fontFamily="Inter" fontSize="10" fill={C.textDim}>12g</text>
        </>
      ) : (
        <>
          <rect x="34" y="60" width="192" height="210" rx="4" fill="none" stroke={C.border} />
          <text x="46" y="80" fontFamily="Inter" fontSize="9" fontWeight="700" fill={C.silver}>BLACK MUSTANG</text>
          <text x="46" y="100" fontFamily="Inter" fontSize="7.5" fill={C.textDim}>INGREDIENTS</text>
          <text x="46" y="112" fontFamily="Inter" fontSize="6.5" fill={C.textDim}>100% Pure Mpesu Root Powder.</text>
          <text x="46" y="122" fontFamily="Inter" fontSize="6.5" fill={C.textDim}>Wild-harvested. No fillers.</text>
          <text x="46" y="144" fontFamily="Inter" fontSize="7.5" fill={C.textDim}>SUGGESTED USE</text>
          <text x="46" y="156" fontFamily="Inter" fontSize="6.5" fill={C.textDim}>Mix 1 scoop into water or juice,</text>
          <text x="46" y="166" fontFamily="Inter" fontSize="6.5" fill={C.textDim}>once daily with a meal.</text>
          <text x="46" y="188" fontFamily="Inter" fontSize="7.5" fill={C.red}>WARNINGS</text>
          <text x="46" y="200" fontFamily="Inter" fontSize="6.5" fill={C.textDim}>Not for use under 18. Consult a</text>
          <text x="46" y="210" fontFamily="Inter" fontSize="6.5" fill={C.textDim}>doctor if pregnant or on medication.</text>
          <text x="46" y="250" fontFamily="Inter" fontSize="6.5" fill={C.silverDim}>VEGAN · NON-GMO · GLUTEN-FREE</text>
          <Horseshoe size={26} color={C.silverDim} style={{ transform: "translate(180px,240px)" }} />
        </>
      )}
    </svg>
  );
}

/* --------------------------------- SHARED UI --------------------------------- */
function Badge({ children }) {
  return (
    <span style={{ fontSize: 11, letterSpacing: 0.5, color: C.textDim, border: `1px solid ${C.border}`, borderRadius: 999, padding: "4px 10px" }}>
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick, full, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${C.redGlow}, ${C.redDark})`,
        color: "#fff",
        border: "none",
        borderRadius: 4,
        padding: "14px 26px",
        fontFamily: "Oswald",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 1,
        cursor: "pointer",
        width: full ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "filter .15s",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        color: C.silver,
        border: `1px solid ${C.border}`,
        borderRadius: 4,
        padding: "13px 24px",
        fontFamily: "Oswald",
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: 1,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function Stars({ rating, size = 14 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} color={C.red} fill={i <= Math.round(rating) ? C.red : "none"} />
      ))}
    </div>
  );
}

/* ---------------------------------- HEADER ---------------------------------- */
function Header({ view, onNav, cartCount }) {
  const [open, setOpen] = useState(false);
  const nav = [
    { k: "home", label: "Home" },
    { k: "pdp", label: "Shop" },
    { k: "about-section", label: "About" },
    { k: "faq-section", label: "FAQ" },
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(11,11,13,0.92)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => onNav("home")}>
          <div style={{ width: 38, height: 38, borderRadius: 8, overflow: "hidden", flexShrink: 0, border: `1px solid ${C.border}` }}>
            <img src={logoImg} alt="Black Mustang" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>
          <Wordmark size={0.72} />
        </div>
        <nav style={{ display: "flex", gap: 28 }} className="bm-nav-desktop">
          {nav.map((n) => (
            <button
              key={n.k}
              onClick={() => onNav(n.k)}
              className="bm-display"
              style={{ background: "none", border: "none", color: view === n.k ? C.silver : C.textDim, fontSize: 13, letterSpacing: 1.5, cursor: "pointer", paddingBottom: 4, borderBottom: view === n.k ? `2px solid ${C.red}` : "2px solid transparent" }}
            >
              {n.label.toUpperCase()}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setView("cart")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: C.silver, padding: 6 }}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: -2, right: -2, background: C.red, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 999, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- FOOTER ---------------------------------- */
function Footer({ setView }) {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, background: C.bgAlt, marginTop: 80 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 20px 28px", display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between" }}>
        <div style={{ maxWidth: 280 }}>
          <img src={logoImg} alt="Black Mustang" style={{ height: 84, width: "auto", marginBottom: 14, borderRadius: 8 }} />
          <p style={{ fontSize: 12.5, color: C.textDim, lineHeight: 1.6 }}>
            Wild-harvested Mpesu root, ground pure. One product. No shortcuts.
          </p>
        </div>
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          <div>
            <div className="bm-display" style={{ fontSize: 12, letterSpacing: 1.5, color: C.silverDim, marginBottom: 12 }}>SHOP</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => setView("pdp")} style={{ background: "none", border: "none", color: C.textDim, fontSize: 13, cursor: "pointer", textAlign: "left", padding: 0 }}>Black Mustang</button>
              <button onClick={() => setView("cart")} style={{ background: "none", border: "none", color: C.textDim, fontSize: 13, cursor: "pointer", textAlign: "left", padding: 0 }}>Your cart</button>
            </div>
          </div>
          <div>
            <div className="bm-display" style={{ fontSize: 12, letterSpacing: 1.5, color: C.silverDim, marginBottom: 12 }}>SUPPORT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.textDim }}>
              <span>Shipping &amp; returns</span>
              <span>Contact us</span>
              <span>Privacy policy</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "18px 20px", maxWidth: 1180, margin: "0 auto" }}>
        <p style={{ fontSize: 10.5, color: "#67676b", lineHeight: 1.6, maxWidth: 820 }}>
          These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          Not for use by persons under 18. Consult a healthcare professional before use if pregnant, nursing, taking medication, or managing a
          medical condition. © {new Date().getFullYear()} Black Mustang. This is a demo storefront — no real orders are placed.
        </p>
      </div>
    </footer>
  );
}

/* ----------------------------------- HOME ------------------------------------ */
function Home({ setView, addToCart }) {
  const [faqOpen, setFaqOpen] = useState(0);
  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${C.border}` }}>
        <Horseshoe size={620} color={C.bgAlt} style={{ position: "absolute", right: -160, top: -140, opacity: 0.5 }} />
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 20px 64px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center" }} className="bm-hero-grid">
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <span style={{ width: 26, height: 2, background: C.red }} />
              <span style={{ fontSize: 12.5, color: C.silverDim, letterSpacing: 2 }}>Wild-harvested · single ingredient</span>
            </div>
            <h1 className="bm-display" style={{ fontSize: "clamp(38px,5.4vw,64px)", fontWeight: 700, lineHeight: 1.03, margin: 0, color: C.text }}>
              Strength,<br /> the old way.
            </h1>
            <p style={{ fontSize: 16.5, color: C.textDim, lineHeight: 1.65, maxWidth: 440, marginTop: 22 }}>
              Black Mustang is 100% pure Mpesu root — the vitality root used across Africa for generations. No fillers, no blends, no shortcuts.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
              <PrimaryButton onClick={() => setView("pdp")}>SHOP BLACK MUSTANG <ArrowRight size={16} /></PrimaryButton>
              <GhostButton onClick={() => document.getElementById("root-cause")?.scrollIntoView({ behavior: "smooth" })}>WHAT'S INSIDE</GhostButton>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 30, flexWrap: "wrap" }}>
              <Badge>Vegan</Badge>
              <Badge>Non-GMO</Badge>
              <Badge>Gluten-Free</Badge>
              <Badge>18+ Only</Badge>
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <PouchArt width={230} />
              <div style={{ position: "absolute", left: -46, bottom: 10, display: "flex", flexDirection: "column", gap: 10 }}>
                <OctagonBadge top="12G" big="TRIAL" bottom="PACK" size={78} />
              </div>
              <div style={{ position: "absolute", right: -46, top: 30, display: "flex", flexDirection: "column", gap: 10 }}>
                <OctagonBadge top="2" big="DOSES" bottom="POWERFUL" size={78} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{ borderBottom: `1px solid ${C.border}`, background: C.bgAlt }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          {[
            { icon: Leaf, label: "Wild-harvested root" },
            { icon: ShieldCheck, label: "Non-GMO · gluten-free" },
            { icon: Truck, label: "Discreet, fast shipping" },
            { icon: Check, label: "No fillers, ever" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: C.textDim, fontSize: 13 }}>
              <t.icon size={17} color={C.red} /> {t.label}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about-section" style={{ maxWidth: 1180, margin: "0 auto", padding: "88px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18 }}>
          <span style={{ width: 26, height: 2, background: C.red }} />
          <span style={{ fontSize: 12.5, color: C.silverDim, letterSpacing: 2 }}>Who we are</span>
          <span style={{ width: 26, height: 2, background: C.red }} />
        </div>
        <h2 className="bm-display" style={{ fontSize: "clamp(28px,3.4vw,40px)", fontWeight: 700, margin: 0, marginBottom: 20, textAlign: "center" }}>
          Built by students who believe in African medicine.
        </h2>
        <p style={{ fontSize: 15.5, color: C.textDim, lineHeight: 1.75, maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          Black Mustang is run by a small team of university students who share two things: a love of health
          sciences, and a belief that African traditional medicine deserves the same care, quality, and respect
          as anything on a pharmacy shelf. We started this because we want African remedies taken seriously —
          beginning with a root our own communities have trusted for generations.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, marginTop: 48 }} className="bm-three-grid">
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 28 }}>
            <div className="bm-display" style={{ fontSize: 12.5, letterSpacing: 1.5, color: C.red, marginBottom: 10 }}>GROWING &amp; HARVESTING</div>
            <div className="bm-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Venda, Limpopo</div>
            <p style={{ fontSize: 13.5, color: C.textDim, lineHeight: 1.65 }}>
              Our Mpesu root is grown and wild-harvested with local farmers in Venda, where the soil and climate
              suit the plant best — and where our own roots are too.
            </p>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 28 }}>
            <div className="bm-display" style={{ fontSize: 12.5, letterSpacing: 1.5, color: C.red, marginBottom: 10 }}>PACKAGING &amp; QUALITY CONTROL</div>
            <div className="bm-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Johannesburg, Gauteng</div>
            <p style={{ fontSize: 13.5, color: C.textDim, lineHeight: 1.65 }}>
              The root is dried, ground, tested, and packed by our team in Johannesburg, where we're based as
              students keeping a close eye on quality from harvest to pouch.
            </p>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: 40, fontSize: 13.5, color: C.silverDim, fontStyle: "italic" }}>
          Our mission: to help heal the nation, one root at a time.
        </p>
      </section>

      {/* ABOUT MPESU */}
      <section id="root-cause" style={{ maxWidth: 1180, margin: "0 auto", padding: "88px 20px", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "center" }} className="bm-hero-grid">
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 340, aspectRatio: "1/1", borderRadius: 6, background: `linear-gradient(155deg, ${C.cardAlt}, #0a0a0b)`, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, transparent 55%, ${C.red} 56%, ${C.redDark} 62%, transparent 63%)`, opacity: 0.85 }} />
            <Horseshoe size={150} color={C.silver} />
          </div>
        </div>
        <div>
          <h2 className="bm-display" style={{ fontSize: "clamp(28px,3.4vw,40px)", fontWeight: 700, margin: 0, marginBottom: 18 }}>What is Mpesu root?</h2>
          <p style={{ fontSize: 15.5, color: C.textDim, lineHeight: 1.75, maxWidth: 560 }}>
            Mpesu root has been part of traditional West and Central African herbal practice for generations, valued for supporting
            energy, drive, and stamina. Black Mustang wild-harvests the root and grinds it into a single, unfiltered powder —
            nothing added, nothing hidden.
          </p>
          <ul style={{ marginTop: 26, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            {["100% Bridelia cathartica root — one ingredient", "Wild-harvested, never farmed with additives", "Ground fresh in small batches"].map((t, i) => (
              <li key={i} style={{ display: "flex", gap: 10, fontSize: 14.5, color: C.text }}>
                <Check size={18} color={C.red} style={{ flexShrink: 0, marginTop: 1 }} /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BRAND VIDEO */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 90px", display: "grid", gridTemplateColumns: "1fr 0.85fr", gap: 48, alignItems: "center" }} className="bm-hero-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 26, height: 2, background: C.red }} />
            <span style={{ fontSize: 12.5, color: C.silverDim, letterSpacing: 2 }}>See it up close</span>
          </div>
          <h2 className="bm-display" style={{ fontSize: "clamp(26px,3.2vw,36px)", fontWeight: 700, margin: 0, marginBottom: 16 }}>From root to pouch.</h2>
          <p style={{ fontSize: 15, color: C.textDim, lineHeight: 1.75, maxWidth: 440 }}>
            A quick look at the powder itself — pure Mpesu root, ground fine, with nothing else mixed in.
          </p>
        </div>
        <div style={{ position: "relative", justifySelf: "center" }}>
          <div style={{ position: "absolute", inset: -14, background: `linear-gradient(160deg, ${C.redDark}, transparent 60%)`, borderRadius: 20, opacity: 0.5, zIndex: 0 }} />
          <video
            src={brandVideo}
            poster={brandVideoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ position: "relative", zIndex: 1, width: 280, maxWidth: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 14, border: `1px solid ${C.border}`, display: "block" }}
          />
        </div>
      </section>

      {/* HOW TO USE */}
      <section style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 20px" }}>
          <h2 className="bm-display" style={{ fontSize: "clamp(26px,3vw,34px)", fontWeight: 700, marginBottom: 42, textAlign: "center" }}>Three steps. Once a day.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }} className="bm-three-grid">
            {[
              { n: "1", t: "Scoop", d: "One level scoop — about 500mg to 1g of pure root powder." },
              { n: "2", t: "Mix", d: "Stir into water, juice, or your usual morning drink." },
              { n: "3", t: "Take", d: "Once daily, ideally with a meal. That's the whole routine." },
            ].map((s, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 28 }}>
                <div className="bm-display" style={{ fontSize: 34, fontWeight: 700, color: C.red, marginBottom: 10 }}>{s.n}</div>
                <div className="bm-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontSize: 13.5, color: C.textDim, lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "88px 20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
          <h2 className="bm-display" style={{ fontSize: "clamp(26px,3vw,34px)", fontWeight: 700, margin: 0 }}>What early users say</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Stars rating={PRODUCT.rating} />
            <span style={{ fontSize: 13, color: C.textDim }}>{PRODUCT.rating} · {PRODUCT.reviewCount} reviews</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="bm-three-grid">
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 26 }}>
              <Stars rating={r.rating} size={13} />
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.65, marginTop: 14 }}>&ldquo;{r.text}&rdquo;</p>
              <div style={{ fontSize: 12, color: C.silverDim, marginTop: 16, letterSpacing: 1 }}>— {r.initials}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq-section" style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 20px" }}>
          <h2 className="bm-display" style={{ fontSize: "clamp(26px,3vw,34px)", fontWeight: 700, marginBottom: 30, textAlign: "center" }}>Questions, answered</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 6, background: C.card, overflow: "hidden" }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                  style={{ width: "100%", background: "none", border: "none", color: C.text, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: 14.5, fontWeight: 600, textAlign: "left" }}
                >
                  {f.q}
                  <ChevronDown size={18} color={C.silverDim} style={{ transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform .15s", flexShrink: 0 }} />
                </button>
                {faqOpen === i && <div style={{ padding: "0 20px 18px", fontSize: 13.5, color: C.textDim, lineHeight: 1.7 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${C.bg} 40%, ${C.redDark} 165%)` }} />
        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "90px 20px", textAlign: "center" }}>
          <h2 className="bm-display" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, margin: 0 }}>Ready to feel the difference?</h2>
          <p style={{ color: C.textDim, marginTop: 14, fontSize: 15 }}>Trial pack ships today. Cancel or reorder anytime.</p>
          <div style={{ marginTop: 30 }}>
            <PrimaryButton onClick={() => { addToCart(); setView("cart"); }}>ADD TO CART · ${PRODUCT.price}</PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ----------------------------------- PDP ------------------------------------- */
function PDP({ addToCart, setView }) {
  const [face, setFace] = useState("front");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");
  const tabs = {
    desc: "Black Mustang is a single-ingredient supplement: 100% pure Mpesu root powder (Bridelia cathartica), wild-harvested and ground with no fillers or additives. Vegan, non-GMO, and gluten-free.",
    ingredients: "100% Pure Mpesu Root Powder (Bridelia cathartica). Wild-harvested, all-natural. No fillers or additives.",
    use: "Mix 1 scoop (approx. 500mg–1g) into water, juice, or your favorite beverage. Take once daily, or as directed by a healthcare professional. Best taken with a meal.",
    warnings: "Keep out of reach of children. Not intended for use by persons under 18. Consult a healthcare professional before use if pregnant, nursing, taking any medication, or managing a medical condition. Store in a cool, dry place, away from sunlight. Do not use if the seal is broken.",
  };
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "36px 20px 90px" }}>
      <div style={{ fontSize: 12.5, color: C.textDim, marginBottom: 28, display: "flex", gap: 6, alignItems: "center" }}>
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: C.textDim, cursor: "pointer", padding: 0, fontSize: 12.5 }}>Home</button>
        <ChevronRight size={13} /> <span style={{ color: C.silver }}>Black Mustang</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1fr", gap: 56 }} className="bm-hero-grid">
        {/* Gallery */}
        <div>
          <div style={{ background: `linear-gradient(155deg, ${C.cardAlt}, #0a0a0b)`, border: `1px solid ${C.border}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", padding: 36 }}>
            <PouchArt face={face} width={230} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
            {["front", "back"].map((f) => (
              <button
                key={f}
                onClick={() => setFace(f)}
                style={{ background: face === f ? C.card : "transparent", border: `1px solid ${face === f ? C.silverDim : C.border}`, borderRadius: 6, padding: "10px 18px", color: C.silver, fontSize: 12.5, cursor: "pointer", textTransform: "capitalize" }}
              >
                {f} of pack
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div style={{ fontSize: 12.5, color: C.silverDim, letterSpacing: 1.5, marginBottom: 8 }}>{PRODUCT.sub.toUpperCase()}</div>
          <h1 className="bm-display" style={{ fontSize: "clamp(30px,3.6vw,42px)", fontWeight: 700, margin: 0 }}>{PRODUCT.name}</h1>
          <p style={{ color: C.red, fontSize: 13.5, fontWeight: 600, marginTop: 6, letterSpacing: 0.5 }}>{PRODUCT.tagline}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
            <Stars rating={PRODUCT.rating} />
            <span style={{ fontSize: 13, color: C.textDim }}>{PRODUCT.rating} ({PRODUCT.reviewCount} reviews)</span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 22 }}>
            <span className="bm-display" style={{ fontSize: 30, fontWeight: 700 }}>${PRODUCT.price}</span>
            <span style={{ fontSize: 16, color: C.silverDim, textDecoration: "line-through" }}>${PRODUCT.comparePrice}</span>
            <Badge>{PRODUCT.weight}</Badge>
          </div>

          <p style={{ fontSize: 14.5, color: C.textDim, lineHeight: 1.7, marginTop: 22, maxWidth: 460 }}>{tabs.desc}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 30 }}>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 4 }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: "none", border: "none", color: C.silver, padding: "10px 14px", cursor: "pointer" }}><Minus size={14} /></button>
              <span style={{ width: 30, textAlign: "center", fontSize: 14 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ background: "none", border: "none", color: C.silver, padding: "10px 14px", cursor: "pointer" }}><Plus size={14} /></button>
            </div>
            <PrimaryButton onClick={() => addToCart(qty)} style={{ flex: 1 }}>
              <ShoppingCart size={16} /> ADD TO CART
            </PrimaryButton>
          </div>
          <button
            onClick={() => { addToCart(qty); setView("checkout"); }}
            className="bm-display"
            style={{ marginTop: 12, width: "100%", background: "none", border: `1px solid ${C.border}`, color: C.silver, padding: "13px 24px", borderRadius: 4, fontSize: 13, letterSpacing: 1, cursor: "pointer" }}
          >
            BUY IT NOW
          </button>

          <div style={{ display: "flex", gap: 18, marginTop: 26, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, color: C.textDim }}><Truck size={15} color={C.red} /> Ships same day</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, color: C.textDim }}><Lock size={15} color={C.red} /> Discreet packaging</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, color: C.textDim }}><Leaf size={15} color={C.red} /> Single ingredient</div>
          </div>

          {/* Tabs */}
          <div style={{ marginTop: 40, borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: 22, marginTop: 18 }}>
              {[["desc", "Description"], ["ingredients", "Ingredients"], ["use", "Suggested use"], ["warnings", "Warnings"]].map(([k, l]) => (
                <button key={k} onClick={() => setTab(k)} className="bm-display" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12.5, letterSpacing: 0.5, color: tab === k ? C.silver : C.textDim, paddingBottom: 8, borderBottom: tab === k ? `2px solid ${C.red}` : "2px solid transparent" }}>
                  {l}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 13.5, color: C.textDim, lineHeight: 1.75, marginTop: 18, maxWidth: 480 }}>{tabs[tab]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- CART ------------------------------------- */
function Cart({ cart, updateQty, removeItem, setView }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 && subtotal < 50 ? 5.99 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "110px 20px", textAlign: "center" }}>
        <Horseshoe size={70} color={C.border} style={{ margin: "0 auto 24px" }} />
        <h2 className="bm-display" style={{ fontSize: 26, fontWeight: 700 }}>Your cart is empty</h2>
        <p style={{ color: C.textDim, fontSize: 14, marginTop: 10 }}>Add Black Mustang to get started.</p>
        <div style={{ marginTop: 26 }}><PrimaryButton onClick={() => setView("pdp")}>SHOP BLACK MUSTANG</PrimaryButton></div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 20px 100px" }}>
      <h1 className="bm-display" style={{ fontSize: 30, fontWeight: 700, marginBottom: 32 }}>Your cart</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40 }} className="bm-hero-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 18, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 18, alignItems: "center" }}>
              <div style={{ background: C.bgAlt, borderRadius: 6, padding: 8 }}><PouchArt width={54} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{item.name}</div>
                <div style={{ fontSize: 12.5, color: C.textDim, marginTop: 3 }}>{item.weight}</div>
                <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", color: C.silverDim, fontSize: 12, cursor: "pointer", padding: 0, marginTop: 8 }}>Remove</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 4 }}>
                <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))} style={{ background: "none", border: "none", color: C.silver, padding: "8px 12px", cursor: "pointer" }}><Minus size={13} /></button>
                <span style={{ width: 24, textAlign: "center", fontSize: 13 }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: "none", border: "none", color: C.silver, padding: "8px 12px", cursor: "pointer" }}><Plus size={13} /></button>
              </div>
              <div style={{ width: 70, textAlign: "right", fontWeight: 600, fontFamily: "Oswald" }}>${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
          <button onClick={() => setView("pdp")} style={{ background: "none", border: "none", color: C.silverDim, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginTop: 6, padding: 0 }}>
            <ChevronLeft size={14} /> Continue shopping
          </button>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 26, alignSelf: "start" }}>
          <div className="bm-display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 18 }}>Order summary</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: C.textDim, marginBottom: 10 }}>
            <span>Subtotal</span><span style={{ color: C.text }}>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: C.textDim, marginBottom: 10 }}>
            <span>Shipping</span><span style={{ color: C.text }}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, margin: "14px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, marginBottom: 22 }}>
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <PrimaryButton full onClick={() => setView("checkout")}>PROCEED TO CHECKOUT <ArrowRight size={16} /></PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- CHECKOUT ----------------------------------- */
function Checkout({ cart, setView }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 && subtotal < 50 ? 5.99 : 0;
  const total = subtotal + shipping;
  const [pay, setPay] = useState("card");

  const inputStyle = { width: "100%", background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 5, padding: "11px 12px", color: C.text, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  const label = { fontSize: 12, color: C.textDim, marginBottom: 6, display: "block" };

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "48px 20px 100px" }}>
      <button onClick={() => setView("cart")} style={{ background: "none", border: "none", color: C.textDim, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0, marginBottom: 20 }}>
        <ChevronLeft size={14} /> Back to cart
      </button>
      <h1 className="bm-display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 30 }}>Checkout</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 44 }} className="bm-hero-grid">
        <div>
          <div className="bm-display" style={{ fontSize: 14, letterSpacing: 1, color: C.silverDim, marginBottom: 14 }}>SHIPPING ADDRESS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div><span style={label}>Full name</span><input style={inputStyle} placeholder="Jordan Kabila" /></div>
            <div><span style={label}>Email</span><input style={inputStyle} placeholder="you@example.com" /></div>
          </div>
          <div style={{ marginBottom: 14 }}><span style={label}>Street address</span><input style={inputStyle} placeholder="123 Freedom Ave" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 30 }}>
            <div><span style={label}>City</span><input style={inputStyle} placeholder="Johannesburg" /></div>
            <div><span style={label}>Province / state</span><input style={inputStyle} placeholder="Gauteng" /></div>
            <div><span style={label}>Postal code</span><input style={inputStyle} placeholder="2000" /></div>
          </div>

          <div className="bm-display" style={{ fontSize: 14, letterSpacing: 1, color: C.silverDim, marginBottom: 14 }}>PAYMENT</div>
          <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
            {["card", "paypal"].map((p) => (
              <button key={p} onClick={() => setPay(p)} style={{ flex: 1, padding: "12px 14px", borderRadius: 5, border: `1px solid ${pay === p ? C.red : C.border}`, background: pay === p ? "rgba(196,18,47,0.08)" : C.bgAlt, color: C.text, fontSize: 13, cursor: "pointer", textTransform: "capitalize" }}>
                {p === "card" ? "Credit / debit card" : "PayPal"}
              </button>
            ))}
          </div>
          {pay === "card" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ gridColumn: "1 / -1" }}><span style={label}>Card number</span><input style={inputStyle} placeholder="•••• •••• •••• 4242" /></div>
              <div><span style={label}>Expiry</span><input style={inputStyle} placeholder="MM / YY" /></div>
              <div><span style={label}>CVC</span><input style={inputStyle} placeholder="123" /></div>
            </div>
          )}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 26, alignSelf: "start" }}>
          <div className="bm-display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 18 }}>Order summary</div>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.textDim, marginBottom: 10 }}>
              <span>{item.name} × {item.qty}</span><span style={{ color: C.text }}>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}`, margin: "14px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: C.textDim, marginBottom: 10 }}>
            <span>Shipping</span><span style={{ color: C.text }}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, margin: "14px 0 22px" }}>
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <PrimaryButton full onClick={() => setView("confirmation")}><Lock size={14} /> PLACE ORDER</PrimaryButton>
          <p style={{ fontSize: 10.5, color: C.silverDim, textAlign: "center", marginTop: 12 }}>Demo checkout — no payment is processed.</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- CONFIRMATION --------------------------------- */
function Confirmation({ setView, orderNumber }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "120px 20px", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(196,18,47,0.12)", border: `1px solid ${C.red}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <Check size={30} color={C.red} />
      </div>
      <h1 className="bm-display" style={{ fontSize: 28, fontWeight: 700 }}>Order confirmed</h1>
      <p style={{ color: C.textDim, fontSize: 14, marginTop: 10 }}>Order #{orderNumber} · A confirmation would normally be emailed to you.</p>
      <div style={{ marginTop: 30 }}><PrimaryButton onClick={() => setView("home")}>CONTINUE SHOPPING</PrimaryButton></div>
    </div>
  );
}

/* ------------------------------------ APP -------------------------------------- */
export default function App() {
  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 899999));

  const addToCart = (qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === "bm-trial");
      if (existing) return prev.map((i) => (i.id === "bm-trial" ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id: "bm-trial", name: PRODUCT.name, weight: PRODUCT.weight, price: PRODUCT.price, qty }];
    });
  };
  const updateQty = (id, qty) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const goTo = (key) => {
    if (key === "home" || key === "pdp") {
      setView(key);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setView("home");
    setTimeout(() => document.getElementById(key)?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  return (
    <div className="bm-root" style={{ minHeight: "100vh" }}>
      <style>{FONTS}</style>
      <style>{`
        @media (max-width: 860px) {
          .bm-hero-grid { grid-template-columns: 1fr !important; }
          .bm-three-grid { grid-template-columns: 1fr !important; }
          .bm-nav-desktop { display: none !important; }
        }
      `}</style>
      <Header view={view} onNav={goTo} cartCount={cartCount} />
      {view === "home" && <Home setView={setView} addToCart={addToCart} />}
      {view === "pdp" && <PDP addToCart={addToCart} setView={setView} />}
      {view === "cart" && <Cart cart={cart} updateQty={updateQty} removeItem={removeItem} setView={setView} />}
      {view === "checkout" && <Checkout cart={cart} setView={setView} />}
      {view === "confirmation" && <Confirmation setView={setView} orderNumber={orderNumber} />}
      <Footer setView={setView} />
    </div>
  );
}
