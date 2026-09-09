export const businessName = "Garment Clinic Ltd" as const;

export const siteConfig = {
  name: businessName,
  shortName: "Garment Clinic",
  tagline: "Professional Laundry & Dry Cleaning",
  description:
    "Garment Clinic Ltd provides expert laundry, dry cleaning, and garment care services in Ikeja, Lagos. Trusted by thousands with a 4.962 Google rating.",
  url: "https://www.garmentclinic.com.ng",
  email: "hello@garmentclinic.com.ng",
  phone: "0802 853 2366",
  address: {
    street: "Bamako Estate, Opp Omole Phase 1",
    city: "Ikeja",
    state: "Lagos",
    zip: "101233",
    country: "Nigeria",
    full: "Bamako Estate, Opp Omole Phase 1, Ikeja, Lagos 5 Bamako St Ojodu - Ikeja, Ojodu 101233, Lagos",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d3.35!3d6.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i1024!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDAuMCJOIDPCMDInMDAuMCJF!5e0!3m2!1sen!2sng!4v1700000000000",
  },
  hours: [
    { day: "Monday", open: "7:00 AM", close: "8:00 PM" },
    { day: "Tuesday", open: "7:00 AM", close: "8:00 PM" },
    { day: "Wednesday", open: "7:00 AM", close: "8:00 PM" },
    { day: "Thursday", open: "7:00 AM", close: "8:00 PM" },
    { day: "Friday", open: "7:00 AM", close: "8:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "Closed", close: "Closed" },
  ] as const,
  social: {
    google: "https://g.page/garmentclinic",
  },
  googleRating: "4.962",
  totalReviews: "Google Reviews",
} as const;

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  features: string[];
};

export const services: Service[] = [
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description:
      "Expert care for delicate fabrics, suits, gowns, and garments requiring professional dry cleaning.",
    price: "From ₦2,000",
    icon: "BrushCleaning",
    features: ["Stain removal", "Garment pressing", "Fast turnaround"],
  },
  {
    id: "wash-iron",
    title: "Wash & Iron",
    description:
      "Complete wash, starch, and press service for everyday clothing and office wear.",
    price: "From ₦500/piece",
    icon: "Shirt",
    features: ["Professional pressing", "Starch available", "Same-day service"],
  },
  {
    id: "laundry",
    title: "Full Laundry Service",
    description:
      "Drop off your laundry and we'll wash, dry, fold, and package it for you.",
    price: "From ₦3,000/bag",
    icon: "WashingMachine",
    features: ["Wash & fold", "Fabric softener", "Pickup & delivery"],
  },
  {
    id: "specialty",
    title: "Specialty Garments",
    description:
      "Professional care for wedding gowns, agbada, traditional wear, leather, and other specialty items.",
    price: "Custom quote",
    icon: "Sparkles",
    features: ["Delicate handling", "Expert treatment", "Insured service"],
  },
];

export const priceList = [
  { service: "Wash & Iron - Shirt", price: "₦500" },
  { service: "Wash & Iron - Trousers", price: "₦600" },
  { service: "Wash & Iron - Native Wear", price: "₦700" },
  { service: "Wash & Iron - Agbada", price: "₦1,500" },
  { service: "Dry Cleaning - Shirt", price: "₦1,000" },
  { service: "Dry Cleaning - Trousers", price: "₦1,200" },
  { service: "Dry Cleaning - Suit (2-pc)", price: "₦4,000" },
  { service: "Dry Cleaning - Suit (3-pc)", price: "₦5,500" },
  { service: "Dry Cleaning - Gown", price: "₦3,500" },
  { service: "Full Laundry (per bag)", price: "₦3,000" },
  { service: "Starch & Press Only", price: "₦300/piece" },
  { service: "Specialty Items", price: "Contact for quote" },
] as const;

export const bookingSlots = [
  "2026-08-22",
  "2026-08-23",
  "2026-08-24",
  "2026-08-25",
  "2026-08-26",
  "2026-08-27",
  "2026-08-28",
] as const;

export const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
] as const;

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Book Now", href: "/book" },
] as const;
