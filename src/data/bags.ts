export interface BagProduct {
  filename: string;
  title: string;
  price: number;
}

// Exact local filenames are preserved, including Unicode and compound extensions.
// Prices use the requested Tk 4,200.00 default and can be edited per item.
export const bagProducts: BagProduct[] = [
  {
    "filename": "1142858842962721678.jpg",
    "title": "Olive Quilted Mini Handbag",
    "price": 4200
  },
  {
    "filename": "272327108706659553.jpg",
    "title": "Dusty Rose Envelope Satchel",
    "price": 4200
  },
  {
    "filename": "614671049183469560.jpg",
    "title": "Midnight Structured Top-Handle Bag",
    "price": 4200
  },
  {
    "filename": "630292910390376539.jpg",
    "title": "Espresso Curved Shoulder Bag",
    "price": 4200
  },
  {
    "filename": "779404279304692633.jpg",
    "title": "Ivory Sculpted Top-Handle Bag",
    "price": 4200
  },
  {
    "filename": "811985007854234589.jpg",
    "title": "Chestnut Everyday Shoulder Bag",
    "price": 4200
  },
  {
    "filename": "91127592460613531.jpg",
    "title": "Ivory Belted Statement Handbag",
    "price": 4200
  },
  {
    "filename": "955115033481139523.jpg",
    "title": "Pearl White Mini Tote",
    "price": 4200
  },
  {
    "filename": "AI photoshoot for a handbag brand.jpg",
    "title": "Desert Muse Top-Handle Handbag",
    "price": 4200
  },
  {
    "filename": "An imaginary photoshoot for Louis Vuitton….jpg",
    "title": "Louis Vuitton — Imaginary Photoshoot Edit",
    "price": 4200
  },
  {
    "filename": "Architectural Autumn_ A Terracotta Mini Concept Bag.jpg",
    "title": "Architectural Autumn — Terracotta Mini Bag",
    "price": 4200
  },
  {
    "filename": "Beige Leather Handbag — Minimalist Luxury Aesthetic & Timeless Style.jpg",
    "title": "Beige Leather Handbag — Timeless Minimalism",
    "price": 4200
  },
  {
    "filename": "Elegant Beige Luxury Handbags ✨ Quiet Luxury Style.jpg",
    "title": "Elegant Beige Handbag — Quiet Luxury",
    "price": 4200
  },
  {
    "filename": "Elegant Women's Shoulder Bag _ Chic Everyday Fashion Bag for Every Occasion.jpg",
    "title": "Elegant Women's Everyday Shoulder Bag",
    "price": 4200
  },
  {
    "filename": "IMG_3961.JPG.jpeg",
    "title": "Monogram Flap Bags — Signature Edit",
    "price": 4200
  },
  {
    "filename": "IMG_3962.JPG.jpeg",
    "title": "Jewel-Tone Mini Bags — Chain-Strap Edit",
    "price": 4200
  },
  {
    "filename": "IMG_3963.JPG.jpeg",
    "title": "Monogram Top-Handle Bags — Classic Edit",
    "price": 4200
  },
  {
    "filename": "IMG_3965.JPG.jpeg",
    "title": "Envelope Mini Bags — Colour Edit",
    "price": 4200
  },
  {
    "filename": "IMG_3966.JPG(1).jpeg",
    "title": "Buckle Shoulder Bags — Detail View",
    "price": 4200
  },
  {
    "filename": "IMG_3966.JPG.jpeg",
    "title": "Buckle Shoulder Bags — Signature Colours",
    "price": 4200
  },
  {
    "filename": "Louis Vuitton Black Bag (Fall 2025).jpg",
    "title": "Louis Vuitton Black Bag — Fall 2025",
    "price": 4200
  },
  {
    "filename": "Luxury handbag.jpg",
    "title": "Sky Blue Luxury Handbag",
    "price": 4200
  },
  {
    "filename": "Minimalist Fashion Inspiration _ Handcrafted Bag _ LISHÉ.jpg",
    "title": "LISHÉ Handcrafted Bag — Minimalist Style",
    "price": 4200
  },
  {
    "filename": "Photographer __ LE PRINTEMPS ACCESSORIES.jpg",
    "title": "Le Printemps Accessories — Crimson Handbag",
    "price": 4200
  },
  {
    "filename": "Recent one_ 👜 📸….jpg",
    "title": "Ivory Contrast-Trim Mini Handbag",
    "price": 4200
  },
  {
    "filename": "Satin Noir_ Minimalist Luxury Handbag Showcase.jpg",
    "title": "Satin Noir — Minimalist Luxury Handbag",
    "price": 4200
  },
  {
    "filename": "Spring Summer 2014 Bally Stripe Collection SHOP….jpg",
    "title": "Bally Stripe Collection — Spring Summer 2014",
    "price": 4200
  },
  {
    "filename": "Taking the colors of the African savannah I….jpg",
    "title": "Savannah Colour-Block Handbag",
    "price": 4200
  },
  {
    "filename": "Tuscan leather, sun-warmed sand, timeless….jpg",
    "title": "Tuscan Leather — Sun-Warmed Elegance",
    "price": 4200
  },
  {
    "filename": "What a bag is used for every day.jpg",
    "title": "Aqua Everyday Bucket Bag",
    "price": 4200
  },
  {
    "filename": "download (85).jpg",
    "title": "Ivory Gold-Handle Structured Tote",
    "price": 4200
  },
  {
    "filename": "download (86).jpg",
    "title": "Pearl White Charm Handbag",
    "price": 4200
  },
  {
    "filename": "🧡.jpg",
    "title": "Tangerine Statement Satchel",
    "price": 4200
  }
];

export function bagImagePath(filename: string): string {
  return `/products/bags/${encodeURIComponent(filename)}`;
}
