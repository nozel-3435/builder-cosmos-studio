-- Script de migration des données LinkaMarket vers Supabase
-- Exécutez ce script après avoir créé le schéma de base

-- Insérer des commerçants de démonstration
INSERT INTO profiles (id, email, full_name, role, business_name, business_address, business_description, business_phone) VALUES
(uuid_generate_v4(), 'marche.central@gmail.com', 'Mamadou Traoré', 'merchant', 'Marché Central', 'Adjamé, Grand Marché', 'Spécialiste des produits alimentaires locaux', '+225 07 12 34 56'),
(uuid_generate_v4(), 'bio.market@gmail.com', 'Fatou Coulibaly', 'merchant', 'Bio Market', 'Cocody, Riviera', 'Produits biologiques et naturels', '+225 05 67 89 01'),
(uuid_generate_v4(), 'tech.store@gmail.com', 'Jean-Baptiste Kouassi', 'merchant', 'Tech Store CI', 'Plateau, Zone 4', 'Électronique et technologie moderne', '+225 01 23 45 67'),
(uuid_generate_v4(), 'fashion.wax@gmail.com', 'Awa Diallo', 'merchant', 'Fashion Boutique Wax', 'Treichville, Marché', 'Mode africaine et vêtements traditionnels', '+225 04 56 78 90'),
(uuid_generate_v4(), 'meubles.design@gmail.com', 'Kofi Asante', 'merchant', 'Meubles Design CI', 'Zone 4, Marcory', 'Mobilier moderne et décoration', '+225 02 34 56 78');

-- Insérer des livreurs de démonstration
INSERT INTO profiles (id, email, full_name, role, vehicle_type, delivery_zone, driver_license) VALUES
(uuid_generate_v4(), 'driver.moto1@gmail.com', 'Ibrahima Sanogo', 'delivery', 'moto', 'Cocody, Plateau, Marcory', 'DL001234'),
(uuid_generate_v4(), 'driver.voiture1@gmail.com', 'Aminata Kone', 'delivery', 'voiture', 'Yopougon, Abobo, Adjamé', 'DL005678'),
(uuid_generate_v4(), 'driver.velo1@gmail.com', 'Sekou Doumbia', 'delivery', 'velo', 'Treichville, Marcory', 'DL009012');

-- Insérer des clients de démonstration
INSERT INTO profiles (id, email, full_name, role, phone) VALUES
(uuid_generate_v4(), 'client1@gmail.com', 'Marie Kouassi', 'client', '+225 07 11 22 33'),
(uuid_generate_v4(), 'client2@gmail.com', 'Pierre Yao', 'client', '+225 05 44 55 66'),
(uuid_generate_v4(), 'client3@gmail.com', 'Sylvie Bamba', 'client', '+225 01 77 88 99');

-- Insérer des produits de démonstration (en utilisant les IDs des commerçants)
WITH merchant_ids AS (
  SELECT id, business_name FROM profiles WHERE role = 'merchant'
),
category_ids AS (
  SELECT id, name FROM categories
)

-- Produits alimentaires
INSERT INTO products (name, description, price, original_price, image_url, category_id, subcategory_id, merchant_id, in_stock, stock_quantity, tags, is_popular, is_featured, discount_percentage)
SELECT 
  'Riz local premium - Sac 25kg',
  'Riz de qualité supérieure cultivé localement. Grains longs et parfumés.',
  12500,
  15000,
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
  c.id,
  sc.id,
  m.id,
  true,
  50,
  ARRAY['bio', 'local', 'premium'],
  true,
  true,
  17
FROM category_ids c
CROSS JOIN merchant_ids m  
LEFT JOIN subcategories sc ON sc.category_id = c.id AND sc.name = 'Céréales & Légumineuses'
WHERE c.name = 'Alimentaire' AND m.business_name = 'Marché Central'

UNION ALL

SELECT 
  'Bananes plantains - Régime',
  'Bananes plantains fraîches, parfaites pour l''alloco et autres préparations.',
  1500,
  NULL,
  'https://images.unsplash.com/photo-1603833797131-3c0db8b41452?w=400',
  c.id,
  sc.id,
  m.id,
  true,
  100,
  ARRAY['frais', 'local', 'alloco'],
  true,
  true,
  NULL
FROM category_ids c
CROSS JOIN merchant_ids m  
LEFT JOIN subcategories sc ON sc.category_id = c.id AND sc.name = 'Fruits & Légumes'
WHERE c.name = 'Alimentaire' AND m.business_name = 'Marché Central'

UNION ALL

SELECT 
  'Ananas Victoria - Pièce',
  'Ananas Victoria sweet et juteux, cultivé dans la région de Bonoua.',
  800,
  NULL,
  'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400',
  c.id,
  sc.id,
  m.id,
  true,
  75,
  ARRAY['sweet', 'juteux', 'vitamine'],
  true,
  false,
  NULL
FROM category_ids c
CROSS JOIN merchant_ids m  
LEFT JOIN subcategories sc ON sc.category_id = c.id AND sc.name = 'Fruits & Légumes'
WHERE c.name = 'Alimentaire' AND m.business_name = 'Bio Market'

UNION ALL

-- Produits électroniques
SELECT 
  'Samsung Galaxy A54 - 128GB',
  'Smartphone Samsung Galaxy A54 avec caméra 50MP et écran Super AMOLED.',
  185000,
  210000,
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
  c.id,
  sc.id,
  m.id,
  true,
  25,
  ARRAY['android', 'caméra', '5G'],
  true,
  true,
  12
FROM category_ids c
CROSS JOIN merchant_ids m  
LEFT JOIN subcategories sc ON sc.category_id = c.id AND sc.name = 'Smartphones'
WHERE c.name = 'Électronique' AND m.business_name = 'Tech Store CI'

UNION ALL

SELECT 
  'iPhone 13 - 128GB',
  'iPhone 13 avec puce A15 Bionic et système de caméra avancé.',
  425000,
  NULL,
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
  c.id,
  sc.id,
  m.id,
  true,
  15,
  ARRAY['iOS', 'premium', 'caméra'],
  true,
  false,
  NULL
FROM category_ids c
CROSS JOIN merchant_ids m  
LEFT JOIN subcategories sc ON sc.category_id = c.id AND sc.name = 'Smartphones'
WHERE c.name = 'Électronique' AND m.business_name = 'Tech Store CI'

UNION ALL

-- Produits mode
SELECT 
  'Robe Africaine Wax - Modèle Unique',
  'Robe africaine en wax authentique, coupe moderne et élégante.',
  35000,
  NULL,
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
  c.id,
  sc.id,
  m.id,
  true,
  20,
  ARRAY['wax', 'africain', 'élégant'],
  true,
  true,
  NULL
FROM category_ids c
CROSS JOIN merchant_ids m  
LEFT JOIN subcategories sc ON sc.category_id = c.id AND sc.name = 'Vêtements Femme'
WHERE c.name = 'Mode & Vêtements' AND m.business_name = 'Fashion Boutique Wax'

UNION ALL

SELECT 
  'Ensemble Pagne Baoulé - 6 mètres',
  'Ensemble pagne baoulé traditionnel de 6 mètres avec motifs authentiques.',
  25000,
  NULL,
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
  c.id,
  sc.id,
  m.id,
  true,
  30,
  ARRAY['traditionnel', 'baoulé', 'authentique'],
  true,
  false,
  NULL
FROM category_ids c
CROSS JOIN merchant_ids m  
LEFT JOIN subcategories sc ON sc.category_id = c.id AND sc.name = 'Vêtements Femme'
WHERE c.name = 'Mode & Vêtements' AND m.business_name = 'Fashion Boutique Wax'

UNION ALL

-- Produits maison
SELECT 
  'Canapé 3 Places en Tissu',
  'Canapé 3 places confortable en tissu de qualité supérieure.',
  185000,
  NULL,
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
  c.id,
  sc.id,
  m.id,
  true,
  10,
  ARRAY['confort', 'salon', 'qualité'],
  false,
  true,
  NULL
FROM category_ids c
CROSS JOIN merchant_ids m  
LEFT JOIN subcategories sc ON sc.category_id = c.id AND sc.name = 'Meubles'
WHERE c.name = 'Maison & Décoration' AND m.business_name = 'Meubles Design CI';

-- Insérer quelques avis de démonstration
WITH product_data AS (
  SELECT p.id as product_id, pr.id as customer_id
  FROM products p
  CROSS JOIN profiles pr
  WHERE pr.role = 'client'
  LIMIT 10
)
INSERT INTO reviews (product_id, customer_id, rating, comment)
SELECT 
  product_id,
  customer_id,
  (RANDOM() * 2 + 3)::INTEGER, -- Rating entre 3 et 5
  CASE 
    WHEN RANDOM() < 0.5 THEN 'Excellent produit, je recommande vivement!'
    ELSE 'Très satisfait de mon achat, livraison rapide.'
  END
FROM product_data;

-- Insérer quelques favoris de démonstration
WITH product_data AS (
  SELECT p.id as product_id, pr.id as customer_id, ROW_NUMBER() OVER() as rn
  FROM products p
  CROSS JOIN profiles pr
  WHERE pr.role = 'client'
)
INSERT INTO favorites (customer_id, product_id)
SELECT customer_id, product_id
FROM product_data
WHERE rn <= 5; -- Les 5 premiers

-- Ajouter quelques articles au panier pour démonstration
WITH product_data AS (
  SELECT p.id as product_id, pr.id as customer_id, ROW_NUMBER() OVER() as rn
  FROM products p
  CROSS JOIN profiles pr
  WHERE pr.role = 'client'
  ORDER BY RANDOM()
)
INSERT INTO cart_items (customer_id, product_id, quantity)
SELECT customer_id, product_id, (RANDOM() * 3 + 1)::INTEGER
FROM product_data
WHERE rn <= 3; -- 3 articles dans le panier

-- Mettre à jour les statistiques des vues de produits
UPDATE categories SET description = 
  CASE name
    WHEN 'Alimentaire' THEN 'Découvrez notre large gamme de produits alimentaires frais et de qualité'
    WHEN 'Électronique' THEN 'Smartphones, ordinateurs et appareils électroniques dernière génération'
    WHEN 'Mode & Vêtements' THEN 'Mode africaine traditionnelle et contemporaine'
    WHEN 'Maison & Décoration' THEN 'Mobilier et décoration pour votre intérieur'
    WHEN 'Santé & Beauté' THEN 'Produits de beauté et soins naturels'
    WHEN 'Transport & Auto' THEN 'Pièces automobiles et accessoires transport'
    WHEN 'Sport & Loisirs' THEN 'Équipements sportifs et articles de loisirs'
    WHEN 'Éducation & Bureautique' THEN 'Fournitures scolaires et matériel de bureau'
    WHEN 'Services' THEN 'Services professionnels et prestations'
    ELSE description
  END;

-- Commenter la ligne suivante si vous voulez garder les données de test
-- DELETE FROM auth.users; -- Supprime tous les utilisateurs de test pour commencer proprement
