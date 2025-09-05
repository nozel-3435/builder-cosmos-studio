# Guide de liaison Supabase (Carte + Données de démonstration)

Ce guide explique comment connecter l’application à Supabase pour utiliser la carte interactive avec de vraies données, et comment fonctionne le mode démonstration quand Supabase n’est pas encore configuré.

---

## 1) Résumé rapide (TL;DR)

- Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY (variables d’environnement)
- Exécutez les scripts SQL dans supabase/ (schema.sql, 001_add_locations_table.sql, verification_codes_table.sql, linkamarket_policies.sql, puis migrate-data.sql pour les exemples)
- La carte sortira automatiquement du mode démo et lira la table locations
- Script de vérification: `node verify-supabase.js`

---

## 2) Deux modes de fonctionnement

- Mode Démonstration (par défaut sans configuration Supabase)
  - Activé si les variables d’environnement sont manquantes/invalides
  - Source: `client/lib/supabase.ts` (const isDemoMode, demoLocationsService)
  - La carte utilise des points de Kara (Togo) intégrés

- Mode Supabase (production)
  - Activé automatiquement quand VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont valides
  - Les données proviennent de votre base Supabase (table `locations`)

---

## 3) Configuration des variables d’environnement

Définissez les deux variables suivantes côté client (Vite):

- VITE_SUPABASE_URL = URL de votre projet Supabase
- VITE_SUPABASE_ANON_KEY = Clé anonyme publique

Fichiers concernés:
- `client/lib/supabase.ts` (détermine isDemoMode, crée le client Supabase)
- `verify-supabase.js` (script d’aide pour vérifier la présence des variables)

Local (option simple):
- Créez/complétez le fichier `.env` à la racine:

```
VITE_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

Astuce: exécutez `node verify-supabase.js` pour confirmer que l’app sortira du mode démo.

---

## 4) Mise en place de la base de données Supabase

Ouvrez l’éditeur SQL de votre projet Supabase et exécutez, dans cet ordre:

Option A (recommandé) — Fichier unique:

1. `supabase/full_setup.sql`
   - Tout-en-un: schéma, fonctions, triggers, RLS, `verification_codes`, `locations`, données de démonstration de Kara et index. Exécutez ce seul fichier.

Option B — Fichiers séparés (ancien mode):
1. `supabase/schema.sql`
2. `supabase/migrations/001_add_locations_table.sql`
3. `supabase/verification_codes_table.sql`
4. `supabase/linkamarket_policies.sql`
5. `supabase/migrate-data.sql`

> Important: assurez-vous que l’extension `uuid-ossp` est activée et que le schéma `auth` existe (créé automatiquement par Supabase). Le trigger `on_auth_user_created` crée un profil dans `profiles` pour chaque nouvel utilisateur.

---

## 5) Composants et fichiers qui utilisent la carte/données

- Carte interactive principale: `client/components/MapComponent.tsx`
  - Utilise React Leaflet (Leaflet) et lit:
    - En mode Supabase: `supabase.from('locations').select('*').eq('is_active', true)`
    - En mode Démo: `demoLocationsService.select()`
  - Ajout/édition/suppression logique (demo simulée, Supabase réelle)

- Pages d’affichage:
  - `client/pages/Index.tsx`: section “Carte Interactive de Kara” (lazy load du composant)
  - `client/pages/Map.tsx`: page carte complète avec filtres rapides (rôle: merchant/delivery/client)

- Client Supabase + Démo:
  - `client/lib/supabase.ts`: définit `supabase`, `isDemoMode`, `demoLocationsService`, et les types `Database`

---

## 6) Tester rapidement

1. Variables OK ? `node verify-supabase.js`
2. Lancer l’app, ouvrir la page “Carte”
3. En mode Supabase: les marqueurs viennent de la table `locations`
4. Cliquez sur la carte pour ajouter un point (si connecté). En démo, l’action est simulée
5. Utilisez les filtres (Commerçants/Livreurs/Clients) pour vérifier les requêtes

---

## 7) Dépannage

- Erreur “Invalid URL” côté Supabase
  - Vérifiez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
  - `client/lib/supabase.ts` bascule en mode démo si les variables sont manquantes

- “relation \"locations\" does not exist”
  - Exécutez `supabase/schema.sql` puis `supabase/migrations/001_add_locations_table.sql`

- Icônes Leaflet qui ne s’affichent pas
  - Les correctifs sont déjà appliqués dans `client/components/MapComponent.tsx` et `client/components/maps/KaraMap.tsx`

- Aucune donnée sur la carte en mode Supabase
  - Exécutez `supabase/migrate-data.sql` pour insérer des exemples de Kara
  - Assurez-vous que `is_active = true` sur vos lignes

---

## 8) Sécurité et bonnes pratiques

- Ne commitez jamais vos vraies clés (même la clé anonyme) dans le code
- Conservez les variables dans l’environnement d’exécution (fichier .env local ou variables de la plateforme)
- RLS: gardez les politiques actives; les insert/update doivent respecter `user_id = auth.uid()` quand requis

---

## 9) Références rapides

- Carte: `client/components/MapComponent.tsx`, `client/pages/Map.tsx`, `client/pages/Index.tsx`
- Client/démo Supabase: `client/lib/supabase.ts`
- Scripts SQL: `supabase/full_setup.sql` (tout-en-un) — ou, alternativement: `supabase/schema.sql`, `supabase/migrations/001_add_locations_table.sql`, `supabase/verification_codes_table.sql`, `supabase/linkamarket_policies.sql`, `supabase/migrate-data.sql`
- Vérification: `verify-supabase.js`

---

## 10) (Option) Étendre les données de démo

- Modifiez/ajoutez des points dans `client/lib/supabase.ts` (objet `demoLocationsService`)
- En mode démo, les opérations d’ajout/édition/suppression sont simulées (console + alertes)

Bon démarrage ! Une fois Supabase configuré, la carte basculera automatiquement en mode production et lira les données réelles de votre base.
