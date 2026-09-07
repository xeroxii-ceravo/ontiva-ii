export const ontivaMoments = [
  {
    "filename": "All‑Black Elegant Outfit _ Chic Street Style & Professional Fashion Inspiration.jpg",
    "title": "City Noir",
    "alt": "Woman in an all-black outfit holding a structured black handbag on a city pavement"
  },
  {
    "filename": "ChatGPT Image Sep 7, 2026, 01_10_54 PM.png",
    "title": "The Chocolate Edit",
    "alt": "Brown handbag and pointed heels styled with ivory trousers"
  },
  {
    "filename": "Chic Corporate Girlie Outfits_ Navy Wrap Blouse & Wide-Leg Pants.jpg",
    "title": "Poise in Navy",
    "alt": "Woman wearing a navy wrap blouse and wide-leg trousers with a black handbag"
  },
  {
    "filename": "Elegance contained, where every detail finds its place, flowing with effortless grace_ 👜✨ __#MOSSDOOM #LunorBag #EffortlessStyle #QuietLuxury #OrganizedElegance #DesignWithGrace.jpg",
    "title": "Everyday Grace",
    "alt": "Woman wearing a white shirt with an olive shoulder bag"
  },
  {
    "filename": "Modern Elegance in Editorial Mood _ Современная элегантность в съёмке.jpg",
    "title": "Modern Muse",
    "alt": "Woman in a black dress seated beside a sculpted brown handbag"
  },
  {
    "filename": "download (84).jpg",
    "title": "Earth & Sky",
    "alt": "Fashion editorial featuring a group in neutral outfits against an open landscape"
  },
  {
    "filename": "download (85).jpg",
    "title": "Quiet Confidence",
    "alt": "Woman in a neutral outfit and tall black boots seated with a small handbag"
  },
  {
    "filename": "download (86).jpg",
    "title": "Considered Details",
    "alt": "Portrait of a woman holding an ivory handbag with gold-tone details"
  },
  {
    "filename": "download (87).jpg",
    "title": "A Moment in Terracotta",
    "alt": "Woman seated in a light-filled room with a terracotta handbag"
  },
  {
    "filename": "download (88).jpg",
    "title": "Ivory Lines",
    "alt": "Woman holding a white statement handbag with a circular buckle"
  },
  {
    "filename": "download (89).jpg",
    "title": "A Golden Touch",
    "alt": "Woman carrying a golden yellow tote with a navy top and pleated skirt"
  },
  {
    "filename": "🖤 Luxury Street Style 2025 _ Viral Pinterest Fashion.jpg",
    "title": "After Hours",
    "alt": "Woman in a belted black outfit carrying a black handbag on a city street"
  }
] as const;

export function momentImagePath(filename: string): string {
  return `/ontiva-moments/${encodeURIComponent(filename)}`;
}
