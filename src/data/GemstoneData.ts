
export interface Gemstone {
  id: number;
  title: string;
  author: string;
  location: string;
  image: string;
  excerpt: string;
  sponsored?: boolean;
  likes: number;
}

export const gemstones: Gemstone[] = [
  {
    id: 1,
    title: "Hidden Waterfalls of Iceland",
    author: "Emma Kowalski",
    location: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
    excerpt: "Discovering a secret waterfall that locals rarely share with tourists. After days of research and conversations with locals, I found myself standing before one of Iceland's most breathtaking hidden gems.",
    sponsored: true,
    likes: 127
  },
  {
    id: 2,
    title: "Street Art in Buenos Aires",
    author: "Carlos Rodriguez",
    location: "Buenos Aires, Argentina",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    excerpt: "The hidden murals that tell stories of a neighborhood's transformation. Walking through the winding streets of Palermo, each wall seemed to whisper tales of resilience and creativity.",
    likes: 89
  },
  {
    id: 3,
    title: "Sunrise at Mount Fuji",
    author: "Yuki Tanaka",
    location: "Fujinomiya, Japan",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    excerpt: "The spiritual journey to witness dawn break over Japan's sacred mountain. At 4 AM, surrounded by pilgrims and photographers, I understood why this moment is considered sacred.",
    sponsored: true,
    likes: 203
  },
  {
    id: 4,
    title: "Night Markets of Taipei",
    author: "Lisa Chen",
    location: "Taipei, Taiwan",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
    excerpt: "Following the scent of xiaolongbao through narrow alleyways. The real magic of Taipei happens after sunset, when the city transforms into a food lover's paradise.",
    likes: 156
  },
  {
    id: 5,
    title: "Sahara Desert Camping",
    author: "Ahmed Hassan",
    location: "Merzouga, Morocco",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
    excerpt: "Sleeping under a blanket of stars with nothing but sand dunes for miles. The silence of the Sahara is unlike anything I've ever experienced - it's profound and transformative.",
    likes: 74
  },
  {
    id: 6,
    title: "Floating Markets of Bangkok",
    author: "Siriporn Wannakul",
    location: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
    excerpt: "Navigating the colorful chaos of Thailand's most authentic floating market. Away from tourist crowds, vendors sell fresh fruits and handmade goods from their wooden boats.",
    likes: 112
  },
  {
    id: 7,
    title: "Northern Lights in Lapland",
    author: "Astrid Lindqvist",
    location: "Rovaniemi, Finland",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
    excerpt: "Chasing the aurora borealis through the Arctic wilderness. Standing in -30°C temperatures, watching the sky dance in emerald greens and cosmic purples was absolutely magical.",
    likes: 198
  },
  {
    id: 8,
    title: "Ancient Temples of Bagan",
    author: "Min Thu",
    location: "Bagan, Myanmar",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop",
    excerpt: "Hot air ballooning over 2,000 temples at sunrise. The ancient city spread below like a forgotten dream, with golden pagodas emerging from morning mist.",
    sponsored: true,
    likes: 167
  },
  {
    id: 9,
    title: "Coffee Plantations of Colombia",
    author: "Sofia Guerrero",
    location: "Salento, Colombia",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=600&fit=crop",
    excerpt: "Learning the art of coffee making from third-generation farmers. Every bean tells a story of tradition, passion, and the perfect mountain climate.",
    likes: 143
  },
  {
    id: 10,
    title: "Himalayan Monastery Trek",
    author: "Tenzin Norbu",
    location: "Ladakh, India",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=800&h=600&fit=crop",
    excerpt: "A three-day journey to reach a monastery perched impossibly high in the mountains. The monks' morning prayers echoing across the valleys was pure transcendence.",
    likes: 185
  },
  {
    id: 11,
    title: "Maasai Village Experience",
    author: "Joseph Kimani",
    location: "Maasai Mara, Kenya",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop",
    excerpt: "Living with the Maasai people for a week, learning their traditions and wisdom. The connection to nature and community here is something the modern world has forgotten.",
    likes: 134
  },
  {
    id: 12,
    title: "Underground Cenotes of Yucatan",
    author: "Maria Gonzalez",
    location: "Tulum, Mexico",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
    excerpt: "Diving into crystal-clear underground caves that the Maya considered sacred. Swimming through these limestone cathedrals felt like entering another world.",
    sponsored: true,
    likes: 221
  },
  {
    id: 13,
    title: "Lavender Fields of Provence",
    author: "Claire Dubois",
    location: "Valensole, France",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&fit=crop",
    excerpt: "Cycling through endless purple fields during peak bloom season. The intoxicating scent and the gentle hum of bees created a sensory experience I'll never forget.",
    likes: 156
  },
  {
    id: 14,
    title: "Great Wall Sunrise Hike",
    author: "Li Wei",
    location: "Jinshanling, China",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
    excerpt: "Hiking a remote section of the Great Wall before dawn to catch the sunrise. Having this ancient wonder almost entirely to ourselves was an indescribable privilege.",
    likes: 192
  },
  {
    id: 15,
    title: "Tokyo Manhole Cover Art Hunt",
    author: "Kenji Matsumoto",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    excerpt: "Discovering the intricate art hidden beneath Tokyo's streets. Each ward has unique manhole covers featuring local landmarks, flowers, and cultural symbols.",
    likes: 167
  },
  {
    id: 16,
    title: "Roman Catacombs Photography",
    author: "Giuseppe Fontana",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600&fit=crop",
    excerpt: "Capturing the haunting beauty of Rome's underground burial chambers. These ancient catacombs tell stories of early Christianity through carved symbols and frescoes.",
    sponsored: true,
    likes: 189
  },
  {
    id: 17,
    title: "Barcelona's Secret Modernist Buildings",
    author: "Carmen Vidal",
    location: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",
    excerpt: "Beyond Gaudí lies a treasure trove of hidden modernist architecture. Private courtyards and lesser-known buildings reveal the movement's true diversity.",
    likes: 156
  },
  {
    id: 18,
    title: "Amsterdam Canal House Concerts",
    author: "Pieter Van Der Berg",
    location: "Amsterdam, Netherlands",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=800&h=600&fit=crop",
    excerpt: "Intimate classical concerts in historic canal house living rooms. Local musicians open their 17th-century homes for magical evening performances.",
    likes: 134
  },
  {
    id: 19,
    title: "Singapore Urban Foraging Tour",
    author: "Wei Lin Tan",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&h=600&fit=crop",
    excerpt: "Discovering edible plants in Singapore's urban landscape. Expert guides reveal how to find wild herbs and fruits growing in the city's green spaces.",
    likes: 142
  },
  {
    id: 20,
    title: "Kyoto Temple Meditation Retreat",
    author: "Hiroshi Yamamoto",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    excerpt: "Three days of silent meditation with Buddhist monks in a 1,200-year-old temple. The pre-dawn ceremonies and mindful tea preparation taught me about inner peace.",
    sponsored: true,
    likes: 198
  }
];
