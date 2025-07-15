import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Store,
  Truck,
  Edit3,
  Settings,
  Shield,
  Bell,
  Calendar,
  Star,
  Package,
  TrendingUp,
  Award,
  Clock,
  Eye,
  Heart,
  ShoppingCart,
  Target,
  BarChart3,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600">
            Vous devez être connecté pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-lg text-gray-600 capitalize">
                {user.role === "client"
                  ? "Client"
                  : user.role === "merchant"
                    ? "Commerçant"
                    : "Livreur"}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Informations personnelles
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {user.role === "merchant" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Informations commerciales
                </h2>
                <div className="space-y-4">
                  {user.businessName && (
                    <div className="flex items-center space-x-3">
                      <Store className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{user.businessName}</span>
                    </div>
                  )}
                  {user.businessAddress && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">
                        {user.businessAddress}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {user.role === "delivery" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Informations de livraison
                </h2>
                <div className="space-y-4">
                  {user.vehicleType && (
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 capitalize">
                        {user.vehicleType}
                      </span>
                    </div>
                  )}
                  {user.deliveryZone && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{user.deliveryZone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              Page de profil complète - À implémenter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
