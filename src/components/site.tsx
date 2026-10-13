import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Instagram,
  Menu,
  X,
  MessageCircle,
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
} from "lucide-react";
import vincelogo from "@/assets/vincelogo.png";
import hero from "@/assets/hero.jpg";
import customTee from "@/assets/custom-tee.jpg";
import culture from "@/assets/culture.jpg";
import squad from "@/assets/squad.jpg";
import hoodie from "@/assets/hoodie.jpg";
import sweatshirt from "@/assets/sweatshirt.jpg";
import polo from "@/assets/polo.jpg";
import croptop from "@/assets/croptop.jpg";
import kids from "@/assets/kids.jpg";
import {
  PRODUCTS,
  MSG,
  waLink,
  productMsg,
  inr,
  INSTAGRAM,
  PHONE,
  WA_DISPLAY,
  ADDRESS,
  MAPS_URL,
  MAPS_EMBED,
  type Product,
} from "@/lib/site-data";

const PRODUCT_IMAGES: Record<string, string> = {
  "OVERSIZED - UNISEX": hero,
  "REGULAR FIT - UNISEX": customTee,
  "HOODIE - UNISEX": hoodie,
  "SWEATSHIRT - UNISEX": sweatshirt,
  "POLO - UNISEX": polo,
  "CROPTOPS": croptop,
  "KIDS - UNISEX": kids,
};

const NAV = [
  ["HOME", "#home"],
  ["SHOP", "#shop"],
  ["CUSTOM PRINT", "#custom"],
  ["HOW IT WORKS", "#how"],
  ["ABOUT", "#about"],
  ["CONTACT", "#contact"],
] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
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
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function WhatsAppButton({
  text,
  children,
  variant = "primary",
  className = "",
}: {
  text: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4A62A] shadow-[0_0_8px_#D4A62A]" />
          <p className="eyebrow">{eyebrow}</p>
        </div>
      )}
      <h2 className="display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white">
        {title}
      </h2>
    </Reveal>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-2xl border-b border-[#222222] shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
          : "bg-gradient-to-b from-[#080808]/90 via-[#080808]/40 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3.5 lg:px-10">
        <a
          href="#home"
          aria-label="Vince Outlets home"
          className="flex items-center gap-3.5 group"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#D4A62A]/40 to-transparent blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
            <img
              src={vincelogo}
              alt="Vince Outlets logo"
              width={52}
              height={52}
              className="relative h-11 w-11 sm:h-13 sm:w-13 rounded-full object-contain ring-1 ring-[#D4A62A]/50 shadow-[0_0_16px_rgba(212,166,42,0.25)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="display text-xl sm:text-2xl text-white tracking-tight leading-none group-hover:text-[#F4D477] transition-colors">
              VINCE OUTLETS
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#D4A62A] font-semibold uppercase mt-0.5">
              Puducherry • Bespoke Streetwear
            </span>
          </div>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="group relative py-1 text-xs tracking-[0.2em] font-semibold text-[#A3A3A3] transition-colors hover:text-white"
              >
                {label}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#F4D477] to-[#D4A62A] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="icon-btn hidden sm:inline-flex"
          >
            <Instagram size={17} />
          </a>
          <a
            href={waLink(MSG.general)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="icon-btn"
          >
            <MessageCircle size={17} />
          </a>
          <a
            href="#shop"
            className="btn-primary hidden !min-h-[2.75rem] !py-2 !px-5 lg:inline-flex text-[11px]"
          >
            SHOP NOW
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="icon-btn lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#080808]/98 backdrop-blur-2xl px-6 py-6 animate-fade-in border-l border-[#222222] lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={vincelogo}
                alt="Vince Outlets logo"
                width={48}
                height={48}
                className="h-11 w-11 rounded-full object-contain ring-1 ring-[#D4A62A]/40 shadow-[0_0_16px_rgba(212,166,42,0.3)]"
              />
              <div className="flex flex-col">
                <span className="display text-xl text-white">VINCE OUTLETS</span>
                <span className="text-[9px] tracking-[0.28em] text-[#D4A62A] font-semibold uppercase">
                  Puducherry
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="icon-btn"
            >
              <X size={20} />
            </button>
          </div>

          <div className="my-auto py-8">
            <ul className="flex flex-col gap-5">
              {NAV.map(([l, h], idx) => (
                <li key={h}>
                  <a
                    href={h}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 group"
                  >
                    <span className="font-mono text-xs text-[#D4A62A]">
                      0{idx + 1}
                    </span>
                    <span className="display text-3xl sm:text-4xl text-white transition-colors group-hover:text-[#F4D477]">
                      {l}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[#222222]">
            <div className="flex gap-3">
              <WhatsAppButton text={MSG.general} className="flex-1 justify-center">
                WHATSAPP
              </WhatsAppButton>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex-1 justify-center"
              >
                INSTAGRAM
              </a>
            </div>
            <p className="text-center text-[10px] tracking-wider text-[#A3A3A3] mt-2">
              STUDIO: 53 IYYANAR KOIL ST, PUDUCHERRY
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const f = () => setY(window.scrollY);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#080808]"
    >
      <img
        src={hero}
        alt="Model wearing an oversized black custom printed T-shirt in a dark urban studio"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] opacity-85 transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${y * 0.18}px) scale(${1.04 + y * 0.0001})`,
        }}
      />
      {/* Cinematic dark vignettes crafted to keep model prominent while maximizing text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_35%,_#080808_95%)] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-14 pt-36 lg:px-10 lg:pb-20">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#D4A62A]/40 bg-[#101010]/90 px-4 py-1.5 backdrop-blur-md mb-6 animate-fade-in shadow-[0_0_20px_rgba(212,166,42,0.18)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4A62A] shadow-[0_0_8px_#D4A62A] animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.28em] text-[#F4D477] uppercase">
            VINCE OUTLETS • PUDUCHERRY STUDIO
          </span>
        </div>

        <h1 className="display text-[14vw] leading-[0.88] sm:text-[10vw] lg:text-[8.5vw] tracking-tight">
          <span className="block text-white animate-fade-in drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            WEAR AWESOME.
          </span>
          <span className="block text-metal animate-fade-in [animation-delay:150ms] drop-shadow-[0_4px_30px_rgba(212,166,42,0.25)]">
            MAKE IT YOURS.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base sm:text-lg text-[#D9D9D9] font-normal leading-relaxed">
          Custom streetwear made around your vibe — from one bespoke statement tee to full squad drops, crafted in our Puducherry studio.
        </p>

        <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
          <WhatsAppButton
            text={MSG.custom}
            className="shadow-[0_4px_25px_rgba(212,166,42,0.35)]"
          >
            CUSTOMIZE YOUR TEE <ArrowUpRight size={16} />
          </WhatsAppButton>
          <a href="#shop" className="btn-ghost">
            EXPLORE COLLECTION
          </a>
        </div>

        {/* Campaign hallmarks bar */}
        <div className="mt-14 pt-7 border-t border-[#222222] flex flex-wrap items-center gap-y-3 gap-x-8 text-xs font-semibold tracking-[0.2em] text-[#A3A3A3]">
          <span className="flex items-center gap-2 text-white">
            <Sparkles size={13} className="text-[#D4A62A]" /> 100% COMBED COTTON
          </span>
          <span className="hidden sm:inline text-[#222222]">•</span>
          <span className="text-white">HIGH-DENSITY PRINTS</span>
          <span className="hidden sm:inline text-[#222222]">•</span>
          <span className="text-white">1-OF-1 CUSTOM & SQUADS</span>
          <span className="hidden sm:inline text-[#222222]">•</span>
          <span className="text-white">ALL INDIA SHIPPING</span>
        </div>
      </div>
    </section>
  );
}

export function Statement() {
  const pillars = [
    {
      step: "01",
      title: "BESPOKE FIT ARCHITECTURE",
      desc: "Dropped shoulders, relaxed chest, and structured drape engineered for contemporary streetwear silhouettes.",
      badge: "240+ GSM HEAVYWEIGHT",
    },
    {
      step: "02",
      title: "HIGH-DENSITY PRINT CRAFT",
      desc: "Master-calibrated screen, DTF, and vinyl inks built for deep pigmentation, sharp details, and zero wash crack.",
      badge: "COLOR-FAST TESTED",
    },
    {
      step: "03",
      title: "DIRECT 1-ON-1 WHATSAPP STUDIO",
      desc: "Collaborate directly with our Puducherry print specialists to dial in your design size, placement, and finishes.",
      badge: "ZERO MOQ REQUIRED",
    },
  ];

  return (
    <section id="about" className="section bg-[#080808]">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="THE BRAND PHILOSOPHY"
            title={
              <>
                YOUR IDEA.
                <br />
                YOUR FIT.
                <br />
                <span className="text-metal">YOUR STATEMENT.</span>
              </>
            }
          />
          <Reveal delay={150}>
            <p className="mt-8 text-lg sm:text-xl text-[#D9D9D9] leading-relaxed max-w-xl">
              Streetwear is meant to be personal. Vince Outlets combines luxury heavyweight apparel blanks with modern print technology—giving you the freedom to wear what you actually think, celebrate, and represent.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#222222] pt-6 max-w-lg">
              <div>
                <p className="display text-3xl sm:text-4xl text-[#F4D477]">240+ GSM</p>
                <p className="text-xs uppercase tracking-widest text-[#A3A3A3] mt-1">
                  Combed Heavy Cotton
                </p>
              </div>
              <div>
                <p className="display text-3xl sm:text-4xl text-white">0 MOQ</p>
                <p className="text-xs uppercase tracking-widest text-[#A3A3A3] mt-1">
                  Single Piece or Squad
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Asymmetric technical craft stack */}
        <div className="flex flex-col gap-4">
          {pillars.map((item, idx) => (
            <Reveal
              key={item.step}
              delay={idx * 120}
              className="group relative rounded-sm border border-[#222222] bg-[#101010] p-6 sm:p-7 transition-all duration-300 hover:border-[#D4A62A]/50 hover:bg-[#191919] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#D4A62A]">
                  {item.step} / DISCOVERY
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#A3A3A3] group-hover:text-[#F4D477] transition-colors uppercase">
                  {item.badge}
                </span>
              </div>
              <h3 className="display mt-4 text-2xl text-white group-hover:text-[#F4D477] transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#A3A3A3] leading-relaxed">
                {item.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CustomPrint() {
  const steps = [
    {
      num: "01",
      title: "Choose your apparel.",
      desc: "Pick from oversized tees, regular fit, hoodies, crewneck sweatshirts, polos, or cropped silhouettes.",
    },
    {
      num: "02",
      title: "Share your design or idea.",
      desc: "Send your artwork, logo, typography quote, artwork concept, or high-res photo via WhatsApp.",
    },
    {
      num: "03",
      title: "Confirm details through WhatsApp.",
      desc: "Review digital mockups, placement measurements, fabric specifications, and custom quote with our team.",
    },
    {
      num: "04",
      title: "Proceed with the order.",
      desc: "Your piece is printed with calibrated high-density inks and prepared for studio pickup or pan-India delivery.",
    },
  ];

  const apparelOptions = [
    "Oversized Tees",
    "Regular Fit",
    "Heavy Hoodies",
    "Sweatshirts",
    "Street Polos",
    "Crop Tops",
    "Kids Fits",
  ];

  return (
    <section
      id="custom"
      className="bg-[#080808] border-y border-[#222222]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Custom Apparel Mockup Image with Tech Callouts */}
          <Reveal className="relative overflow-hidden rounded-sm border border-[#222222] bg-[#101010] shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
            <img
              src={customTee}
              alt="Custom oversized black T-shirt with silver screen-printed artwork"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full max-h-[640px] w-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent pointer-events-none" />

            {/* Streetwear Callout Badges */}
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#D4A62A]/40 bg-[#080808]/85 px-3 py-1 text-[11px] font-bold tracking-wider text-[#F4D477] backdrop-blur-md">
                1-OF-1 BESPOKE READY
              </span>
              <span className="rounded-full border border-white/10 bg-[#080808]/85 px-3 py-1 text-[11px] font-semibold tracking-wider text-white backdrop-blur-md">
                240 GSM COMBED COTTON
              </span>
            </div>
          </Reveal>

          {/* 4-Step Sequence Process */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A62A] shadow-[0_0_8px_#D4A62A]" />
              <p className="eyebrow">CUSTOM PRINTING EXPERIENCE</p>
            </div>
            <h2 className="display text-4xl sm:text-6xl text-white">
              MAKE YOUR
              <br />
              <span className="text-metal">OWN STATEMENT.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#D9D9D9] leading-relaxed">
              Have a vision in mind? Vince Outlets translates your ideas, brand logos, or personal artwork into premium wearable apparel with zero MOQ.
            </p>

            {/* Supported Apparel Selection */}
            <div className="mt-6 flex flex-wrap gap-2">
              {apparelOptions.map((opt) => (
                <span
                  key={opt}
                  className="rounded-full border border-[#222222] bg-[#101010] px-3.5 py-1.5 text-xs font-medium text-[#D9D9D9]"
                >
                  {opt}
                </span>
              ))}
            </div>

            {/* The 4 Exact Workflow Steps */}
            <div className="mt-8 space-y-4">
              {steps.map((st) => (
                <div
                  key={st.num}
                  className="flex gap-4 rounded-sm border border-[#222222] bg-[#101010] p-4 sm:p-5 transition-all hover:border-[#D4A62A]/40 hover:bg-[#191919]"
                >
                  <span className="font-mono text-sm font-bold text-[#F4D477] shrink-0">
                    {st.num}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      {st.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <WhatsAppButton
                text={MSG.custom}
                className="shadow-[0_4px_25px_rgba(212,166,42,0.35)]"
              >
                START YOUR CUSTOM PIECE <ArrowUpRight size={16} />
              </WhatsAppButton>
              <a href="#how" className="btn-ghost">
                VIEW WORKFLOW DETAILS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Culture() {
  const tags = [
    "CINEMA HEROES",
    "CRICKET LEGENDS",
    "FOOTBALL ICONS",
    "FAN-ART DROPS",
    "ANIME CONCEPTS",
  ];
  return (
    <section className="section bg-[#080808]">
      <SectionHeading
        eyebrow="FAN-ART & POP-CULTURE"
        title={
          <>
            CULTURE. ICONS.
            <br />
            <span className="text-metal">STREETWEAR.</span>
          </>
        }
      />
      <Reveal className="mt-12 overflow-hidden rounded-sm border border-[#222222] bg-[#101010] shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
        <img
          src={culture}
          alt="Three oversized tees with cricket, football and cinema inspired fan-art prints"
          loading="lazy"
          width={1600}
          height={912}
          className="w-full transition-transform duration-1000 hover:scale-103"
        />
      </Reveal>
      <div className="mt-7 flex flex-wrap gap-2.5">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[#222222] bg-[#101010] px-4 py-2 text-xs tracking-[0.2em] font-medium text-[#D9D9D9] transition-all hover:border-[#D4A62A]/50 hover:text-white"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-5 text-xs text-[#A3A3A3]">
        Fan-art and pop-culture inspired concepts. Not official celebrity merchandise or endorsement.
      </p>
    </section>
  );
}

export function ProductCard({ p, i }: { p: Product; i: number }) {
  const save = Math.round(((p.old - p.price) / p.old) * 100);
  const img = PRODUCT_IMAGES[p.name] || hero;

  return (
    <Reveal
      delay={(i % 4) * 80}
      className="group flex flex-col rounded-sm border border-[#222222] bg-[#101010] p-4 transition-all duration-300 hover:border-[#D4A62A]/50 hover:bg-[#191919] hover:shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(212,166,42,0.12)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#191919]">
        <img
          src={img}
          alt={`${p.name} streetwear apparel by Vince Outlets Puducherry`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
        <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#F4D477] to-[#D4A62A] px-3 py-1 text-[10px] font-black tracking-wider text-[#080808] shadow-[0_2px_10px_rgba(212,166,42,0.4)]">
          SAVE {save}%
        </span>
        <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-[0.22em] text-[#D9D9D9] drop-shadow-md">
          {p.category.toUpperCase()}
        </span>
      </div>

      <h3 className="display mt-4 text-xl sm:text-2xl text-white group-hover:text-[#F4D477] transition-colors">
        {p.name}
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-[#A3A3A3] line-clamp-2">{p.desc}</p>

      <div className="mt-4 flex items-baseline gap-2.5">
        <span className="text-xl font-extrabold text-[#F4D477]">
          {inr(p.price)}
        </span>
        <span className="text-xs font-medium text-[#A3A3A3] line-through">
          {inr(p.old)}
        </span>
      </div>

      <WhatsAppButton
        text={productMsg(p)}
        variant="ghost"
        className="mt-4 justify-center !min-h-[2.6rem] !py-2 !text-xs border-[#222222] bg-[#191919] text-white hover:border-[#D4A62A] hover:bg-[#D4A62A]/10 hover:text-[#F4D477]"
      >
        ORDER ON WHATSAPP
      </WhatsAppButton>
    </Reveal>
  );
}

export function Shop() {
  const cats = ["ALL", ...Array.from(new Set(PRODUCTS.map((p) => p.category.toUpperCase())))];
  const [c, setC] = useState("ALL");
  const list =
    c === "ALL" ? PRODUCTS : PRODUCTS.filter((p) => p.category.toUpperCase() === c);

  return (
    <section id="shop" className="section bg-[#080808]">
      <SectionHeading
        eyebrow="READY TO WEAR COLLECTION"
        title={
          <>
            STREETWEAR SILHOUETTES.
            <br />
            <span className="text-metal">READY TO STAND OUT.</span>
          </>
        }
      />

      {/* Category navigation filter */}
      <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {cats.map((k) => (
          <button
            key={k}
            onClick={() => setC(k)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.18em] transition-all cursor-pointer ${
              c === k
                ? "border-[#F4D477] bg-gradient-to-r from-[#F4D477] to-[#D4A62A] text-[#080808] shadow-[0_4px_16px_rgba(212,166,42,0.35)]"
                : "border-[#222222] bg-[#101010] text-[#D9D9D9] hover:border-[#D4A62A]/40 hover:text-white"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.name} p={p} i={PRODUCTS.indexOf(p)} />
        ))}

        {/* Custom 1-of-1 Drop Promo Card */}
        <Reveal className="group flex aspect-[4/5] flex-col justify-end rounded-sm border border-[#D4A62A]/40 bg-gradient-to-b from-[#101010] to-[#191919] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all hover:border-[#D4A62A] hover:shadow-[0_12px_40px_rgba(212,166,42,0.2)]">
          <div className="mb-auto">
            <span className="font-mono text-xs font-bold text-[#F4D477]">
              CUSTOM DROP
            </span>
          </div>
          <p className="eyebrow">BESPOKE PRINTING</p>
          <h3 className="display mt-3 text-3xl sm:text-4xl text-white group-hover:text-metal transition-colors">
            ANY FIT.
            <br />
            YOUR DESIGN.
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#A3A3A3]">
            Single piece or full squad order. Drop your concept now.
          </p>
          <WhatsAppButton text={MSG.custom} className="mt-5 justify-center !min-h-[2.6rem] !py-2 text-xs">
            START CUSTOM
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: Shirt,
      num: "01",
      title: "CHOOSE YOUR SILHOUETTE",
      desc: "Pick oversized, regular fit, hoodie, sweatshirt, polo, or cropped fit in your required sizing.",
    },
    {
      icon: Upload,
      num: "02",
      title: "SHARE YOUR ARTWORK",
      desc: "Send your artwork, logo, typography quote, artwork concept, or photo directly to our WhatsApp.",
    },
    {
      icon: Printer,
      num: "03",
      title: "CONFIRM & CALIBRATE",
      desc: "Our print team reviews ink density, placement mockup, and gives you exact final details.",
    },
    {
      icon: Package,
      num: "04",
      title: "GET YOUR PIECE",
      desc: "Collect at our Puducherry studio or receive tracked insured delivery anywhere across India.",
    },
  ];

  return (
    <section id="how" className="section bg-[#080808] border-t border-[#222222]">
      <SectionHeading
        eyebrow="SIMPLE ORDERING WORKFLOW"
        title={
          <>
            FOUR STEPS.
            <br />
            <span className="text-metal">ONE DROP.</span>
          </>
        }
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((st, i) => {
          const Icon = st.icon;
          return (
            <Reveal
              key={st.title}
              delay={i * 100}
              className="group relative rounded-sm border border-[#222222] bg-[#101010] p-7 transition-all duration-300 hover:border-[#D4A62A]/50 hover:bg-[#191919] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,166,42,0.1)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#F4D477]">
                  {st.num}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#191919] border border-[#222222] text-[#D4A62A] group-hover:border-[#D4A62A]/50 group-hover:text-[#F4D477] group-hover:shadow-[0_0_12px_rgba(212,166,42,0.3)] transition-all">
                  <Icon size={19} />
                </div>
              </div>
              <h3 className="display mt-8 text-xl sm:text-2xl text-white group-hover:text-[#F4D477] transition-colors">
                {st.title}
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                {st.desc}
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

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
    <section className="relative overflow-hidden bg-[#080808] border-y border-[#222222]">
      <img
        src={squad}
        alt="Friends wearing matching custom black printed tees and hoodies at night"
        loading="lazy"
        width={1600}
        height={912}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/85 to-[#080808]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-36">
        <SectionHeading
          eyebrow="VOLUME SQUAD MERCHANDISE"
          title={
            <>
              ONE DESIGN.
              <br />
              ONE SQUAD.
              <br />
              <span className="text-metal">ONE STATEMENT.</span>
            </>
          }
        />
        <Reveal>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#D9D9D9] leading-relaxed">
            Planning a college culturals drop, corporate team apparel, sports jersey squad, or festive group fit? Vince Outlets handles bulk custom drops with tiered volume rates and dedicated studio quality assurance.
          </p>
        </Reveal>
        <ul className="mt-8 flex flex-wrap gap-2.5 max-w-2xl">
          {squadCategories.map((cat) => (
            <li
              key={cat}
              className="rounded-full border border-[#222222] bg-[#101010]/90 px-4 py-2 text-xs font-medium text-[#D9D9D9] backdrop-blur-md transition-all hover:border-[#D4A62A]/40 hover:text-white"
            >
              {cat}
            </li>
          ))}
        </ul>
        <WhatsAppButton
          text={MSG.bulk}
          className="mt-10 inline-flex shadow-[0_4px_25px_rgba(212,166,42,0.35)]"
        >
          GET A BULK QUOTE <ArrowUpRight size={16} />
        </WhatsAppButton>
      </div>
    </section>
  );
}

export function Why() {
  const features = [
    {
      title: "CUSTOM-FIRST CRAFT",
      desc: "Your design vision comes first. Every print is calibrated for ink vibrancy, fine details, and lasting wash resistance.",
    },
    {
      title: "ZERO MINIMUM ORDER",
      desc: "Wear a 1-of-1 personal statement or outfit your entire 100-person squad with seamless volume pricing.",
    },
    {
      title: "STREETWEAR SILHOUETTES",
      desc: "Heavyweight combed cotton, dropped shoulders, and structured collars built for everyday urban style.",
    },
    {
      title: "PUDUCHERRY ROOTS • PAN-INDIA",
      desc: "Crafted in our local studio with direct walk-in pickup, dispatched with tracked delivery across all Indian pin codes.",
    },
  ];

  return (
    <section className="section bg-[#080808]">
      <SectionHeading
        eyebrow="WHY VINCE OUTLETS"
        title={
          <>
            BUILT AROUND
            <br />
            <span className="text-metal">YOUR VIBE.</span>
          </>
        }
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 90}
            className="group rounded-sm border border-[#222222] bg-[#101010] p-7 transition-all duration-300 hover:border-[#D4A62A]/50 hover:bg-[#191919] hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(212,166,42,0.1)]"
          >
            <div className="h-0.5 w-7 bg-[#D4A62A]/50 group-hover:bg-[#D4A62A] group-hover:w-10 transition-all duration-300 mb-5" />
            <h3 className="display text-xl sm:text-2xl text-white group-hover:text-[#F4D477] transition-colors">
              {item.title}
            </h3>
            <p className="mt-2.5 text-[#A3A3A3] text-xs sm:text-sm leading-relaxed">
              {item.desc}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TestimonialCard({
  quote,
  author,
  tag,
}: {
  quote: string;
  author: string;
  tag: string;
}) {
  return (
    <Reveal className="relative flex flex-col justify-between rounded-sm border border-[#222222] bg-[#101010] p-7 sm:p-8 transition-all hover:border-[#D4A62A]/40 hover:bg-[#191919]">
      <div>
        <div className="flex items-center gap-1 text-[#F4D477] mb-4">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} size={15} fill="#D4A62A" color="#D4A62A" />
          ))}
        </div>
        <p className="text-base sm:text-lg leading-relaxed text-white font-normal">
          "{quote}"
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-[#222222] pt-4">
        <div>
          <p className="text-xs font-bold text-white tracking-wider">{author}</p>
          <p className="text-[10px] tracking-wider text-[#A3A3A3] uppercase mt-0.5">{tag}</p>
        </div>
        <span className="flex items-center gap-1 text-[10px] tracking-widest text-[#D4A62A] font-semibold uppercase">
          <CheckCircle2 size={12} /> VERIFIED
        </span>
      </div>
    </Reveal>
  );
}

export function Social() {
  const images = [hero, customTee, culture, squad, hoodie, polo];

  return (
    <section className="section bg-[#080808] border-t border-[#222222]">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="INSTAGRAM COMMUNITY"
            title={
              <>
                JOIN THE
                <br />
                <span className="text-metal">VINCE MOVEMENT.</span>
              </>
            }
          />
          <Reveal>
            <p className="mt-6 max-w-md text-base sm:text-lg text-[#D9D9D9] leading-relaxed">
              Follow @vince_outlets for fresh drops, behind-the-scenes printing sessions, customer fits, and limited streetwear runs.
            </p>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 inline-flex shadow-[0_4px_25px_rgba(212,166,42,0.35)]"
            >
              <Instagram size={16} /> FOLLOW @VINCE_OUTLETS
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {images.map((s, i) => (
            <a
              key={i}
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm border border-[#222222] bg-[#101010]"
              aria-label="View on Instagram"
            >
              <img
                src={s}
                alt="Vince Outlets streetwear lifestyle drop"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-[#080808]/75 text-[#F4D477] opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram size={26} />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-5 md:grid-cols-2">
        <TestimonialCard
          quote="Good quality of work and best price in Pondicherry. Well-trained staff and great clothing materials."
          author="Puducherry Studio Customer"
          tag="Google Verified Review"
        />
        <TestimonialCard
          quote="If you're looking for custom print-on-demand t-shirts in Puducherry, this is definitely the place to go."
          author="Custom Print Client"
          tag="Google Verified Review"
        />
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section bg-[#080808] border-t border-[#222222]">
      <SectionHeading
        eyebrow="STUDIO & INQUIRIES"
        title={
          <>
            COME
            <br />
            <span className="text-metal">FIND US.</span>
          </>
        }
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="flex flex-col gap-6 rounded-sm border border-[#222222] bg-[#101010] p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#191919] border border-[#D4A62A]/40 text-[#D4A62A] shadow-[0_0_12px_rgba(212,166,42,0.2)]">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[11px] tracking-widest text-[#A3A3A3] font-bold mb-1 uppercase">
                STUDIO LOCATION
              </p>
              <address className="not-italic text-sm sm:text-base text-white leading-relaxed">
                53 Iyyanar Koil Street,
                <br />
                Lenin St, Kuyavarpalayam,
                <br />
                Puducherry – 605013
              </address>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#191919] border border-[#D4A62A]/40 text-[#D4A62A] shadow-[0_0_12px_rgba(212,166,42,0.2)]">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[11px] tracking-widest text-[#A3A3A3] font-bold mb-1 uppercase">
                DIRECT CALL
              </p>
              <a
                href="tel:+916369963871"
                className="text-sm sm:text-base text-white hover:text-[#F4D477] transition-colors font-medium"
              >
                {PHONE}
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#191919] border border-[#D4A62A]/40 text-[#D4A62A] shadow-[0_0_12px_rgba(212,166,42,0.2)]">
              <MessageCircle size={18} />
            </div>
            <div>
              <p className="text-[11px] tracking-widest text-[#A3A3A3] font-bold mb-1 uppercase">
                WHATSAPP ORDERS & SQUADS
              </p>
              <a
                href={waLink(MSG.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-white hover:text-[#F4D477] transition-colors font-medium"
              >
                {WA_DISPLAY}
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#191919] border border-[#D4A62A]/40 text-[#D4A62A] shadow-[0_0_12px_rgba(212,166,42,0.2)]">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[11px] tracking-widest text-[#A3A3A3] font-bold mb-1 uppercase">
                STUDIO HOURS
              </p>
              <p className="text-sm sm:text-base text-white font-medium">Monday – Sunday</p>
              <p className="text-xs sm:text-sm text-[#A3A3A3]">9:00 AM – 11:30 PM</p>
            </div>
          </div>

          <div className="mt-auto grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 pt-5 border-t border-[#222222]">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost justify-center text-center !min-h-[2.6rem] !py-2 !text-xs"
            >
              DIRECTIONS
            </a>
            <WhatsAppButton
              text={MSG.general}
              className="justify-center text-center !min-h-[2.6rem] !py-2 !text-xs"
            >
              WHATSAPP US
            </WhatsAppButton>
            <a
              href="tel:+916369963871"
              className="btn-ghost justify-center text-center !min-h-[2.6rem] !py-2 !text-xs"
            >
              CALL STUDIO
            </a>
          </div>
        </Reveal>

        <Reveal className="min-h-[400px] overflow-hidden rounded-sm border border-[#222222] shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          <iframe
            title="Vince Outlets location map"
            src={MAPS_EMBED}
            loading="lazy"
            className="h-full min-h-[400px] w-full grayscale invert-[0.92] contrast-[0.95]"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#222222] bg-[#080808]">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <div className="flex items-center gap-3.5">
            <img
              src={vincelogo}
              alt="Vince Outlets logo"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-contain ring-1 ring-[#D4A62A]/50 shadow-[0_0_20px_rgba(212,166,42,0.25)]"
            />
            <div>
              <p className="display text-2xl text-white">VINCE OUTLETS</p>
              <p className="text-[9px] tracking-[0.3em] text-[#D4A62A] font-semibold uppercase">
                Puducherry
              </p>
            </div>
          </div>
          <p className="mt-5 text-[#A3A3A3] text-xs sm:text-sm leading-relaxed">
            Custom streetwear made around your vibe. High-density screen and DTF printing for personal statements and squad drops.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4 text-[#F4D477]">QUICK NAVIGATION</p>
          <ul className="space-y-2.5">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <a
                  href={h}
                  className="text-xs sm:text-sm font-medium text-[#D9D9D9] transition-colors hover:text-[#F4D477]"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-[#F4D477]">CONNECT</p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#D9D9D9]">
            <li>
              <a
                href={waLink(MSG.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F4D477] transition-colors"
              >
                WhatsApp: {WA_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href="tel:+916369963871"
                className="hover:text-[#F4D477] transition-colors"
              >
                Call: {PHONE}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F4D477] transition-colors"
              >
                Instagram (@vince_outlets)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-[#F4D477]">PUDUCHERRY STUDIO</p>
          <p className="text-xs sm:text-sm text-[#D9D9D9] leading-relaxed">{ADDRESS}</p>
          <p className="mt-3 text-[11px] font-semibold tracking-wider text-[#A3A3A3]">
            STUDIO HOURS: 9:00 AM – 11:30 PM (MON – SUN)
          </p>
        </div>
      </div>

      <div className="border-t border-[#222222] py-5 px-5 text-center text-xs text-[#A3A3A3] flex flex-col sm:flex-row items-center justify-between max-w-[1500px] mx-auto lg:px-10 gap-2">
        <p>© 2026 Vince Outlets. All rights reserved.</p>
        <p className="text-[#D4A62A]/80 text-[10px] tracking-wider uppercase">
          Luxury Streetwear • Bespoke Prints • Puducherry
        </p>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(MSG.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vince Outlets on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#080808] border-2 border-[#D4A62A] text-[#F4D477] shadow-[0_8px_30px_rgba(212,166,42,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(212,166,42,0.65)] hover:border-[#F4D477] hover:text-white"
    >
      <MessageCircle size={26} />
    </a>
  );
}
