import React from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminLogin from "@/components/auth/AdminLogin";

interface AdminRouteWrapperProps {
  children: React.ReactNode;
}

const AdminRouteWrapper: React.FC<AdminRouteWrapperProps> = ({ children }) => {
  const { isAdminAuthenticated, isLoading, loginAdmin } = useAdminAuth();

  const handleAdminAuthenticated = () => {
    // La fonction loginAdmin est déjà appelée dans AdminLogin
    // On force juste un re-render en modifiant le sessionStorage
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-linka-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <AdminLogin onAuthenticated={handleAdminAuthenticated} />;
  }

  return <>{children}</>;
};

export default AdminRouteWrapper;
