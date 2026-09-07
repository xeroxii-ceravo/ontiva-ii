export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
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
    image: "/products/shoes/IMG_0763.JPEG",
  },
  {
    id: 6,
    title: "Emerald Chic Tote",
    description: "Handcrafted clutch with gold-tone hardware and interior pocket",
    price: 3500,
    image: "/products/bags/IMG_3962.JPG.jpeg",
  },
];
