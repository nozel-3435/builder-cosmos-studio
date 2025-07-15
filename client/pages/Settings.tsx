import React, { useState } from "react";
import {
  Settings,
  Globe,
  Palette,
  Bell,
  Shield,
  HelpCircle,
  Volume2,
  Moon,
  Sun,
  Monitor,
  Languages,
  Check,
  ChevronRight,
} from "lucide-react";

const Settings = () => {
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    orders: true,
    promotions: true,
    security: true,
  });
  const [sound, setSound] = useState(true);

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  const themes = [
    {
      id: "light",
      name: "Clair",
      icon: Sun,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "dark",
      name: "Sombre",
      icon: Moon,
      color: "bg-gray-800 text-gray-300",
    },
    {
      id: "system",
      name: "Système",
      icon: Monitor,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  const handleNotificationToggle = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
              <p className="text-gray-600">
                Gérez vos préférences et paramètres
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Language Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Langue</h2>
            </div>

            <div className="space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    language === lang.code
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium text-gray-900">
                        {lang.name}
                      </span>
                    </div>
                    {language === lang.code && (
                      <Check className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Palette className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Thème</h2>
            </div>

            <div className="space-y-3">
              {themes.map((themeOption) => {
                const IconComponent = themeOption.icon;
                return (
                  <div
                    key={themeOption.id}
                    onClick={() => setTheme(themeOption.id)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      theme === themeOption.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${themeOption.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {themeOption.name}
                        </span>
                      </div>
                      {theme === themeOption.id && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sound Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Volume2 className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Son</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Sons d'interface</span>
                <button
                  onClick={() => setSound(!sound)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    sound ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      sound ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <Bell className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                Méthodes de notification
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">
                      Notifications push
                    </span>
                    <p className="text-sm text-gray-500">
                      Notifications en temps réel
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle("push")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.push ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.push ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Email</span>
                    <p className="text-sm text-gray-500">
                      Notifications par email
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle("email")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.email ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.email ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">SMS</span>
                    <p className="text-sm text-gray-500">
                      Notifications par SMS
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle("sms")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.sms ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.sms ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                Types de notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Commandes</span>
                    <p className="text-sm text-gray-500">
                      Mises à jour des commandes
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle("orders")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.orders ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.orders ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">
                      Promotions
                    </span>
                    <p className="text-sm text-gray-500">
                      Offres et réductions
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle("promotions")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.promotions ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.promotions
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Sécurité</span>
                    <p className="text-sm text-gray-500">
                      Connexions et sécurité
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle("security")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.security ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.security
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Privacy & Security */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Shield className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Confidentialité & Sécurité
              </h2>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">Modifier le mot de passe</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">
                  Authentification à deux facteurs
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">Données personnelles</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-teal-100 rounded-lg">
                <HelpCircle className="h-5 w-5 text-teal-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Aide & Support
              </h2>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">Centre d'aide</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">Contacter le support</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700">À propos de LinkaMarket</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Sauvegarder les paramètres
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
