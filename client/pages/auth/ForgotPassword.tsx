import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/ui/BackButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Veuillez entrer votre adresse email");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email);
      setEmailSent(true);
      toast.success("Email de réinitialisation envoyé !");
    } catch (error) {
      const message = error instanceof Error ? error.message : 
        "Erreur lors de l'envoi de l'email de réinitialisation";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-linka-green/10 via-white to-linka-orange/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-start mb-4">
            <BackButton to="/login" />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email envoyé !
            </h2>
            
            <p className="text-gray-600 mb-6">
              Nous avons envoyé un lien de réinitialisation à
            </p>
            
            <p className="font-medium text-linka-green mb-6">
              {email}
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Étapes suivantes :
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>1. Vérifiez votre boîte de réception</li>
                <li>2. Cliquez sur le lien de réinitialisation</li>
                <li>3. Créez un nouveau mot de passe</li>
                <li>4. Connectez-vous avec vos nouveaux identifiants</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail("");
                }}
                className="w-full px-4 py-3 border border-linka-green text-linka-green rounded-lg hover:bg-linka-green/5 transition-colors"
              >
                Essayer avec un autre email
              </button>
              
              <Link
                to="/login"
                className="w-full inline-flex justify-center items-center px-4 py-3 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la connexion
              </Link>
            </div>
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
            <div className="w-10 h-10 bg-gradient-to-br from-linka-green to-linka-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Linka<span className="text-linka-green">Market</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Mot de passe oublié ?
          </h2>
          <p className="mt-2 text-gray-600">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              disabled={isLoading || !email}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-linka-green hover:bg-linka-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linka-green disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer le lien de réinitialisation
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Remarque importante :
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Vérifiez vos spams/courriers indésirables</li>
                      <li>Le lien expire dans 1 heure</li>
                      <li>Vous ne recevrez un email que si le compte existe</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

export default ForgotPassword;
