import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LinkaMarketLogo } from "@/components/ui/logos";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Store,
  Truck,
  Package,
  BarChart3,
  MapPin,
} from "lucide-react";

export const Header = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const getNavigationItems = () => {
    if (!user) {
      return [
        { href: "/", label: t("nav.home"), icon: null },
        { href: "/products", label: t("nav.products"), icon: null },
        { href: "/stores", label: t("nav.stores"), icon: null },
      ];
    }

    switch (user.role) {
      case "client":
        return [
          { href: "/products", label: t("nav.products"), icon: Search },
          { href: "/stores", label: t("nav.stores"), icon: Store },
          { href: "/favorites", label: t("nav.favorites"), icon: Heart },
          { href: "/orders", label: t("nav.orders"), icon: Package },
          { href: "/", label: t("nav.home"), icon: null },
        ];
      case "merchant":
        return [
          { href: "/merchant/products", label: t("nav.myProducts"), icon: Package },
          { href: "/merchant/orders", label: t("nav.orders"), icon: ShoppingCart },
          { href: "/merchant/store", label: t("nav.myStore"), icon: Store },
          { href: "/merchant", label: t("nav.dashboard"), icon: BarChart3 },
        ];
      case "delivery":
        return [
          {
            href: "/delivery/active",
            label: t("nav.activeDeliveries"),
            icon: MapPin,
          },
          { href: "/map", label: t("map.seeFullMap"), icon: MapPin },
          { href: "/delivery", label: t("nav.deliveryDashboard"), icon: Truck },
          { href: "/delivery/history", label: t("nav.history"), icon: Package },
        ];
      case "admin":
        return [
          { href: "/admin", label: t("nav.admin"), icon: BarChart3 },
          { href: "/admin/users", label: t("nav.users"), icon: User },
          { href: "/admin/products", label: t("nav.products"), icon: Package },
          { href: "/admin/orders", label: t("nav.orders"), icon: ShoppingCart },
          { href: "/admin/analytics", label: t("nav.analytics"), icon: BarChart3 },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <LinkaMarketLogo size="lg" variant="full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "text-linka-green bg-linka-green/10"
                          : "text-gray-700 hover:text-linka-green hover:bg-gray-50"
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top">{item.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </nav>

          {/* Right side - Cart, Profile, Login */}
          <div className="flex items-center space-x-4">
            {/* Cart (only for clients) */}
            {user?.role === "client" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/cart"
                    className="relative p-2 text-gray-600 hover:text-linka-green transition-colors"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-linka-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">Voir mon panier</TooltipContent>
              </Tooltip>
            )}

            {/* User Profile or Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role === "client"
                          ? t("roles.client")
                          : user.role === "merchant"
                            ? t("roles.merchant")
                            : user.role === "delivery"
                              ? t("roles.delivery")
                              : t("roles.admin")}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{t("nav.profile")}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t("nav.logout")}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-linka-green"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="bg-linka-green text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-linka-green/90 transition-colors"
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-linka-green bg-linka-green/10"
                        : "text-gray-700 hover:text-linka-green hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
