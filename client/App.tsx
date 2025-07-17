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
import Favorites from "./pages/client/Favorites";
import Orders from "./pages/client/Orders";
import MerchantDashboard from "./pages/merchant/Dashboard";
import AddProduct from "./pages/merchant/AddProduct";
import Inventory from "./pages/merchant/Inventory";
import MyStore from "./pages/merchant/MyStore";
import DeliveryDashboard from "./pages/delivery/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import Settings from "./pages/Settings";
import Map from "./pages/Map";
import Stores from "./pages/Stores";
import ActiveDeliveries from "./pages/delivery/ActiveDeliveries";
import DeliveryHistory from "./pages/delivery/DeliveryHistory";
import Feedback from "./pages/Feedback";
import LandingPage from "./pages/LandingPage";
import AnimatedBackground from "./components/animations/AnimatedBackground";
import PageTransition from "./components/animations/PageTransition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-linka-gray-50 relative">
            <AnimatedBackground theme="commerce" intensity="subtle" />
            <Header />
            <main className="relative z-10">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/landing" element={<LandingPage />} />

                  {/* Auth routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/map" element={<Map />} />
                  <Route path="/feedback" element={<Feedback />} />

                  {/* Client routes */}
                  <Route path="/products" element={<Products />} />
                  <Route path="/stores" element={<Stores />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/cart" element={<Cart />} />

                  {/* Merchant routes */}
                  <Route path="/merchant" element={<MerchantDashboard />} />
                  <Route
                    path="/merchant/add-product"
                    element={<AddProduct />}
                  />
                  <Route path="/merchant/products" element={<Inventory />} />
                  <Route path="/merchant/store" element={<MyStore />} />
                  <Route
                    path="/merchant/orders"
                    element={
                      <div className="p-8 text-center">
                        Commandes Reçues - À implémenter
                      </div>
                    }
                  />

                  {/* Delivery routes */}
                  <Route path="/delivery" element={<DeliveryDashboard />} />
                  <Route
                    path="/delivery/active"
                    element={<ActiveDeliveries />}
                  />
                  <Route
                    path="/delivery/history"
                    element={<DeliveryHistory />}
                  />

                  {/* Admin routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route
                    path="/admin/products"
                    element={
                      <div className="p-8 text-center">
                        Modération Produits - À implémenter
                      </div>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <div className="p-8 text-center">
                        Suivi Commandes Admin - À implémenter
                      </div>
                    }
                  />
                  <Route
                    path="/admin/analytics"
                    element={
                      <div className="p-8 text-center">
                        Analytics Avancées - À implémenter
                      </div>
                    }
                  />

                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </main>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
