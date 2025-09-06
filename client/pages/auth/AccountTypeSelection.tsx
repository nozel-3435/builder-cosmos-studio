import React from "react";
import { Link } from "react-router-dom";
import BackButton from "@/components/ui/BackButton";
import { User, Store, Truck } from "lucide-react";

const AccountTypeSelection: React.FC = () => {
  const options = [
    {
      type: "client",
      title: "Client",
      description: "Acheter des produits et suivre vos commandes.",
      icon: User,
      color: "bg-blue-100 text-blue-600",
      to: "/register/client",
    },
    {
      type: "merchant",
      title: "Commerçant",
      description: "Vendre vos produits et gérer votre boutique.",
      icon: Store,
      color: "bg-linka-green/10 text-linka-green",
      to: "/register/merchant",
    },
    {
      type: "delivery",
      title: "Livreur",
      description: "Livrer des commandes et gagner de l'argent.",
      icon: Truck,
      color: "bg-linka-orange/10 text-linka-orange",
      to: "/register/delivery",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <BackButton to="/login" label="Retour à la connexion" />
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Choisissez votre type de compte</h1>
          <p className="text-gray-600 mb-6 text-center">Sélectionnez le profil qui correspond à votre usage</p>
          <div className="grid gap-4">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <Link key={opt.type} to={opt.to} className="p-6 border-2 rounded-xl hover:border-linka-green transition-all">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${opt.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{opt.title}</h3>
                      <p className="text-sm text-gray-600">{opt.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;
