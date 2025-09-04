export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  store: string;
  storeLocation: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  tags: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "alimentaire",
    name: "Alimentaire",
    icon: "🍽️",
    productCount: 450,
    subcategories: [
      "Céréales & Légumineuses",
      "Fruits & Légumes",
      "Viandes & Poissons",
      "Produits Laitiers",
      "Épices & Condiments",
      "Boissons",
      "Snacks & Confiseries",
      "Produits Transformés",
    ],
  },
  {
    id: "electronique",
    name: "Électronique",
    icon: "📱",
    productCount: 320,
    subcategories: [
      "Smartphones",
      "Ordinateurs",
      "Télévisions",
      "Audio & Hi-Fi",
      "Électroménager",
      "Accessoires",
      "Gaming",
      "Gadgets",
    ],
  },
  {
    id: "mode",
    name: "Mode & Vêtements",
    icon: "👗",
    productCount: 680,
    subcategories: [
      "Vêtements Femme",
      "Vêtements Homme",
      "Chaussures",
      "Accessoires Mode",
      "Bijoux",
      "Montres",
      "Sacs & Maroquinerie",
      "Vêtements Enfant",
    ],
  },
  {
    id: "maison",
    name: "Maison & Décoration",
    icon: "🏠",
    productCount: 290,
    subcategories: [
      "Meubles",
      "Décoration",
      "Électroménager",
      "Cuisine & Arts de la table",
      "Literie",
      "Éclairage",
      "Jardin",
      "Bricolage & Outils",
    ],
  },
  {
    id: "sante",
    name: "Santé & Beauté",
    icon: "💊",
    productCount: 240,
    subcategories: [
      "Produits de Beauté",
      "Soins du Corps",
      "Pharmacie",
      "Compléments Alimentaires",
      "Parfums",
      "Maquillage",
      "Soins Capillaires",
      "Hygiène",
    ],
  },
  {
    id: "transport",
    name: "Transport & Auto",
    icon: "🚗",
    productCount: 150,
    subcategories: [
      "Pièces Auto",
      "Motos & Scooters",
      "Vélos",
      "Accessoires Auto",
      "Carburants & Huiles",
      "Entretien Véhicule",
      "Pneumatiques",
      "Navigation GPS",
    ],
  },
  {
    id: "sport",
    name: "Sport & Loisirs",
    icon: "⚽",
    productCount: 180,
    subcategories: [
      "Fitness & Musculation",
      "Sports d'équipe",
      "Sports Individuels",
      "Outdoor & Camping",
      "Cyclisme",
      "Natation",
      "Arts Martiaux",
      "Yoga & Pilates",
    ],
  },
  {
    id: "education",
    name: "Éducation & Bureautique",
    icon: "📚",
    productCount: 120,
    subcategories: [
      "Livres & Manuels",
      "Fournitures Scolaires",
      "Matériel de Bureau",
      "Informatique",
      "Instruments Musique",
      "Jeux Éducatifs",
      "Formation",
      "Papeterie",
    ],
  },
  {
    id: "services",
    name: "Services",
    icon: "🔧",
    productCount: 95,
    subcategories: [
      "Réparations",
      "Nettoyage",
      "Livraison",
      "Installation",
      "Maintenance",
      "Conseil",
      "Formation",
      "Événementiel",
    ],
  },
];

export const products: Product[] = [
  // ALIMENTAIRE - Céréales & Légumineuses
  {
    id: 1,
    name: "Riz local premium - Sac 25kg",
    price: 12500,
    originalPrice: 15000,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    category: "Alimentaire",
    subcategory: "Céréales & Légumineuses",
    store: "Marché Central",
    storeLocation: "Kpéwa",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    description:
      "Riz de qualité supérieure cultivé localement. Grains longs et parfumés.",
    tags: ["bio", "local", "premium"],
    isPopular: true,
    isFeatured: true,
    discount: 17,
  },
  {
    id: 2,
    name: "Maïs blanc - Sac 50kg",
    price: 8000,
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400",
    category: "Alimentaire",
    subcategory: "Céréales & Légumineuses",
    store: "Coopérative Agricole",
    storeLocation: "Bouaké",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    description:
      "Maïs blanc de première qualité, idéal pour l'attiéké et autres préparations.",
    tags: ["local", "fraîcheur"],
    isPopular: true,
  },
  {
    id: 3,
    name: "Haricots rouges - 5kg",
    price: 3500,
    image: "https://images.unsplash.com/photo-1596040906234-6e05d3831d0b?w=400",
    category: "Alimentaire",
    subcategory: "Céréales & Légumineuses",
    store: "Bio Market",
    storeLocation: "Centre-ville",
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    description:
      "Haricots rouges riches en protéines, parfaits pour le riz au haricot.",
    tags: ["bio", "protéines", "santé"],
  },
  {
    id: 4,
    name: "Fonio précuit - 1kg",
    price: 2800,
    image: "https://images.unsplash.com/photo-1574672280730-2d017ee65345?w=400",
    category: "Alimentaire",
    subcategory: "Céréales & Légumineuses",
    store: "Produits du Terroir",
    storeLocation: "Korhogo",
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
    description:
      "Fonio traditionnel précuit, céréale ancestrale très nutritive.",
    tags: ["traditionnel", "nutritif", "local"],
  },
  {
    id: 5,
    name: "Mil rouge - 10kg",
    price: 4200,
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400",
    category: "Alimentaire",
    subcategory: "Céréales & Légumineuses",
    store: "Marché du Nord",
    storeLocation: "Kong",
    rating: 4.4,
    reviewCount: 32,
    inStock: false,
    description:
      "Mil rouge du nord, idéal pour la préparation de la bouillie traditionnelle.",
    tags: ["traditionnel", "nord", "bouillie"],
  },

  // ALIMENTAIRE - Fruits & Légumes
  {
    id: 6,
    name: "Bananes plantains - Régime",
    price: 1500,
    image: "https://images.unsplash.com/photo-1603833797131-3c0db8b41452?w=400",
    category: "Alimentaire",
    subcategory: "Fruits & Légumes",
    store: "Fruits de Daloa",
    storeLocation: "Daloa",
    rating: 4.9,
    reviewCount: 234,
    inStock: true,
    description:
      "Bananes plantains fraîches, parfaites pour l'alloco et autres préparations.",
    tags: ["frais", "local", "alloco"],
    isPopular: true,
    isFeatured: true,
  },
  {
    id: 7,
    name: "Ananas Victoria - Pièce",
    price: 800,
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400",
    category: "Alimentaire",
    subcategory: "Fruits & Légumes",
    store: "Plantation Victoria",
    storeLocation: "Bonoua",
    rating: 4.8,
    reviewCount: 128,
    inStock: true,
    description:
      "Ananas Victoria sweet et juteux, cultivé dans la région de Bonoua.",
    tags: ["sweet", "juteux", "vitamine"],
    isPopular: true,
  },
  {
    id: 8,
    name: "Tomates fraîches - 5kg",
    price: 2500,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
    category: "Alimentaire",
    subcategory: "Fruits & Légumes",
    store: "Maraîchers Unis",
    storeLocation: "Yamoussoukro",
    rating: 4.3,
    reviewCount: 91,
    inStock: true,
    description: "Tomates fraîches et mûres, idéales pour sauces et salades.",
    tags: ["frais", "local", "cuisine"],
  },
  {
    id: 9,
    name: "Ignames Kponan - 10kg",
    price: 3500,
    image: "https://images.unsplash.com/photo-1601566690209-26bef1a35a4c?w=400",
    category: "Alimentaire",
    subcategory: "Fruits & Légumes",
    store: "Coopérative Bondoukou",
    storeLocation: "Bondoukou",
    rating: 4.6,
    reviewCount: 76,
    inStock: true,
    description:
      "Ignames Kponan de qualité supérieure, tubercules fermes et savoureux.",
    tags: ["tubercule", "traditionnel", "énergie"],
  },
  {
    id: 10,
    name: "Mangues Kent - Carton 12 pièces",
    price: 4500,
    originalPrice: 5000,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
    category: "Alimentaire",
    subcategory: "Fruits & Légumes",
    store: "Export Fruits CI",
    storeLocation: "Korhogo",
    rating: 4.7,
    reviewCount: 104,
    inStock: true,
    description: "Mangues Kent de calibre export, sucrées et parfumées.",
    tags: ["export", "sucré", "vitamine"],
    discount: 10,
  },

  // ALIMENTAIRE - Viandes & Poissons
  {
    id: 11,
    name: "Poisson frais - Capitaine",
    price: 3500,
    image: "https://images.unsplash.com/photo-1544943910-4c1e6d2b7020?w=400",
    category: "Alimentaire",
    subcategory: "Viandes & Poissons",
    store: "Pêcheurs de Sassandra",
    storeLocation: "Sassandra",
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    description: "Capitaine frais du jour, pêché dans les eaux de Sassandra.",
    tags: ["frais", "mer", "protéines"],
    isPopular: true,
  },
  {
    id: 12,
    name: "Poulet fermier entier - 2kg",
    price: 4200,
    image: "https://images.unsplash.com/photo-1548502632-6b93092aad0b?w=400",
    category: "Alimentaire",
    subcategory: "Viandes & Poissons",
    store: "Ferme Avicole du Centre",
    storeLocation: "Bouaké",
    rating: 4.9,
    reviewCount: 145,
    inStock: true,
    description: "Poulet fermier élevé au grain, chair tendre et savoureuse.",
    tags: ["fermier", "grain", "qualité"],
    isPopular: true,
  },
  {
    id: 13,
    name: "Bœuf local - Côte de bœuf 1kg",
    price: 6500,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
    category: "Alimentaire",
    subcategory: "Viandes & Poissons",
    store: "Boucherie Moderne",
    storeLocation: "Centre-ville",
    rating: 4.6,
    reviewCount: 83,
    inStock: true,
    description: "Côte de bœuf locale, viande tendre et persillée.",
    tags: ["local", "tendre", "grill"],
  },
  {
    id: 14,
    name: "Crevettes géantes - 500g",
    price: 8500,
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400",
    category: "Alimentaire",
    subcategory: "Viandes & Poissons",
    store: "Aquaculture Ébrié",
    storeLocation: "Grand-Bassam",
    rating: 4.7,
    reviewCount: 54,
    inStock: true,
    description: "Crevettes géantes d'élevage, fraîches et décortiquées.",
    tags: ["élevage", "décortiquées", "luxe"],
  },

  // ÉLECTRONIQUE - Smartphones
  {
    id: 15,
    name: "Samsung Galaxy A54 - 128GB",
    price: 185000,
    originalPrice: 210000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "Électronique",
    subcategory: "Smartphones",
    store: "Tech Store Kara",
    storeLocation: "Centre-ville",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    description:
      "Smartphone Samsung Galaxy A54 avec caméra 50MP et écran Super AMOLED.",
    tags: ["android", "caméra", "5G"],
    isPopular: true,
    isFeatured: true,
    discount: 12,
  },
  {
    id: 16,
    name: "iPhone 13 - 128GB",
    price: 425000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "Électronique",
    subcategory: "Smartphones",
    store: "Apple Store Kara",
    storeLocation: "Centre-ville",
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    description: "iPhone 13 avec puce A15 Bionic et système de cam��ra avancé.",
    tags: ["iOS", "premium", "caméra"],
    isPopular: true,
  },
  {
    id: 17,
    name: "Xiaomi Redmi Note 12 - 256GB",
    price: 125000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "Électronique",
    subcategory: "Smartphones",
    store: "Xiaomi Official",
    storeLocation: "Kara Sud",
    rating: 4.6,
    reviewCount: 98,
    inStock: true,
    description: "Xiaomi Redmi Note 12 avec écran AMOLED et charge rapide 67W.",
    tags: ["charge-rapide", "AMOLED", "rapport-qualité-prix"],
  },
  {
    id: 18,
    name: "Tecno Camon 20 - 256GB",
    price: 95000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "Électronique",
    subcategory: "Smartphones",
    store: "Tecno Mobile CI",
    storeLocation: "Kara Nord",
    rating: 4.4,
    reviewCount: 76,
    inStock: true,
    description: "Tecno Camon 20 avec caméra portrait 64MP et design élégant.",
    tags: ["portrait", "design", "abordable"],
  },

  // ÉLECTRONIQUE - Ordinateurs
  {
    id: 19,
    name: "MacBook Air M2 - 256GB",
    price: 650000,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    category: "Électronique",
    subcategory: "Ordinateurs",
    store: "Apple Store Kara",
    storeLocation: "Centre-ville",
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
    description: "MacBook Air avec puce M2, ultra-portable et performant.",
    tags: ["M2", "portable", "performance"],
    isFeatured: true,
  },
  {
    id: 20,
    name: "HP Pavilion 15 - Intel i5",
    price: 285000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    category: "Électronique",
    subcategory: "Ordinateurs",
    store: "HP Store Kara",
    storeLocation: "Centre-ville",
    rating: 4.5,
    reviewCount: 124,
    inStock: true,
    description:
      "Ordinateur portable HP Pavilion 15 avec processeur Intel i5 11ème génération.",
    tags: ["Intel", "bureautique", "multimédia"],
  },

  // MODE - Vêtements Femme
  {
    id: 21,
    name: "Robe Africaine Wax - Modèle Unique",
    price: 35000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    category: "Mode & Vêtements",
    subcategory: "Vêtements Femme",
    store: "Fashion Boutique Wax",
    storeLocation: "Kara Nord",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    description:
      "Robe africaine en wax authentique, coupe moderne et élégante.",
    tags: ["wax", "africain", "élégant"],
    isPopular: true,
    isFeatured: true,
  },
  {
    id: 22,
    name: "Ensemble Pagne Baoulé - 6 mètres",
    price: 25000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    category: "Mode & Vêtements",
    subcategory: "Vêtements Femme",
    store: "Tissus Traditionnels CI",
    storeLocation: "Grand Marché",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    description:
      "Ensemble pagne baoulé traditionnel de 6 mètres avec motifs authentiques.",
    tags: ["traditionnel", "baoulé", "authentique"],
    isPopular: true,
  },
  {
    id: 23,
    name: "Boubou Homme Grand Modèle",
    price: 45000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    category: "Mode & Vêtements",
    subcategory: "Vêtements Homme",
    store: "Couture Royale",
    storeLocation: "Centre-ville",
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    description:
      "Boubou homme grand modèle en broderie main, pour grandes occasions.",
    tags: ["broderie", "occasion", "élégant"],
  },

  // MODE - Chaussures
  {
    id: 24,
    name: "Sandales en Cuir Artisanal",
    price: 15000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    category: "Mode & Vêtements",
    subcategory: "Chaussures",
    store: "Maroquinerie Locale",
    storeLocation: "Korhogo",
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    description:
      "Sandales en cuir véritable fabriquées artisanalement à Korhogo.",
    tags: ["cuir", "artisanal", "confort"],
    isPopular: true,
  },
  {
    id: 25,
    name: "Baskets Nike Air Max",
    price: 85000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    category: "Mode & Vêtements",
    subcategory: "Chaussures",
    store: "Nike Store Abidjan",
    storeLocation: "Centre-ville",
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    description: "Baskets Nike Air Max avec technologie de coussin d'air.",
    tags: ["sport", "confort", "style"],
  },

  // MAISON - Meubles
  {
    id: 26,
    name: "Canapé 3 Places en Tissu",
    price: 185000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    category: "Maison & Décoration",
    subcategory: "Meubles",
    store: "Meubles Design CI",
    storeLocation: "Zone 4",
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
    description: "Canapé 3 places confortable en tissu de qualité supérieure.",
    tags: ["confort", "salon", "qualité"],
  },
  {
    id: 27,
    name: "Table à Manger 6 Personnes",
    price: 125000,
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400",
    category: "Maison & Décoration",
    subcategory: "Meubles",
    store: "Ébénisterie Moderne",
    storeLocation: "Tchré",
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    description:
      "Table à manger en bois massif pour 6 personnes avec finition vernie.",
    tags: ["bois-massif", "famille", "résistant"],
  },

  // MAISON - Électroménager
  {
    id: 28,
    name: "Réfrigérateur Samsung 350L",
    price: 285000,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400",
    category: "Maison & Décoration",
    subcategory: "Électroménager",
    store: "Électro Plus",
    storeLocation: "Kara Sud",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    description:
      "Réfrigérateur Samsung 350L avec technologie Digital Inverter.",
    tags: ["économique", "silencieux", "fiable"],
  },
  {
    id: 29,
    name: "Cuisinière à Gaz 4 Feux",
    price: 85000,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    category: "Maison & Décoration",
    subcategory: "Électroménager",
    store: "Cuisine Équipée",
    storeLocation: "Kpéwa",
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
    description: "Cuisinière à gaz 4 feux avec four et grill intégré.",
    tags: ["4-feux", "four", "pratique"],
  },

  // SANTÉ & BEAUTÉ
  {
    id: 30,
    name: "Crème Éclaircissante Naturelle",
    price: 12500,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400",
    category: "Santé & Beauté",
    subcategory: "Produits de Beauté",
    store: "Cosmétiques Naturels Kara",
    storeLocation: "Centre-ville",
    rating: 4.7,
    reviewCount: 234,
    inStock: true,
    description:
      "Crème éclaircissante à base d'ingrédients naturels, sans hydroquinone.",
    tags: ["naturel", "éclaircissant", "sans-danger"],
    isPopular: true,
  },
  {
    id: 31,
    name: "Parfum Homme - Essence d'Afrique",
    price: 25000,
    image: "https://images.unsplash.com/photo-1541426023-9dc5b4a5ad0e?w=400",
    category: "Santé & Beauté",
    subcategory: "Parfums",
    store: "Parfumerie Élégance",
    storeLocation: "Centre-ville",
    rating: 4.8,
    reviewCount: 78,
    inStock: true,
    description:
      "Parfum masculin aux notes boisées et épicées, inspiration africaine.",
    tags: ["masculin", "boisé", "longue-tenue"],
  },

  // TRANSPORT - Pièces Auto
  {
    id: 32,
    name: "Pneus Michelin 205/55 R16",
    price: 45000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Transport & Auto",
    subcategory: "Pneumatiques",
    store: "Pneus Service CI",
    storeLocation: "Kpéwa",
    rating: 4.9,
    reviewCount: 123,
    inStock: true,
    description:
      "Pneus Michelin 205/55 R16 pour berlines, excellente adhérence.",
    tags: ["michelin", "sécurité", "adhérence"],
  },
  {
    id: 33,
    name: "Batterie Voiture 70Ah",
    price: 65000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Transport & Auto",
    subcategory: "Pièces Auto",
    store: "Auto Pièces Plus",
    storeLocation: "Tchré",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    description:
      "Batterie automobile 70Ah avec garantie 2 ans, démarrage fiable.",
    tags: ["fiable", "garantie", "démarrage"],
  },

  // SPORT & LOISIRS
  {
    id: 34,
    name: "Ballon de Football Officiel",
    price: 8500,
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400",
    category: "Sport & Loisirs",
    subcategory: "Sports d'équipe",
    store: "Sport Plus",
    storeLocation: "Kara Sud",
    rating: 4.8,
    reviewCount: 167,
    inStock: true,
    description:
      "Ballon de football officiel FIFA, cuir synthétique de qualité.",
    tags: ["FIFA", "officiel", "qualité"],
    isPopular: true,
  },
  {
    id: 35,
    name: "Vélo VTT 26 Pouces",
    price: 125000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Sport & Loisirs",
    subcategory: "Cyclisme",
    store: "Cycles & Motos",
    storeLocation: "Zongo",
    rating: 4.5,
    reviewCount: 56,
    inStock: true,
    description: "VTT 26 pouces avec 21 vitesses, idéal pour terrains variés.",
    tags: ["VTT", "21-vitesses", "terrain"],
  },

  // ÉDUCATION & BUREAUTIQUE
  {
    id: 36,
    name: "Manuel Scolaire - Mathématiques CE2",
    price: 3500,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    category: "Éducation & Bureautique",
    subcategory: "Livres & Manuels",
    store: "Librairie Scolaire",
    storeLocation: "Centre-ville",
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    description: "Manuel de mathématiques CE2 conforme au programme ivoirien.",
    tags: ["scolaire", "programme", "mathématiques"],
  },
  {
    id: 37,
    name: "Cartable Enfant - Mickey",
    price: 15000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "Éducation & Bureautique",
    subcategory: "Fournitures Scolaires",
    store: "Fournitures Plus",
    storeLocation: "Centre-ville",
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    description: "Cartable enfant avec motif Mickey, ergonomique et résistant.",
    tags: ["enfant", "mickey", "ergonomique"],
    isPopular: true,
  },

  // SERVICES
  {
    id: 38,
    name: "Réparation Smartphone - Écran",
    price: 25000,
    image: "https://images.unsplash.com/photo-1512101648912-7ad4bf4824ff?w=400",
    category: "Services",
    subcategory: "Réparations",
    store: "Tech Repair CI",
    storeLocation: "Centre-ville",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    description:
      "Service de réparation d'écran smartphone, toutes marques confondues.",
    tags: ["réparation", "écran", "garantie"],
  },
  {
    id: 39,
    name: "Livraison Express - Même Jour",
    price: 2000,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
    category: "Services",
    subcategory: "Livraison",
    store: "LinkaDrop Express",
    storeLocation: "Toute la ville",
    rating: 4.9,
    reviewCount: 456,
    inStock: true,
    description:
      "Service de livraison express dans la journée partout à Kara.",
    tags: ["express", "même-jour", "fiable"],
    isPopular: true,
  },
  {
    id: 40,
    name: "Nettoyage à Domicile - 3h",
    price: 15000,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400",
    category: "Services",
    subcategory: "Nettoyage",
    store: "Clean Service CI",
    storeLocation: "Kara",
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    description:
      "Service de nettoyage à domicile de 3 heures avec produits fournis.",
    tags: ["domicile", "produits-fournis", "professionnel"],
  },
];

// Produits populaires pour la page d'accueil
export const popularProducts = products.filter((product) => product.isPopular);

// Produits en vedette
export const featuredProducts = products.filter(
  (product) => product.isFeatured,
);

// Fonction pour obtenir des produits par catégorie
export const getProductsByCategory = (categoryId: string) => {
  return products.filter(
    (product) =>
      product.category.toLowerCase().includes(categoryId.toLowerCase()) ||
      product.subcategory?.toLowerCase().includes(categoryId.toLowerCase()),
  );
};

// Fonction pour rechercher des produits
export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.subcategory?.toLowerCase().includes(lowercaseQuery),
  );
};

// Fonction pour obtenir des produits similaires
export const getSimilarProducts = (productId: number, limit: number = 4) => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};
