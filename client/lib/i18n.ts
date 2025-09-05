import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang =
  (typeof window !== "undefined" &&
    (localStorage.getItem("linka_language") ||
      (JSON.parse(localStorage.getItem("linka_settings") || "{}") as any)
        .language)) || "fr";

const resources = {
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        products: "Produits",
        stores: "Boutiques",
        favorites: "Favoris",
        orders: "Commandes",
        dashboard: "Tableau de bord",
        myProducts: "Mes produits",
        myStore: "Ma boutique",
        deliveryDashboard: "Tableau de bord",
        myDeliveries: "Mes livraisons",
        activeDeliveries: "Livraisons actives",
        history: "Historique",
        admin: "Administration",
        users: "Utilisateurs",
        analytics: "Analytics",
        login: "Connexion",
        register: "S'inscrire",
        profile: "Mon profil",
        logout: "Déconnexion",
        about: "À propos",
        contact: "Contact",
      },
      roles: {
        client: "Client",
        merchant: "Commerçant",
        delivery: "Livreur",
        admin: "Administrateur",
      },
      home: {
        heroTitlePrefix: "Bienvenue sur ",
        heroSubtitle:
          "La plateforme qui connecte clients, commerçants et livreurs pour une expérience d'achat moderne et fluide",
        ctaStart: "Commencer maintenant",
        ctaExplore: "Explorer les produits",
      },
      map: {
        discoverTitle: "Découvrez votre quartier",
        discoverSubtitle:
          "Explorez les commerçants, livreurs et services disponibles à Kara. Cliquez sur la carte pour ajouter votre position et connecter-vous avec votre communauté locale.",
        bannerTitle: "Carte Interactive de Kara",
        bannerSubtitle: "Connectez-vous avec votre communauté locale",
        seeFullMap: "Voir la carte complète",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        products: "Products",
        stores: "Stores",
        favorites: "Favorites",
        orders: "Orders",
        dashboard: "Dashboard",
        myProducts: "My products",
        myStore: "My store",
        deliveryDashboard: "Dashboard",
        myDeliveries: "My deliveries",
        activeDeliveries: "Active deliveries",
        history: "History",
        admin: "Administration",
        users: "Users",
        analytics: "Analytics",
        login: "Sign in",
        register: "Sign up",
        profile: "My profile",
        logout: "Logout",
        about: "About",
        contact: "Contact",
      },
      roles: {
        client: "Customer",
        merchant: "Merchant",
        delivery: "Courier",
        admin: "Administrator",
      },
      home: {
        heroTitlePrefix: "Welcome to ",
        heroSubtitle:
          "The platform that connects customers, merchants and couriers for a modern, seamless shopping experience",
        ctaStart: "Get started",
        ctaExplore: "Browse products",
      },
      map: {
        discoverTitle: "Discover your neighborhood",
        discoverSubtitle:
          "Explore merchants, couriers and services available in Kara. Click the map to add your position and connect with your local community.",
        bannerTitle: "Kara Interactive Map",
        bannerSubtitle: "Connect with your local community",
        seeFullMap: "See full map",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
    compatibilityJSON: "v4",
  });

export default i18n;
