-- Migration: Ajouter la table locations pour la carte interactive
-- Date: 2024-01-20
-- Description: Création de la table locations pour enregistrer les positions des utilisateurs sur la carte

-- Vérifier si la table n'existe pas déjà
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'locations') THEN
        -- Table des localisations (pour la carte interactive)
        CREATE TABLE locations (
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

        -- Index pour optimiser les requêtes géographiques
        CREATE INDEX idx_locations_coordinates ON locations(latitude, longitude);
        CREATE INDEX idx_locations_role ON locations(role);
        CREATE INDEX idx_locations_active ON locations(is_active) WHERE is_active = true;

        -- Trigger pour auto-update des timestamps
        CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

        -- Politiques de sécurité RLS pour les locations
        ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

        -- Tout le monde peut voir les locations actives
        CREATE POLICY "Tout le monde peut voir les locations actives" ON locations
            FOR SELECT USING (is_active = true);

        -- Les utilisateurs peuvent gérer leurs propres locations
        CREATE POLICY "Les utilisateurs peuvent gérer leurs locations" ON locations
            FOR ALL USING (auth.uid() = user_id);

        RAISE NOTICE 'Table locations créée avec succès';
    ELSE
        RAISE NOTICE 'Table locations existe déjà';
    END IF;
END $$;

-- Fonction pour chercher des locations par proximité
CREATE OR REPLACE FUNCTION find_nearby_locations(
    center_lat DOUBLE PRECISION,
    center_lng DOUBLE PRECISION,
    radius_km DOUBLE PRECISION DEFAULT 10,
    location_role user_role DEFAULT NULL
)
RETURNS TABLE (
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
    SELECT 
        l.id,
        l.name,
        l.role,
        l.latitude,
        l.longitude,
        l.address,
        l.phone,
        l.description,
        (
            6371 * acos(
                cos(radians(center_lat)) 
                * cos(radians(l.latitude)) 
                * cos(radians(l.longitude) - radians(center_lng)) 
                + sin(radians(center_lat)) 
                * sin(radians(l.latitude))
            )
        ) as distance_km
    FROM locations l
    WHERE 
        l.is_active = true
        AND (location_role IS NULL OR l.role = location_role)
        AND (
            6371 * acos(
                cos(radians(center_lat)) 
                * cos(radians(l.latitude)) 
                * cos(radians(l.longitude) - radians(center_lng)) 
                + sin(radians(center_lat)) 
                * sin(radians(l.latitude))
            )
        ) <= radius_km
    ORDER BY distance_km;
$$;

-- Insérer quelques données de démonstration
INSERT INTO locations (role, name, latitude, longitude, address, phone, description, is_active) VALUES
('merchant', 'Boutique Kara Centre', 9.5511, 1.1901, 'Avenue de l''Indépendance, Centre-ville, Kara', '+228 90 12 34 56', 'Vêtements et accessoires de mode. Ouvert 8h-18h du lundi au samedi.', true),
('merchant', 'Marché des Saveurs', 9.5525, 1.1885, 'Quartier Kpéwa, Kara', '+228 91 23 45 67', 'Produits alimentaires frais et locaux. Spécialités togolaises.', true),
('merchant', 'Tech Solutions Kara', 9.5495, 1.1920, 'Zone Commerciale Tchré, Kara', '+228 92 34 56 78', 'Réparation et vente d''appareils électroniques. Service après-vente.', true),
('merchant', 'Pharmacie Ramco', 9.5540, 1.1875, 'Carrefour Ramco, Kara', '+228 93 45 67 89', 'Pharmacie agréée. Médicaments et produits de santé. Garde 24h/24.', true),
('delivery', 'Livreur Express Kara', 9.5515, 1.1895, 'Centre-ville, Kara', '+228 94 56 78 90', 'Service de livraison rapide. Moto et vélo disponibles.', true),
('delivery', 'LinkaDrop Kpéwa', 9.5530, 1.1880, 'Quartier Kpéwa, Kara', '+228 95 67 89 01', 'Livraison dans tout Kara. Spécialisé produits frais.', true),
('client', 'Point de rencontre Plateau', 9.5505, 1.1910, 'Plateau, Kara', '+228 96 78 90 12', 'Point de rencontre pour les clients du plateau.', true),
('client', 'Zone résidentielle Tchré', 9.5485, 1.1925, 'Tchré, Kara', '+228 97 89 01 23', 'Zone résidentielle avec plusieurs clients actifs.', true)
ON CONFLICT DO NOTHING;

COMMIT;
