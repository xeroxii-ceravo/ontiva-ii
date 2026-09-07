import { bagProducts, bagImagePath } from "./bags";
import { partyHillsProducts, partyHillsImagePath } from "./partyHills";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const newArrivals: Product[] = [
  {
    id: 1,
    title: "The Sovereign Monogram Satchel",
    description: "Freshwater pearls set in 18k gold with diamond clasp",
    price: 4200,
    image: "/products/bags/IMG_3961.JPG.jpeg",
  },
  {
    id: 2,
    title: "Aura Velvet Crossbody",
    description: "3-carat total weight diamonds in platinum setting",
    price: 3800,
    image: "/products/parts/IMG_3953.JPG.jpeg",
  },
  {
    id: 3,
    title: "Midnight Noir Handbag",
    description: "Swiss-made automatic movement with full-grain leather strap",
    price: 5500,
    image: "/products/party hills/IMG_0730.JPG.jpeg",
  },
  {
    id: 4,
    title: "Artisan Leather Loafer",
    description: "5-carat blue sapphire surrounded by diamonds in white gold",
    price: 6200,
    image: "/products/regular footwear/IMG_0751.JPG.jpeg",
  },
  {
    id: 5,
    title: "Silk Embroidered Pump",
    description: "18k gold hollow hoops with hinged backs",
    price: 4800,
    image: "/products/shoes/IMG_0763.JPG.jpeg",
  },
  {
    id: 6,
    title: "Emerald Chic Tote",
    description: "Handcrafted clutch with gold-tone hardware and interior pocket",
    price: 3500,
    image: "/products/bags/IMG_3962.JPG.jpeg",
  },
];

// Filename-derived IDs stay stable when curated arrays are reordered or extended.
function catalogId(key: string): number {
  let hash = 2166136261;
  for (let index = 0; index < key.length; index++) {
    hash = Math.imul(hash ^ key.charCodeAt(index), 16777619);
  }
  return (hash >>> 0) + 100;
}

export const bags: Product[] = bagProducts.map((item) => ({
  id: catalogId(`bags/${item.filename}`),
  title: item.title,
  description: "Discover this piece from the ONTIVA bags collection.",
  price: item.price,
  image: bagImagePath(item.filename),
}));

export const partyHills: Product[] = partyHillsProducts.map((item) => ({
  id: catalogId(`party hills/${item.filename}`),
  title: item.title,
  description: "Discover this piece from the ONTIVA occasion footwear collection.",
  price: item.price,
  image: partyHillsImagePath(item.filename),
}));

export const products: Product[] = [...newArrivals, ...bags, ...partyHills];

if (new Set(products.map((product) => product.id)).size !== products.length) {
  throw new Error("Catalog product IDs must be unique.");
}
