import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class AuthErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error for debugging
    console.error("AuthErrorBoundary caught an error:", error, errorInfo);

    // Update state with error information
    this.setState({
      error,
      errorInfo,
    });

    // Check if it's a context-related error
    if (
      error.message.includes("render2 is not a function") ||
      error.message.includes("AuthContext") ||
      error.message.includes("useAuth")
    ) {
      console.error(
        "Authentication context error detected. This may be due to:",
        {
          possibleCauses: [
            "Circular dependency in context",
            "Context provider not properly wrapping components",
            "Multiple context definitions",
            "Component rendering before context is ready",
          ],
          error: error.message,
          stack: error.stack,
        },
      );
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Erreur d'Authentification
            </h2>

            <p className="text-gray-600 mb-6">
              Une erreur s'est produite avec le système d'authentification. Cela
              peut être temporaire.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-linka-green hover:bg-linka-green/90 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </button>

              <button
                onClick={this.handleRefresh}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Recharger la page
              </button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer">
                  Détails de l'erreur (développement)
                </summary>
                <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                  {this.state.error.message}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AuthErrorBoundary;
