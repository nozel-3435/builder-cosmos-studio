# LinkaMarket – Déploiement & Ajouts ultérieurs

## 1) Préparer l’environnement (obligatoire)
- Créez un projet Supabase: https://supabase.com
- Récupérez URL et anon key (Settings > API)
- Dans l’UI Builder, ajoutez les variables d’environnement:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
- Appliquez le schéma SQL (sécurité incluse):
  - Exécutez les fichiers SQL dans supabase/ (schema.sql, linkamarket_policies.sql, migrations/*). L’ordre recommandé:
    1. supabase/schema.sql
    2. supabase/linkamarket_policies.sql
    3. supabase/migrations/*.sql
    4. supabase/full_setup.sql (si nécessaire)

## 2) Build & déploiement (Netlify conseillé)
- Build command: npm run build
- Publish directory: dist/spa
- Node 18+, npm 10+
- Variables d’environnement: mêmes que ci‑dessus côté Netlify
- Si vous utilisez l’API server (netlify/functions/api.ts), gardez netlify.toml tel quel

## 3) Comptes et rôles
- Au register, l’utilisateur choisit: client | merchant | delivery | admin
- Le rôle est stocké dans profiles.role
- Au login, on redirige selon le rôle:
  - admin -> /admin/verify
  - merchant -> /merchant
  - delivery -> /delivery
  - client/autres -> /
- Assurez-vous que RLS est actif sur profiles, products, orders, locations (voir linkamarket_policies.sql)

## 4) Données de démo
- Supprimées. L’app requiert Supabase configuré.
- Map, produits, commandes lisent/écrivent directement en base.

## 5) Paiement (à ajouter plus tard)
- Choisissez un PSP (TMoney, Flooz, PayGate, Stripe, etc.)
- Étapes:
  1. Créer un provider payments/services/payment.ts avec méthodes: createCheckout(orderId), verifyPayment(reference), webhooks
  2. Back-end: fonction serverless (Netlify) pour sécuriser les clés et webhooks
  3. Front: bouton « Payer » -> appelle createCheckout -> redirige vers page du PSP
  4. Webhook: met à jour orders.payment_status (paid/failed/refunded)
  5. Sécurité: vérification signature webhook, idempotency
- Modèles à prévoir:
  - Table payments: id, order_id, provider, reference, status, amount, currency, created_at, updated_at
  - Index sur order_id + reference

## 6) Notifications e-mail/SMS
- E-mail: utilisez Supabase Auth pour les mails de reset; pour transactionnels: Resend/Sendgrid
- Ajoutez utils/email.ts et une fonction Netlify pour masquer les clés
- SMS: Twilio/Mnotify si nécessaire (codes OTP, updates livraison)

## 7) Optimisations sécurité & UX
- Désactiver toute backdoor admin; seules policies et profiles.role doivent décider
- Mettre en place rate limiting (Netlify edge functions) pour endpoints sensibles
- CSP stricte via en-têtes Netlify si vous servez des iframes externes
- Logger les erreurs côté client avec Sentry (MCP Sentry dispo)

## 8) Observabilité et erreurs
- Recommandé: connectez [Sentry](#open-mcp-popover)
- Ajoutez un util logger et envoyez les erreurs critiques (auth, paiement, commandes)

## 9) Tests manuels post‑déploiement
- Register pour chaque rôle; vérifiez la redirection et la création du profil
- Création produit (merchant), visibilité côté client
- Commande -> statut -> livraison
- Carte: création/édition/suppression d’une location
- Vérifier 404 et routes privées

## 10) Roadmap simplifiée
- Paiements (cf. section 5)
- Recherche full‑text avancée (RPC déjà présent: search_products)
- Reviews et favoris (tables déjà présentes)
- Temps réel (supabase channel) pour commandes/livraisons
- Analytics admin: vues basées sur agrégations SQL
