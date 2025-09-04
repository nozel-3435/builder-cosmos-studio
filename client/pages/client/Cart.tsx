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

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(
    "123 Rue de la République, Centre-ville, Kara",
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mixx");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 1000;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-white transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Mon panier</h1>
        </div>

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
            <button
              onClick={() => navigate("/products")}
              className="bg-linka-green text-white px-6 py-3 rounded-lg hover:bg-linka-green/90 transition-colors"
            >
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
                    {deliveryAddress}
                  </p>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="text-linka-green text-sm mt-2 hover:underline"
                  >
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
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="mixx"
                        checked={selectedPaymentMethod === "mixx"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="text-linka-green"
                      />
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            M
                          </span>
                        </div>
                        <span className="text-sm font-medium">Mixx by Yas</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="flooz"
                        checked={selectedPaymentMethod === "flooz"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="text-linka-green"
                      />
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            F
                          </span>
                        </div>
                        <span className="text-sm font-medium">Flooz</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="tmoney"
                        checked={selectedPaymentMethod === "tmoney"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="text-linka-green"
                      />
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            T
                          </span>
                        </div>
                        <span className="text-sm font-medium">TMoney</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={selectedPaymentMethod === "bank"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="text-linka-green"
                      />
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium">
                          Carte bancaire
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full bg-linka-green text-white py-3 rounded-lg font-semibold hover:bg-linka-green/90 transition-colors"
                >
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

        {/* Address Modification Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Modifier l'adresse de livraison
                  </h3>
                  <button
                    onClick={() => setShowAddressModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse complète
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                      placeholder="Entrez votre adresse de livraison complète"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowAddressModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => setShowAddressModal(false)}
                      className="flex-1 px-4 py-2 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Finaliser le paiement
                  </h3>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Résumé de la commande
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{totalPrice.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span>{deliveryFee.toLocaleString()} FCFA</span>
                    </div>
                    <div className="border-t pt-2 font-semibold">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="text-linka-green">
                          {finalTotal.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method Details */}
                {selectedPaymentMethod === "mixx" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold">M</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Mixx by Yas
                        </h4>
                        <p className="text-sm text-gray-600">
                          Paiement sécurisé
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="+228 XX XX XX XX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "flooz" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold">F</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Flooz</h4>
                        <p className="text-sm text-gray-600">Paiement mobile</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro Flooz
                      </label>
                      <input
                        type="tel"
                        placeholder="+228 XX XX XX XX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "tmoney" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                      <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold">T</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">TMoney</h4>
                        <p className="text-sm text-gray-600">Togocel Money</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro TMoney
                      </label>
                      <input
                        type="tel"
                        placeholder="+228 XX XX XX XX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "bank" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Carte bancaire
                        </h4>
                        <p className="text-sm text-gray-600">
                          Visa, Mastercard acceptées
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Numéro de carte
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiration
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Actions */}
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => {
                      // Simulate payment processing
                      alert(
                        `Paiement en cours via ${selectedPaymentMethod === "mixx" ? "Mixx by Yas" : selectedPaymentMethod === "flooz" ? "Flooz" : selectedPaymentMethod === "tmoney" ? "TMoney" : "Carte bancaire"}...`,
                      );
                      setShowPaymentModal(false);
                    }}
                    className="flex-1 px-4 py-3 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors font-semibold"
                  >
                    Payer {finalTotal.toLocaleString()} FCFA
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Paiement sécurisé • Vos données sont protégées
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
