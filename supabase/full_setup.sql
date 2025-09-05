-- LinkaMarket - Script complet d'installation Supabase (tout-en-un)
-- À exécuter UNE FOIS dans l'éditeur SQL de votre projet Supabase
-- Ce script crée le schéma, fonctions, triggers, politiques RLS
-- et insère des données de démonstration pour Kara, Togo

-- 0) Extensions requises
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1) Types ENUM (idempotent)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('client','merchant','delivery');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    CREATE TYPE order_status AS ENUM ('pending','confirmed','preparing','ready','delivering','delivered','cancelled');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_method') THEN
    CREATE TYPE payment_method AS ENUM ('tmoney','flooz','card','cash');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
    CREATE TYPE payment_status AS ENUM ('pending','paid','failed','refunded');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'delivery_status') THEN
    CREATE TYPE delivery_status AS ENUM ('pending','assigned','picked_up','in_transit','delivered','failed');
  END IF;
END $$;

-- 2) Fonctions utilitaires (idempotent via OR REPLACE)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name',''))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3) Tables de base
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  phone VARCHAR(20),
  business_name VARCHAR(255),
  business_address TEXT,
  business_description TEXT,
  business_phone VARCHAR(20),
  vehicle_type VARCHAR(100),
  delivery_zone TEXT,
  driver_license VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(10) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subcategories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name, category_id)
);

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  original_price DECIMAL(10,2) CHECK (original_price >= price),
  image_url TEXT NOT NULL,
  gallery_images TEXT[],
  category_id UUID REFERENCES categories(id) ON DELETE RESTRICT NOT NULL,
  subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
  merchant_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  tags TEXT[],
  is_popular BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  discount_percentage INTEGER CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  weight DECIMAL(8,3),
  dimensions VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
  status order_status DEFAULT 'pending',
  payment_method payment_method NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  delivery_address TEXT NOT NULL,
  delivery_phone VARCHAR(20) NOT NULL,
  delivery_instructions TEXT,
  delivery_fee DECIMAL(8,2) DEFAULT 0 CHECK (delivery_fee >= 0),
  estimated_delivery_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE RESTRICT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price > 0),
  total_price DECIMAL(10,2) NOT NULL CHECK (total_price > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS deliveries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL UNIQUE,
  driver_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status delivery_status DEFAULT 'pending',
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  pickup_time TIMESTAMP WITH TIME ZONE,
  delivery_time TIMESTAMP WITH TIME ZONE,
  delivery_fee DECIMAL(8,2) NOT NULL CHECK (delivery_fee >= 0),
  driver_commission DECIMAL(8,2) CHECK (driver_commission >= 0),
  distance_km DECIMAL(6,2) CHECK (distance_km > 0),
  estimated_duration_minutes INTEGER CHECK (estimated_duration_minutes > 0),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, customer_id)
);

CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(customer_id, product_id)
);

CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(customer_id, product_id)
);

-- 4) Table verification_codes
CREATE TABLE IF NOT EXISTS verification_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  code VARCHAR(8) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON verification_codes(code);
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON verification_codes(expires_at);
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Tout le monde peut créer des codes de vérification" ON verification_codes FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Lecture des codes par email" ON verification_codes FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Mise à jour des codes utilisés" ON verification_codes FOR UPDATE USING (true);
CREATE OR REPLACE FUNCTION cleanup_expired_verification_codes() RETURNS void AS $$
BEGIN
  DELETE FROM verification_codes WHERE expires_at < NOW() - INTERVAL '1 day';
END; $$ LANGUAGE plpgsql;

-- 5) Table locations (carte interactive)
CREATE TABLE IF NOT EXISTS locations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  name VARCHAR(255) NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_locations_coordinates ON locations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_locations_role ON locations(role);
CREATE INDEX IF NOT EXISTS idx_locations_active ON locations(is_active) WHERE is_active = true;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_locations_updated_at'
  ) THEN
    CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tout le monde peut voir les locations actives" ON locations;
CREATE POLICY "Tout le monde peut voir les locations actives" ON locations FOR SELECT USING (is_active = true);
DROP POLICY IF EXISTS "Les utilisateurs peuvent gérer leurs locations" ON locations;
CREATE POLICY "Les utilisateurs peuvent gérer leurs locations" ON locations FOR ALL USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION find_nearby_locations(
  center_lat DOUBLE PRECISION,
  center_lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 10,
  location_role user_role DEFAULT NULL
) RETURNS TABLE (
  id UUID,
  name VARCHAR(255),
  role user_role,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  address TEXT,
  phone VARCHAR(20),
  description TEXT,
  distance_km DOUBLE PRECISION
) LANGUAGE SQL AS $$
  SELECT l.id, l.name, l.role, l.latitude, l.longitude, l.address, l.phone, l.description,
    (6371 * acos(
      cos(radians(center_lat)) * cos(radians(l.latitude)) * cos(radians(l.longitude) - radians(center_lng)) +
      sin(radians(center_lat)) * sin(radians(l.latitude))
    )) AS distance_km
  FROM locations l
  WHERE l.is_active = true
    AND (location_role IS NULL OR l.role = location_role)
    AND (6371 * acos(
      cos(radians(center_lat)) * cos(radians(l.latitude)) * cos(radians(l.longitude) - radians(center_lng)) +
      sin(radians(center_lat)) * sin(radians(l.latitude))
    )) <= radius_km
  ORDER BY distance_km;
$$;

-- 6) Triggers (idempotents)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
    CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_categories_updated_at') THEN
    CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_subcategories_updated_at') THEN
    CREATE TRIGGER update_subcategories_updated_at BEFORE UPDATE ON subcategories
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_products_updated_at') THEN
    CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_orders_updated_at') THEN
    CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_deliveries_updated_at') THEN
    CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON deliveries
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_reviews_updated_at') THEN
    CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_cart_items_updated_at') THEN
    CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- 7) RLS (Row Level Security) global
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- (Re)Politiques
-- PROFILES
DROP POLICY IF EXISTS "Voir son profil" ON profiles;
CREATE POLICY "Voir son profil" ON profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Modifier son profil" ON profiles;
CREATE POLICY "Modifier son profil" ON profiles FOR UPDATE USING (auth.uid() = id);
-- PRODUCTS
DROP POLICY IF EXISTS "Tout le monde peut voir les produits" ON products;
CREATE POLICY "Tout le monde peut voir les produits" ON products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Commerçants peuvent gérer leurs produits" ON products;
CREATE POLICY "Commerçants peuvent gérer leurs produits" ON products FOR ALL USING (auth.uid() = merchant_id);
-- ORDERS
DROP POLICY IF EXISTS "Client peut voir ses commandes" ON orders;
CREATE POLICY "Client peut voir ses commandes" ON orders FOR SELECT USING (auth.uid() = customer_id);
DROP POLICY IF EXISTS "Client peut créer une commande" ON orders;
CREATE POLICY "Client peut créer une commande" ON orders FOR INSERT WITH CHECK (auth.uid() = customer_id);
DROP POLICY IF EXISTS "Commerçant peut voir les commandes liées à ses produits" ON orders;
CREATE POLICY "Commerçant peut voir les commandes liées à ses produits" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = orders.id AND p.merchant_id = auth.uid()
    )
  );
-- ORDER_ITEMS
DROP POLICY IF EXISTS "Client ou commerçant peut voir les lignes de commande" ON order_items;
CREATE POLICY "Client ou commerçant peut voir les lignes de commande" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders o WHERE o.id = order_id AND (
        o.customer_id = auth.uid() OR EXISTS (
          SELECT 1 FROM products p WHERE p.id = product_id AND p.merchant_id = auth.uid()
        )
      )
    )
  );
-- DELIVERIES
DROP POLICY IF EXISTS "Livreur peut voir ses livraisons" ON deliveries;
CREATE POLICY "Livreur peut voir ses livraisons" ON deliveries FOR SELECT USING (auth.uid() = driver_id);
DROP POLICY IF EXISTS "Client peut voir les livraisons de ses commandes" ON deliveries;
CREATE POLICY "Client peut voir les livraisons de ses commandes" ON deliveries
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders o WHERE o.id = order_id AND o.customer_id = auth.uid())
  );
-- REVIEWS
DROP POLICY IF EXISTS "Tout le monde peut voir les avis" ON reviews;
CREATE POLICY "Tout le monde peut voir les avis" ON reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Client peut gérer ses avis" ON reviews;
CREATE POLICY "Client peut gérer ses avis" ON reviews FOR ALL USING (auth.uid() = customer_id);
-- FAVORITES
DROP POLICY IF EXISTS "Client peut gérer ses favoris" ON favorites;
CREATE POLICY "Client peut gérer ses favoris" ON favorites FOR ALL USING (auth.uid() = customer_id);
-- CART_ITEMS
DROP POLICY IF EXISTS "Client peut gérer son panier" ON cart_items;
CREATE POLICY "Client peut gérer son panier" ON cart_items FOR ALL USING (auth.uid() = customer_id);

-- 8) Trigger d'auto-profil à la création de l'utilisateur
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- 9) Données initiales (catégories + sous-catégories minimal)
INSERT INTO categories (name, icon, description) VALUES
('Alimentaire','🍽️','Produits alimentaires et boissons'),
('Électronique','📱','Appareils électroniques et technologie'),
('Mode & Vêtements','👗','Vêtements, chaussures et accessoires'),
('Maison & Décoration','🏠','Meubles, décoration et électroménager'),
('Santé & Beauté','💊','Produits de santé, beauté et bien-être'),
('Transport & Auto','🚗','Véhicules, pièces auto et transport'),
('Sport & Loisirs','⚽','Articles de sport et loisirs'),
('Éducation & Bureautique','📚','Livres, fournitures scolaires et bureau'),
('Services','🔧','Services divers et prestations')
ON CONFLICT (name) DO NOTHING;

-- Exemple de sous-catégories pour "Alimentaire"
INSERT INTO subcategories (name, category_id)
SELECT v.name, c.id FROM (
  VALUES ('Céréales & Légumineuses'),('Fruits & Légumes'),('Viandes & Poissons'),('Produits Laitiers'),('Épices & Condiments'),('Boissons'),('Snacks & Confiseries'),('Produits Transformés')
) AS v(name)
JOIN categories c ON c.name = 'Alimentaire'
ON CONFLICT (name, category_id) DO NOTHING;

-- 10) Données de démonstration: locations (Kara, Togo)
INSERT INTO locations (role, name, latitude, longitude, address, phone, description, is_active) VALUES
('merchant','Boutique Kara Centre', 9.5511, 1.1901, 'Avenue de l''Indépendance, Centre-ville, Kara, Région de la Kara', '+228 90 12 34 56','Vêtements et accessoires de mode. Ouvert 8h-18h du lundi au samedi.', true),
('merchant','Marché Central Kara', 9.5525, 1.1885, 'Quartier Kpéwa, Commune de Kara', '+228 91 23 45 67','Grand marché traditionnel. Produits locaux, céréales, légumes frais.', true),
('merchant','Pharmacie Tchré', 9.5495, 1.1920, 'Quartier Tchré, Kara', '+228 92 34 56 78','Pharmacie moderne avec garde 24h/24. Médicaments et produits de santé.', true),
('merchant','Restaurant Savana', 9.5540, 1.1875, 'Route de Bassar, Kara', '+228 93 45 67 89','Cuisine togolaise authentique. Spécialités du Nord-Togo.', true),
('delivery','LinkaDrop Kara', 9.5515, 1.1895, 'Centre-ville, Kara', '+228 94 56 78 90','Service de livraison rapide dans toute la ville de Kara. Moto et vélo.', true),
('delivery','Express Kara Nord', 9.5530, 1.1880, 'Quartier Kpéwa, Kara', '+228 95 67 89 01','Livraison spécialisée pour les quartiers nord de Kara.', true),
('client','Zone Résidentielle Plateau', 9.5505, 1.1910, 'Plateau, Commune de Kara', '+228 97 89 01 23','Zone résidentielle calme avec plusieurs familles actives sur LinkaMarket.', true),
('client','Quartier Lycée', 9.5485, 1.1925, 'Près du Lycée de Kara, Quartier Tchré', '+228 98 90 12 34','Zone étudiante avec forte demande de livraison et services.', true)
ON CONFLICT DO NOTHING;

-- 11) Résumé
SELECT
  (SELECT COUNT(*) FROM locations) AS locations_count,
  (SELECT COUNT(*) FROM categories) AS categories_count,
  (SELECT COUNT(*) FROM subcategories) AS subcategories_count;
