-- Table pour les codes de vérification email
CREATE TABLE IF NOT EXISTS verification_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(8) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON verification_codes(code);
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON verification_codes(expires_at);

-- Politique de sécurité RLS
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion de codes de vérification
CREATE POLICY "Tout le monde peut créer des codes de vérification" ON verification_codes
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture des codes par email
CREATE POLICY "Lecture des codes par email" ON verification_codes
    FOR SELECT USING (true);

-- Politique pour permettre la mise à jour des codes utilisés
CREATE POLICY "Mise à jour des codes utilisés" ON verification_codes
    FOR UPDATE USING (true);

-- Fonction pour nettoyer les codes expirés (à exécuter périodiquement)
CREATE OR REPLACE FUNCTION cleanup_expired_verification_codes()
RETURNS void AS $$
BEGIN
    DELETE FROM verification_codes 
    WHERE expires_at < NOW() - INTERVAL '1 day';
END;
$$ LANGUAGE plpgsql;

-- Créer un déclencheur pour nettoyer automatiquement (optionnel)
-- Note: Vous pourrez configurer un cron job dans Supabase pour exécuter cette fonction
