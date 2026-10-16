export const WA_NUMBER = "916369963871";
export const WA_NUMBER_ALT = "919940722786";
export const PHONE = "+91 63699 63871";
export const PHONE_ALT = "+91 99407 22786";
export const WA_DISPLAY = "+91 63699 63871";
export const WA_DISPLAY_ALT = "+91 99407 22786";
export const INSTAGRAM = "https://www.instagram.com/vince_outlets/";
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=487308b4cea01bf4&sxsrf=APpeQns7KxnCL5Ej0Fv3xITo-M1hRA7E5A:1792127493348&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_3hAkpTsf12u9Ma8xvGM4iCLQ50Eyde4ijgfD0QiKkJgc6pAR53A2L7frxeIucEr27jdA_evHaQ8rlcx96bOWO33rUyc&q=Vince+Outlets+Reviews&sa=X&ved=2ahUKEwicgIiV472XAxW7XWwGHX50JL8Q0bkNegQIJhAF&biw=1533&bih=781&dpr=1#lrd=0x3a536107b4106359:0x9005f2c4c7ef9340,3";
export const CLOUDMASA_URL = "https://cloudmasa.com/";
export const ADDRESS = "53 Iyyanar Koil Street, Lenin St, Kuyavarpalayam, Puducherry – 605013";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=53+Iyyanar+Koil+Street,+Lenin+St,+Kuyavarpalayam,+Puducherry+605013";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=53+Iyyanar+Koil+Street,+Lenin+St,+Kuyavarpalayam,+Puducherry+605013&output=embed";

export const waLink = (text: string, number: string = WA_NUMBER) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const MSG = {
  general: "Hi Vince Outlets, I would like to enquire about customised apparel.",
  custom: "Hi Vince Outlets, I want to create a custom T-shirt. I would like to discuss my design.",
  bulk: "Hi Vince Outlets, I'm interested in a bulk custom merchandise order. Please share pricing and minimum order details.",
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
