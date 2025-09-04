import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LinkaMarketLogo } from "@/components/ui/logos";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: route introuvable:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-linka-green/10 via-white to-linka-orange/10 px-6 py-16">
      <div className="max-w-2xl w-full text-center bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
        <div className="flex justify-center mb-6">
          <LinkaMarketLogo size="lg" variant="icon" />
        </div>
        <h1 className="text-6xl font-extrabold text-linka-green mb-2">404</h1>
        <p className="text-xl text-gray-700 mb-6">Cette page est introuvable.</p>
        <p className="text-gray-600 mb-8">
          L’URL « {location.pathname} » n’existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-linka-green text-white font-semibold hover:bg-linka-green/90 transition-colors"
          >
            Retour à l’accueil
          </Link>
          <Link
            to="/products"
            className="px-6 py-3 rounded-xl border border-linka-green text-linka-green font-semibold hover:bg-linka-green/10 transition-colors"
          >
            Voir les produits
          </Link>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          Si le problème persiste, contactez-nous: <a href="mailto:imenanozel@gmail.com" className="text-linka-green underline">imenanozel@gmail.com</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
