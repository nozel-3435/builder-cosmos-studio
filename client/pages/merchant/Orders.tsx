import React, { useEffect, useMemo, useState } from "react";
import { supabase, isDemoMode } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart, Filter, RefreshCw, Package, CreditCard, Clock } from "lucide-react";

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: { id: string; name: string; merchant_id?: string } | null;
}

interface OrderRow {
  id: string;
  status: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
  order_items?: OrderItem[];
}

const demoOrders: OrderRow[] = [
  {
    id: "ORD-2024-001",
    status: "confirmed",
    total_amount: 45000,
    payment_method: "tmoney",
    payment_status: "paid",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    order_items: [
      {
        id: "oi-1",
        product_id: "p-1",
        quantity: 2,
        unit_price: 15000,
        total_price: 30000,
        product: { id: "p-1", name: "Riz local 25kg" },
      },
      {
        id: "oi-2",
        product_id: "p-2",
        quantity: 1,
        unit_price: 15000,
        total_price: 15000,
        product: { id: "p-2", name: "Huile 5L" },
      },
    ],
  },
  {
    id: "ORD-2024-002",
    status: "delivering",
    total_amount: 82500,
    payment_method: "card",
    payment_status: "paid",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    order_items: [
      {
        id: "oi-3",
        product_id: "p-3",
        quantity: 3,
        unit_price: 25000,
        total_price: 75000,
        product: { id: "p-3", name: "Pagne Wax" },
      },
      {
        id: "oi-4",
        product_id: "p-4",
        quantity: 3,
        unit_price: 2500,
        total_price: 7500,
        product: { id: "p-4", name: "Masque chirurgical" },
      },
    ],
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-yellow-100 text-yellow-700",
  ready: "bg-indigo-100 text-indigo-700",
  delivering: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function MerchantOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const load = async () => {
    setLoading(true);
    try {
      if (isDemoMode) {
        setOrders(demoOrders);
      } else {
        // RLS autorise les commerçants à voir les commandes de leurs produits
        const { data, error } = await supabase
          .from("orders")
          .select(
            `id,status,total_amount,payment_method,payment_status,created_at,
             order_items:order_items(id, product_id, quantity, unit_price, total_price,
               product:products(id,name,merchant_id)
             )`
          )
          .order("created_at", { ascending: false });
        if (error) throw error;
        setOrders((data as any) || []);
      }
    } catch (e) {
      console.error("Erreur chargement commandes:", e);
      setOrders(demoOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(
    () => orders.filter((o) => (statusFilter ? o.status === statusFilter : true)),
    [orders, statusFilter],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg"><ShoppingCart className="h-5 w-5 text-green-700"/></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Commandes reçues</h1>
              <p className="text-gray-600">Suivez vos commandes clients en temps réel</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Tous les statuts</option>
              {Object.keys(statusColors).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button onClick={load} className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="h-4 w-4"/>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Articles</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={6}>Chargement…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={6}>Aucune commande</td></tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{o.id}</div>
                      <div className="text-xs text-gray-500 flex items-center space-x-1"><Clock className="h-3 w-3"/><span>{new Date(o.created_at).toLocaleString("fr-FR")}</span></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <ul className="space-y-1">
                        {(o.order_items || []).map((it) => (
                          <li key={it.id} className="flex items-center justify-between">
                            <span className="truncate max-w-[280px]">{it.product?.name || it.product_id}</span>
                            <span className="text-gray-500">x{it.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3 font-semibold">{o.total_amount.toLocaleString()} FCFA</td>
                    <td className="px-4 py-3 text-sm text-gray-700 flex items-center space-x-2">
                      <CreditCard className="h-4 w-4"/><span className="capitalize">{o.payment_method}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[o.status] || "bg-gray-100"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Détails</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
