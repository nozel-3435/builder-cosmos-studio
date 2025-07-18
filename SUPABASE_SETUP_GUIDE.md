# 🚀 Guide de Configuration Supabase pour LinkaMarket

## 📋 Étapes de configuration

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Connectez-vous ou créez un compte
4. Cliquez sur "New Project"
5. Remplissez les informations :
   - **Name** : `LinkaMarket`
   - **Database Password** : Choisissez un mot de passe fort
   - **Region** : Choisissez la région la plus proche (Europe West par exemple)
6. Cliquez sur "Create new project"
7. Attendez quelques minutes que le projet soit créé

### 2. Récupérer les clés d'API

1. Dans votre projet Supabase, allez dans **Settings** (icône d'engrenage)
2. Cliquez sur **API** dans le menu de gauche
3. Vous verrez deux informations importantes :
   - **Project URL** : `https://votre-projet.supabase.co`
   - **anon public** : Une longue clé qui commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Configurer les variables d'environnement

1. Dans votre projet LinkaMarket, ouvrez le fichier `.env`
2. Remplacez les valeurs :

```env
# Remplacez par votre vraie URL
VITE_SUPABASE_URL=https://votre-projet.supabase.co

# Remplacez par votre vraie clé anon public
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Exécuter le script SQL

1. Dans Supabase, allez dans **SQL Editor** (icône de base de données)
2. Cliquez sur "New query"
3. Copiez tout le contenu du fichier `supabase/migrations/001_add_locations_table.sql`
4. Collez-le dans l'éditeur SQL
5. Cliquez sur "Run" (bouton play ▶️)
6. Vous devriez voir "Success. No rows returned" ✅

### 5. Vérifier l'installation

1. Allez dans **Table Editor** dans Supabase
2. Vous devriez voir une nouvelle table `locations`
3. Cliquez dessus pour voir les 12 locations de démonstration pour Kara

### 6. Tester l'application

1. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```
2. L'indicateur "Mode Démonstration" devrait disparaître
3. Allez sur `/map` → "Interactive"
4. Vous devriez voir les vraies données de Kara sur la carte
5. Testez l'ajout d'une nouvelle location en cliquant sur la carte

## ✅ Résultat attendu

- ✅ 12 locations réelles à Kara affichées sur la carte
- ✅ Possibilité d'ajouter/modifier/supprimer des locations
- ✅ Carte interactive fonctionnelle sur la page d'accueil
- ✅ Données sauvegardées en temps réel dans Supabase
- ✅ Pas d'indicateur "Mode Démonstration"

## 🆘 En cas de problème

### Erreur "Invalid URL"

- Vérifiez que `VITE_SUPABASE_URL` est bien votre vraie URL Supabase
- Redémarrez le serveur après modification du .env

### Erreur "Invalid API key"

- Vérifiez que `VITE_SUPABASE_ANON_KEY` est la bonne clé publique
- Attention à ne pas prendre la clé privée (`service_role`)

### Erreur SQL

- Vérifiez que vous avez copié tout le script SQL
- Exécutez le script par petits blocs si nécessaire

### Toujours en mode démo

- Vérifiez le fichier `.env` dans la racine du projet
- Redémarrez complètement le serveur de développement

## 🎯 Prochaines étapes

Une fois Supabase configuré, vous pourrez :

- Inviter des utilisateurs réels à tester la carte
- Ajouter d'authentification Supabase
- Configurer les politiques de sécurité avancées
- Ajouter des analytics sur l'utilisation de la carte

---

💡 **Astuce** : Gardez vos clés Supabase privées et ne les partagez jamais publiquement !
