import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Store,
  Truck,
  Shield,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Camera,
  Clock,
  Banknote,
  Users,
  Package,
  Eye,
  EyeOff,
  Upload,
  Check,
} from "lucide-react";

interface SpecializedRegisterProps {
  initialUserType?: "client" | "merchant" | "delivery" | "admin";
}

const SpecializedRegister: React.FC<SpecializedRegisterProps> = ({
  initialUserType = "client",
}) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(initialUserType);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Basic Info (All users)
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    profileImage: "",

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
    },

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

  const userTypes = [
    {
      type: "client",
      name: "Client",
      description: "Je veux acheter des produits",
      icon: User,
      color: "bg-blue-100 text-blue-600",
    },
    {
      type: "merchant",
      name: "Commerçant",
      description: "Je veux vendre mes produits",
      icon: Store,
      color: "bg-linka-green/10 text-linka-green",
    },
    {
      type: "delivery",
      name: "Livreur",
      description: "Je veux livrer des commandes",
      icon: Truck,
      color: "bg-linka-orange/10 text-linka-orange",
    },
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]:
            type === "checkbox"
              ? (e.target as HTMLInputElement).checked
              : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        setFormData((prev) => ({ ...prev, profileImage: result }));
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
          alert(
            "Impossible d'obtenir votre localisation. Veuillez l'entrer manuellement.",
          );
        },
      );
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return (
          formData.phone &&
          formData.address &&
          formData.city &&
          formData.commune
        );
      case 3:
        if (userType === "merchant") {
          return (
            formData.businessName &&
            formData.businessType &&
            formData.businessAddress
          );
        }
        if (userType === "delivery") {
          return formData.vehicleType && formData.drivingLicense;
        }
        return true;
      default:
        return true;
    }
  };

  const getTotalSteps = () => {
    switch (userType) {
      case "merchant":
        return 4;
      case "delivery":
        return 4;
      default:
        return 3;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store user data in localStorage for demo
      const userData = {
        ...formData,
        userType,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("linka_user", JSON.stringify(userData));

      // Navigate to appropriate dashboard
      switch (userType) {
        case "merchant":
          navigate("/merchant");
          break;
        case "delivery":
          navigate("/delivery");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Rejoignez LinkaMarket
        </h2>
        <p className="text-gray-600">Choisissez votre type de compte</p>
      </div>

      <div className="grid gap-4">
        {userTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.type}
              type="button"
              onClick={() => setUserType(type.type as any)}
              className={`
                p-6 border-2 rounded-xl transition-all text-left
                ${
                  userType === type.type
                    ? "border-linka-green bg-linka-green/5"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${type.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informations personnelles
        </h2>
        <p className="text-gray-600">Entrez vos informations de base</p>
      </div>

      {/* Profile Image Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-linka-green text-white p-2 rounded-full cursor-pointer hover:bg-linka-green/90">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prénom *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
            required
          />
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
            required
          />
        </div>
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
              required
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
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirmer le mot de passe *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
  );

  const renderAddressStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Adresse et contact
        </h2>
        <p className="text-gray-600">Où pouvons-nous vous joindre ?</p>
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse complète *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows={3}
          placeholder="Rue, quartier, points de repère..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Abidjan"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Commune *
          </label>
          <select
            name="commune"
            value={formData.commune}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
            required
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

      {userType === "client" && (
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
      )}
    </div>
  );

  const renderSpecializedStep = () => {
    if (userType === "merchant") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Informations commerciales
            </h2>
            <p className="text-gray-600">Parlez-nous de votre entreprise</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'entreprise *
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type d'activité *
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
              required
            >
              <option value="">Sélectionner une activité</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
              required
            />
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
      );
    }

    if (userType === "delivery") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Informations de livraison
            </h2>
            <p className="text-gray-600">
              Détails sur votre moyen de transport
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de véhicule *
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
              required
            >
              <option value="">Choisir un véhicule</option>
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
              placeholder="XX 0000 XX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de permis de conduire *
            </label>
            <input
              type="text"
              name="drivingLicense"
              value={formData.drivingLicense}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linka-green focus:border-transparent"
              required
            />
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

          <div className="grid grid-cols-2 gap-4">
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
      );
    }

    return null;
  };

  const renderFinalStep = () => {
    if (userType === "merchant") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Informations bancaires
            </h2>
            <p className="text-gray-600">Pour recevoir vos paiements</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
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

          <div className="bg-linka-green/5 border border-linka-green/20 rounded-lg p-4">
            <h4 className="font-medium text-linka-green mb-2">
              Informations importantes :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Vos informations bancaires sont sécurisées et cryptées</li>
              <li>• Les paiements sont effectués chaque semaine</li>
              <li>• Commission LinkaMarket : 5% par transaction</li>
              <li>• Vous pouvez modifier ces informations plus tard</li>
            </ul>
          </div>
        </div>
      );
    }

    if (userType === "delivery") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Zones de livraison
            </h2>
            <p className="text-gray-600">Où souhaitez-vous livrer ?</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Communes que vous couvrez (sélection multiple)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {communes.map((commune) => (
                <label key={commune} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={commune}
                    checked={formData.availableAreas.includes(commune)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          availableAreas: [...prev.availableAreas, commune],
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
          </div>

          <div className="bg-linka-orange/5 border border-linka-orange/20 rounded-lg p-4">
            <h4 className="font-medium text-linka-orange mb-2">
              Informations livreur :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Rémunération : 500-1500 FCFA par livraison</li>
              <li>• Bonus de performance disponibles</li>
              <li>• Assurance livreur incluse</li>
              <li>• Formation gratuite fournie</li>
              <li>• Support technique 24/7</li>
            </ul>
          </div>
        </div>
      );
    }

    // Client final step
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Préférences</h2>
          <p className="text-gray-600">Personnalisez votre expérience</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Notifications push</h4>
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
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-linka-green/10 px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-linka-green">
                Étape {step} sur {getTotalSteps()}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((step / getTotalSteps()) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-linka-green h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(step / getTotalSteps()) * 100}%`,
                }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {step === 0 && renderUserTypeSelection()}
            {step === 1 && renderBasicInfoStep()}
            {step === 2 && renderAddressStep()}
            {step === 3 && renderSpecializedStep()}
            {step === 4 && renderFinalStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Précédent
                </button>
              )}

              {step < getTotalSteps() ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 0 || validateStep()) {
                      setStep(step + 1);
                    }
                  }}
                  disabled={step > 0 && !validateStep()}
                  className={`
                    ml-auto px-6 py-3 rounded-lg font-medium transition-colors
                    ${
                      step > 0 && !validateStep()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-linka-green text-white hover:bg-linka-green/90"
                    }
                  `}
                >
                  Continuer
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !validateStep()}
                  className={`
                    ml-auto px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2
                    ${
                      isLoading || !validateStep()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-linka-green text-white hover:bg-linka-green/90"
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Création du compte...</span>
                    </>
                  ) : (
                    <span>Créer mon compte</span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpecializedRegister;
