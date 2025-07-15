import React, { useState } from "react";
import {
  MessageCircle,
  Star,
  Send,
  Lightbulb,
  Bug,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Filter,
  Search,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Flag,
} from "lucide-react";

interface FeedbackItem {
  id: string;
  user: {
    name: string;
    role: "client" | "merchant" | "delivery";
    avatar: string;
  };
  type: "suggestion" | "bug" | "complaint" | "compliment" | "feature";
  title: string;
  content: string;
  rating?: number;
  category: string;
  status: "pending" | "reviewed" | "resolved" | "rejected";
  createdAt: string;
  upvotes: number;
  downvotes: number;
  adminResponse?: string;
  priority: "low" | "medium" | "high";
}

const Feedback = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample feedback data
  const feedbackList: FeedbackItem[] = [
    {
      id: "FB-001",
      user: {
        name: "Marie Kouassi",
        role: "client",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marie",
      },
      type: "suggestion",
      title: "Ajouter un mode sombre à l'application",
      content:
        "Il serait génial d'avoir un mode sombre pour utiliser l'app le soir sans fatiguer les yeux. Beaucoup d'applications modernes ont cette fonctionnalité.",
      category: "Interface utilisateur",
      status: "reviewed",
      createdAt: "2024-01-15T10:30:00Z",
      upvotes: 15,
      downvotes: 2,
      adminResponse:
        "Excellente suggestion ! Nous travaillons actuellement sur l'implémentation du mode sombre. Cette fonctionnalité sera disponible dans la prochaine mise à jour.",
      priority: "medium",
    },
    {
      id: "FB-002",
      user: {
        name: "Kofi Mensah",
        role: "delivery",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kofi",
      },
      type: "bug",
      title: "GPS ne fonctionne pas correctement",
      content:
        "Le GPS me donne parfois de mauvaises directions, surtout dans le quartier de Kassena. Cela me fait perdre du temps et les clients ne sont pas contents.",
      category: "Navigation",
      status: "resolved",
      createdAt: "2024-01-14T15:20:00Z",
      upvotes: 8,
      downvotes: 0,
      adminResponse:
        "Problème résolu ! Nous avons mis à jour notre base de données cartographique pour Kassena. Merci pour le signalement.",
      priority: "high",
    },
    {
      id: "FB-003",
      user: {
        name: "Jean-Baptiste Traore",
        role: "merchant",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jean",
      },
      type: "feature",
      title: "Statistiques de ventes plus détaillées",
      content:
        "J'aimerais avoir des graphiques plus détaillés sur mes ventes : par heure, par jour de la semaine, par produit. Cela m'aiderait à mieux organiser mon stock.",
      rating: 4,
      category: "Analytics",
      status: "pending",
      createdAt: "2024-01-13T09:45:00Z",
      upvotes: 12,
      downvotes: 1,
      priority: "medium",
    },
    {
      id: "FB-004",
      user: {
        name: "Aminata Diallo",
        role: "client",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aminata",
      },
      type: "compliment",
      title: "Excellent service !",
      content:
        "Je tenais à féliciter l'équipe LinkaMarket. Le service est excellent, les livraisons sont rapides et l'application est très facile à utiliser. Bravo !",
      rating: 5,
      category: "Service client",
      status: "reviewed",
      createdAt: "2024-01-12T14:30:00Z",
      upvotes: 25,
      downvotes: 0,
      adminResponse: "Merci beaucoup pour vos encouragements ! 🙏",
      priority: "low",
    },
  ];

  const feedbackTypes = [
    {
      value: "suggestion",
      label: "Suggestion d'amélioration",
      icon: Lightbulb,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      value: "bug",
      label: "Signaler un bug",
      icon: Bug,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      value: "complaint",
      label: "Plainte",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      value: "compliment",
      label: "Compliment",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      value: "feature",
      label: "Demande de fonctionnalité",
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ];

  const categories = [
    "Interface utilisateur",
    "Performance",
    "Navigation",
    "Paiements",
    "Livraisons",
    "Service client",
    "Analytics",
    "Sécurité",
    "Autre",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the feedback to the API
    console.log("Feedback submitted:", {
      type: feedbackType,
      title,
      content,
      category,
      rating: feedbackType === "compliment" ? rating : undefined,
    });

    // Reset form
    setTitle("");
    setContent("");
    setCategory("");
    setRating(0);

    // Show success message (you might want to use a toast notification)
    alert("Merci pour votre retour ! Nous l'examinerons bientôt.");
  };

  const filteredFeedback = feedbackList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "reviewed":
        return "Examiné";
      case "resolved":
        return "Résolu";
      case "rejected":
        return "Rejeté";
      default:
        return status;
    }
  };

  const getTypeConfig = (type: string) => {
    return (
      feedbackTypes.find((t) => t.value === type) || {
        label: type,
        icon: MessageCircle,
        color: "text-gray-600",
        bgColor: "bg-gray-100",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Commentaires & Suggestions
                </h1>
                <p className="text-gray-600">
                  Aidez-nous à améliorer LinkaMarket
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Votre avis compte ! Partagez vos suggestions, signalez des bugs ou
              laissez-nous des compliments. Ensemble, construisons la meilleure
              plateforme pour Kara.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("submit")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "submit"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Soumettre un commentaire
              </button>
              <button
                onClick={() => setActiveTab("browse")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "browse"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Parcourir les commentaires
              </button>
            </nav>
          </div>
        </div>

        {/* Submit Feedback Tab */}
        {activeTab === "submit" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Nouveau commentaire
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Feedback Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type de commentaire
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {feedbackTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFeedbackType(type.value)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          feedbackType === type.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`mx-auto mb-2 ${type.bgColor} p-2 rounded-lg w-fit`}
                          >
                            <IconComponent
                              className={`h-5 w-5 ${type.color}`}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {type.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-modern"
                  placeholder="Résumez votre commentaire en quelques mots"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-modern"
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating (for compliments) */}
              {feedbackType === "compliment" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note globale
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-2xl focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description détaillée
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="input-modern"
                  placeholder="Décrivez votre commentaire en détail. Plus vous donnerez d'informations, mieux nous pourrons vous aider."
                  required
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer le commentaire
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Browse Feedback Tab */}
        {activeTab === "browse" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="reviewed">Examiné</option>
                  <option value="resolved">Résolu</option>
                  <option value="rejected">Rejeté</option>
                </select>

                <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Plus de filtres</span>
                </button>
              </div>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
              {filteredFeedback.map((item) => {
                const typeConfig = getTypeConfig(item.type);
                const IconComponent = typeConfig.icon;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${typeConfig.bgColor}`}>
                          <IconComponent
                            className={`h-5 w-5 ${typeConfig.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                item.status,
                              )}`}
                            >
                              {getStatusLabel(item.status)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>
                                {item.user.name} (
                                {item.user.role === "client"
                                  ? "Client"
                                  : item.user.role === "merchant"
                                    ? "Commerçant"
                                    : "Livreur"}
                                )
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-4">{item.content}</p>

                          {item.rating && (
                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-sm text-gray-600">
                                Note:
                              </span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < item.rating!
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {item.adminResponse && (
                            <div className="bg-blue-50 rounded-lg p-3 mb-4">
                              <h4 className="font-medium text-blue-900 mb-1">
                                Réponse de l'équipe LinkaMarket
                              </h4>
                              <p className="text-blue-800 text-sm">
                                {item.adminResponse}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{item.upvotes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
                                <ThumbsDown className="h-4 w-4" />
                                <span>{item.downvotes}</span>
                              </button>
                            </div>
                            <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                              <Eye className="h-4 w-4 inline mr-1" />
                              Voir détails
                            </button>
                            <button className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                              <Flag className="h-4 w-4 inline mr-1" />
                              Signaler
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Votre avis fait la différence !
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Chaque commentaire nous aide à améliorer LinkaMarket pour toute la
            communauté de Kara
          </p>
          <button
            onClick={() => setActiveTab("submit")}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Laisser un commentaire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
