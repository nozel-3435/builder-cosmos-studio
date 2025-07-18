# 🗺️ Guide d'utilisation de la Carte Interactive LinkaMarket

## ✅ Ce qu'on a fait ensemble

### Étape 1 : Table locations dans Supabase ✅

- ✅ Création de la table `locations` avec toutes les colonnes nécessaires
- ✅ Index optimisés pour les requêtes géographiques
- ✅ Politiques de sécurité RLS (Row Level Security)
- ✅ Fonction de recherche par proximité `find_nearby_locations()`
- ✅ Données de démonstration pour Kara

### Étape 2 : Composant MapComponent.tsx ✅

- ✅ Carte interactive avec Leaflet et React-Leaflet
- ✅ Intégration complète avec Supabase
- ✅ Icônes personnalisées par type d'utilisateur (client, commerçant, livreur)
- ✅ Formulaire d'ajout/modification de locations
- ✅ Gestion des permissions (seulement ses propres locations)
- ✅ Interface responsive et intuitive

### Étape 3 : Intégration dans la page /map ✅

- ✅ Mode "Interactive" ajouté aux vues existantes
- ✅ Filtres par type d'utilisateur
- ✅ Interface utilisateur cohérente avec le design existant

## 🎯 Fonctionnalités

### Pour tous les utilisateurs :

- **Visualisation** : Voir tous les commerçants, livreurs et points clients sur la carte
- **Filtrage** : Filtrer par type (client, commerçant, livreur)
- **Recherche géographique** : Trouver les services près d'une position
- **Navigation** : Interface intuitive avec zoom et déplacement

### Pour les utilisateurs connectés :

- **Ajouter sa position** : Clic sur la carte pour s'ajouter
- **Modifier ses informations** : Éditer nom, adresse, téléphone, description
- **Gérer ses locations** : Supprimer ou désactiver ses positions
- **Informations détaillées** : Popups avec toutes les informations utiles

## 🔧 Structure technique

### Base de données (Supabase)

```sql
-- Table locations
CREATE TABLE locations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role user_role NOT NULL, -- 'client', 'merchant', 'delivery'
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
```

### Composant React

```tsx
<MapComponent
  height="650px"
  center={[9.5511, 1.1901]} // Coordonnées de Kara
  zoom={13}
  showAddButton={true}
  filterByRole="merchant" // ou "delivery", "client", null
/>
```

## 🚀 Instructions de déploiement

### 1. Configuration Supabase

```bash
# Dans votre projet Supabase, exécutez le script SQL :
supabase/migrations/001_add_locations_table.sql
```

### 2. Variables d'environnement

```bash
# Fichier .env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-publique-anonyme
```

### 3. Installation des dépendances

```bash
# Les dépendances sont déjà dans package.json :
npm install
# ou si déjà installé, elles sont prêtes :
# - leaflet
# - react-leaflet
# - @supabase/supabase-js
# - @types/leaflet
```

### 4. Utilisation

- Allez sur `/map`
- Cliquez sur "Interactive"
- La carte s'affiche avec les données de démonstration
- Cliquez pour ajouter votre position !

## ��� Personnalisation

### Icônes des marqueurs

```tsx
const icons = {
  client: createCustomIcon("client", "#3B82F6"), // Bleu
  merchant: createCustomIcon("merchant", "#6FCF97"), // Vert Linka
  delivery: createCustomIcon("delivery", "#F2994A"), // Orange Linka
};
```

### Couleurs par type

- **Clients** : Bleu (`#3B82F6`)
- **Commerçants** : Vert LinkaMarket (`#6FCF97`)
- **Livreurs** : Orange LinkaMarket (`#F2994A`)

### Coordonnées par défaut

- **Centre** : Kara, Togo (`[9.5511, 1.1901]`)
- **Zoom** : 13 (niveau ville)

## 🔒 Sécurité

### Politiques RLS Supabase

- ✅ Tout le monde peut **voir** les locations actives
- ✅ Seuls les propriétaires peuvent **modifier/supprimer** leurs locations
- ✅ Les utilisateurs connectés peuvent **ajouter** des locations
- ✅ Soft delete avec `is_active = false`

### Validation côté client

- ✅ Nom obligatoire
- ✅ Type d'utilisateur obligatoire
- ✅ Vérification de connexion avant ajout
- ✅ Confirmation avant suppression

## 📱 Responsive Design

- ✅ **Mobile** : Interface adaptée, formulaires en modal
- ✅ **Tablette** : Mise en page optimisée
- ✅ **Desktop** : Pleine largeur avec sidebars

## 🧪 Données de test

Le script de migration inclut 8 locations de démonstration à Kara :

- 4 commerçants (boutiques, marché, tech, pharmacie)
- 2 livreurs (express et spécialisé)
- 2 points clients (zones résidentielles)

## 🔮 Évolutions possibles

### Court terme :

- [ ] Photos des locations
- [ ] Horaires d'ouverture
- [ ] Système de notation
- [ ] Chat intégré

### Moyen terme :

- [ ] Calcul d'itinéraires
- [ ] Zones de livraison
- [ ] Notifications géolocalisées
- [ ] Analytiques de position

### Long terme :

- [ ] AR/VR pour navigation
- [ ] IA pour optimisation des trajets
- [ ] Intégration IoT
- [ ] Blockchain pour la confiance

## 🆘 Support et debugging

### Erreurs communes :

1. **Leaflet CSS manquant** → Vérifier l'import `'leaflet/dist/leaflet.css'`
2. **Icônes non affichées** → Fix Leaflet par défaut inclus
3. **Erreur Supabase** → Vérifier les variables d'environnement
4. **RLS Policies** → Vérifier que l'utilisateur est connecté

### Logs utiles :

```javascript
console.log("Locations chargées:", locations);
console.log("Utilisateur connecté:", user);
console.log("Position cliquée:", selectedPosition);
```

---

🎉 **Votre carte interactive LinkaMarket est prête !**

Maintenant vos utilisateurs peuvent s'ajouter sur la carte, découvrir les commerçants et livreurs près d'eux, et créer une vraie communauté géolocalisée ! 🌍
