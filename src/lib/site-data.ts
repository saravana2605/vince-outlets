export const WA_NUMBER = "917871714695";
export const PHONE = "+91 63699 63871";
export const WA_DISPLAY = "+91 78717 14695";
export const INSTAGRAM = "https://www.instagram.com/vince_outlets/";
export const ADDRESS = "53 Iyyanar Koil Street, Lenin St, Kuyavarpalayam, Puducherry – 605013";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=53+Iyyanar+Koil+Street,+Lenin+St,+Kuyavarpalayam,+Puducherry+605013";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=53+Iyyanar+Koil+Street,+Lenin+St,+Kuyavarpalayam,+Puducherry+605013&output=embed";

export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const MSG = {
  general: "Hi Vince Outlets, I would like to know more about your custom T-shirts.",
  custom: "Hi Vince Outlets, I want to create a custom T-shirt. I would like to discuss my design.",
  bulk: "Hi Vince Outlets, I'm interested in a bulk custom T-shirt order. Please share pricing and minimum order details.",
};

export type Product = { name: string; category: string; desc: string; price: number; old: number };

export const PRODUCTS: Product[] = [
  { name: "OVERSIZED - UNISEX", category: "Oversized", desc: "Dropped shoulders, relaxed street silhouette.", price: 499, old: 699 },
  { name: "REGULAR FIT - UNISEX", category: "Regular Fit", desc: "Clean everyday fit, print-ready.", price: 399, old: 599 },
  { name: "HOODIE - UNISEX", category: "Hoodies", desc: "Heavy-feel hoodie for statement prints.", price: 899, old: 1099 },
  { name: "SWEATSHIRT - UNISEX", category: "Sweatshirts", desc: "Crew-neck layer, built for graphics.", price: 699, old: 899 },
  { name: "POLO - UNISEX", category: "Polo", desc: "Collared fit for teams and crews.", price: 499, old: 699 },
  { name: "CROPTOPS", category: "Crop Tops", desc: "Cropped cut with custom print space.", price: 399, old: 599 },
  { name: "KIDS - UNISEX", category: "Kids", desc: "Mini fits for little statement makers.", price: 399, old: 599 },
];

export const productMsg = (p: Product) =>
  `Hi Vince Outlets, I'm interested in ordering:\nProduct: ${p.name}\nPrice: ₹${p.price}\nPlease share available sizes, colours and ordering details.`;

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
