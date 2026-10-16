import { createFileRoute } from "@tanstack/react-router";
import {
  Navbar,
  Hero,
  HoodieSection,
  FullSleeveSection,
  CustomEnquiry,
  Shop,
  PrintArchive,
  Why,
  Bulk,
  ContactSection,
  Footer,
  FloatingActionGroup,
} from "@/components/site";
import { PRODUCTS, INSTAGRAM } from "@/lib/site-data";
import { usePointerLattice } from "@/hooks/usePointerLattice";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

import heroImage from "@/assets/hero.jpg";

const TITLE = "Vince Outlets | Custom T-Shirts & Streetwear in Puducherry";
const DESC =
  "Vince Outlets offers custom printed T-shirts, hoodies, oversized tees and ready-to-wear streetwear in Puducherry. Order custom single pieces, squad merchandise and bulk clothing through WhatsApp.";

const ld = [
  {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Vince Outlets",
    description: DESC,
    telephone: "+916369963871",
    sameAs: [INSTAGRAM],
    address: {
      "@type": "PostalAddress",
      streetAddress: "53 Iyyanar Koil Street, Lenin St, Kuyavarpalayam",
      addressLocality: "Puducherry",
      postalCode: "605013",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "23:30",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vince Outlets",
    sameAs: [INSTAGRAM],
  },
  ...PRODUCTS.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.desc,
    brand: { "@type": "Brand", name: "Vince Outlets" },
    offers: { "@type": "Offer", price: p.price, priceCurrency: "INR" },
  })),
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImage, fetchPriority: "high" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(ld) }],
  }),
  component: Index,
});

function Index() {
  usePointerLattice();
  useSmoothScroll();

  return (
    <div id="shell" className="grain">
      <div id="beam" aria-hidden="true" />
      <Navbar />
      <main className="relative z-10">
        {/* 1. T-SHIRT — FIRST SECTION (HERO + DEDICATED 3D T-SHIRT BOX) */}
        <Hero />
        {/* 2. HOODIE — SECOND SECTION (DEDICATED 3D HOODIE BOX) */}
        <HoodieSection />
        {/* 3. FULL SLEEVE T-SHIRT — THIRD SECTION (DEDICATED 3D FULL SLEEVE BOX) */}
        <FullSleeveSection />
        {/* 4. CUSTOM SILHOUETTE WORKFLOW */}
        <CustomEnquiry />
        {/* 5. READY-TO-WEAR COLLECTION */}
        <Shop />
        {/* 6. BESPOKE PRINT ARCHIVE // COMPLETE GRAPHIC COLLECTION */}
        <PrintArchive />
        {/* 7. WHY VINCE OUTLETS */}
        <Why />
        {/* 8. BULK & SQUAD MERCH */}
        <Bulk />
        {/* 9. PUDUCHERRY STUDIO & CONTACT */}
        <ContactSection />
      </main>
      {/* FOOTER */}
      <Footer />
      <FloatingActionGroup />
    </div>
  );
}
