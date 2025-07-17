import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "@/components/ui/BackButton";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Store,
  Truck,
  Edit3,
  Save,
  X,
  Camera,
  Upload,
  Clock,
  Calendar,
  Shield,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Banknote,
  Users,
  Package,
} from "lucide-react";

const EditableProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    // Basic Info (All users)
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    profileImage: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",

    // Address Info (All users)
    address: "",
    city: "",
    commune: "",
    coordinates: { lat: 0, lng: 0 },

    // Client Specific
    emergencyContact: "",
    preferences: {
      notifications: true,
      marketing: false,
      language: "fr",
      currency: "FCFA",
    },
    favoriteCategories: [],

    // Merchant Specific
    businessName: "",
    businessType: "",
    businessDescription: "",
    businessLicense: "",
    businessAddress: "",
    businessCoordinates: { lat: 0, lng: 0 },
    operatingHours: {
      monday: { open: "08:00", close: "18:00", closed: false },
      tuesday: { open: "08:00", close: "18:00", closed: false },
      wednesday: { open: "08:00", close: "18:00", closed: false },
      thursday: { open: "08:00", close: "18:00", closed: false },
      friday: { open: "08:00", close: "18:00", closed: false },
      saturday: { open: "08:00", close: "18:00", closed: false },
      sunday: { open: "08:00", close: "18:00", closed: true },
    },
    expectedDeliveryTime: "30",
    bankAccount: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      iban: "",
    },

    // Delivery Specific
    vehicleType: "",
    vehiclePlate: "",
    drivingLicense: "",
    insuranceNumber: "",
    availableAreas: [],
    workingHours: {
      start: "08:00",
      end: "20:00",
    },
    emergencyContactDelivery: "",
  });

  const communes = [
    "Abobo",
    "Adjamé",
    "Attécoubé",
    "Cocody",
    "Koumassi",
    "Marcory",
    "Plateau",
    "Port-Bouët",
    "Treichville",
    "Yopougon",
    "Bingerville",
    "Songon",
  ];

  const businessTypes = [
    "Alimentation générale",
    "Fruits et légumes",
    "Boucherie/Poissonnerie",
    "Boulangerie/Pâtisserie",
    "Pharmacie",
    "Électronique",
    "Vêtements/Mode",
    "Beauté/Cosmétiques",
    "Maison/Décoration",
    "Automobile",
    "Services",
    "Autre",
  ];

  const vehicleTypes = [
    "Moto",
    "Scooter",
    "Vélo",
    "Voiture",
    "Tricycle",
    "À pied",
  ];

  const categories = [
    "Alimentation",
    "Électronique",
    "Mode",
    "Beauté",
    "Maison",
    "Sports",
    "Automobile",
    "Services",
  ];

  const daysOfWeek = [
    { key: "monday", label: "Lundi" },
    { key: "tuesday", label: "Mardi" },
    { key: "wednesday", label: "Mercredi" },
    { key: "thursday", label: "Jeudi" },
    { key: "friday", label: "Vendredi" },
    { key: "saturday", label: "Samedi" },
    { key: "sunday", label: "Dimanche" },
  ];

  useEffect(() => {
    // Load user data from localStorage (in real app, from API)
    const savedUser = localStorage.getItem("linka_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setFormData(userData);
      setProfileImage(userData.profileImage);
    } else if (user) {
      // Load from context
      setFormData({
        ...formData,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || "",
        profileImage: user.avatar || "",
      });
      setProfileImage(user.avatar);
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "L'image ne doit pas dépasser 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        setFormData((prev) => ({ ...prev, profileImage: result }));
        setErrors((prev) => ({ ...prev, profileImage: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationSelect = (type: "personal" | "business") => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (type === "personal") {
            setFormData((prev) => ({
              ...prev,
              coordinates: { lat: latitude, lng: longitude },
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              businessCoordinates: { lat: latitude, lng: longitude },
            }));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setErrors((prev) => ({
            ...prev,
            location: "Impossible d'obtenir votre localisation",
          }));
        },
      );
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Basic validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    }

    // Password validation if provided
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Mot de passe actuel requis";
      }
      if (formData.newPassword.length < 6) {
        newErrors.newPassword =
          "Le mot de passe doit faire au moins 6 caractères";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }

    // User type specific validation
    if (user?.role === "merchant") {
      if (!formData.businessName.trim()) {
        newErrors.businessName = "Le nom de l'entreprise est requis";
      }
      if (!formData.businessType) {
        newErrors.businessType = "Le type d'activité est requis";
      }
      if (!formData.businessAddress.trim()) {
        newErrors.businessAddress = "L'adresse de la boutique est requise";
      }
    }

    if (user?.role === "delivery") {
      if (!formData.vehicleType) {
        newErrors.vehicleType = "Le type de véhicule est requis";
      }
      if (!formData.drivingLicense.trim()) {
        newErrors.drivingLicense = "Le permis de conduire est requis";
      }
      if (formData.availableAreas.length === 0) {
        newErrors.availableAreas =
          "Sélectionnez au moins une zone de livraison";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save to localStorage (in real app, API call)
      const updatedUser = {
        ...formData,
        userType: user?.role,
        id: user?.id || Date.now().toString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem("linka_user", JSON.stringify(updatedUser));

      setSuccessMessage("Profil mis à jour avec succès !");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Update error:", error);
      setErrors({
        general: "Erreur lors de la mise à jour. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackButton to="/profile" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Edit3 className="w-8 h-8 text-linka-green" />
                  Modifier mon profil
                </h1>
                <p className="text-gray-600 mt-2">
                  Mettez à jour vos informations personnelles et
                  professionnelles
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Annuler</span>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <p className="text-green-700 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 font-medium">{errors.general}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Photo de profil
            </h2>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-linka-green text-white p-3 rounded-full cursor-pointer hover:bg-linka-green/90 transition-colors">
                  <Upload className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Changer votre photo de profil
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Formats acceptés : JPG, PNG. Taille max : 5MB
                </p>
                {errors.profileImage && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.profileImage}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                    errors.firstName ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                    errors.lastName ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+225 XX XX XX XX XX"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                >
                  <option value="">Sélectionner</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Adresse et localisation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse complète
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Rue, quartier, points de repère..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Abidjan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commune
                  </label>
                  <select
                    name="commune"
                    value={formData.commune}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  >
                    <option value="">Choisir une commune</option>
                    {communes.map((commune) => (
                      <option key={commune} value={commune}>
                        {commune}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleLocationSelect("personal")}
                  className="flex items-center space-x-2 text-linka-green hover:text-linka-green/80"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Utiliser ma position actuelle</span>
                </button>
                {formData.coordinates.lat !== 0 && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    Position enregistrée
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* User Type Specific Sections */}
          {user.role === "client" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Préférences client
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact d'urgence
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="+225 XX XX XX XX XX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Catégories préférées
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={formData.favoriteCategories.includes(
                            category,
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                favoriteCategories: [
                                  ...prev.favoriteCategories,
                                  category,
                                ],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                favoriteCategories:
                                  prev.favoriteCategories.filter(
                                    (cat) => cat !== category,
                                  ),
                              }));
                            }
                          }}
                          className="w-4 h-4 text-linka-green border-gray-300 rounded focus:ring-linka-green"
                        />
                        <span className="text-sm text-gray-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Notifications
                      </h4>
                      <p className="text-sm text-gray-600">
                        Recevoir des notifications sur vos commandes
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          preferences: {
                            ...prev.preferences,
                            notifications: !prev.preferences.notifications,
                          },
                        }))
                      }
                      className={`
                        relative w-11 h-6 rounded-full transition-colors
                        ${formData.preferences.notifications ? "bg-linka-green" : "bg-gray-300"}
                      `}
                    >
                      <div
                        className={`
                          absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                          ${formData.preferences.notifications ? "translate-x-6" : "translate-x-1"}
                        `}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Marketing</h4>
                      <p className="text-sm text-gray-600">
                        Recevoir nos offres spéciales et promotions
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          preferences: {
                            ...prev.preferences,
                            marketing: !prev.preferences.marketing,
                          },
                        }))
                      }
                      className={`
                        relative w-11 h-6 rounded-full transition-colors
                        ${formData.preferences.marketing ? "bg-linka-green" : "bg-gray-300"}
                      `}
                    >
                      <div
                        className={`
                          absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                          ${formData.preferences.marketing ? "translate-x-6" : "translate-x-1"}
                        `}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {user.role === "merchant" && (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Informations commerciales
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'entreprise *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                          errors.businessName
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.businessName && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.businessName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type d'activité *
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                          errors.businessType
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Sélectionner une activité</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.businessType && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.businessType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description de l'entreprise
                    </label>
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Décrivez vos produits et services..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse de la boutique *
                    </label>
                    <textarea
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Adresse complète de votre boutique..."
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                        errors.businessAddress
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.businessAddress && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.businessAddress}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleLocationSelect("business")}
                      className="flex items-center space-x-2 text-linka-green hover:text-linka-green/80"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Localiser ma boutique sur la carte</span>
                    </button>
                    {formData.businessCoordinates.lat !== 0 && (
                      <p className="text-sm text-green-600 mt-2 flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        Boutique localisée
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de licence commerciale
                      </label>
                      <input
                        type="text"
                        name="businessLicense"
                        value={formData.businessLicense}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temps de préparation moyen (minutes)
                      </label>
                      <input
                        type="number"
                        name="expectedDeliveryTime"
                        value={formData.expectedDeliveryTime}
                        onChange={handleInputChange}
                        min="5"
                        max="120"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Horaires d'ouverture
                </h2>
                <div className="space-y-4">
                  {daysOfWeek.map((day) => (
                    <div key={day.key} className="flex items-center space-x-4">
                      <div className="w-20">
                        <span className="text-sm font-medium text-gray-700">
                          {day.label}
                        </span>
                      </div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            !formData.operatingHours[
                              day.key as keyof typeof formData.operatingHours
                            ].closed
                          }
                          onChange={(e) => {
                            const isOpen = e.target.checked;
                            setFormData((prev) => ({
                              ...prev,
                              operatingHours: {
                                ...prev.operatingHours,
                                [day.key]: {
                                  ...prev.operatingHours[
                                    day.key as keyof typeof prev.operatingHours
                                  ],
                                  closed: !isOpen,
                                },
                              },
                            }));
                          }}
                          className="w-4 h-4 text-linka-green border-gray-300 rounded focus:ring-linka-green mr-2"
                        />
                        <span className="text-sm text-gray-600">Ouvert</span>
                      </label>
                      {!formData.operatingHours[
                        day.key as keyof typeof formData.operatingHours
                      ].closed && (
                        <>
                          <input
                            type="time"
                            value={
                              formData.operatingHours[
                                day.key as keyof typeof formData.operatingHours
                              ].open
                            }
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                operatingHours: {
                                  ...prev.operatingHours,
                                  [day.key]: {
                                    ...prev.operatingHours[
                                      day.key as keyof typeof prev.operatingHours
                                    ],
                                    open: e.target.value,
                                  },
                                },
                              }));
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                          />
                          <span className="text-gray-500">à</span>
                          <input
                            type="time"
                            value={
                              formData.operatingHours[
                                day.key as keyof typeof formData.operatingHours
                              ].close
                            }
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                operatingHours: {
                                  ...prev.operatingHours,
                                  [day.key]: {
                                    ...prev.operatingHours[
                                      day.key as keyof typeof prev.operatingHours
                                    ],
                                    close: e.target.value,
                                  },
                                },
                              }));
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Informations bancaires
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du titulaire du compte
                    </label>
                    <input
                      type="text"
                      name="bankAccount.accountName"
                      value={formData.bankAccount.accountName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de compte
                    </label>
                    <input
                      type="text"
                      name="bankAccount.accountNumber"
                      value={formData.bankAccount.accountNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la banque
                    </label>
                    <input
                      type="text"
                      name="bankAccount.bankName"
                      value={formData.bankAccount.bankName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IBAN (optionnel)
                    </label>
                    <input
                      type="text"
                      name="bankAccount.iban"
                      value={formData.bankAccount.iban}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {user.role === "delivery" && (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Informations de livraison
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de véhicule *
                      </label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                          errors.vehicleType
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Choisir un véhicule</option>
                        {vehicleTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.vehicleType && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.vehicleType}
                        </p>
                      )}
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
                        placeholder="XX 0000 XX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de permis de conduire *
                      </label>
                      <input
                        type="text"
                        name="drivingLicense"
                        value={formData.drivingLicense}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                          errors.drivingLicense
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.drivingLicense && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.drivingLicense}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro d'assurance
                      </label>
                      <input
                        type="text"
                        name="insuranceNumber"
                        value={formData.insuranceNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure de début
                      </label>
                      <input
                        type="time"
                        name="workingHours.start"
                        value={formData.workingHours.start}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure de fin
                      </label>
                      <input
                        type="time"
                        name="workingHours.end"
                        value={formData.workingHours.end}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact d'urgence livreur
                    </label>
                    <input
                      type="tel"
                      name="emergencyContactDelivery"
                      value={formData.emergencyContactDelivery}
                      onChange={handleInputChange}
                      placeholder="+225 XX XX XX XX XX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Zones de livraison
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Communes que vous couvrez (sélection multiple) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {communes.map((commune) => (
                      <label
                        key={commune}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={commune}
                          checked={formData.availableAreas.includes(commune)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                availableAreas: [
                                  ...prev.availableAreas,
                                  commune,
                                ],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                availableAreas: prev.availableAreas.filter(
                                  (area) => area !== commune,
                                ),
                              }));
                            }
                          }}
                          className="w-4 h-4 text-linka-green border-gray-300 rounded focus:ring-linka-green"
                        />
                        <span className="text-sm text-gray-700">{commune}</span>
                      </label>
                    ))}
                  </div>
                  {errors.availableAreas && (
                    <p className="text-sm text-red-600 mt-2">
                      {errors.availableAreas}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Security Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sécurité et mot de passe
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Entrez votre mot de passe actuel pour le changer"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                      errors.currentPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Nouveau mot de passe"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                      errors.newPassword ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirmez le nouveau mot de passe"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2
                ${
                  isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-linka-green text-white hover:bg-linka-green/90"
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Mise à jour...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder les modifications</span>
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
