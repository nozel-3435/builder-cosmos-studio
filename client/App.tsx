import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/navigation/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create placeholder pages for routes
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import Products from "./pages/client/Products";
import Cart from "./pages/client/Cart";
import MerchantDashboard from "./pages/merchant/Dashboard";
import DeliveryDashboard from "./pages/delivery/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-linka-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />

                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />

                {/* Client routes */}
                <Route path="/products" element={<Products />} />
                <Route
                  path="/stores"
                  element={
                    <div className="p-8 text-center">
                      Boutiques - À implémenter
                    </div>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <div className="p-8 text-center">
                      Favoris - À implémenter
                    </div>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <div className="p-8 text-center">
                      Commandes - À implémenter
                    </div>
                  }
                />
                <Route path="/cart" element={<Cart />} />

                {/* Merchant routes */}
                <Route path="/merchant" element={<MerchantDashboard />} />
                <Route
                  path="/merchant/products"
                  element={
                    <div className="p-8 text-center">
                      Gestion Produits - À implémenter
                    </div>
                  }
                />
                <Route
                  path="/merchant/orders"
                  element={
                    <div className="p-8 text-center">
                      Commandes Reçues - À implémenter
                    </div>
                  }
                />
                <Route
                  path="/merchant/store"
                  element={
                    <div className="p-8 text-center">
                      Ma Boutique - À implémenter
                    </div>
                  }
                />

                {/* Delivery routes */}
                <Route path="/delivery" element={<DeliveryDashboard />} />
                <Route
                  path="/delivery/active"
                  element={
                    <div className="p-8 text-center">
                      Livraisons Actives - À implémenter
                    </div>
                  }
                />
                <Route
                  path="/delivery/history"
                  element={
                    <div className="p-8 text-center">
                      Historique Livraisons - À implémenter
                    </div>
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
