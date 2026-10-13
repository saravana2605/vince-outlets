import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Hero, Statement, CustomPrint, Culture, Shop, HowItWorks, Bulk, Why, Social, ContactSection, Footer, FloatingWhatsApp } from "@/components/site";
import { PRODUCTS, INSTAGRAM } from "@/lib/site-data";

const TITLE = "Vince Outlets | Custom T-Shirts & Streetwear in Puducherry";
const DESC = "Vince Outlets offers custom printed T-shirts, hoodies, oversized tees and ready-to-wear streetwear in Puducherry. Order custom single pieces, squad merchandise and bulk clothing through WhatsApp.";

const ld = [
  {
    "@context": "https://schema.org", "@type": "ClothingStore", name: "Vince Outlets", description: DESC,
    telephone: "+916369963871", sameAs: [INSTAGRAM],
    address: { "@type": "PostalAddress", streetAddress: "53 Iyyanar Koil Street, Lenin St, Kuyavarpalayam", addressLocality: "Puducherry", postalCode: "605013", addressCountry: "IN" },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "23:30" }],
  },
  { "@context": "https://schema.org", "@type": "Organization", name: "Vince Outlets", sameAs: [INSTAGRAM] },
  ...PRODUCTS.map((p) => ({ "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.desc, brand: { "@type": "Brand", name: "Vince Outlets" }, offers: { "@type": "Offer", price: p.price, priceCurrency: "INR" } })),
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
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(ld) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain overflow-x-hidden">
      <Navbar />
      <main>
        <Hero /><Statement /><CustomPrint /><Culture /><Shop /><HowItWorks /><Bulk /><Why /><Social /><ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
