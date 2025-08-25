import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/ui/BackButton";

interface EmailVerificationProps {
  email: string;
  onVerified?: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ 
  email, 
  onVerified 
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { verifyEmail, sendVerificationCode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (value: string, index: number) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 7) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && !isLoading) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').slice(0, 8);
    
    if (!/^\d{8}$/.test(pastedText)) {
      toast.error("Veuillez coller un code à 8 chiffres valide");
      return;
    }

    const newCode = pastedText.split('');
    setCode(newCode);
    
    // Auto-verify
    handleVerify(pastedText);
  };

  const handleVerify = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join('');
    
    if (codeToVerify.length !== 8) {
      toast.error("Veuillez entrer le code complet à 8 chiffres");
      return;
    }

    setIsLoading(true);
    try {
      const verified = await verifyEmail(email, codeToVerify);
      
      if (verified) {
        toast.success("Email vérifié avec succès !");
        if (onVerified) {
          onVerified();
        } else {
          navigate('/');
        }
      } else {
        toast.error("Code incorrect. Veuillez réessayer.");
        // Clear the code
        setCode(['', '', '', '', '', '', '', '']);
        const firstInput = document.getElementById('code-0');
        firstInput?.focus();
      }
    } catch (error) {
      toast.error("Erreur lors de la vérification");
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await sendVerificationCode(email);
      toast.success("Nouveau code envoyé !");
      
      // Reset countdown
      setCountdown(60);
      setCanResend(false);
      
      // Clear current code
      setCode(['', '', '', '', '', '', '', '']);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      toast.error("Erreur lors de l'envoi du code");
      console.error("Resend error:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-linka-green/10 via-white to-linka-orange/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-start mb-4">
          <BackButton to="/register" />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-linka-green/10 mb-4">
              <Mail className="w-8 h-8 text-linka-green" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Vérifiez votre email
            </h2>
            <p className="text-gray-600">
              Nous avons envoyé un code de vérification à
            </p>
            <p className="font-medium text-linka-green">{email}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Entrez le code à 8 chiffres
              </label>
              <div className="flex space-x-2 justify-center">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleCodeChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                    maxLength={1}
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleVerify()}
              disabled={isLoading || code.some(digit => digit === '')}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-linka-green hover:bg-linka-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linka-green disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Vérification...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Vérifier
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Vous n'avez pas reçu le code ?
              </p>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="inline-flex items-center text-sm font-medium text-linka-green hover:text-linka-green/80 disabled:opacity-50"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Renvoyer le code
                    </>
                  )}
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Renvoyer dans {countdown} secondes
                </p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Conseils :
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Vérifiez vos spams/courriers indésirables</li>
                      <li>Le code expire dans 10 minutes</li>
                      <li>Vous pouvez coller le code directement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
