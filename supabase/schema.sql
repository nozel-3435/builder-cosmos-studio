-- Schema SQL pour LinkaMarket sur Supabase
-- Exécutez ces commandes dans l'éditeur SQL de Supabase

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Types ENUM pour des valeurs contraintes
CREATE TYPE user_role AS ENUM ('client', 'merchant', 'delivery');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled');
CREATE TYPE payment_method AS ENUM ('tmoney', 'flooz', 'card', 'cash');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE delivery_status AS ENUM ('pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'failed');

-- Table des profils utilisateurs (étend auth.users de Supabase)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'client',
    avatar_url TEXT,
    phone VARCHAR(20),
    
    -- Champs pour les commerçants
    business_name VARCHAR(255),
    business_address TEXT,
    business_description TEXT,
    business_phone VARCHAR(20),
    
    -- Champs pour les livreurs
    vehicle_type VARCHAR(100),
    delivery_zone TEXT,
    driver_license VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des catégories de produits
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    icon VARCHAR(10) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des sous-catégories
CREATE TABLE subcategories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(name, category_id)
);

-- Table des produits
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    original_price DECIMAL(10,2) CHECK (original_price >= price),
    image_url TEXT NOT NULL,
    gallery_images TEXT[], -- Array d'URLs d'images
    category_id UUID REFERENCES categories(id) ON DELETE RESTRICT NOT NULL,
    subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
    merchant_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    in_stock BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    tags TEXT[], -- Array de tags pour la recherche
    is_popular BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    discount_percentage INTEGER CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    weight DECIMAL(8,3), -- En kg
    dimensions VARCHAR(100), -- Ex: "20x15x10 cm"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des commandes
CREATE TABLE orders (
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

-- Table des articles de commande
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE RESTRICT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price > 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des livraisons (LinkaDrop)
CREATE TABLE deliveries (
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

-- Table des avis/évaluations
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, customer_id) -- Un avis par client par produit
);

-- Table des favoris
CREATE TABLE favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(customer_id, product_id) -- Un favori unique par client/produit
);

-- Table du panier
CREATE TABLE cart_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(customer_id, product_id) -- Un article unique par client dans le panier
);

-- Index pour optimiser les performances
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_merchant ON products(merchant_id);
CREATE INDEX idx_products_popular ON products(is_popular) WHERE is_popular = true;
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_in_stock ON products(in_stock) WHERE in_stock = true;
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('french', name || ' ' || description));

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

CREATE INDEX idx_deliveries_driver ON deliveries(driver_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Fonctions pour mettre à jour les timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour auto-update des timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subcategories_updated_at BEFORE UPDATE ON subcategories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON deliveries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer un profil automatiquement lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', ''));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement un profil
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Politiques de sécurité RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Politiques pour les profils
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Les utilisateurs peuvent mettre à jour leur propre profil" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Tout le monde peut voir les profils des commerçants" ON profiles
    FOR SELECT USING (role = 'merchant');

-- Politiques pour les produits
CREATE POLICY "Tout le monde peut voir les produits" ON products
    FOR SELECT USING (true);

CREATE POLICY "Les commerçants peuvent gérer leurs produits" ON products
    FOR ALL USING (auth.uid() = merchant_id);

-- Politiques pour les commandes
CREATE POLICY "Les clients peuvent voir leurs commandes" ON orders
    FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Les clients peuvent créer des commandes" ON orders
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Les commerçants peuvent voir les commandes de leurs produits" ON orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = orders.id AND p.merchant_id = auth.uid()
        )
    );

-- Politiques pour les articles de commande
CREATE POLICY "Visibilité basée sur la commande" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders o WHERE o.id = order_id 
            AND (o.customer_id = auth.uid() OR EXISTS (
                SELECT 1 FROM products p WHERE p.id = product_id AND p.merchant_id = auth.uid()
            ))
        )
    );

-- Politiques pour les livraisons
CREATE POLICY "Les livreurs peuvent voir leurs livraisons" ON deliveries
    FOR SELECT USING (auth.uid() = driver_id);

CREATE POLICY "Les clients peuvent voir leurs livraisons" ON deliveries
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders o WHERE o.id = order_id AND o.customer_id = auth.uid()
        )
    );

-- Politiques pour les avis
CREATE POLICY "Tout le monde peut voir les avis" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Les clients peuvent gérer leurs avis" ON reviews
    FOR ALL USING (auth.uid() = customer_id);

-- Politiques pour les favoris
CREATE POLICY "Les clients peuvent gérer leurs favoris" ON favorites
    FOR ALL USING (auth.uid() = customer_id);

-- Politiques pour le panier
CREATE POLICY "Les clients peuvent gérer leur panier" ON cart_items
    FOR ALL USING (auth.uid() = customer_id);

-- Vues utiles pour l'application
CREATE VIEW products_with_stats AS
SELECT 
    p.*,
    c.name as category_name,
    c.icon as category_icon,
    sc.name as subcategory_name,
    prof.business_name as store_name,
    prof.business_address as store_location,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as review_count,
    COUNT(f.id) as favorite_count
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
LEFT JOIN profiles prof ON p.merchant_id = prof.id
LEFT JOIN reviews r ON p.id = r.product_id
LEFT JOIN favorites f ON p.id = f.product_id
GROUP BY p.id, c.name, c.icon, sc.name, prof.business_name, prof.business_address;

-- Vue pour les statistiques des commerçants
CREATE VIEW merchant_stats AS
SELECT 
    p.merchant_id,
    COUNT(DISTINCT p.id) as total_products,
    COUNT(DISTINCT oi.order_id) as total_orders,
    COALESCE(SUM(oi.total_price), 0) as total_revenue,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(DISTINCT r.id) as total_reviews
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN reviews r ON p.id = r.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'delivered'
GROUP BY p.merchant_id;

-- Vue pour les statistiques des livreurs
CREATE VIEW delivery_stats AS
SELECT 
    d.driver_id,
    COUNT(*) as total_deliveries,
    COUNT(CASE WHEN d.status = 'delivered' THEN 1 END) as successful_deliveries,
    COALESCE(SUM(d.driver_commission), 0) as total_earnings,
    COALESCE(AVG(d.distance_km), 0) as average_distance,
    COALESCE(AVG(d.estimated_duration_minutes), 0) as average_duration
FROM deliveries d
WHERE d.driver_id IS NOT NULL
GROUP BY d.driver_id;

-- Données initiales - Catégories
INSERT INTO categories (name, icon, description) VALUES
('Alimentaire', '🍽️', 'Produits alimentaires et boissons'),
('Électronique', '📱', 'Appareils électroniques et technologie'),
('Mode & Vêtements', '👗', 'Vêtements, chaussures et accessoires'),
('Maison & Décoration', '🏠', 'Meubles, décoration et électroménager'),
('Santé & Beauté', '💊', 'Produits de santé, beauté et bien-être'),
('Transport & Auto', '🚗', 'Véhicules, pièces auto et transport'),
('Sport & Loisirs', '⚽', 'Articles de sport et loisirs'),
('Éducation & Bureautique', '📚', 'Livres, fournitures scolaires et bureau'),
('Services', '🔧', 'Services divers et prestations');

-- Sous-catégories pour Alimentaire
INSERT INTO subcategories (name, category_id) 
SELECT subcat, c.id FROM (VALUES 
    ('Céréales & Légumineuses'),
    ('Fruits & Légumes'),
    ('Viandes & Poissons'),
    ('Produits Laitiers'),
    ('Épices & Condiments'),
    ('Boissons'),
    ('Snacks & Confiseries'),
    ('Produits Transformés')
) AS sub(subchat) 
CROSS JOIN categories c WHERE c.name = 'Alimentaire';

-- Sous-catégories pour Électronique
INSERT INTO subcategories (name, category_id) 
SELECT subchat, c.id FROM (VALUES 
    ('Smartphones'),
    ('Ordinateurs'),
    ('Télévisions'),
    ('Audio & Hi-Fi'),
    ('Électroménager'),
    ('Accessoires'),
    ('Gaming'),
    ('Gadgets')
) AS sub(subchat) 
CROSS JOIN categories c WHERE c.name = 'Électronique';

-- Sous-catégories pour Mode & Vêtements
INSERT INTO subcategories (name, category_id) 
SELECT subchat, c.id FROM (VALUES 
    ('Vêtements Femme'),
    ('Vêtements Homme'),
    ('Chaussures'),
    ('Accessoires Mode'),
    ('Bijoux'),
    ('Montres'),
    ('Sacs & Maroquinerie'),
    ('Vêtements Enfant')
) AS sub(subchat) 
CROSS JOIN categories c WHERE c.name = 'Mode & Vêtements';

-- Fonctions utiles pour l'application
CREATE OR REPLACE FUNCTION search_products(search_query TEXT)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    image_url TEXT,
    category_name VARCHAR(255),
    store_name VARCHAR(255),
    average_rating DECIMAL(3,2),
    review_count BIGINT
) LANGUAGE SQL AS $$
    SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        c.name as category_name,
        prof.business_name as store_name,
        COALESCE(AVG(r.rating), 0)::DECIMAL(3,2) as average_rating,
        COUNT(r.id) as review_count
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN profiles prof ON p.merchant_id = prof.id
    LEFT JOIN reviews r ON p.id = r.product_id
    WHERE 
        p.in_stock = true
        AND (
            p.name ILIKE '%' || search_query || '%'
            OR p.description ILIKE '%' || search_query || '%'
            OR search_query = ANY(p.tags)
            OR c.name ILIKE '%' || search_query || '%'
        )
    GROUP BY p.id, c.name, prof.business_name
    ORDER BY 
        CASE WHEN p.is_popular THEN 1 ELSE 2 END,
        COUNT(r.id) DESC,
        p.created_at DESC;
$$;
