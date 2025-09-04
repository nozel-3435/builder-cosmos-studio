import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, Phone, Mail, MessageCircle, Shield, CreditCard, ShoppingCart, Truck, User } from "lucide-react";
import { Link } from "react-router-dom";

type Article = { title: string; body: string; category: string };

const articles: Article[] = [
  { category: "Compte", title: "Créer un compte", body: "Cliquez sur S'inscrire, complétez vos informations et confirmez par email.", },
  { category: "Compte", title: "Réinitialiser mon mot de passe", body: "Depuis Connexion > Mot de passe oublié, entrez votre email et suivez le lien reçu.", },
  { category: "Commandes", title: "Passer une commande", body: "Ajoutez des produits au panier puis validez la commande. Vous pouvez suivre son avancement en temps réel.", },
  { category: "Paiement", title: "Moyens de paiement acceptés", body: "Cartes, mobile money et solutions locales intégrées lorsque disponibles.", },
  { category: "Livraison", title: "Suivre ma livraison", body: "Rendez‑vous dans Commandes > Détails. L'estimation et le livreur sont affichés.", },
  { category: "Technique", title: "Problème d'affichage ou mode sombre", body: "Actualisez la page. Si le souci persiste, videz le cache du navigateur et réessayez.", },
  { category: "Sécurité", title: "Sécurité de mes données", body: "Nos mesures incluent chiffrement et contrôle d'accès. Consultez la Politique de confidentialité.", },
];

const cats = [
  { key: "all", label: "Tous", icon: Search },
  { key: "Compte", label: "Compte", icon: User },
  { key: "Commandes", label: "Commandes", icon: ShoppingCart },
  { key: "Paiement", label: "Paiement", icon: CreditCard },
  { key: "Livraison", label: "Livraison", icon: Truck },
  { key: "Technique", label: "Technique", icon: Shield },
  { key: "Sécurité", label: "Sécurité", icon: Shield },
];

const HelpCenter = () => {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? articles.filter(a => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q))
      : articles;
    const map = new Map<string, Article[]>();
    base.forEach(a => {
      if (!map.has(a.category)) map.set(a.category, []);
      map.get(a.category)!.push(a);
    });
    return map;
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-linka-green to-linka-orange bg-clip-text text-transparent">Centre d'aide</h1>
          <p className="text-gray-600">Recherchez un sujet ou parcourez les catégories.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-10 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher (ex: paiement, livraison, compte)"
            className="pl-10 h-12"
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex flex-wrap gap-2 bg-linka-gray-50 p-1 rounded-lg mb-6">
            {cats.map(({ key, label, icon: Icon }) => (
              <TabsTrigger key={key} value={key} className="data-[state=active]:bg-white data-[state=active]:text-linka-green">
                <Icon className="w-4 h-4 mr-2" /> {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            {[...grouped.entries()].map(([cat, items]) => (
              <div key={cat} className="mb-8">
                <h2 className="text-xl font-semibold mb-3">{cat}</h2>
                <Accordion type="single" collapsible>
                  {items.map((a, i) => (
                    <AccordionItem key={`${cat}-${i}`} value={`${cat}-${i}`}>
                      <AccordionTrigger className="text-left">{a.title}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{a.body}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </TabsContent>

          {cats.filter(c => c.key !== "all").map(({ key }) => (
            <TabsContent key={key} value={key}>
              <Accordion type="single" collapsible>
                {(grouped.get(key as string) || []).map((a, i) => (
                  <AccordionItem key={`${key}-${i}`} value={`${key}-${i}`}>
                    <AccordionTrigger className="text-left">{a.title}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{a.body}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-xl border bg-card">
            <h3 className="font-semibold mb-2">Besoin d'aide immédiate ?</h3>
            <p className="text-gray-600 mb-3">Contactez-nous directement.</p>
            <a href="tel:+22890109397" className="flex items-center gap-2 text-linka-green mb-2"><Phone className="w-4 h-4" /> +228 90 10 93 97</a>
            <a href="tel:+22891589500" className="flex items-center gap-2 text-linka-green mb-2"><Phone className="w-4 h-4" /> +228 91 58 95 00</a>
            <a href="mailto:support@linkamarket.com" className="flex items-center gap-2 text-linka-green"><Mail className="w-4 h-4" /> support@linkamarket.com</a>
          </div>
          <div className="p-6 rounded-xl border bg-card">
            <h3 className="font-semibold mb-2">Questions fréquentes</h3>
            <p className="text-gray-600 mb-3">Consultez notre FAQ détaillée.</p>
            <Link to="/faq" className="inline-block px-4 py-2 rounded-lg bg-linka-green text-white hover:bg-linka-green/90">Voir la FAQ</Link>
          </div>
          <div className="p-6 rounded-xl border bg-card">
            <h3 className="font-semibold mb-2">Mentions légales</h3>
            <p className="text-gray-600 mb-3">Confidentialité et Conditions d'utilisation.</p>
            <div className="space-x-3">
              <Link to="/privacy" className="text-linka-green underline">Confidentialité</Link>
              <Link to="/terms" className="text-linka-green underline">Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
