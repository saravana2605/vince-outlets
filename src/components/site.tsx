import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Instagram,
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  Shirt,
  Upload,
  Printer,
  Package,
  Sparkles,
  Star,
  CheckCircle2,
  ShieldCheck,
  Layers,
  ChevronDown,
  Eye,
  SlidersHorizontal,
  Maximize2,
  Tag,
} from "lucide-react";
import vincelogoOpt from "@/assets/vincelogo-opt.png";
import hero from "@/assets/hero.jpg";

// New authentic collection images from Puducherry workshop
import racingCollageTee from "@/assets/products/racing-collage-tee.webp";
import thalapathyPosterTee from "@/assets/products/thalapathy-poster-tee.webp";
import ajithThalaTee from "@/assets/products/ajith-thala-tee.webp";
import strFilmCollageTee from "@/assets/products/str-film-collage-tee.webp";
import burgundyCartoonTee from "@/assets/products/burgundy-cartoon-tee.webp";
import dhoniTributeTee from "@/assets/products/dhoni-tribute-tee.webp";
import murugaVelTee from "@/assets/products/muruga-vel-tee.webp";
import neonSceneTee from "@/assets/products/neon-scene-tee.webp";
import redDragonTee from "@/assets/products/red-dragon-tee.webp";
import sureshRainaTee from "@/assets/products/suresh-raina-tee.webp";
import vintageMuruganTee from "@/assets/products/vintage-murugan-tee.webp";
import hoodie from "@/assets/products/hoodie-optimized.webp";
import sweatshirt from "@/assets/products/sweatshirt-optimized.webp";
import blackSweatshirt from "@/assets/products/black-sweatshirt.webp";
import betterDaysSweatshirt from "@/assets/products/better-days-sweatshirt.webp";
import cloudmasaLogo from "@/assets/cloudmasa-logo.png";

import {
  PRODUCTS,
  MSG,
  waLink,
  productMsg,
  inr,
  INSTAGRAM,
  GOOGLE_REVIEWS_URL,
  CLOUDMASA_URL,
  PHONE,
  WA_DISPLAY,
  WA_NUMBER,
  ADDRESS,
  MAPS_URL,
  MAPS_EMBED,
  type Product,
} from "@/lib/site-data";
import { GarmentViewer3D } from "@/components/GarmentViewer3D";
import { ScrambleText } from "@/components/ScrambleText";

// Front primary view (Angle 1) mapped to authentic streetwear mockups
const PRODUCT_IMAGES: Record<string, string> = {
  "OVERSIZED - UNISEX": racingCollageTee,
  "REGULAR FIT - UNISEX": ajithThalaTee,
  "HOODIE - UNISEX": hoodie,
  "SWEATSHIRT - UNISEX": blackSweatshirt,
  "POLO - UNISEX": burgundyCartoonTee,
  CROPTOPS: neonSceneTee,
  "KIDS - UNISEX": vintageMuruganTee,
};

// Secondary detail views for angle toggle (Angle 2 / Back / Alternate graphic)
const PRODUCT_IMAGES_BACK: Record<string, string> = {
  "OVERSIZED - UNISEX": thalapathyPosterTee,
  "REGULAR FIT - UNISEX": strFilmCollageTee,
  "HOODIE - UNISEX": hoodie,
  "SWEATSHIRT - UNISEX": betterDaysSweatshirt,
  "POLO - UNISEX": dhoniTributeTee,
  CROPTOPS: redDragonTee,
  "KIDS - UNISEX": sureshRainaTee,
};

const NAV = [
  ["HOME", "#home"],
  ["T-SHIRT 3D", "#custom-tshirt"],
  ["HOODIE 3D", "#custom-hoodie"],
  ["FULL SLEEVE 3D", "#custom-fullsleeve"],
  ["COLLECTION", "#collection"],
  ["ARCHIVE", "#archive"],
  ["WHY VINCE", "#why"],
  ["BULK ORDERS", "#bulk"],
  ["STUDIO", "#contact"],
] as const;

/* ═══ OFFICIAL WHATSAPP BRAND ICON ═══ */
export function WhatsAppIcon({
  className = "w-4 h-4",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.502-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.135-.136.301-.351.451-.527.151-.175.201-.3.301-.501.1-.201.05-.376-.025-.526-.075-.151-.676-1.629-.927-2.23-.244-.587-.493-.507-.677-.517l-.577-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.507 0 1.479 1.078 2.908 1.228 3.109.15.201 2.121 3.238 5.138 4.542.718.31 1.279.496 1.716.634.721.229 1.377.197 1.896.12.578-.087 1.782-.727 2.032-1.429.251-.702.251-1.303.176-1.429-.076-.126-.276-.201-.577-.351z" />
      <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.954.563 3.778 1.536 5.32L2 22l4.82-1.498a9.96 9.96 0 0 0 5.184 1.506c5.518 0 10.004-4.486 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.243c-1.623 0-3.14-.46-4.444-1.258l-.319-.193-2.862.89.907-2.79-.208-.33a8.217 8.217 0 0 1-1.314-4.568c0-4.565 3.714-8.279 8.24-8.279 4.526 0 8.24 3.714 8.24 8.279 0 4.565-3.714 8.279-8.24 8.279z" />
    </svg>
  );
}

export function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ═══ STREETWEAR REFINED BUTTONS ═══ */
export function BracketButton({
  children,
  onClick,
  href,
  className = "",
  variant = "default",
  target,
  rel,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "default" | "gold";
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
}) {
  const baseClass =
    variant === "gold" ? "btn-streetwear-primary" : "btn-streetwear-secondary";

  const content = (
    <span className="inline-flex items-center gap-2">{children}</span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${baseClass} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      {content}
    </button>
  );
}

export function WhatsAppButton({
  text,
  children,
  className = "",
  variant = "gold",
}: {
  text: string;
  children: ReactNode;
  className?: string;
  variant?: "gold" | "default";
}) {
  return (
    <BracketButton
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      className={className}
    >
      <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
      {children}
    </BracketButton>
  );
}

/* ═══ 3D GARMENT COLOUR CUSTOMISER PALETTES ═══ */
export interface ColorOption {
  name: string;
  hex: string;
  bgHex: string;
}

// Exact professional streetwear 6-colour palette across all 3 garments
export const STREETWEAR_COLORS: ColorOption[] = [
  { name: "Jet Black", hex: "#111111", bgHex: "#111111" },
  { name: "Racing Red", hex: "#D71920", bgHex: "#D71920" },
  { name: "Royal Navy Blue", hex: "#123B73", bgHex: "#123B73" },
  { name: "Vibrant Orange", hex: "#F47721", bgHex: "#F47721" },
  { name: "Heather Grey", hex: "#A7A9AC", bgHex: "#A7A9AC" },
  { name: "Pure White", hex: "#FFFFFF", bgHex: "#FFFFFF" },
];

// Pure White (#FFFFFF) is the required default for all 3 products
export const DEFAULT_GARMENT_COLOR: ColorOption = STREETWEAR_COLORS[5]!;

export const TSHIRT_COLORS = STREETWEAR_COLORS;
export const HOODIE_COLORS = STREETWEAR_COLORS;
export const FULLSLEEVE_COLORS = STREETWEAR_COLORS;

export function ColorSwatchPicker({
  colors = STREETWEAR_COLORS,
  selectedColor,
  onSelectColor,
  label = "GARMENT COLOUR",
}: {
  colors?: ColorOption[];
  selectedColor: ColorOption;
  onSelectColor: (c: ColorOption) => void;
  label?: string;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-[#a3a3a3] uppercase tracking-wider text-[11px] font-medium">
          {label}:
        </span>
        <span className="inline-flex items-center gap-2 text-[#F4D477] font-bold tracking-wider text-[11px] uppercase bg-[#0e1418] px-2.5 py-1 rounded-sm border border-[#D4A62A]/40 shadow-sm">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full border border-white/30 shrink-0"
            style={{ backgroundColor: selectedColor.bgHex }}
          />
          {selectedColor.name} • {selectedColor.hex}
        </span>
      </div>

      <div
        className="flex items-center gap-2.5 sm:gap-3"
        role="radiogroup"
        aria-label={label}
      >
        {colors.map((c) => {
          const isSelected =
            selectedColor.hex.toUpperCase() === c.hex.toUpperCase();
          const isPureWhite = c.hex.toUpperCase() === "#FFFFFF";
          const isJetBlack = c.hex.toUpperCase() === "#111111";

          return (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${c.name} (${c.hex})`}
              title={`${c.name} (${c.hex})`}
              onClick={() => onSelectColor(c)}
              className={`group relative h-8 w-8 sm:h-9 sm:w-9 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none ${
                isSelected
                  ? "ring-2 ring-[#F4D477] ring-offset-2 ring-offset-[#06080a] scale-110 shadow-[0_0_14px_rgba(244,212,119,0.5)]"
                  : "hover:scale-105 opacity-90 hover:opacity-100"
              }`}
              style={{
                backgroundColor: c.bgHex,
                border: isPureWhite
                  ? "1px solid rgba(255, 255, 255, 0.7)"
                  : isJetBlack
                    ? "1px solid rgba(255, 255, 255, 0.25)"
                    : "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: isSelected
                  ? undefined
                  : "inset 0 1px 2px rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.6)",
              }}
            >
              {isSelected && (
                <span
                  className={`absolute inset-0 m-auto h-2.5 w-2.5 rounded-full shadow-sm ${
                    isPureWhite ? "bg-[#06080a]" : "bg-[#FFFFFF]"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      className={`transition-all duration-700 ease-out ${
        on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  sub,
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-4xl ${className}`}>
      <div className="sec-ix">
        {index && <span className="text-[#D4A62A] font-bold">[{index}]</span>}
        <span className="text-[#F4D477] tracking-[0.25em]">
          <ScrambleText triggerOnArrival>{eyebrow}</ScrambleText>
        </span>
      </div>

      <h2 className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mt-2">
        {title}
      </h2>

      {sub && (
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#D9D9D9] font-normal leading-relaxed">
          {sub}
        </p>
      )}
    </Reveal>
  );
}

/* ═══ NAVBAR ═══ */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#04070a]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-10">
        {/* Brand Logo & Studio Tag */}
        <a href="#home" className="flex items-center gap-3.5 group">
          <div className="relative">
            <img
              src={vincelogoOpt}
              alt="Vince Outlets Logo"
              width={48}
              height={48}
              className="h-11 w-11 rounded-full object-contain ring-1 ring-[#D4A62A]/40 transition-transform duration-300 group-hover:scale-105 group-hover:ring-[#F4D477]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#D4A62A] shadow-[0_0_8px_#D4A62A]" />
          </div>
          <div>
            <span className="display text-xl sm:text-2xl text-white tracking-wider block">
              VINCE OUTLETS
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4A62A] block uppercase font-medium">
              PUDUCHERRY • EST. 2026
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="navlink relative py-1 hover:text-white"
            >
              <ScrambleText triggerOnHover>{label}</ScrambleText>
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="hidden sm:flex items-center gap-3.5">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-[#0e1418] text-[#D9D9D9] transition-colors hover:border-[#D4A62A] hover:text-[#F4D477]"
            aria-label="Instagram"
          >
            <Instagram size={15} />
          </a>
          <a
            href="tel:+916369963871"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-[#0e1418] text-[#D9D9D9] transition-colors hover:border-[#D4A62A] hover:text-[#F4D477]"
            aria-label="Call studio"
          >
            <Phone size={15} />
          </a>
          <WhatsAppButton
            text={MSG.general}
            variant="gold"
            className="!h-9 !py-1 !px-3 !text-xs"
          >
            STUDIO CHAT <span className="arw font-mono">→</span>
          </WhatsAppButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-[#0e1418] text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden border-b border-white/10 bg-[#04070a]/95 backdrop-blur-xl px-5 py-6 animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-4">
            {NAV.map(([label, href], idx) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/5 py-2.5 font-mono text-sm tracking-[0.2em] text-[#D9D9D9] hover:text-[#F4D477]"
              >
                <span>{label}</span>
                <span className="text-[10px] text-[#D4A62A]">0{idx + 1}</span>
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <WhatsAppButton
                text={MSG.general}
                variant="gold"
                className="w-full justify-center"
              >
                START WHATSAPP CHAT <span className="arw font-mono">→</span>
              </WhatsAppButton>
              <div className="flex items-center justify-around pt-2 text-xs font-mono text-[#a3a3a3]">
                <a
                  href="tel:+916369963871"
                  className="hover:text-white flex items-center gap-1.5"
                >
                  <Phone size={13} /> {PHONE}
                </a>
                <span>•</span>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5"
                >
                  <Instagram size={13} /> INSTAGRAM
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ═══ CINEMATIC HERO + 01. CUSTOM T-SHIRT 3D CUSTOMISER ═══ */
export function Hero() {
  const [selectedTeeColor, setSelectedTeeColor] = useState<ColorOption>(
    DEFAULT_GARMENT_COLOR,
  );

  return (
    <section
      id="home"
      className="relative min-h-[100svh] pt-24 pb-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Studio Photography with cinematic gradient layering */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={hero}
          alt="Model wearing Vince Outlets custom oversized heavyweight streetwear"
          width={1920}
          height={1088}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-[center_28%] sm:object-[68%_24%] lg:object-[72%_22%] opacity-85"
        />
        {/* Layered obsidian vignettes for optimal legibility while preserving photography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04070a] via-[#04070a]/75 via-50% to-[#04070a]/40" />
        <div className="hidden lg:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[#04070a] via-[#04070a]/80 to-transparent" />
      </div>

      {/* Top Technical Metadata Ticker */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-white/10 py-2.5 font-mono text-[10px] tracking-[0.22em] text-[#a3a3a3]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4A62A] animate-pulse" />
            <span className="text-[#F4D477] uppercase font-bold">
              <ScrambleText triggerOnArrival>
                PUDUCHERRY STUDIO // LAT: 11.934° N • 79.830° E
              </ScrambleText>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>REF: 240-430 GSM BLANKS</span>
            <span>ZERO MOQ REQUIRED</span>
            <span>HIGH-DENSITY SCREEN & DTF</span>
          </div>
          <div className="text-white font-semibold">ALL-INDIA SHIPPING</div>
        </div>
      </div>

      {/* Middle Grid: Asymmetric Streetwear Headlines + 01. Dedicated 3D T-Shirt Box */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 lg:px-10 py-8 lg:py-12 my-auto">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Bold Editorial Typography & Torch Spotlight */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-sm border border-[#D4A62A]/40 bg-[#0e1418]/80 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#F4D477] uppercase mb-4 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A62A]" />
              VINCE OUTLETS // BESPOKE STREETWEAR LAB
            </div>

            {/* The Basalt Plate Torch Headline */}
            <div className="plate-wrap my-2">
              <h1 className="display text-[12vw] sm:text-[9vw] md:text-6xl lg:text-[4.6rem] xl:text-[5.4rem] leading-[0.9] tracking-tight">
                {/* Dim background resting letters */}
                <span className="plate-rest block select-none">
                  <span className="block text-white">CUSTOM STREETWEAR.</span>
                  <span className="block text-[#D4A62A]">
                    YOUR DESIGN. YOUR IDENTITY.
                  </span>
                </span>
                {/* Illuminated interactive cursor spotlight */}
                <span
                  className="plate-lit block select-none"
                  aria-hidden="true"
                >
                  <span className="block text-white">CUSTOM STREETWEAR.</span>
                  <span className="block text-metal">
                    YOUR DESIGN. YOUR IDENTITY.
                  </span>
                </span>
              </h1>
            </div>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-[#D9D9D9] font-normal leading-relaxed">
              Premium-quality apparel, customised with your own artwork,
              graphics or brand identity. From 1-of-1 bespoke statement tees to
              full squad collections, tailored in our Puducherry workshop.
            </p>

            {/* Redesigned Streetwear Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <WhatsAppButton
                text={`Hi Vince Outlets, I would like to customise the Custom T-Shirt in ${selectedTeeColor.name} with my own design.`}
                variant="gold"
                className="!text-xs sm:!text-sm"
              >
                CUSTOMISE YOUR T-SHIRT <span className="arw font-mono">→</span>
              </WhatsAppButton>
              <BracketButton
                href="#collection"
                className="!text-xs sm:!text-sm"
              >
                EXPLORE COLLECTION <span className="arw font-mono">→</span>
              </BracketButton>
            </div>
          </div>

          {/* Right Column: 01. Dedicated 3D T-Shirt Customiser Box */}
          <div className="lg:col-span-6" id="custom-tshirt">
            <div className="panel relative overflow-hidden rounded-sm border border-white/15 bg-[#06080a]/90 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              {/* Product Box Header */}
              <div className="flex items-start justify-between gap-4 mb-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#D4A62A] font-bold">
                      [01 / T-SHIRT]
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-[#a3a3a3] uppercase">
                      240+ GSM HEAVYWEIGHT
                    </span>
                  </div>
                  <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wider uppercase">
                    CUSTOM T-SHIRT
                  </h2>
                  <p className="text-xs text-[#a3a3a3] mt-0.5">
                    Make it yours with your own design.
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-[10px] text-[#a3a3a3] block uppercase">
                    STARTING AT
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#F4D477]">
                    {inr(499)}
                  </span>
                </div>
              </div>

              {/* Standalone 3D Viewer for T-Shirt */}
              <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-sm bg-[#04070a] border border-white/10 mb-4">
                <GarmentViewer3D
                  modelPath="/models/tshirt.glb"
                  productName="Custom T-Shirt"
                  selectedColorHex={selectedTeeColor.hex}
                  defaultScale={1.12}
                  defaultRotY={(8 * Math.PI) / 180}
                  defaultRotX={(2 * Math.PI) / 180}
                  isHoodie={false}
                  className="h-full w-full"
                />
              </div>

              {/* Six Colour Swatches directly below the 3D model */}
              <ColorSwatchPicker
                colors={TSHIRT_COLORS}
                selectedColor={selectedTeeColor}
                onSelectColor={setSelectedTeeColor}
                label="T-SHIRT FABRIC COLOUR"
              />

              {/* Custom-Order CTA */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="font-mono text-[10px] text-[#a3a3a3] hidden sm:block">
                  ZERO MOQ • DIRECT STUDIO WHATSAPP
                </div>
                <WhatsAppButton
                  text={`Hi Vince Outlets, I would like to customise the Custom T-Shirt in ${selectedTeeColor.name} with my own design.`}
                  variant="gold"
                  className="w-full sm:w-auto justify-center !text-xs sm:!text-sm"
                >
                  CUSTOMISE THIS T-SHIRT{" "}
                  <span className="arw font-mono">→</span>
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hallmark Specs Strip - Refined hairline grid */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border-y border-white/10">
          {[
            ["01", "100% COMBED COTTON", "240+ to 430 GSM heavy-knit blanks"],
            [
              "02",
              "HIGH-DENSITY INKS",
              "Zero wash-crack screen & DTF technology",
            ],
            [
              "03",
              "NO MINIMUMS (0 MOQ)",
              "1-of-1 bespoke pieces or squad runs",
            ],
            [
              "04",
              "PUDUCHERRY ROOTS",
              "Local craft studio with pan-India delivery",
            ],
          ].map(([num, title, desc]) => (
            <div
              key={num}
              className="bg-[#06080a] p-4 sm:p-5 transition-colors hover:bg-[#0c1014]"
            >
              <span className="font-mono text-[10px] text-[#D4A62A] font-bold block mb-1">
                [{num}]
              </span>
              <p className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                {title}
              </p>
              <p className="text-[11px] text-[#a3a3a3] mt-1 line-clamp-1">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ 02. HOODIE — DEDICATED 3D PRODUCT CUSTOMISER SECTION ═══ */
export function HoodieSection() {
  const [selectedHoodieColor, setSelectedHoodieColor] = useState<ColorOption>(
    DEFAULT_GARMENT_COLOR,
  );

  return (
    <section
      id="custom-hoodie"
      className="section relative bg-[#04070a] border-t border-white/10 pt-16 sm:pt-24"
    >
      {/* Top rim champagne gold accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A62A]/40 to-transparent pointer-events-none" />

      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Dedicated 3D Product Box for Hoodie */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Reveal className="panel relative overflow-hidden rounded-sm border border-white/15 bg-[#06080a]/90 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            {/* Box Header */}
            <div className="flex items-start justify-between gap-4 mb-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-[#D4A62A] font-bold">
                    [02 / HOODIE]
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-[#a3a3a3] uppercase">
                    430 GSM FRENCH TERRY
                  </span>
                </div>
                <h3 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wider uppercase">
                  CUSTOM HOODIE
                </h3>
                <p className="text-xs text-[#a3a3a3] mt-0.5">
                  Heavyweight French terry with your custom embroidery or
                  high-density prints.
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-[10px] text-[#a3a3a3] block uppercase">
                  STARTING AT
                </span>
                <span className="font-mono text-base sm:text-lg font-bold text-[#F4D477]">
                  {inr(899)}
                </span>
              </div>
            </div>

            {/* Standalone 3D Viewer for Hoodie */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-sm bg-[#04070a] border border-white/10 mb-4">
              <GarmentViewer3D
                modelPath="/models/hoodie.glb"
                productName="Custom Hoodie"
                requiresDraco={true}
                isHoodie={true}
                selectedColorHex={selectedHoodieColor.hex}
                defaultScale={0.88}
                defaultRotY={(12 * Math.PI) / 180}
                defaultRotX={(0 * Math.PI) / 180}
                fallbackImage={hoodie}
                className="h-full w-full"
              />
            </div>

            {/* Six Colour Swatches directly below 3D Hoodie */}
            <ColorSwatchPicker
              colors={HOODIE_COLORS}
              selectedColor={selectedHoodieColor}
              onSelectColor={setSelectedHoodieColor}
              label="HOODIE FABRIC COLOUR"
            />

            {/* Action CTA */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="font-mono text-[10px] text-[#a3a3a3] hidden sm:block">
                PREMIUM FRENCH TERRY • 0 MOQ
              </div>
              <WhatsAppButton
                text={`Hi Vince Outlets, I would like to customise the Custom Hoodie in ${selectedHoodieColor.name} with my own design.`}
                variant="gold"
                className="w-full sm:w-auto justify-center !text-xs sm:!text-sm"
              >
                CUSTOMISE THIS HOODIE <span className="arw font-mono">→</span>
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Editorial & Silhouettes */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <SectionHeading
            index="02"
            eyebrow="3D PRODUCT CUSTOMISER // 430 GSM SILHOUETTE"
            title={
              <>
                CUSTOM HOODIE.
                <br />
                <span className="text-metal">HEAVYWEIGHT DROPS.</span>
              </>
            }
            sub="Engineered for winter drops and relaxed oversized streetwear silhouettes. Built with 430 GSM French terry cotton, double-layered hood structure, and zero-shrink pre-wash treatment."
          />

          {/* Highlights grid */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              [
                "430 GSM TERRY",
                "Heavyweight knitted combed cotton for structure",
              ],
              [
                "DOUBLE HOOD",
                "Dual-ply hood construction with tonal drawstrings",
              ],
              [
                "CRACK-PROOF",
                "High-density screen and puff print compatibility",
              ],
              [
                "SQUAD RUNS",
                "1-of-1 samples to 500+ unit squad merch with zero MOQ",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="panel p-3.5 sm:p-4 rounded-sm border border-white/10 bg-[#06080a]"
              >
                <div className="flex items-center gap-1.5 mb-1 font-mono text-[11px] font-bold text-[#F4D477]">
                  <CheckCircle2 size={13} className="text-[#D4A62A]" />
                  <span>{title}</span>
                </div>
                <p className="text-[11px] text-[#a3a3a3] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <WhatsAppButton
              text={`Hi Vince Outlets, I would like to customise the Custom Hoodie in ${selectedHoodieColor.name} with my own design.`}
              variant="gold"
              className="!text-xs sm:!text-sm"
            >
              CUSTOMISE THIS HOODIE <span className="arw font-mono">→</span>
            </WhatsAppButton>
            <BracketButton href="#collection" className="!text-xs sm:!text-sm">
              EXPLORE COLLECTION <span className="arw font-mono">→</span>
            </BracketButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 03. FULL SLEEVE T-SHIRT — DEDICATED 3D PRODUCT CUSTOMISER SECTION ═══ */
export function FullSleeveSection() {
  const [selectedSleeveColor, setSelectedSleeveColor] = useState<ColorOption>(
    DEFAULT_GARMENT_COLOR,
  );

  return (
    <section
      id="custom-fullsleeve"
      className="section relative bg-[#04070a] border-t border-white/10 pt-16 sm:pt-24"
    >
      {/* Top rim champagne gold accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A62A]/40 to-transparent pointer-events-none" />

      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Editorial & Silhouettes */}
        <div className="lg:col-span-6">
          <SectionHeading
            index="03"
            eyebrow="3D PRODUCT CUSTOMISER // 240+ GSM FULL SLEEVE"
            title={
              <>
                CUSTOM FULL SLEEVE.
                <br />
                <span className="text-metal">STATEMENT GRAPHICS.</span>
              </>
            }
            sub="Personalise your garment with dual forearm typography, bold chest graphics and nape prints. Tailored from 240+ GSM combed bio-washed cotton with elasticated rib-knit cuffs."
          />

          {/* Highlights grid */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              [
                "240+ GSM COMBED",
                "Heavy bio-washed jersey with smooth surface finish",
              ],
              [
                "RIBBED CUFFS",
                "Structured elasticated wrists that maintain shape",
              ],
              [
                "FULL-ARM PRINTS",
                "Screen-printed sleeve typography & sleeve crests",
              ],
              [
                "ZERO MINIMUMS",
                "Single custom print or bulk squad order dispatched quickly",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="panel p-3.5 sm:p-4 rounded-sm border border-white/10 bg-[#06080a]"
              >
                <div className="flex items-center gap-1.5 mb-1 font-mono text-[11px] font-bold text-[#F4D477]">
                  <CheckCircle2 size={13} className="text-[#D4A62A]" />
                  <span>{title}</span>
                </div>
                <p className="text-[11px] text-[#a3a3a3] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <WhatsAppButton
              text={`Hi Vince Outlets, I would like to customise the Custom Full Sleeve in ${selectedSleeveColor.name} with my own design.`}
              variant="gold"
              className="!text-xs sm:!text-sm"
            >
              CUSTOMISE FULL SLEEVE <span className="arw font-mono">→</span>
            </WhatsAppButton>
            <BracketButton href="#collection" className="!text-xs sm:!text-sm">
              EXPLORE COLLECTION <span className="arw font-mono">→</span>
            </BracketButton>
          </div>
        </div>

        {/* Right Column: Dedicated 3D Product Box for Full Sleeve */}
        <div className="lg:col-span-6">
          <Reveal className="panel relative overflow-hidden rounded-sm border border-white/15 bg-[#06080a]/90 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            {/* Box Header */}
            <div className="flex items-start justify-between gap-4 mb-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-[#D4A62A] font-bold">
                    [03 / FULL SLEEVE]
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-[#a3a3a3] uppercase">
                    240+ GSM COMBED COTTON
                  </span>
                </div>
                <h3 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wider uppercase">
                  CUSTOM FULL SLEEVE
                </h3>
                <p className="text-xs text-[#a3a3a3] mt-0.5">
                  Personalise the garment with sleeve hits, chest art and collar
                  prints.
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-[10px] text-[#a3a3a3] block uppercase">
                  STARTING AT
                </span>
                <span className="font-mono text-base sm:text-lg font-bold text-[#F4D477]">
                  {inr(799)}
                </span>
              </div>
            </div>

            {/* Standalone 3D Viewer for Full Sleeve */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-sm bg-[#04070a] border border-white/10 mb-4">
              <GarmentViewer3D
                modelPath="/models/longsleeve.glb"
                productName="Custom Full Sleeve"
                requiresDraco={false}
                isHoodie={false}
                selectedColorHex={selectedSleeveColor.hex}
                defaultScale={1.12}
                defaultRotY={(8 * Math.PI) / 180}
                defaultRotX={(2 * Math.PI) / 180}
                fallbackImage={sweatshirt}
                className="h-full w-full"
              />
            </div>

            {/* Six Colour Swatches directly below 3D Full Sleeve */}
            <ColorSwatchPicker
              colors={FULLSLEEVE_COLORS}
              selectedColor={selectedSleeveColor}
              onSelectColor={setSelectedSleeveColor}
              label="FULL SLEEVE FABRIC COLOUR"
            />

            {/* Action CTA */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="font-mono text-[10px] text-[#a3a3a3] hidden sm:block">
                RIBBED CUFFS • DUAL-ARM PRINT READY
              </div>
              <WhatsAppButton
                text={`Hi Vince Outlets, I would like to customise the Custom Full Sleeve in ${selectedSleeveColor.name} with my own design.`}
                variant="gold"
                className="w-full sm:w-auto justify-center !text-xs sm:!text-sm"
              >
                CUSTOMISE FULL SLEEVE <span className="arw font-mono">→</span>
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══ SECTION 2: CUSTOM T-SHIRT ENQUIRY (YOUR DESIGN. YOUR T-SHIRT.) ═══ */
export function CustomEnquiry() {
  const steps = [
    {
      num: "01",
      title: "CHOOSE YOUR SILHOUETTE",
      desc: "Select your preferred blank: 240+ GSM heavyweight oversized tee, 200 GSM regular cut, long sleeve tee, or 430 GSM French terry hoodie.",
    },
    {
      num: "02",
      title: "SHARE YOUR ARTWORK",
      desc: "Send your graphics, typography quotes, vector logos or photo references directly to our studio WhatsApp chat.",
    },
    {
      num: "03",
      title: "DIGITAL MOCKUP & CALIBRATION",
      desc: "Our Puducherry printmakers calibrate print sizing, placement coordinates and ink density to share a precise visual preview for approval.",
    },
    {
      num: "04",
      title: "STUDIO PRINT & EXPRESS DELIVERY",
      desc: "Cured with high-density crack-proof inks in our workshop, ready for studio walk-in pickup or insured tracked delivery across India.",
    },
  ];

  const apparelOptions = [
    "Oversized Tees (240 GSM)",
    "Regular Fit (200 GSM)",
    "Long Sleeve Tees",
    "Heavy Hoodies (430 GSM)",
    "Crewneck Sweatshirts",
    "Collared Street Polos",
    "Crop Tops",
    "Kids Streetwear",
  ];

  return (
    <section
      id="customise"
      className="section relative bg-transparent border-t border-white/10 pt-16 sm:pt-20"
    >
      <span id="custom" className="sr-only" />
      {/* Subtle champagne-gold top rim glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A62A]/35 to-transparent pointer-events-none" />

      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Visual Mockup Showcase with Technical Markers */}
        <div className="lg:col-span-5">
          <Reveal className="panel relative overflow-hidden rounded-sm p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#04070a]">
              <img
                src={murugaVelTee}
                alt="1-of-1 bespoke Muruga Vel sacred graphic black streetwear tee by Vince Outlets Puducherry"
                loading="lazy"
                width={1145}
                height={1374}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04070a] via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Technical badges on image */}
              <div className="absolute top-4 left-4 font-mono text-[9px] bg-[#04070a]/90 border border-[#D4A62A]/40 px-2.5 py-1 text-[#F4D477] backdrop-blur-md">
                1-OF-1 BESPOKE APPAREL
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className="font-mono text-[10px] bg-[#04070a]/90 border border-[#D4A62A]/40 text-[#F4D477] px-2.5 py-1 backdrop-blur-md">
                  HIGH-DENSITY SCREEN & DTF
                </span>
                <span className="font-mono text-[10px] bg-[#04070a]/90 border border-white/10 text-white px-2.5 py-1 backdrop-blur-md">
                  240+ GSM HEAVYWEIGHT COTTON
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Heading, Description, Silhouettes, Steps & WhatsApp Action */}
        <div className="lg:col-span-7">
          <SectionHeading
            index="01"
            eyebrow="CUSTOM T-SHIRT ENQUIRY"
            title={
              <>
                YOUR DESIGN.
                <br />
                <span className="text-metal">YOUR T-SHIRT.</span>
              </>
            }
            sub="Bring your idea to life. Share your artwork, graphic or brand concept with Vince Outlets to enquire about a customised T-shirt."
          />

          {/* Supported Silhouette Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {apparelOptions.map((opt) => (
              <span
                key={opt}
                className="panel px-3 py-1 font-mono text-[11px] text-[#D9D9D9] rounded-sm border border-white/10 bg-[#06080a]"
              >
                {opt}
              </span>
            ))}
          </div>

          {/* 4 Workflow Steps */}
          <div className="mt-8 space-y-3.5">
            {steps.map((st) => (
              <div
                key={st.num}
                className="panel p-4 sm:p-5 rounded-sm flex gap-4 transition-all hover:border-[#D4A62A]/50 bg-[#06080a]"
              >
                <span className="font-mono text-sm font-bold text-[#F4D477] shrink-0">
                  [{st.num}]
                </span>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white tracking-wide uppercase">
                    {st.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dual Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <WhatsAppButton
              text={MSG.custom}
              variant="gold"
              className="!text-xs sm:!text-sm"
            >
              CUSTOMISE YOUR T-SHIRT <span className="arw font-mono">→</span>
            </WhatsAppButton>
            <BracketButton href="#collection" className="!text-xs sm:!text-sm">
              EXPLORE COLLECTION <span className="arw font-mono">→</span>
            </BracketButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// Backward-compatibility aliases
export const CustomPrint = CustomEnquiry;
export const Statement = CustomEnquiry;
export const Culture = () => null;

/* ═══ PRODUCT CARD WITH 3D PERSPECTIVE TILT ═══ */
export function ProductCard({ p, i }: { p: Product; i: number }) {
  const save = Math.round(((p.old - p.price) / p.old) * 100);
  const frontImg = PRODUCT_IMAGES[p.name] || racingCollageTee;
  const backImg = PRODUCT_IMAGES_BACK[p.name] || frontImg;
  const [altView, setAltView] = useState(false);

  // 3D Perspective Tilt Refs & State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const nx = Math.max(
      -1,
      Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1),
    );
    const ny = Math.max(
      -1,
      Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1),
    );
    setTilt({ rx: -ny * 7, ry: nx * 7 });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <Reveal
      delay={(i % 4) * 80}
      className="group"
      style={{ perspective: "60rem" }}
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
        className="panel relative flex flex-col rounded-sm p-4 transition-all duration-300 hover:border-[#D4A62A]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(212,166,42,0.12)]"
      >
        {/* Top Product Header */}
        <div className="flex items-center justify-between font-mono text-[10px] text-[#a3a3a3] mb-3">
          <span className="text-[#D4A62A] font-bold">
            [{String(i + 1).padStart(2, "0")}]
          </span>
          <span className="tracking-widest uppercase">{p.category}</span>
        </div>

        {/* Product Visual Area */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#04070a]">
          <img
            src={altView ? backImg : frontImg}
            alt={`${p.name} luxury streetwear piece by Vince Outlets Puducherry`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04070a]/90 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Discount Tag */}
          <span className="absolute top-3 left-3 bg-[#D4A62A] text-[#04070a] px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider rounded-sm shadow-md">
            SAVE {save}%
          </span>

          {/* Angle / View Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setAltView(!altView);
            }}
            className="absolute top-3 right-3 flex items-center gap-1 bg-[#04070a]/80 hover:bg-[#04070a] text-white px-2 py-0.5 font-mono text-[9px] rounded-sm border border-white/10 backdrop-blur-md transition-colors"
          >
            <Eye size={10} /> {altView ? "ANGLE 1" : "ANGLE 2"}
          </button>
        </div>

        {/* Title & Description */}
        <h3 className="display mt-4 text-2xl text-white group-hover:text-[#F4D477] transition-colors">
          {p.name}
        </h3>
        <p className="mt-1 text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed">
          {p.desc}
        </p>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold text-[#F4D477]">
              {inr(p.price)}
            </span>
            <span className="font-mono text-xs text-[#a3a3a3] line-through">
              {inr(p.old)}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#a3a3a3] tracking-widest">
            INCL. TAXES
          </span>
        </div>

        {/* Direct WhatsApp Ordering */}
        <BracketButton
          href={waLink(productMsg(p))}
          target="_blank"
          rel="noopener noreferrer"
          variant="gold"
          className="mt-4 !w-full !justify-center !text-xs !py-2"
        >
          ORDER ON WHATSAPP <span className="arw font-mono">→</span>
        </BracketButton>
      </div>
    </Reveal>
  );
}

/* ═══ SHOP / CATALOG SECTION ═══ */
export function Shop() {
  const cats = [
    "ALL",
    ...Array.from(new Set(PRODUCTS.map((p) => p.category.toUpperCase()))),
  ];
  const [selectedCat, setSelectedCat] = useState("ALL");

  const list =
    selectedCat === "ALL"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category.toUpperCase() === selectedCat);

  return (
    <section
      id="collection"
      className="section relative bg-transparent border-t border-white/10 pt-16 sm:pt-20"
    >
      <span id="shop" className="sr-only" />
      {/* Subtle champagne-gold top rim glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A62A]/35 to-transparent pointer-events-none" />

      <SectionHeading
        index="02"
        eyebrow="READY TO WEAR COLLECTION"
        title={
          <>
            STREETWEAR SILHOUETTES.
            <br />
            <span className="text-metal">READY TO DROP.</span>
          </>
        }
        sub="Each silhouette is cut with modern streetwear proportions: dropped shoulders, generous chest width, and structured collars."
      />

      {/* Category Filter Tabs */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`shrink-0 px-4 py-2 font-mono text-xs tracking-wider transition-all cursor-pointer rounded-sm border ${
              selectedCat === cat
                ? "border-[#F4D477] bg-[#D4A62A] text-[#04070a] font-bold shadow-[0_0_16px_rgba(212,166,42,0.35)]"
                : "border-white/10 panel text-[#D9D9D9] hover:border-white/30 hover:text-white"
            }`}
          >
            [ {cat} ]
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.name} p={p} i={PRODUCTS.indexOf(p)} />
        ))}

        {/* Custom 1-of-1 Bespoke Promo Card */}
        <Reveal className="panel group flex aspect-[4/5] flex-col justify-between rounded-sm p-6 border-[#D4A62A]/40 hover:border-[#D4A62A] transition-all bg-[#06080a]">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#F4D477]">
            <span>[CUSTOM PIECE]</span>
            <span>1-OF-1 BESPOKE</span>
          </div>

          <div>
            <span className="font-mono text-xs text-[#D4A62A] font-bold block mb-1">
              ZERO MOQ
            </span>
            <h3 className="display text-3xl sm:text-4xl text-white group-hover:text-metal transition-colors">
              ANY FIT.
              <br />
              YOUR DESIGN.
            </h3>
            <p className="mt-2 text-xs text-[#A3A3A3] leading-relaxed">
              Have a specific silhouette or artwork concept in mind? Send your
              graphic and talk directly to our print specialists.
            </p>
          </div>

          <WhatsAppButton
            text={MSG.custom}
            variant="gold"
            className="!w-full !justify-center !text-xs !py-2"
          >
            START CUSTOM PIECE <span className="arw font-mono">→</span>
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ SECTION: BESPOKE PRINT ARCHIVE & RECENT DROPS (ALL 12 RELEASES) ═══ */
export interface ArchiveItem {
  id: string;
  title: string;
  subtitle: string;
  category: "cinema" | "sports" | "spiritual" | "streetwear" | "promo";
  categoryLabel: string;
  badge: string;
  fabric: string;
  printMethod: string;
  gsm: string;
  image: string;
  aspectRatio: string;
  price: number;
  description: string;
  tags: string[];
}

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: "racing-collage",
    title: "CINEMATIC RACING COLLAGE TEE",
    subtitle: "Vijay & Ajith Motorsport Camaraderie Tribute",
    category: "cinema",
    categoryLabel: "CINEMA & POP CULTURE",
    badge: "NEW DROP",
    fabric: "240 GSM Luxury Heavyweight Cotton",
    printMethod: "Multi-layer High-Density DTF",
    gsm: "240 GSM",
    image: racingCollageTee,
    aspectRatio: "aspect-[4/5]",
    price: 499,
    description:
      "Dynamic cinematic motorsport graphic celebrating Tamil cinema camaraderie, speed helmets and racing typography on pitch-black blank.",
    tags: ["240 GSM", "OVERSIZED", "HIGH-DENSITY DTF"],
  },
  {
    id: "thalapathy-poster",
    title: "CHIEF MINISTER THALAPATHY POSTER TEE",
    subtitle: "Red Textured Portrait & Bold Barcode Typography",
    category: "cinema",
    categoryLabel: "CINEMA & POP CULTURE",
    badge: "BESTSELLER",
    fabric: "240 GSM Heavyweight Combed Cotton",
    printMethod: "Rich Contrast DTF with Barcode Detail",
    gsm: "240 GSM",
    image: thalapathyPosterTee,
    aspectRatio: "aspect-[4/5]",
    price: 499,
    description:
      "High-impact red textured poster backdrop featuring Thalapathy Vijay portrait with industrial barcode markers and rally typography.",
    tags: ["240 GSM", "OVERSIZED", "DTF PRINT"],
  },
  {
    id: "ajith-thala",
    title: "AJITH KUMAR 'NO RULES' GRITTY TEE",
    subtitle: "Thala Gritty Silkscreen on Pure White Silhouette",
    category: "cinema",
    categoryLabel: "CINEMA & POP CULTURE",
    badge: "ICON EDITION",
    fabric: "200 GSM Bio-Washed Ring-Spun Cotton",
    printMethod: "High-Contrast Screen & Micro DTF",
    gsm: "200 GSM",
    image: ajithThalaTee,
    aspectRatio: "aspect-[4/5]",
    price: 399,
    description:
      "Crisp white streetwear blank printed with gritty monochrome and red duotone Ajith Kumar portrait and bold 'NO RULES. ONLY THALA' lettering.",
    tags: ["200 GSM", "REGULAR FIT", "SCREEN PRINT"],
  },
  {
    id: "muruga-vel",
    title: "MURUGA VEL SACRED GRAPHIC TEE",
    subtitle: "Fiery Golden Sacred Spear Spiritual Streetwear",
    category: "spiritual",
    categoryLabel: "SPIRITUAL & HERITAGE",
    badge: "1-OF-1 BESPOKE",
    fabric: "240 GSM Heavyweight Pitch Black Cotton",
    printMethod: "Golden DTF with Micro-Particle Gradient",
    gsm: "240 GSM",
    image: murugaVelTee,
    aspectRatio: "aspect-[4/5]",
    price: 499,
    description:
      "Intricate sacred Muruga Vel spear surrounded by glowing fiery gold and orange micro-gradients. High-density crack-proof finish on deep black cotton.",
    tags: ["240 GSM", "HEAVYWEIGHT", "GOLDEN DTF"],
  },
  {
    id: "dhoni-tribute",
    title: "MS DHONI 'CAPTAIN LEADER LEGEND' TEE",
    subtitle: "CSK Yellow & Gold Duotone Tribute on Racing Red",
    category: "sports",
    categoryLabel: "SPORTS & ATHLETIC",
    badge: "CRICKET LEGACY",
    fabric: "200 GSM Soft-Touch Combed Cotton",
    printMethod: "High-Impact Duotone Direct-to-Film",
    gsm: "200 GSM",
    image: dhoniTributeTee,
    aspectRatio: "aspect-[4/5]",
    price: 399,
    description:
      "Fiery racing red streetwear blank showcasing MS Dhoni in golden CSK duotone graphics with iconic 'Whistle Podu' typography.",
    tags: ["200 GSM", "CSK TRIBUTE", "DUOTONE DTF"],
  },
  {
    id: "str-film",
    title: "SILAMBARASAN TR RETRO NOIR FILM TEE",
    subtitle: "Monochrome Film Cell & Newspaper Clipping Collage",
    category: "cinema",
    categoryLabel: "CINEMA & POP CULTURE",
    badge: "RETRO NOIR",
    fabric: "200 GSM Pure White Bio-Washed Cotton",
    printMethod: "Fine-Line Halftone Screen & DTF",
    gsm: "200 GSM",
    image: strFilmCollageTee,
    aspectRatio: "aspect-[4/5]",
    price: 399,
    description:
      "Vintage cinema film frames, newspaper typographic clippings, and monochrome Silambarasan TR portrait on pure white heavyweight blank.",
    tags: ["200 GSM", "PURE WHITE", "HALFTONE PRINT"],
  },
  {
    id: "neon-scene",
    title: "CYBERPUNK NEON NIGHT SCENE TEE",
    subtitle: "Synthwave Magenta & Electric Cyan Street Art",
    category: "streetwear",
    categoryLabel: "STREETWEAR GRAPHICS",
    badge: "SYNTHWAVE",
    fabric: "220 GSM Relaxed Fit Streetwear Blank",
    printMethod: "Ultra-Vibrant CMYK Direct-to-Film",
    gsm: "220 GSM",
    image: neonSceneTee,
    aspectRatio: "aspect-[4/5]",
    price: 399,
    description:
      "Futuristic neon city nightscape rendered in luminous cyan, magenta, and deep violet pigments on jet black cotton.",
    tags: ["220 GSM", "NEON DTF", "SYNTHWAVE"],
  },
  {
    id: "red-dragon",
    title: "RED DRAGON HIP-HOP STREETWEAR TEE",
    subtitle: "Fierce Oriental Dragon Illustration & Graffiti Type",
    category: "streetwear",
    categoryLabel: "STREETWEAR GRAPHICS",
    badge: "STREET CULTURE",
    fabric: "240 GSM Heavyweight Streetwear Cotton",
    printMethod: "High-Density Crack-Proof Plastisol Screen",
    gsm: "240 GSM",
    image: redDragonTee,
    aspectRatio: "aspect-[4/5]",
    price: 499,
    description:
      "Intense crimson dragon artwork intertwined with bold hip-hop calligraphy, engineered for oversized street drape and durability.",
    tags: ["240 GSM", "DRAGON ART", "PLASTISOL SCREEN"],
  },
  {
    id: "suresh-raina",
    title: "SURESH RAINA 'CHINNA THALA' LEGACY TEE",
    subtitle: "Yellow Jersey #3 Tribute on Heather Grey Blank",
    category: "sports",
    categoryLabel: "SPORTS & ATHLETIC",
    badge: "CHINNA THALA",
    fabric: "200 GSM Heather Grey Bio-Washed Cotton",
    printMethod: "Vibrant Athletic Screen & DTF",
    gsm: "200 GSM",
    image: sureshRainaTee,
    aspectRatio: "aspect-[4/5]",
    price: 399,
    description:
      "Tribute to Suresh Raina's immortal legacy in yellow, number 3 emblem, and bold sports typographic framing on soft heather grey cotton.",
    tags: ["200 GSM", "HEATHER GREY", "ATHLETIC PRINT"],
  },
  {
    id: "vintage-murugan",
    title: "VINTAGE MURUGAN SEPIA GRAPHIC TEE",
    subtitle: "Intricate Classic Temple Art & Tamil Calligraphy",
    category: "spiritual",
    categoryLabel: "SPIRITUAL & HERITAGE",
    badge: "HERITAGE ART",
    fabric: "240 GSM Vintage-Washed Cream Cotton",
    printMethod: "Sepia Tonal Screen with Crack-Resistant Cure",
    gsm: "240 GSM",
    image: vintageMuruganTee,
    aspectRatio: "aspect-[4/5]",
    price: 399,
    description:
      "Temple architecture etching and classic Murugan divinity rendered in warm antique sepia tones on heavy vintage cream cotton.",
    tags: ["240 GSM", "SEPIA WASH", "HERITAGE SCREEN"],
  },
  {
    id: "burgundy-cartoon",
    title: "BURGUNDY STREETWEAR COMIC CARTOON TEE",
    subtitle: "Vadivelu Pop Culture Comic Street Art on Wooden Hanger",
    category: "cinema",
    categoryLabel: "CINEMA & POP CULTURE",
    badge: "CULT MEME ART",
    fabric: "200 GSM Rich Burgundy Combed Cotton",
    printMethod: "Multi-Color Silkscreen & Sharp Typography",
    gsm: "200 GSM",
    image: burgundyCartoonTee,
    aspectRatio: "aspect-[4/5]",
    price: 499,
    description:
      "Vibrant comic art and iconic Tamil humor typography on premium burgundy blank. Features smooth hand-feel and fade-proof colorfast inks.",
    tags: ["200 GSM", "BURGUNDY", "COMIC SILKSCREEN"],
  },
];

export function PrintArchive() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [activeModalItem, setActiveModalItem] = useState<ArchiveItem | null>(
    null,
  );

  // Modal body scroll lock and escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModalItem(null);
    };
    if (activeModalItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalItem]);

  const categories = [
    { key: "all", label: `ALL DROPS (${ARCHIVE_ITEMS.length})` },
    { key: "cinema", label: "CINEMA & POP CULTURE" },
    { key: "sports", label: "SPORTS & ATHLETIC" },
    { key: "spiritual", label: "SPIRITUAL & HERITAGE" },
    { key: "streetwear", label: "STREETWEAR GRAPHICS" },
  ];

  const filteredItems =
    selectedCat === "all"
      ? ARCHIVE_ITEMS
      : ARCHIVE_ITEMS.filter((item) => item.category === selectedCat);

  return (
    <section
      id="archive"
      className="section relative bg-transparent border-t border-white/10 pt-16 sm:pt-20"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A62A]/35 to-transparent pointer-events-none" />

      <SectionHeading
        index="03"
        eyebrow="BESPOKE PRINT ARCHIVE // 12 NEW RELEASES"
        title={
          <>
            AUTHENTIC STREET DROPS.
            <br />
            <span className="text-metal">1-OF-1 & LIMITED RUNS.</span>
          </>
        }
        sub="Every graphic in our collection is precision-calibrated in our Puducherry print lab. Inspected for razor-sharp linework, high-density pigment depth, and zero cracking over 50+ wash cycles."
      />

      {/* Category Filter Pills */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCat(cat.key)}
            className={`shrink-0 px-4 py-2 font-mono text-xs tracking-wider transition-all cursor-pointer rounded-sm border ${
              selectedCat === cat.key
                ? "border-[#F4D477] bg-[#D4A62A] text-[#04070a] font-bold shadow-[0_0_16px_rgba(212,166,42,0.35)]"
                : "border-white/10 panel text-[#D9D9D9] hover:border-white/30 hover:text-white"
            }`}
          >
            [ {cat.label} ]
          </button>
        ))}
      </div>

      {/* 14-item Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item, idx) => (
          <Reveal
            key={item.id}
            delay={(idx % 4) * 70}
            className="panel group relative flex flex-col rounded-sm p-4 transition-all duration-300 hover:border-[#D4A62A]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(212,166,42,0.12)] bg-[#06080a]"
          >
            {/* Top Bar: Numbering + Category */}
            <div className="flex items-center justify-between font-mono text-[10px] text-[#a3a3a3] mb-3">
              <span className="text-[#D4A62A] font-bold">
                [{String(idx + 1).padStart(2, "0")}/
                {String(filteredItems.length).padStart(2, "0")}]
              </span>
              <span className="tracking-widest uppercase text-[#a3a3a3] truncate max-w-[150px]">
                {item.categoryLabel}
              </span>
            </div>

            {/* Image Preview Box with Hover Actions */}
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#04070a] cursor-pointer"
              onClick={() => setActiveModalItem(item)}
            >
              <img
                src={item.image}
                alt={`${item.title} - ${item.subtitle}`}
                loading="lazy"
                width={1145}
                height={1374}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04070a]/90 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Badge */}
              <span className="absolute top-3 left-3 bg-[#D4A62A] text-[#04070a] px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider rounded-sm shadow-md">
                {item.badge}
              </span>

              {/* Quick Inspect Button on Hover */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalItem(item);
                }}
                className="absolute top-3 right-3 flex items-center gap-1 bg-[#04070a]/85 hover:bg-[#04070a] text-white px-2 py-1 font-mono text-[9px] rounded-sm border border-white/10 backdrop-blur-md transition-colors"
                title="Inspect high-res print details"
              >
                <Maximize2 size={11} className="text-[#F4D477]" />
                <span className="hidden sm:inline">ZOOM</span>
              </button>

              {/* Bottom Tags Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none">
                {item.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] bg-[#04070a]/85 border border-white/10 px-2 py-0.5 text-[#F4D477] backdrop-blur-md rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Title & Subtitle */}
            <h3
              onClick={() => setActiveModalItem(item)}
              className="display mt-4 text-xl sm:text-2xl text-white group-hover:text-[#F4D477] transition-colors cursor-pointer line-clamp-1"
            >
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed">
              {item.subtitle}
            </p>

            {/* Fabric & Tech Print Info */}
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#8e8e8e] border-t border-white/5 pt-2.5">
              <span>{item.gsm}</span>
              <span className="text-[#D4A62A] truncate max-w-[130px]">
                {item.printMethod}
              </span>
            </div>

            {/* Price & Direct WhatsApp CTA */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-lg font-bold text-[#F4D477]">
                  {inr(item.price)}
                </span>
                <span className="font-mono text-[10px] text-[#a3a3a3]">
                  STARTING
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(item)}
                className="font-mono text-[10px] text-[#a3a3a3] hover:text-white underline cursor-pointer"
              >
                SPECS & SIZES
              </button>
            </div>

            <BracketButton
              href={waLink(
                `Hi Vince Outlets, I want to order the "${item.title}" (${item.subtitle}) starting at ${inr(item.price)}. Please share size availability and delivery timeline.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
              className="mt-3 !w-full !justify-center !text-xs !py-2"
            >
              CUSTOMISE THIS PIECE <span className="arw font-mono">→</span>
            </BracketButton>
          </Reveal>
        ))}
      </div>

      {/* Interactive Lightbox / Print Inspection Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#04070a]/92 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm border border-[#D4A62A]/50 bg-[#06080a] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-[#0e1418] text-white hover:border-[#D4A62A] hover:text-[#F4D477] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              {/* Left Column: Full-Res Image Viewer */}
              <div className="md:col-span-6 relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-[#04070a]">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#D4A62A] text-[#04070a] px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider rounded-sm shadow-md">
                  {activeModalItem.badge}
                </span>
                <span className="absolute bottom-3 left-3 font-mono text-[10px] bg-[#04070a]/90 text-[#F4D477] px-2.5 py-1 border border-[#D4A62A]/30 backdrop-blur-md">
                  {activeModalItem.fabric}
                </span>
              </div>

              {/* Right Column: Print Technical Specifications */}
              <div className="md:col-span-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-[#D4A62A] font-bold">
                    [STUDIO PRINT SPECIFICATION]
                  </span>
                  <span className="font-mono text-[10px] text-[#a3a3a3] uppercase">
                    {activeModalItem.categoryLabel}
                  </span>
                </div>

                <h2 className="display text-2xl sm:text-3xl text-white font-bold leading-tight">
                  {activeModalItem.title}
                </h2>
                <p className="mt-2 text-sm text-[#F4D477] font-mono">
                  {activeModalItem.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-[#D9D9D9] leading-relaxed">
                  {activeModalItem.description}
                </p>

                {/* Specs Table */}
                <div className="mt-6 space-y-2 border-y border-white/10 py-4 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#a3a3a3]">FABRIC BLANK:</span>
                    <span className="text-white font-bold">
                      {activeModalItem.fabric}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#a3a3a3]">PRINT TECHNIQUE:</span>
                    <span className="text-[#F4D477] font-bold">
                      {activeModalItem.printMethod}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#a3a3a3]">DURABILITY RATING:</span>
                    <span className="text-white font-bold">
                      50+ Washes (Crack-Proof)
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#a3a3a3]">AVAILABLE SIZES:</span>
                    <span className="text-white font-bold">
                      S, M, L, XL, 2XL, 3XL, 4XL, 5XL
                    </span>
                  </div>
                </div>

                {/* Pricing & Order CTA */}
                <div className="mt-6 flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#a3a3a3] block">
                      STARTING PRICE
                    </span>
                    <span className="font-mono text-2xl font-bold text-[#F4D477]">
                      {inr(activeModalItem.price)}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#a3a3a3]">
                    NO MINIMUMS • 0 MOQ
                  </span>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <WhatsAppButton
                    text={`Hi Vince Outlets, I am interested in ordering the "${activeModalItem.title}" (${activeModalItem.subtitle}) at ${inr(activeModalItem.price)}. Please share size guide and dispatch timeline.`}
                    variant="gold"
                    className="!w-full !justify-center !text-sm"
                  >
                    ORDER THIS PIECE VIA WHATSAPP{" "}
                    <span className="arw font-mono">→</span>
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Backward-compatibility alias
export const HowItWorks = () => null;

/* ═══ SECTION 4: WHY VINCE OUTLETS — THREE KEY BENEFITS ═══ */
export function Why() {
  const pillars = [
    {
      num: "01",
      badge: "240+ TO 430 GSM",
      title: "LUXURY HEAVYWEIGHT BLANKS",
      desc: "Engineered with heavyweight combed cotton and plush French terry fleece. Features dropped shoulders, widened chest circumference, and reinforced double-needle necklines that maintain structured drape through hundreds of wears.",
    },
    {
      num: "02",
      badge: "CRACK-PROOF TESTED",
      title: "HIGH-DENSITY CRACK-PROOF PRINTS",
      desc: "Master-calibrated screen inks and vibrant direct-to-film pigmentation rated for razor-sharp linework, rich deep blacks, and 50+ wash longevity without peeling, cracking, or fading.",
    },
    {
      num: "03",
      badge: "0 MOQ TO 500+ PCS",
      title: "ZERO MINIMUM ORDER REQUIREMENT",
      desc: "Whether you need a 1-of-1 bespoke personal statement piece or 500 matching tees for a college culturals squad or brand drop, work directly with our Puducherry printmakers with transparent volume pricing.",
    },
  ];

  return (
    <section
      id="why"
      className="section relative bg-transparent border-t border-white/10 pt-16 sm:pt-20"
    >
      {/* Subtle champagne-gold top rim glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A62A]/35 to-transparent pointer-events-none" />

      <SectionHeading
        index="03"
        eyebrow="WHY VINCE OUTLETS"
        title={
          <>
            THREE KEY
            <br />
            <span className="text-metal">BENEFITS.</span>
          </>
        }
        sub="Engineered for discerning streetwear enthusiasts, creators, and squads. Built without compromise on fabric weight, print durability or order flexibility."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 90}
            className="panel group relative rounded-sm p-7 sm:p-8 transition-all duration-300 hover:border-[#D4A62A]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between bg-[#06080a]"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] mb-6">
                <span className="text-[#D4A62A] font-bold">
                  [{item.num}] // BENEFIT
                </span>
                <span className="text-[#F4D477] bg-[#0e1418] px-2.5 py-0.5 rounded-sm border border-white/10 uppercase text-[10px] tracking-wider">
                  {item.badge}
                </span>
              </div>
              <h3 className="display text-2xl sm:text-3xl text-white group-hover:text-[#F4D477] transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-[#A3A3A3] leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-[#a3a3a3]">
              <span>VINCE CRAFT STANDARD</span>
              <span className="text-[#D4A62A]">GUARANTEED</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══ SECTION 5: BULK / CUSTOM SQUAD ORDERS & STUDIO PROMOTIONS ═══ */
export function Bulk() {
  const squadCategories = [
    "College Culturals & Squads",
    "Corporate & Startup Apparel",
    "Sports Teams & Tournaments",
    "Music Bands & Crew Merch",
    "Matching Friend Groups",
    "Festive Family Reunions",
  ];

  return (
    <section
      id="bulk"
      className="relative overflow-hidden bg-transparent border-t border-white/10 pt-16 sm:pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#04070a] via-[#04070a]/94 to-[#04070a]/85" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          index="05"
          eyebrow="BULK & SQUAD MERCHANDISE"
          title={
            <>
              ONE DESIGN.
              <br />
              ONE SQUAD.
              <br />
              <span className="text-metal">ONE STATEMENT.</span>
            </>
          }
          sub="Planning a college fest drop, sports jersey order, company apparel, or friends trip? Vince Outlets handles bulk custom orders with tiered volume pricing and guaranteed studio quality."
        />

        {/* Permanent Bulk Custom Apparel Studio Showcase */}
        <div className="mt-12 panel relative overflow-hidden rounded-sm border border-white/10 bg-[#06080a] p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-sm border border-[#D4A62A]/30 bg-[#0e1418] px-3 py-1 font-mono text-[10px] text-[#F4D477] uppercase mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4A62A]" />
                CUSTOM SQUAD & CORPORATE APPAREL
              </div>
              <h3 className="display text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight">
                TIERED VOLUME PRICING.{" "}
                <span className="text-metal">GUARANTEED CRAFT.</span>
              </h3>
              <p className="mt-3 text-sm text-[#D9D9D9] leading-relaxed max-w-2xl">
                Collaborate directly with our Puducherry workshop for your batch
                apparel drops. Tailored on 240+ to 430 GSM heavyweight cotton
                and French terry blanks with zero cracking over repeat wear.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {squadCategories.map((cat) => (
                  <span
                    key={cat}
                    className="panel px-3.5 py-1.5 font-mono text-xs text-[#D9D9D9] rounded-sm border border-white/10 bg-[#080d12]"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <WhatsAppButton text={MSG.bulk} variant="gold">
                  ENQUIRE BULK APPAREL <span className="arw font-mono">→</span>
                </WhatsAppButton>
                <span className="font-mono text-xs text-[#a3a3a3] flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#D4A62A]" />
                  Zero Minimum Order Requirement (0 MOQ)
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {[
                ["0 MOQ", "Single prototype or full squad drops"],
                [
                  "240-430 GSM",
                  "Heavyweight blanks in oversized & regular fits",
                ],
                ["PRINT CRAFT", "High-density screen, DTF & embroidery"],
                ["PAN-INDIA", "Direct dispatch from Puducherry studio"],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="p-3.5 rounded-sm border border-white/10 bg-[#04070a]"
                >
                  <p className="font-mono text-xs font-bold text-[#F4D477] mb-1">
                    {t}
                  </p>
                  <p className="font-mono text-[10px] text-[#a3a3a3] leading-relaxed">
                    {d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Backward-compatibility alias
export const Social = () => null;

/* ═══ SECTION 6: CONTACT & STUDIO LOCATION ═══ */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="section relative bg-transparent border-t border-white/10 pt-16 sm:pt-20"
    >
      <SectionHeading
        index="05"
        eyebrow="CONTACT & PUDUCHERRY STUDIO"
        title={
          <>
            COME
            <br />
            <span className="text-metal">FIND US.</span>
          </>
        }
        sub="Visit our walk-in studio in Kuyavarpalayam, Puducherry to inspect fabric blanks, view ink swatches, or discuss custom squad projects in person."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        {/* Contact Info Card */}
        <Reveal className="lg:col-span-5 panel p-7 sm:p-9 rounded-sm flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-[#04070a] text-[#D4A62A]">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-[#a3a3a3] uppercase font-bold mb-1">
                  STUDIO ADDRESS
                </p>
                <address className="not-italic text-sm sm:text-base text-white leading-relaxed">
                  {ADDRESS}
                </address>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#F4D477] hover:underline mt-2"
                >
                  OPEN IN GOOGLE MAPS <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-[#04070a] text-[#D4A62A]">
                <Phone size={18} />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-[#a3a3a3] uppercase font-bold mb-1">
                  CALL STUDIO
                </p>
                <a
                  href="tel:+916369963871"
                  className="font-mono text-sm sm:text-base text-white hover:text-[#F4D477] transition-colors"
                >
                  {PHONE}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-[#04070a] text-[#25D366]">
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-[#a3a3a3] uppercase font-bold mb-1">
                  WHATSAPP DIRECT
                </p>
                <div className="flex flex-col gap-1 font-mono text-sm sm:text-base">
                  <a
                    href={waLink(MSG.general, WA_NUMBER)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#F4D477] transition-colors"
                  >
                    {WA_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-[#04070a] text-[#F4D477]">
                <Star size={18} className="fill-[#F4D477]" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-[#a3a3a3] uppercase font-bold mb-1">
                  GOOGLE REVIEWS
                </p>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#F4D477] hover:underline"
                >
                  VINCE OUTLETS REVIEWS (5.0 ★) <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-[#04070a] text-[#D4A62A]">
                <Clock size={18} />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-[#a3a3a3] uppercase font-bold mb-1">
                  OPENING HOURS
                </p>
                <p className="font-mono text-sm text-white">
                  9:00 AM – 11:30 PM (MON – SUN)
                </p>
              </div>
            </div>
          </div>

          <WhatsAppButton
            text={MSG.general}
            variant="gold"
            className="w-full justify-center mt-4"
          >
            MESSAGE US ON WHATSAPP <span className="arw font-mono">→</span>
          </WhatsAppButton>
        </Reveal>

        {/* Embedded Google Map with Dark Mode Filter */}
        <Reveal className="lg:col-span-7 panel overflow-hidden rounded-sm p-2 shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
          <div className="relative h-full min-h-[380px] w-full rounded-sm overflow-hidden bg-[#04070a]">
            <iframe
              title="Vince Outlets Studio Location in Puducherry"
              src={MAPS_EMBED}
              loading="lazy"
              className="h-full w-full min-h-[380px] grayscale invert-[0.92] contrast-[0.95]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#04070a]">
      <div className="mx-auto max-w-[1500px] px-5 py-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={vincelogoOpt}
                alt="Vince Outlets Logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-contain ring-1 ring-[#D4A62A]/40"
              />
              <div>
                <span className="display text-xl text-white">
                  VINCE OUTLETS
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#D4A62A] block uppercase font-medium">
                  Puducherry Studio
                </span>
              </div>
            </div>
            <p className="mt-4 font-mono text-xs text-[#a3a3a3] leading-relaxed">
              Custom streetwear engineered around your vibe. High-density screen
              and DTF printing for bespoke personal statements and squad drops.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <p className="font-mono text-xs font-bold text-[#F4D477] tracking-[0.2em] uppercase mb-4">
              [ NAVIGATION ]
            </p>
            <ul className="space-y-2 font-mono text-xs text-[#a3a3a3]">
              {NAV.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-mono text-xs font-bold text-[#F4D477] tracking-[0.2em] uppercase mb-4">
              [ CONNECT ]
            </p>
            <ul className="space-y-2.5 font-mono text-xs text-[#a3a3a3]">
              <li>
                <a
                  href={waLink(MSG.general, WA_NUMBER)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  WA: {WA_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Phone size={13} />
                  TEL: {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Instagram size={13} />
                  @VINCE_OUTLETS
                </a>
              </li>
              <li>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4D477] transition-colors flex items-center gap-1.5 text-[#F4D477]"
                >
                  <Star size={13} className="fill-[#F4D477]" />
                  GOOGLE REVIEWS (5.0 ★)
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Details */}
          <div>
            <p className="font-mono text-xs font-bold text-[#F4D477] tracking-[0.2em] uppercase mb-4">
              [ PUDUCHERRY STUDIO ]
            </p>
            <p className="font-mono text-xs text-white leading-relaxed">
              {ADDRESS}
            </p>
            <p className="font-mono text-[10px] text-[#D4A62A] mt-3">
              STUDIO HOURS: 9:00 AM – 11:30 PM (MON – SUN)
            </p>
          </div>
        </div>

        {/* Dedicated CloudMaSa Footer Attribution */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="font-mono text-xs text-[#a3a3a3] uppercase tracking-widest font-medium">
              Built by
            </span>
            <a
              href={CLOUDMASA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Built by CloudMaSa - Visit CloudMaSa Website"
              className="inline-flex items-center transition-transform duration-300 hover:scale-105 opacity-90 hover:opacity-100"
            >
              <img
                src={cloudmasaLogo}
                alt="CloudMaSa"
                width={731}
                height={341}
                loading="lazy"
                decoding="async"
                className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_4px_16px_rgba(212,166,42,0.25)]"
              />
            </a>
          </div>
        </div>

        {/* Copyright & Coordinates Sub-footer */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#a3a3a3] safe-bottom">
          <p>© 2026 VINCE OUTLETS. ALL RIGHTS RESERVED.</p>
          <p className="text-[#D4A62A] tracking-wider uppercase">
            LUXURY STREETWEAR • BESPOKE PRINTS • PUDUCHERRY
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══ COORDINATED FLOATING ACTION GROUP (WHATSAPP • INSTAGRAM • GOOGLE REVIEWS) ═══ */
export function FloatingActionGroup() {
  return (
    <aside
      aria-label="Floating quick contact and reviews"
      className="floating-action-group flex flex-col items-end gap-2.5 pointer-events-none"
    >
      {/* 1. Google Reviews Floating Action */}
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Google Reviews - Read and submit reviews on Google"
        className="pointer-events-auto group flex items-center gap-2 rounded-full border border-white/15 bg-[#06080a]/92 px-3.5 py-2 text-xs font-mono text-[#D9D9D9] shadow-[0_8px_24px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#D4A62A] hover:text-[#F4D477]"
      >
        <GoogleIcon className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline font-bold tracking-wider text-[11px] uppercase">
          Google Reviews
        </span>
        <span className="flex items-center text-[#F4D477] text-[10px] font-bold">
          ★ 5.0
        </span>
      </a>

      {/* 2. Official Instagram Floating Action */}
      <a
        href={INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Vince Outlets on Instagram @vince_outlets"
        className="pointer-events-auto group flex items-center gap-2 rounded-full border border-white/15 bg-[#06080a]/92 px-3.5 py-2 text-xs font-mono text-[#D9D9D9] shadow-[0_8px_24px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#E1306C] hover:text-white"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#405DE6] text-white shrink-0">
          <Instagram size={12} className="stroke-[2.5]" />
        </div>
        <span className="hidden sm:inline font-bold tracking-wider text-[11px] uppercase">
          Instagram
        </span>
      </a>

      {/* 3. Official WhatsApp Floating Action */}
      <a
        href={waLink(MSG.general, WA_NUMBER)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Vince Outlets on WhatsApp (+91 63699 63871)"
        className="pointer-events-auto group relative flex items-center gap-2.5 rounded-full border-2 border-[#D4A62A] bg-[#04070a] px-4 py-2.5 text-xs font-mono text-[#F4D477] shadow-[0_8px_30px_rgba(212,166,42,0.4)] transition-all duration-300 hover:scale-105 hover:border-[#F4D477] hover:shadow-[0_12px_40px_rgba(212,166,42,0.65)]"
      >
        <div className="relative shrink-0">
          <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#D4A62A] animate-ping" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="font-bold tracking-wider text-[11px] text-white uppercase leading-none">
            WhatsApp Studio
          </span>
          <span className="text-[9px] text-[#25D366] font-mono mt-0.5">
            ONLINE // +91 63699 63871
          </span>
        </div>
      </a>
    </aside>
  );
}

// Backward-compatibility alias
export const FloatingWhatsApp = FloatingActionGroup;
