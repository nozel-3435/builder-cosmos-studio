import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Users, ShoppingBag, Store, Truck } from "lucide-react";

const Section = ({ items }: { items: { title: string; content: string }[] }) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((q, i) => (
      <AccordionItem key={i} value={`item-${i}`}>
        <AccordionTrigger className="text-left text-base">{q.title}</AccordionTrigger>
        <AccordionContent className="text-gray-600 leading-relaxed">{q.content}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

const all = [
  {
    title: "Qu’est-ce que LinkaMarket ?",
    content:
      "LinkaMarket est une application de marketplace qui connecte clients, commerçants et livreurs pour faciliter les achats et les livraisons de manière simple et sécurisée.",
  },
  {
    title: "Comment créer un compte ?",
    content:
      "Cliquez sur « S’inscrire », remplissez vos informations et confirmez votre compte via email ou SMS.",
  },
  {
    title: "Comment contacter le support ?",
    content: "Email : support@linkamarket.com ou via le formulaire de contact dans l’application.",
  },
];

const clients = [
  { title: "Comment passer une commande ?", content: "Parcourez les produits, ajoutez-les au panier, confirmez votre commande et suivez-la en temps réel." },
  { title: "Quels modes de paiement sont acceptés ?", content: "Carte bancaire, mobile money, et autres options intégrées." },
  { title: "Que faire si j’ai un problème avec ma commande ?", content: "Contactez le support via l’application pour résoudre le problème." },
];

const merchants = [
  { title: "Comment devenir commerçant ?", content: "Inscrivez-vous en tant que commerçant, remplissez vos informations et ajoutez vos produits. Vérification possible." },
  { title: "Comment gérer mes produits et commandes ?", content: "Depuis votre tableau de bord : ajouter, modifier, supprimer produits et suivre commandes." },
  { title: "Comment recevoir mes paiements ?", content: "Les paiements sont transférés automatiquement sur votre compte bancaire ou mobile." },
];

const drivers = [
  { title: "Comment devenir livreur ?", content: "Inscrivez-vous comme livreur, fournissez vos informations et moyens de transport. Vérification nécessaire." },
  { title: "Comment accepter une livraison ?", content: "Dans l’onglet « Livraisons disponibles », cliquez sur « Accepter ». L’itinéraire sera affiché." },
  { title: "Comment suivre mes revenus et paiements ?", content: "Depuis votre profil livreur, consultez vos livraisons, revenus et paiements." },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-linka-green to-linka-orange bg-clip-text text-transparent">FAQ – Foire Aux Questions</h1>
          <p className="text-gray-600">Trouvez rapidement des réponses selon votre profil.</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6 bg-linka-gray-50">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-linka-green">
              <Users className="w-4 h-4 mr-2" /> Tous
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-white data-[state=active]:text-linka-green">
              <ShoppingBag className="w-4 h-4 mr-2" /> Clients
            </TabsTrigger>
            <TabsTrigger value="merchants" className="data-[state=active]:bg-white data-[state=active]:text-linka-orange">
              <Store className="w-4 h-4 mr-2" /> Commerçants
            </TabsTrigger>
            <TabsTrigger value="drivers" className="data-[state=active]:bg-white data-[state=active]:text-linka-green">
              <Truck className="w-4 h-4 mr-2" /> Livreurs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all"><Section items={[...all, ...clients, ...merchants, ...drivers]} /></TabsContent>
          <TabsContent value="clients"><Section items={clients} /></TabsContent>
          <TabsContent value="merchants"><Section items={merchants} /></TabsContent>
          <TabsContent value="drivers"><Section items={drivers} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FAQ;
