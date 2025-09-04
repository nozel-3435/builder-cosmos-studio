import { Link } from "react-router-dom";

const Terms = () => {
  const date = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Conditions d’utilisation – LinkaMarket</h1>
        <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : {date}</p>

        <p className="mb-6">Les présentes Conditions régissent l’utilisation de l’application LinkaMarket. En utilisant l’application, vous acceptez ces conditions.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Compte utilisateur</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Chaque utilisateur doit créer un compte avec des informations exactes.</li>
          <li>Vous êtes responsable de la sécurité de votre compte et de toutes les activités associées.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Comportement des utilisateurs</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Interdiction de publier des contenus illégaux, offensants ou frauduleux.</li>
          <li>Respect des autres utilisateurs (clients, commerçants, livreurs).</li>
          <li>Interdiction de contourner ou manipuler le système.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Transactions et paiements</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Les prix et conditions sont ceux affichés au moment de la commande.</li>
          <li>LinkaMarket n’est pas responsable des litiges entre utilisateurs, mais peut aider à la médiation.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Propriété intellectuelle</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Tout le contenu de l’application (logo, interface, textes, images) appartient à LinkaMarket.</li>
          <li>Toute reproduction ou redistribution sans autorisation est interdite.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Responsabilité</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>L’application est fournie « en l’état ».</li>
          <li>LinkaMarket n’est pas responsable des pertes ou dommages liés à l’utilisation de l’application ou aux interactions entre utilisateurs.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Modification des conditions</h2>
        <p>LinkaMarket peut mettre à jour ces conditions à tout moment. La poursuite de l’utilisation vaut acceptation des modifications.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Résiliation</h2>
        <p>LinkaMarket peut suspendre ou supprimer un compte en cas de violation des conditions.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Contact</h2>
        <p>Pour toute question : <a className="text-linka-green underline" href="mailto:support@linkamarket.com">support@linkamarket.com</a></p>

        <div className="mt-10">
          <Link to="/" className="text-linka-green hover:underline">Retour à l’accueil</Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
