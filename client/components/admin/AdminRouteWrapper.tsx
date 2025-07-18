import React, { useState, useEffect } from "react";
import AdminLogin from "@/components/auth/AdminLogin";

interface AdminRouteWrapperProps {
  children: React.ReactNode;
}

const AdminRouteWrapper: React.FC<AdminRouteWrapperProps> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = () => {
      const isAuthenticated = sessionStorage.getItem("admin_authenticated");
      const timestamp = sessionStorage.getItem("admin_timestamp");

      if (isAuthenticated && timestamp) {
        // Check if session is still valid (24 hours)
        const sessionAge = Date.now() - parseInt(timestamp);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours

        if (sessionAge < maxAge) {
          setIsAdminAuthenticated(true);
        } else {
          // Clear expired session
          sessionStorage.removeItem("admin_authenticated");
          sessionStorage.removeItem("admin_timestamp");
          setIsAdminAuthenticated(false);
        }
      } else {
        setIsAdminAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAdminAuth();
  }, []);

  const handleAdminAuthenticated = () => {
    setIsAdminAuthenticated(true);
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
