import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Ban,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  Edit3,
  Trash2,
  UserPlus,
  Download,
  Eye,
  Shield,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "client" | "merchant" | "delivery" | "admin";
  status: "active" | "inactive" | "banned";
  joinDate: string;
  lastLogin: string;
  avatar: string;
  phone?: string;
  totalOrders?: number;
  totalSpent?: number;
  businessName?: string;
  deliveriesCompleted?: number;
  rating?: number;
  verified: boolean;
}

const AdminUsers = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);

  // Données simulées d'utilisateurs
  const users: AdminUser[] = useMemo(
    () => [
      {
        id: "1",
        name: "Marie Kouassi",
        email: "marie@example.com",
        role: "client",
        status: "active",
        joinDate: "2023-03-15",
        lastLogin: "2024-01-20",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marie",
        phone: "+225 07 11 22 33",
        totalOrders: 23,
        totalSpent: 156000,
        verified: true,
      },
      {
        id: "2",
        name: "Jean-Baptiste Traore",
        email: "jeanbaptiste@example.com",
        role: "merchant",
        status: "active",
        joinDate: "2023-01-10",
        lastLogin: "2024-01-21",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jean",
        phone: "+225 05 67 89 01",
        businessName: "Tech Store CI",
        totalOrders: 156,
        rating: 4.8,
        verified: true,
      },
      {
        id: "3",
        name: "Aminata Diallo",
        email: "aminata@example.com",
        role: "delivery",
        status: "active",
        joinDate: "2023-05-20",
        lastLogin: "2024-01-21",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aminata",
        phone: "+225 01 23 45 67",
        deliveriesCompleted: 89,
        rating: 4.6,
        verified: true,
      },
      {
        id: "4",
        name: "Fatou Coulibaly",
        email: "fatou@example.com",
        role: "merchant",
        status: "inactive",
        joinDate: "2023-08-12",
        lastLogin: "2023-12-15",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatou",
        businessName: "Bio Market",
        totalOrders: 34,
        rating: 4.5,
        verified: false,
      },
      {
        id: "5",
        name: "Kofi Asante",
        email: "kofi@example.com",
        role: "client",
        status: "banned",
        joinDate: "2023-02-05",
        lastLogin: "2023-11-20",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kofi",
        phone: "+225 04 56 78 90",
        totalOrders: 5,
        totalSpent: 23000,
        verified: false,
      },
      // Plus d'utilisateurs simulés...
      ...Array.from({ length: 20 }, (_, i) => ({
        id: `user_${i + 6}`,
        name: `Utilisateur ${i + 6}`,
        email: `user${i + 6}@example.com`,
        role: ["client", "merchant", "delivery"][
          Math.floor(Math.random() * 3)
        ] as "client" | "merchant" | "delivery",
        status: ["active", "inactive"][Math.floor(Math.random() * 2)] as
          | "active"
          | "inactive",
        joinDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .split("T")[0],
        lastLogin: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .split("T")[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + 6}`,
        totalOrders: Math.floor(Math.random() * 100),
        totalSpent: Math.floor(Math.random() * 500000),
        verified: Math.random() > 0.3,
      })),
    ],
    [],
  );

  // Filtrer les utilisateurs
  const filteredUsers = useMemo(() => {
    let result = users;

    // Recherche
    if (searchQuery.trim()) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.businessName?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filtrer par rôle
    if (selectedRole !== "all") {
      result = result.filter((user) => user.role === selectedRole);
    }

    // Filtrer par statut
    if (selectedStatus !== "all") {
      result = result.filter((user) => user.status === selectedStatus);
    }

    return result;
  }, [users, searchQuery, selectedRole, selectedStatus]);

  // Statistiques
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "active").length;
    const clients = users.filter((u) => u.role === "client").length;
    const merchants = users.filter((u) => u.role === "merchant").length;
    const drivers = users.filter((u) => u.role === "delivery").length;

    return { total, active, clients, merchants, drivers };
  }, [users]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "client":
        return ShoppingBag;
      case "merchant":
        return Store;
      case "delivery":
        return Truck;
      case "admin":
        return Shield;
      default:
        return Users;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "client":
        return "Client";
      case "merchant":
        return "Commerçant";
      case "delivery":
        return "Livreur";
      case "admin":
        return "Administrateur";
      default:
        return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUserAction = async (action: string, userId: string) => {
    try {
      switch (action) {
        case "activate":
          await new Promise((resolve) => setTimeout(resolve, 500));
          toast.success("Utilisateur activé");
          break;
        case "deactivate":
          await new Promise((resolve) => setTimeout(resolve, 500));
          toast.success("Utilisateur désactivé");
          break;
        case "ban":
          if (confirm("Êtes-vous sûr de vouloir bannir cet utilisateur ?")) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            toast.success("Utilisateur banni");
          }
          break;
        case "delete":
          if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            toast.success("Utilisateur supprimé");
          }
          break;
      }
    } catch (error) {
      toast.error("Erreur lors de l'action");
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) {
      toast.error("Aucun utilisateur sélectionné");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        `Action ${action} appliquée à ${selectedUsers.length} utilisateur(s)`,
      );
      setSelectedUsers([]);
    } catch (error) {
      toast.error("Erreur lors de l'action groupée");
    }
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600">
            Cette page est réservée aux administrateurs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Users className="w-8 h-8 text-linka-green" />
            <span>Gestion des utilisateurs</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez tous les utilisateurs de la plateforme LinkaMarket
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actifs</p>
                <p className="text-2xl font-bold text-linka-green">
                  {stats.active}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-linka-green" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clients</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.clients}
                </p>
              </div>
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commerçants</p>
                <p className="text-2xl font-bold text-linka-green">
                  {stats.merchants}
                </p>
              </div>
              <Store className="w-8 h-8 text-linka-green" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Livreurs</p>
                <p className="text-2xl font-bold text-linka-orange">
                  {stats.drivers}
                </p>
              </div>
              <Truck className="w-8 h-8 text-linka-orange" />
            </div>
          </div>
        </div>

        {/* Contrôles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email, ou entreprise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                />
              </div>
            </div>

            {/* Filtres */}
            <div className="flex gap-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
              >
                <option value="all">Tous les rôles</option>
                <option value="client">Clients</option>
                <option value="merchant">Commerçants</option>
                <option value="delivery">Livreurs</option>
                <option value="admin">Administrateurs</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
                <option value="banned">Bannis</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowUserModal(true)}
                className="px-6 py-3 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
            </div>
          </div>

          {/* Actions groupées */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-linka-green/10 rounded-lg flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {selectedUsers.length} utilisateur(s) sélectionné(s)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction("activate")}
                  className="px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                >
                  Activer
                </button>
                <button
                  onClick={() => handleBulkAction("deactivate")}
                  className="px-3 py-2 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600"
                >
                  Désactiver
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tableau des utilisateurs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={(e) =>
                        setSelectedUsers(
                          e.target.checked
                            ? filteredUsers.map((u) => u.id)
                            : [],
                        )
                      }
                      className="rounded border-gray-300 text-linka-green focus:ring-linka-green"
                    />
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Utilisateur
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Rôle
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Statut
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Inscription
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Dernière connexion
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Activité
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) =>
                            setSelectedUsers((prev) =>
                              e.target.checked
                                ? [...prev, user.id]
                                : prev.filter((id) => id !== user.id),
                            )
                          }
                          className="rounded border-gray-300 text-linka-green focus:ring-linka-green"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">
                                {user.name}
                              </span>
                              {user.verified && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                            {user.businessName && (
                              <div className="text-xs text-linka-green">
                                {user.businessName}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {getRoleLabel(user.role)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                        >
                          {user.status === "active"
                            ? "Actif"
                            : user.status === "inactive"
                              ? "Inactif"
                              : "Banni"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-900">
                          {new Date(user.joinDate).toLocaleDateString("fr-FR")}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-900">
                          {new Date(user.lastLogin).toLocaleDateString("fr-FR")}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-900">
                          {user.role === "client" && (
                            <div>
                              <div>{user.totalOrders} commandes</div>
                              <div className="text-xs text-gray-500">
                                {user.totalSpent?.toLocaleString()} FCFA
                              </div>
                            </div>
                          )}
                          {user.role === "merchant" && (
                            <div>
                              <div>{user.totalOrders} ventes</div>
                              <div className="text-xs text-gray-500">
                                ⭐ {user.rating}
                              </div>
                            </div>
                          )}
                          {user.role === "delivery" && (
                            <div>
                              <div>{user.deliveriesCompleted} livraisons</div>
                              <div className="text-xs text-gray-500">
                                ⭐ {user.rating}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              toast.info(`Voir profil de ${user.name}`)
                            }
                            className="p-2 text-gray-400 hover:text-blue-500"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toast.info(`Modifier ${user.name}`)}
                            className="p-2 text-gray-400 hover:text-linka-green"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {user.status === "active" ? (
                            <button
                              onClick={() =>
                                handleUserAction("deactivate", user.id)
                              }
                              className="p-2 text-gray-400 hover:text-yellow-500"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleUserAction("activate", user.id)
                              }
                              className="p-2 text-gray-400 hover:text-green-500"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleUserAction("delete", user.id)}
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun utilisateur trouvé
              </h3>
              <p className="text-gray-500">
                Modifiez vos critères de recherche ou ajoutez un nouvel
                utilisateur.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
