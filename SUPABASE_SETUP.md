# 🚀 Guide d'Installation Supabase pour LinkaMarket

Ce guide vous aide à configurer Supabase pour votre application LinkaMarket.

## 📋 Prérequis

- Compte Supabase (gratuit sur [supabase.com](https://supabase.com))
- Node.js et npm installés
- Application LinkaMarket clonée

## 🔧 Configuration Supabase

### 1. Créer un Projet Supabase

1. Connectez-vous sur [supabase.com](https://supabase.com)
2. Cliquez sur "New Project"
3. Choisissez votre organisation
4. Configurez votre projet :
   - **Name**: `linkamarket`
   - **Database Password**: Créez un mot de passe sécurisé
   - **Region**: Choisissez la région la plus proche (ex: Europe West pour l'Afrique)
5. Cliquez sur "Create new project"

### 2. Récupérer les Clés API

1. Dans votre projet Supabase, allez dans **Settings → API**
2. Copiez :
   - **URL**: `https://votre-projet.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Configuration des Variables d'Environnement

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez vos clés Supabase :

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**: Remplacez les valeurs par vos vraies clés Supabase

## 🗄️ Configuration de la Base de Données

### 1. Créer le Schéma

1. Dans Supabase, allez dans **SQL Editor**
2. Copiez-collez le contenu du fichier `supabase/schema.sql`
3. Cliquez sur "Run" pour exécuter le script

Cette opération va créer :

- ✅ Toutes les tables (profiles, products, orders, etc.)
- ✅ Les types ENUM
- ✅ Les index pour les performances
- ✅ Les politiques de sécurité RLS
- ✅ Les triggers et fonctions
- ✅ Les vues optimisées
- ✅ Les catégories de base

### 2. Migrer les Données de Démonstration

1. Dans **SQL Editor**, créez un nouvel onglet
2. Copiez-collez le contenu du fichier `supabase/migrate-data.sql`
3. Cliquez sur "Run"

Ceci ajoute :

- 👥 Commerçants de démonstration
- 🚚 Livreurs de démonstration
- 👤 Clients de démonstration
- 📦 Produits de démonstration
- ⭐ Avis et favoris
- 🛒 Paniers de test

### 3. Configurer l'Authentification

1. Allez dans **Authentication → Settings**
2. Dans **Site URL**, ajoutez : `http://localhost:8080`
3. Dans **Redirect URLs**, ajoutez : `http://localhost:8080/auth/callback`
4. **Disable email confirmations** pour le développement (optionnel)

## 🔐 Configuration RLS (Row Level Security)

Les politiques de sécurité sont déjà configurées dans le schéma :

- ✅ **Profiles** : Les utilisateurs voient leur profil + profils commerçants publics
- ✅ **Products** : Tous peuvent voir, seuls les commerçants gèrent leurs produits
- ✅ **Orders** : Clients voient leurs commandes, commerçants voient celles de leurs produits
- ✅ **Deliveries** : Livreurs voient leurs livraisons, clients voient les leurs
- ✅ **Cart/Favorites** : Chaque utilisateur gère ses propres données

## 🧪 Test de la Configuration

### 1. Vérifier la Connexion

```bash
npm run dev
```

L'application devrait démarrer sans erreurs de connexion Supabase.

### 2. Test d'Inscription

1. Allez sur `/register`
2. Créez un compte test
3. Vérifiez dans **Authentication → Users** que l'utilisateur apparaît
4. Vérifiez dans **Table Editor → profiles** que le profil est créé

### 3. Test des Données

1. Allez sur `/products`
2. Vous devriez voir les produits de démonstration
3. Les catégories et filtres devraient fonctionner

## 📊 Monitoring et Logs

### Activer les Logs

1. **Database → Logs** : Surveiller les requêtes
2. **API → Logs** : Voir les appels API
3. **Auth → Logs** : Suivre l'authentification

### Métriques Importantes

- **Database connections** : Surveiller l'utilisation
- **API calls** : Vérifier les limites
- **Storage usage** : Pour les images futures

## 🚀 Mise en Production

### 1. Domaine de Production

1. Dans **Settings → API**, ajoutez votre domaine de production
2. Mettez à jour les **Redirect URLs** avec vos vraies URL
3. Activez **email confirmations**

### 2. Variables d'Environnement

```bash
# Production
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-production
```

### 3. Optimisations

- **Enable Connection Pooling** pour plus de performance
- **Set up Database backups**
- **Configure Webhooks** pour les notifications

## 🔧 Fonctionnalités Avancées

### 1. Upload d'Images (Optionnel)

Pour les images de produits :

```sql
-- Créer un bucket pour les images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Politique pour uploader des images
CREATE POLICY "Anyone can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images');
```

### 2. Notifications en Temps Réel

Supabase inclut des **Realtime subscriptions** pour :

- Nouvelles commandes (commerçants)
- Statut de livraison (clients)
- Messages de chat (futur)

### 3. Edge Functions (Futur)

Pour les paiements TMoney/Flooz, vous pourrez utiliser les **Edge Functions** Supabase.

## 🆘 Dépannage

### Erreur "Invalid API Key"

- Vérifiez vos variables d'environnement
- Redémarrez le serveur de développement

### Erreur "Row Level Security"

- Vérifiez que les politiques RLS sont bien créées
- Testez avec un utilisateur authentifié

### Erreur de Connexion Database

- Vérifiez que le schéma a été exécuté correctement
- Regardez les logs dans Supabase Dashboard

## 📞 Support

- **Documentation** : [docs.supabase.com](https://docs.supabase.com)
- **Discord** : [discord.supabase.com](https://discord.supabase.com)
- **GitHub Issues** : Pour les bugs LinkaMarket

---

✅ **Votre base de données Supabase est maintenant prête pour LinkaMarket !**

L'application utilise maintenant une vraie base de données PostgreSQL avec :

- 🔐 Authentification sécurisée
- 📊 Données persistantes
- 🚀 API automatique
- 📱 Temps réel
- 🔒 Sécurité RLS

Vous pouvez maintenant développer et déployer LinkaMarket avec une infrastructure robuste !
