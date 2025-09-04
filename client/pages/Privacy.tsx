import { Link } from "react-router-dom";

const Privacy = () => {
  const date = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Politique de confidentialité – LinkaMarket</h1>
        <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : {date}</p>

        <p className="mb-6">LinkaMarket (« nous », « notre », « l’application ») s’engage à protéger votre vie privée et vos informations personnelles. Cette politique explique quelles données nous collectons, comment nous les utilisons et vos droits concernant vos informations.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Informations collectées</h2>
        <p className="mb-2">Nous collectons différentes informations pour fournir et améliorer nos services :</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Informations personnelles : nom, prénom, email, numéro de téléphone, adresse.</li>
          <li>Compte utilisateur : identifiants, mot de passe, rôle (client, commerçant, livreur).</li>
          <li>Transactions : historique des commandes, achats, livraisons.</li>
          <li>Localisation : pour les fonctionnalités de carte et livraison.</li>
          <li>Informations techniques : type d’appareil, version du système, adresse IP.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Utilisation des informations</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Fournir et améliorer nos services.</li>
          <li>Gérer votre compte et vos commandes.</li>
          <li>Communiquer avec vous (notifications, support).</li>
          <li>Sécuriser l’application et prévenir la fraude.</li>
          <li>Effectuer des analyses statistiques pour améliorer l’expérience utilisateur.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Partage des informations</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Les commerçants et livreurs pour exécuter vos commandes.</li>
          <li>Des prestataires tiers pour le traitement des paiements, la livraison ou l’analyse de données.</li>
          <li>Les autorités légales si requis par la loi ou pour protéger nos droits.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Protection des données</h2>
        <p>Nous prenons des mesures techniques et organisationnelles pour protéger vos informations, incluant le chiffrement des données sensibles et un accès restreint.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Vos droits</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Accès et rectification de vos informations personnelles.</li>
          <li>Suppression de vos données.</li>
          <li>Retrait de votre consentement pour certaines utilisations.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Cookies et technologies similaires</h2>
        <p>Nous utilisons des cookies pour améliorer l’expérience et mesurer l’usage de l’application. Vous pouvez gérer vos préférences via votre appareil.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Contact</h2>
        <p>Pour toute question sur vos données personnelles : <a className="text-linka-green underline" href="mailto:privacy@linkamarket.com">privacy@linkamarket.com</a></p>

        <div className="mt-10">
          <Link to="/" className="text-linka-green hover:underline">Retour à l’accueil</Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
