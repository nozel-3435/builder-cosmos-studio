import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/navigation/Header";
import ErrorBoundary from "@/components/ErrorBoundary";
import AuthErrorBoundary from "@/components/AuthErrorBoundary";
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
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminAnalytics from "./pages/admin/Analytics";
import Settings from "./pages/Settings";
import Map from "./pages/Map";
import Stores from "./pages/Stores";
import ActiveDeliveries from "./pages/delivery/ActiveDeliveries";
import DeliveryHistory from "./pages/delivery/DeliveryHistory";
import Feedback from "./pages/Feedback";
import LandingPage from "./pages/LandingPage";
import EditableProfile from "./pages/EditableProfile";
import MinimalPageTransition from "./components/animations/MinimalPageTransition";
import StorytellingLayout from "./components/animations/StorytellingLayout";
import FloatingSettings from "./components/ui/FloatingSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <AuthErrorBoundary>
            <AuthProvider>
              <div className="min-h-screen bg-background relative">
                <Header />
                <main className="relative z-10">
                  <ErrorBoundary>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/landing" element={<LandingPage />} />

                      {/* Auth routes */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route
                        path="/editable-profile"
                        element={<EditableProfile />}
                      />
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
                      <Route
                        path="/merchant/products"
                        element={<Inventory />}
                      />
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
                        element={<AdminProducts />}
                      />
                      <Route path="/admin/orders" element={<AdminOrders />} />
                      <Route
                        path="/admin/analytics"
                        element={<AdminAnalytics />}
                      />

                      {/* Catch-all route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ErrorBoundary>
                </main>
                <FloatingSettings />
              </div>
            </AuthProvider>
          </AuthErrorBoundary>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Ensure single root creation for React 18
const rootElement = document.getElementById("root");
if (rootElement) {
  // Check if already has React root
  if (!rootElement.hasAttribute("data-react-root")) {
    rootElement.setAttribute("data-react-root", "true");
    const root = createRoot(rootElement);
    root.render(<App />);
  }
}
