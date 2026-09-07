export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Gold Pearl Necklace",
    description: "Freshwater pearls set in 18k gold with diamond clasp",
    price: 2450.00,
    image: "https://images.unsplash.com/photo-1518717758535-3eaab8861fc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Diamond Tennis Bracelet",
    description: "3-carat total weight diamonds in platinum setting",
    price: 8900.00,
    image: "https://images.unsplash.com/photo-1515562141207-7b89afe32f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Leather Chronograph Watch",
    description: "Swiss-made automatic movement with full-grain leather strap",
    price: 3200.00,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Sapphire Cocktail Ring",
    description: "5-carat blue sapphire surrounded by diamonds in white gold",
    price: 4100.00,
    image: "https://images.unsplash.com/photo-1515562141207-7b89afe32f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Gold Hoop Earrings",
    description: "18k gold hollow hoops with hinged backs",
    price: 1250.00,
    image: "https://images.unsplash.com/photo-1515562141207-7b89afe32f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    name: "Black Alligator Leather Clutch",
    description: "Handcrafted clutch with gold-tone hardware and interior pocket",
    price: 1850.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

