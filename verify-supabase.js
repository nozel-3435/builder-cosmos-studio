// Script de vérification de la configuration Supabase
// Exécutez: node verify-supabase.js

console.log("🔍 Vérification de la configuration Supabase...\n");

// Charger les variables d'environnement
require("dotenv").config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log("📋 Variables d'environnement:");
console.log("URL Supabase:", supabaseUrl || "❌ Non définie");
console.log("Clé Anonyme:", supabaseKey ? "✅ Présente" : "❌ Non définie");

if (supabaseUrl && supabaseKey) {
  console.log("\n✅ Configuration complète !");
  console.log("L'application sortira du mode démonstration.");
} else {
  console.log("\n⚠️ Configuration incomplète.");
  console.log("L'application restera en mode démonstration.");
}

console.log("\n📍 Prochaines étapes:");
console.log(
  "1. Allez sur https://supabase.com/dashboard/project/arvpocyiyzsqwoazhnry",
);
console.log('2. Ouvrez "SQL Editor"');
console.log('3. Exécutez le contenu de "supabase/schema.sql"');
console.log('4. Exécutez le contenu de "supabase/migrate-data.sql"');
console.log("5. Vérifiez la carte interactive sur votre page d'accueil");

console.log("\n🗺️ La carte sera centrée sur Kara, Togo (9.5511°N, 1.1901°E)");
