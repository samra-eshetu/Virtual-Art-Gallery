export type Artwork = {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  description: string;
};

export const artWorks: Artwork[] = [
  {
    id: 1,
    title: "Holy Trinity Icon",
    artist: "Traditional Ethiopian Orthodox Art",
    imageUrl:
      "https://media.istockphoto.com/id/1472548515/photo/painting-of-the-three-persons-of-the-holy-trinity-in-debre-berhan-selassie-church-gondar.jpg?s=612x612&w=0&k=20&c=1zWucdeoQ_bFz-3-7W65Spzvcwj2WLCFg1YyRryGXfI=",
    description:
      "Vibrant ceiling painting from Debre Berhan Selassie Church in Gondar, depicting the Holy Trinity in classic Ethiopian style with angelic faces.",
  },
  {
    id: 2,
    title: "Miracles of Archangel Michael",
    artist: "17th Century Ethiopian Manuscript",
    imageUrl:
      "https://pdr-assets.b-cdn.net/collections/17th-century-ethiopian-manuscript-the-miracles-of-the-archangel-michael/8719769427_8bf0acd774_o.jpg",
    description:
      "Page from a rare Ge'ez manuscript illustrating miraculous deeds of Archangel Michael, central to Ethiopian religious tradition.",
  },
  {
    id: 3,
    title: "Folding Processional Icon (Fan Shape)",
    artist: "Late 15th Century Ethiopian Art",
    imageUrl:
      "https://apollo-magazine.com/wp-content/uploads/2023/12/1.5-Folding-Processional-Icon-in-the-Shape-of-a-Fan-LEAD.jpg?fit=1000%2C667",
    description:
      "Unique fan-shaped folding icon used in religious processions, a remarkable example of medieval Ethiopian craftsmanship.",
  },
  {
    id: 4,
    title: "Last Supper Monastery Painting",
    artist: "Traditional Ethiopian Style",
    imageUrl:
      "https://media.istockphoto.com/id/172485431/photo/last-supper-painting-in-ethiopian-monastery.jpg?s=170667a&w=0&k=20&c=PZ9Ws-3EYkMfIFGlAqd3OukIfVGsb8oG3HAiskxA3do=",
    description:
      "Ancient wall painting of the Last Supper in an Ethiopian monastery, blending biblical narrative with local artistic traditions.",
  },
  {
    id: 5,
    title: "Self-Portrait in the Studio",
    artist: "Afewerk Tekle",
    imageUrl:
      "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=308772141409630",
    description:
      "Iconic self-portrait by Ethiopia's master modern artist Afewerk Tekle, showing him at work in his studio surrounded by his creations.",
  },
  {
    id: 6,
    title: "The Horrors of War No. 3",
    artist: "Afewerk Tekle",
    imageUrl:
      "https://images1.bonhams.com/image?src=Images/live/2021-01/08/25034532-1-1.jpg",
    description:
      "Powerful expressionist painting depicting the devastation and human suffering caused by war.",
  },
  {
    id: 7,
    title: "Bet Giyorgis (Church of St. George)",
    artist: "Rock-Hewn Architecture",
    imageUrl:
      "https://www.archeotravelers.com/wp-content/uploads/2023/01/Copertina.jpg",
    description:
      "Aerial view of the famous cross-shaped monolithic church in Lalibela, carved entirely from a single rock in the 12th-13th century.",
  },
  {
    id: 8,
    title: "Traditional Coffee Ceremony (Buna)",
    artist: "Ethiopian Cultural Heritage",
    imageUrl:
      "https://mauchchunkcoffee.com/cdn/shop/articles/Ethiopian_Coffee_Ceremony_4fbca940-dc64-45b6-8fbb-47741a606753.jpg?v=1682080063&width=1920",
    description:
      "The sacred Ethiopian buna ceremony — roasting fresh beans, grinding, and serving coffee in a ritual of hospitality and community.",
  },
];
