import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  CreditCard,
  MapPin,
  ArrowLeft,
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Riz local premium",
      price: 2500,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
      store: "Marché Central",
    },
    {
      id: 2,
      name: "Smartphone Samsung",
      price: 150000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
      store: "Tech Store",
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 1000;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon panier</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-linka-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-6">
              Ajoutez des produits pour commencer vos achats
            </p>
            <button className="bg-linka-green text-white px-6 py-3 rounded-lg hover:bg-linka-green/90 transition-colors">
              Continuer mes achats
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Articles ({cartItems.length})
                </h2>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.store}</p>
                        <p className="text-linka-green font-semibold">
                          {item.price.toLocaleString()} FCFA
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Résumé de la commande
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">
                      {totalPrice.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium">
                      {deliveryFee.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-linka-green">
                        {finalTotal.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      Adresse de livraison
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 bg-linka-gray-50 p-3 rounded-lg">
                    123 Rue de la République, Plateau, Abidjan
                  </p>
                  <button className="text-linka-green text-sm mt-2 hover:underline">
                    Modifier l'adresse
                  </button>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      Mode de paiement
                    </span>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="tmoney"
                        className="text-linka-green"
                        defaultChecked
                      />
                      <span className="text-sm">TMoney</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="flooz"
                        className="text-linka-green"
                      />
                      <span className="text-sm">Flooz</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        className="text-linka-green"
                      />
                      <span className="text-sm">Carte bancaire</span>
                    </label>
                  </div>
                </div>

                <button className="w-full bg-linka-green text-white py-3 rounded-lg font-semibold hover:bg-linka-green/90 transition-colors">
                  Passer la commande
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  En passant votre commande, vous acceptez nos conditions
                  d'utilisation
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
