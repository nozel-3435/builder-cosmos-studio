<<<<<<< HEAD
-- Script de migration avec données de démonstration pour Kara, Togo
-- À exécuter dans l'éditeur SQL de Supabase après avoir créé le schéma principal
=======
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Script de migration des données LinkaMarket vers Supabase
-- Exécutez ce script après avoir créé le schéma de base
>>>>>>> 104b1abdeb48af5e35342a61bf7633702c41919e

-- Insérer les données de démonstration pour les locations de Kara
INSERT INTO locations (role, name, latitude, longitude, address, phone, description, is_active) VALUES
-- Commerçants de Kara
('merchant', 'Boutique Kara Centre', 9.5511, 1.1901, 'Avenue de l''Indépendance, Centre-ville, Kara, Région de la Kara', '+228 90 12 34 56', 'Vêtements et accessoires de mode. Ouvert 8h-18h du lundi au samedi.', true),
('merchant', 'Marché Central Kara', 9.5525, 1.1885, 'Quartier Kpéwa, Commune de Kara', '+228 91 23 45 67', 'Grand marché traditionnel. Produits locaux, céréales, légumes frais.', true),
('merchant', 'Pharmacie Tchré', 9.5495, 1.192, 'Quartier Tchré, Kara', '+228 92 34 56 78', 'Pharmacie moderne avec garde 24h/24. Médicaments et produits de santé.', true),
('merchant', 'Restaurant Savana', 9.554, 1.1875, 'Route de Bassar, Kara', '+228 93 45 67 89', 'Cuisine togolaise authentique. Spécialités du Nord-Togo.', true),
('merchant', 'Épicerie Kpélé', 9.5535, 1.1915, 'Quartier Kpélé, Kara', '+228 90 23 45 67', 'Épicerie moderne avec produits frais et conserves importées.', true),
('merchant', 'Atelier Moto Kara', 9.5475, 1.1905, 'Zone Industrielle, Kara', '+228 91 34 56 78', 'Réparation et vente de pièces détachées motos et vélos.', true),
('merchant', 'Boulangerie du Nord', 9.5520, 1.1890, 'Près de la Gare Routière, Kara', '+228 92 45 67 89', 'Pain frais, pâtisseries et viennoiseries. Ouvert dès 5h du matin.', true),

-- Livreurs dans Kara
('delivery', 'LinkaDrop Kara Centre', 9.5515, 1.1895, 'Centre-ville, Kara', '+228 94 56 78 90', 'Service de livraison rapide dans toute la ville de Kara. Moto et vélo.', true),
('delivery', 'Express Kara Nord', 9.553, 1.188, 'Quartier Kpéwa, Kara', '+228 95 67 89 01', 'Livraison spécialisée pour les quartiers nord de Kara.', true),
('delivery', 'Moto Taxi Tchré', 9.5490, 1.1925, 'Carrefour Tchré, Kara', '+228 96 78 90 12', 'Transport de personnes et livraison dans le quartier Tchré.', true),
('delivery', 'Speed Delivery Kara', 9.5545, 1.1870, 'Route de Bassar, Kara', '+228 97 89 01 23', 'Livraison express pour tout Kara et environs. Service 24h/24.', true),

-- Zones clients dans Kara
('client', 'Zone Résidentielle Plateau', 9.5505, 1.191, 'Plateau, Commune de Kara', '+228 96 78 90 12', 'Zone résidentielle calme avec plusieurs familles actives sur LinkaMarket.', true),
('client', 'Quartier Lycée', 9.5485, 1.1925, 'Près du Lycée de Kara, Quartier Tchré', '+228 97 89 01 23', 'Zone étudiante avec forte demande de livraison et services.', true),
('client', 'Cité Universitaire', 9.5465, 1.1935, 'Campus Universitaire, Kara', '+228 98 90 12 34', 'Résidences étudiantes avec besoins fréquents en produits alimentaires.', true),
('client', 'Quartier Résidentiel Kpélé', 9.5540, 1.1920, 'Zone résidentielle Kpélé, Kara', '+228 99 01 23 45', 'Quartier familial moderne avec nombreuses commandes LinkaMarket.', true),
('client', 'Centre Hospitalier Kara', 9.5460, 1.1940, 'CHR Kara-Tomdè, Kara', '+228 90 12 45 78', 'Personnel médical et patients utilisant nos services de livraison.', true);

-- Ajouter quelques produits de démonstration spécifiques à Kara
-- (Nécessite d'abord des profils marchands, donc on va le faire après)

-- Message de confirmation
SELECT 'Migration terminée! ' || COUNT(*) || ' locations ajoutées pour Kara, Togo.' as status 
FROM locations;
