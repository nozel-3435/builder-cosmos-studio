import React, { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthErrorBoundary from "./AuthErrorBoundary";

interface SafeAuthProviderProps {
  children: ReactNode;
}

const SafeAuthProvider: React.FC<SafeAuthProviderProps> = ({ children }) => {
  return (
    <AuthErrorBoundary>
      <AuthProvider>{children}</AuthProvider>
    </AuthErrorBoundary>
  );
};

export default SafeAuthProvider;
