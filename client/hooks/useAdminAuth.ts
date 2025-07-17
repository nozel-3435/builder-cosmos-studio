import { useState, useEffect } from "react";

export const useAdminAuth = () => {
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

  const loginAdmin = (username: string, password: string): boolean => {
    if (username === "NOZIMA" && password === "TOUT2000@") {
      sessionStorage.setItem("admin_authenticated", "true");
      sessionStorage.setItem("admin_timestamp", Date.now().toString());
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_timestamp");
    setIsAdminAuthenticated(false);
  };

  return {
    isAdminAuthenticated,
    isLoading,
    loginAdmin,
    logoutAdmin,
  };
};
