import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/ui/BackButton";
import { LinkaMarketLogo } from "@/components/ui/logos";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if we have the necessary URL parameters for password reset
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    
    if (!token || type !== 'recovery') {
      setIsValidToken(false);
    }
  }, [searchParams]);

  const validatePassword = (pwd: string) => {
    const minLength = pwd.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordValidation.isValid) {
      toast.error("Le mot de passe ne respecte pas les critères requis");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(password);
      setPasswordUpdated(true);
      toast.success("Mot de passe mis à jour avec succès !");
    } catch (error) {
      const message = error instanceof Error ? error.message : 
        "Erreur lors de la mise à jour du mot de passe";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-linka-green/10 via-white to-linka-orange/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Lien invalide ou expiré
            </h2>
            
            <p className="text-gray-600 mb-6">
              Ce lien de réinitialisation n'est plus valide ou a expiré.
            </p>
            
            <div className="space-y-4">
              <Link
                to="/forgot-password"
                className="w-full inline-flex justify-center items-center px-4 py-3 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors"
              >
                Demander un nouveau lien
              </Link>
              
              <Link
                to="/login"
                className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Retour à la connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (passwordUpdated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-linka-green/10 via-white to-linka-orange/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Mot de passe mis à jour !
            </h2>
            
            <p className="text-gray-600 mb-6">
              Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
            </p>
            
            <button
              onClick={() => navigate('/login')}
              className="w-full px-4 py-3 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors"
            >
              Se connecter maintenant
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-linka-green/10 via-white to-linka-orange/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-start mb-4">
          <BackButton to="/login" />
        </div>
        
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <LinkaMarketLogo size="md" variant="full" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Nouveau mot de passe
          </h2>
          <p className="mt-2 text-gray-600">
            Cr��ez un mot de passe sécurisé pour votre compte
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nouveau mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="Votre nouveau mot de passe"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="Confirmer votre mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Critères du mot de passe :
                </h4>
                <div className="space-y-2">
                  {[
                    { key: 'minLength', text: 'Au moins 8 caractères' },
                    { key: 'hasUpperCase', text: 'Une lettre majuscule' },
                    { key: 'hasLowerCase', text: 'Une lettre minuscule' },
                    { key: 'hasNumbers', text: 'Un chiffre' },
                    { key: 'hasSpecialChar', text: 'Un caractère spécial' },
                  ].map(({ key, text }) => (
                    <div key={key} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        passwordValidation[key as keyof typeof passwordValidation] 
                          ? 'bg-green-100' 
                          : 'bg-gray-200'
                      }`}>
                        {passwordValidation[key as keyof typeof passwordValidation] && (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        passwordValidation[key as keyof typeof passwordValidation] 
                          ? 'text-green-600' 
                          : 'text-gray-500'
                      }`}>
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className={`text-sm ${
                password === confirmPassword ? 'text-green-600' : 'text-red-600'
              }`}>
                {password === confirmPassword ? 
                  '✓ Les mots de passe correspondent' : 
                  '✗ Les mots de passe ne correspondent pas'
                }
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !passwordValidation.isValid || password !== confirmPassword}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-linka-green hover:bg-linka-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linka-green disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Mise à jour...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mettre à jour le mot de passe
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous vous souvenez de votre mot de passe ?{" "}
              <Link
                to="/login"
                className="font-medium text-linka-green hover:text-linka-green/80"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
