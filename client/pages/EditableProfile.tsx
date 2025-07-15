import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Camera,
  Save,
  X,
  Eye,
  EyeOff,
  Upload,
  Trash2,
  Edit3,
  Check,
  AlertTriangle,
  Shield,
  Settings,
  Calendar,
  Flag,
  Home,
  Briefcase,
  Truck,
  Star,
  Award,
} from "lucide-react";
import { toast } from "sonner";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  // Adresse
  address: string;
  neighborhood: string;
  city: string;
  country: string;
  // Informations business (commerçants)
  businessName: string;
  businessDescription: string;
  businessAddress: string;
  businessPhone: string;
  businessCategory: string;
  businessHours: string;
  // Informations livraison (livreurs)
  vehicleType: string;
  vehiclePlate: string;
  driverLicense: string;
  deliveryZones: string[];
  yearsExperience: string;
  // Sécurité
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EditableProfile = () => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: "",
    gender: "",
    address: "",
    neighborhood: "",
    city: "Kara",
    country: "Togo",
    businessName: user?.businessName || "",
    businessDescription: user?.businessDescription || "",
    businessAddress: user?.businessAddress || "",
    businessPhone: user?.businessPhone || "",
    businessCategory: "",
    businessHours: "08:00 - 18:00",
    vehicleType: user?.vehicleType || "",
    vehiclePlate: "",
    driverLicense: user?.driverLicense || "",
    deliveryZones: user?.deliveryZone?.split(",") || [],
    yearsExperience: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const karaNeighborhoods = [
    "Centre-ville",
    "Kpéwa",
    "Tchré",
    "Ramco",
    "Kassena",
    "Kétao",
    "Agbala",
    "Lama",
    "Dongoyo",
    "Katanga",
    "Pierreville",
    "Adidogomé",
  ];

  const businessCategories = [
    "Alimentaire",
    "Électronique",
    "Mode & Vêtements",
    "Maison & Décoration",
    "Santé & Beauté",
    "Transport & Auto",
    "Sport & Loisirs",
    "Éducation & Bureautique",
    "Services",
  ];

  const vehicleTypes = [
    "Moto",
    "Vélo",
    "Voiture",
    "Tricycle",
    "Camionnette",
    "À pied",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleZoneChange = (zone: string) => {
    setFormData((prev) => ({
      ...prev,
      deliveryZones: prev.deliveryZones.includes(zone)
        ? prev.deliveryZones.filter((z) => z !== zone)
        : [...prev.deliveryZones, zone],
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La taille de l'image ne doit pas dépasser 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation des mots de passe
      if (showPasswordFields) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Les nouveaux mots de passe ne correspondent pas");
        }
        if (formData.newPassword.length < 6) {
          throw new Error(
            "Le nouveau mot de passe doit contenir au moins 6 caractères",
          );
        }
      }

      // Validation des champs obligatoires
      if (!formData.fullName.trim()) {
        throw new Error("Le nom complet est obligatoire");
      }
      if (!formData.phone.trim()) {
        throw new Error("Le numéro de téléphone est obligatoire");
      }

      // Préparer les données à mettre à jour
      const updateData: any = {
        name: formData.fullName,
        phone: formData.phone,
        // Adresse complète
        fullAddress:
          `${formData.address}, ${formData.neighborhood}, ${formData.city}, ${formData.country}`.trim(),
      };

      // Données spécifiques selon le rôle
      if (user?.role === "merchant") {
        updateData.businessName = formData.businessName;
        updateData.businessDescription = formData.businessDescription;
        updateData.businessAddress = formData.businessAddress;
        updateData.businessPhone = formData.businessPhone;
      } else if (user?.role === "delivery") {
        updateData.vehicleType = formData.vehicleType;
        updateData.driverLicense = formData.driverLicense;
        updateData.deliveryZone = formData.deliveryZones.join(",");
      }

      // Avatar si changé
      if (avatarPreview) {
        updateData.avatar = avatarPreview;
      }

      // Simuler la mise à jour
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await updateProfile(updateData);
      toast.success("Profil mis à jour avec succès !");

      // Réinitialiser les champs de mot de passe
      if (showPasswordFields) {
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        setShowPasswordFields(false);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    {
      id: "personal",
      label: "Informations personnelles",
      icon: User,
    },
    {
      id: "address",
      label: "Adresse",
      icon: MapPin,
    },
    ...(user?.role === "merchant"
      ? [
          {
            id: "business",
            label: "Informations commerciales",
            icon: Building,
          },
        ]
      : []),
    ...(user?.role === "delivery"
      ? [
          {
            id: "delivery",
            label: "Informations de livraison",
            icon: Truck,
          },
        ]
      : []),
    {
      id: "security",
      label: "Sécurité",
      icon: Shield,
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600">
            Vous devez être connecté pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Edit3 className="w-8 h-8 text-linka-green" />
            <span>Modifier mon profil</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez vos informations personnelles et paramètres de compte
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Photo de profil */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={avatarPreview || user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-linka-green text-white rounded-full flex items-center justify-center hover:bg-linka-green/90 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-gray-600 capitalize">
                  {user.role === "client"
                    ? "Client"
                    : user.role === "merchant"
                      ? "Commerçant"
                      : user.role === "delivery"
                        ? "Livreur"
                        : "Administrateur"}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Flag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Kara, Togo</span>
                  {user.role === "merchant" && (
                    <>
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">Vérifié</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-linka-green text-linka-green"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Informations personnelles */}
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                          placeholder="Jean Dupont"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          readOnly
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        L'email ne peut pas être modifié
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                          placeholder="+228 XX XX XX XX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date de naissance
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sexe
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                      >
                        <option value="">Sélectionner</option>
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Adresse */}
              {activeTab === "address" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse complète
                      </label>
                      <div className="relative">
                        <Home className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                          placeholder="123 Rue de la République"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quartier
                      </label>
                      <select
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                      >
                        <option value="">Sélectionner un quartier</option>
                        {karaNeighborhoods.map((neighborhood) => (
                          <option key={neighborhood} value={neighborhood}>
                            {neighborhood}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                        placeholder="Kara"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pays
                      </label>
                      <div className="relative">
                        <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                          placeholder="Togo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Informations commerciales */}
              {activeTab === "business" && user?.role === "merchant" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'entreprise *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                          placeholder="Ma Super Boutique"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie
                      </label>
                      <select
                        name="businessCategory"
                        value={formData.businessCategory}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                      >
                        <option value="">Sélectionner</option>
                        {businessCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description de l'entreprise
                      </label>
                      <textarea
                        name="businessDescription"
                        value={formData.businessDescription}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                        placeholder="Décrivez votre entreprise..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse de l'entreprise
                      </label>
                      <input
                        type="text"
                        name="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                        placeholder="Adresse de votre boutique"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone de l'entreprise
                      </label>
                      <input
                        type="tel"
                        name="businessPhone"
                        value={formData.businessPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                        placeholder="+228 XX XX XX XX"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heures d'ouverture
                      </label>
                      <input
                        type="text"
                        name="businessHours"
                        value={formData.businessHours}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                        placeholder="08:00 - 18:00"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Informations de livraison */}
              {activeTab === "delivery" && user?.role === "delivery" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de véhicule *
                      </label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                      >
                        <option value="">Sélectionner</option>
                        {vehicleTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plaque d'immatriculation
                      </label>
                      <input
                        type="text"
                        name="vehiclePlate"
                        value={formData.vehiclePlate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                        placeholder="TG-1234-AB"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Permis de conduire
                      </label>
                      <input
                        type="text"
                        name="driverLicense"
                        value={formData.driverLicense}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                        placeholder="Numéro de permis"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Années d'expérience
                      </label>
                      <input
                        type="number"
                        name="yearsExperience"
                        value={formData.yearsExperience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                        placeholder="5"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zones de livraison
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {karaNeighborhoods.map((zone) => (
                          <label
                            key={zone}
                            className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.deliveryZones.includes(zone)}
                              onChange={() => handleZoneChange(zone)}
                              className="rounded border-gray-300 text-linka-green focus:ring-linka-green"
                            />
                            <span className="text-sm text-gray-700">
                              {zone}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sécurité */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Changement de mot de passe
                        </h3>
                        <p className="text-sm text-gray-600">
                          Assurez-vous d'utiliser un mot de passe fort
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                      className="px-4 py-2 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors"
                    >
                      {showPasswordFields ? "Annuler" : "Modifier"}
                    </button>
                  </div>

                  {showPasswordFields && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de passe actuel *
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.current ? "text" : "password"}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                            placeholder="Votre mot de passe actuel"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                current: !prev.current,
                              }))
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.current ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nouveau mot de passe *
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.new ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                            placeholder="Nouveau mot de passe"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                new: !prev.new,
                              }))
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.new ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le nouveau mot de passe *
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                            placeholder="Confirmer le nouveau mot de passe"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                confirm: !prev.confirm,
                              }))
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.confirm ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sauvegarde...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditableProfile;
