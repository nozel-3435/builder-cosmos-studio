-- Activer Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- PROFILES
DROP POLICY IF EXISTS "Voir son profil" ON profiles;
CREATE POLICY "Voir son profil" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Modifier son profil" ON profiles;
CREATE POLICY "Modifier son profil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- PRODUCTS
DROP POLICY IF EXISTS "Tout le monde peut voir les produits" ON products;
CREATE POLICY "Tout le monde peut voir les produits" ON products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Commerçants peuvent gérer leurs produits" ON products;
CREATE POLICY "Commerçants peuvent gérer leurs produits" ON products
  FOR ALL USING (auth.uid() = merchant_id);

-- ORDERS
DROP POLICY IF EXISTS "Client peut voir ses commandes" ON orders;
CREATE POLICY "Client peut voir ses commandes" ON orders
  FOR SELECT USING (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Client peut créer une commande" ON orders;
CREATE POLICY "Client peut créer une commande" ON orders
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Commerçant peut voir les commandes liées à ses produits" ON orders;
CREATE POLICY "Commerçant peut voir les commandes liées à ses produits" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = orders.id AND p.merchant_id = auth.uid()
    )
  );

-- ORDER_ITEMS
DROP POLICY IF EXISTS "Client ou commerçant peut voir les lignes de commande" ON order_items;
CREATE POLICY "Client ou commerçant peut voir les lignes de commande" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders o WHERE o.id = order_id 
      AND (
        o.customer_id = auth.uid() OR 
        EXISTS (
          SELECT 1 FROM products p WHERE p.id = product_id AND p.merchant_id = auth.uid()
        )
      )
    )
  );

-- DELIVERIES
DROP POLICY IF EXISTS "Livreur peut voir ses livraisons" ON deliveries;
CREATE POLICY "Livreur peut voir ses livraisons" ON deliveries
  FOR SELECT USING (auth.uid() = driver_id);

DROP POLICY IF EXISTS "Client peut voir les livraisons de ses commandes" ON deliveries;
CREATE POLICY "Client peut voir les livraisons de ses commandes" ON deliveries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders o WHERE o.id = order_id AND o.customer_id = auth.uid()
    )
  );

-- REVIEWS
DROP POLICY IF EXISTS "Tout le monde peut voir les avis" ON reviews;
CREATE POLICY "Tout le monde peut voir les avis" ON reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Client peut gérer ses avis" ON reviews;
CREATE POLICY "Client peut gérer ses avis" ON reviews
  FOR ALL USING (auth.uid() = customer_id);

-- FAVORITES
DROP POLICY IF EXISTS "Client peut gérer ses favoris" ON favorites;
CREATE POLICY "Client peut gérer ses favoris" ON favorites
  FOR ALL USING (auth.uid() = customer_id);

-- CART_ITEMS
DROP POLICY IF EXISTS "Client peut gérer son panier" ON cart_items;
CREATE POLICY "Client peut gérer son panier" ON cart_items
  FOR ALL USING (auth.uid() = customer_id);
