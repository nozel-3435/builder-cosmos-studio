import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const AdminVerify = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const normalized = answer.trim().toLowerCase();
    if (!normalized) {
      setError("Veuillez répondre à la question.");
      return;
    }

    setLoading(true);
    try {
      if (normalized === "theworld") {
        sessionStorage.setItem("admin_verified", "true");
        toast.success("Vérification réussie");
        navigate("/admin", { replace: true });
      } else {
        sessionStorage.removeItem("admin_verified");
        setError("Réponse incorrecte. Accès refusé.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = sessionStorage.getItem("admin_authenticated") === "true";
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold mb-2">Session administrateur manquante</h1>
          <p className="text-gray-600 mb-6">Connectez-vous d'abord avec vos identifiants administrateur.</p>
          <Link to="/login" className="inline-flex items-center px-4 py-2 rounded-lg bg-linka-green text-white hover:bg-linka-green/90">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-linka-green/10 via-white to-linka-orange/10 px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-linka-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-8 h-8 text-linka-green" />
          </div>
          <h1 className="text-2xl font-bold">Vérification supplémentaire</h1>
          <p className="text-gray-600 mt-1">Question de sécurité pour terminer la connexion administrateur.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Que veux-tu ?</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
              placeholder="Votre réponse"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linka-green text-white py-3 rounded-lg font-semibold hover:bg-linka-green/90 disabled:opacity-50"
          >
            {loading ? "Vérification..." : "Valider"}
          </button>

          <div className="text-center">
            <Link to="/login" className="text-sm text-gray-600 hover:text-linka-green">Changer de compte</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminVerify;
