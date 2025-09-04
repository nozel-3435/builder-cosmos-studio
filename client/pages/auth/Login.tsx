import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { LinkaMarketLogo } from "@/components/ui/logos";
import { toast } from "sonner";
import BackButton from "@/components/ui/BackButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (trimmed !== "NOZIMA") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        toast.error("Veuillez saisir une adresse e-mail valide.");
        return;
      }
    }

    setIsLoading(true);
    try {
      await login(trimmed, password);
      toast.success("Connexion réussie!");

      const isAdmin = sessionStorage.getItem("admin_authenticated") === "true";
      if (isAdmin) {
        const answer = window.prompt("Que veux-tu ?");
        if (answer && answer.trim().toLowerCase() === "theworld") {
          sessionStorage.setItem("admin_verified", "true");
          toast.success("Connexion administrateur réussie!");
          navigate("/admin");
        } else {
          sessionStorage.removeItem("admin_authenticated");
          sessionStorage.removeItem("admin_verified");
          toast.error("Vérification secondaire échouée.");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la connexion",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { email: "client@demo.com", role: "Client", color: "bg-blue-500" },
    { email: "merchant@demo.com", role: "Commerçant", color: "bg-linka-green" },
    { email: "delivery@demo.com", role: "Livreur", color: "bg-linka-orange" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-linka-green/10 via-white to-linka-orange/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-start mb-4">
          <BackButton to="/" />
        </div>
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <LinkaMarketLogo size="md" variant="full" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Connectez-vous à votre compte
          </h2>
          <p className="mt-2 text-gray-600">
            Accédez à votre espace LinkaMarket
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form noValidate className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-linka-green focus:ring-linka-green border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-linka-green hover:text-linka-green/80"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-linka-green hover:bg-linka-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linka-green disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                "Connexion..."
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Comptes de démonstration
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword("demo123");
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {account.role}
                  </span>
                  <div
                    className={`w-3 h-3 rounded-full ${account.color}`}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="font-medium text-linka-green hover:text-linka-green/80"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
