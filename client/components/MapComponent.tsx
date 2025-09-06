import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/lib/supabase";
import {
  MapPin,
  Store,
  Truck,
  User,
  Phone,
  Edit3,
  Trash2,
  Plus,
  Navigation,
} from "lucide-react";

// Fix pour les icônes par défaut de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

type Location = Database["public"]["Tables"]["locations"]["Row"];

// Icônes personnalisées pour chaque type d'utilisateur
const createCustomIcon = (
  role: "client" | "merchant" | "delivery",
  color: string,
) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      ">
        <span style="color: white; font-size: 14px;">
          ${role === "merchant" ? "🏪" : role === "delivery" ? "🚚" : "👤"}
        </span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const icons = {
  client: createCustomIcon("client", "#3B82F6"), // Bleu
  merchant: createCustomIcon("merchant", "#6FCF97"), // Vert
  delivery: createCustomIcon("delivery", "#F2994A"), // Orange
};

interface LocationFormData {
  name: string;
  role: "client" | "merchant" | "delivery";
  address: string;
  phone: string;
  description: string;
}

function LocationMarker({
  onAddLocation,
}: {
  onAddLocation: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onAddLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapComponentProps {
  height?: string;
  center?: [number, number];
  zoom?: number;
  showAddButton?: boolean;
  filterByRole?: "client" | "merchant" | "delivery" | null;
}

export default function MapComponent({
  height = "600px",
  center = [9.5511, 1.1901],
  zoom = 13,
  showAddButton = true,
  filterByRole = null,
}: MapComponentProps) {
  const { user } = useAuth();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState<LocationFormData>({
    name: "",
    role: "client",
    address: "",
    phone: "",
    description: "",
  });

  const mapRef = useRef<L.Map | null>(null);

  const handleLocate = () => {
    if (!mapRef.current) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          mapRef.current!.setView([coords.latitude, coords.longitude], 16);
        },
        () => {
          alert("Impossible d'obtenir votre position");
        },
      );
    } else {
      alert("Géolocalisation non supportée par votre navigateur");
    }
  };

  const handleReset = () => {
    if (!mapRef.current) return;
    mapRef.current.setView(center as any, zoom);
  };

  // Charger les locations existantes
  useEffect(() => {
    fetchLocations();
  }, [filterByRole]);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("locations")
        .select("*")
        .eq("is_active", true);
      if (filterByRole) {
        query = query.eq("role", filterByRole);
      }
      const { data, error } = await query;
      if (error) throw error;
      setLocations((data as any) || []);
    } catch (error) {
      const message = (error as any)?.message ?? String(error);
      console.error("Erreur lors du chargement des locations:", message);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (!user) {
      alert("Vous devez être connecté pour ajouter une location");
      return;
    }
    setSelectedPosition([lat, lng]);
    setShowForm(true);
    setEditingLocation(null);
    setFormData({
      name: "",
      role: (user?.role as "client" | "merchant" | "delivery") || "client",
      address: "",
      phone: user?.phone || "",
      description: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPosition && !editingLocation) return;

    try {
      const locationData = {
        user_id: user?.id,
        role: formData.role,
        name: formData.name,
        latitude: editingLocation
          ? editingLocation.latitude
          : selectedPosition![0],
        longitude: editingLocation
          ? editingLocation.longitude
          : selectedPosition![1],
        address: formData.address,
        phone: formData.phone,
        description: formData.description,
        is_active: true,
      };

      if (editingLocation) {
        const { error } = await supabase
          .from("locations")
          .update(locationData)
          .eq("id", editingLocation.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("locations")
          .insert([locationData]);
        if (error) throw error;
      }

      // Recharger les locations
      await fetchLocations();

      // Reset form
      setShowForm(false);
      setSelectedPosition(null);
      setEditingLocation(null);
      setFormData({
        name: "",
        role: "client",
        address: "",
        phone: "",
        description: "",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      alert("Erreur lors de la sauvegarde de la location");
    }
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      role: location.role as "client" | "merchant" | "delivery",
      address: location.address || "",
      phone: location.phone || "",
      description: location.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (locationId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette location ?")) return;

    try {
      const { error } = await supabase
        .from("locations")
        .update({ is_active: false })
        .eq("id", locationId);
      if (error) throw error;
      await fetchLocations();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression");
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
      default:
        return role;
    }
  };

  return (
    <div className="relative">
      {/* Bouton d'aide */}
      {showAddButton && (
        <div
          className={`absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-3`}
        >
          <p className="text-sm text-gray-600 mb-2">
            <strong>💡 Comment utiliser la carte :</strong>
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Cliquez sur la carte pour ajouter votre position</li>
            <li>• Utilisez les icônes pour filtrer par type</li>
            <li>• Cliquez sur un marqueur pour voir les détails</li>
          </ul>
        </div>
      )}

      {/* Carte */}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width: "100%" }}
        className="rounded-lg shadow-lg"
        whenReady={(e) => {
          mapRef.current = e.target as any;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {showAddButton && <LocationMarker onAddLocation={handleMapClick} />}

        {/* Marqueurs pour chaque location */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={icons[location.role as keyof typeof icons]}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {location.name}
                  </h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {getRoleLabel(location.role)}
                  </span>
                </div>

                {location.address && (
                  <p className="text-sm text-gray-600 mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {location.address}
                  </p>
                )}

                {location.phone && (
                  <p className="text-sm text-gray-600 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    {location.phone}
                  </p>
                )}

                {location.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {location.description}
                  </p>
                )}

                {user && user.id === location.user_id && (
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleEdit(location)}
                      className="flex items-center space-x-1 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Modifier</span>
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="flex items-center space-x-1 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Marqueur temporaire pour la nouvelle position */}
        {selectedPosition && (
          <Marker
            position={selectedPosition}
            icon={L.divIcon({
              className: "custom-div-icon",
              html: `
                <div style="
                  background-color: #EF4444;
                  width: 35px;
                  height: 35px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                  animation: pulse 2s infinite;
                ">
                  <span style="color: white; font-size: 16px;">📍</span>
                </div>
              `,
              iconSize: [35, 35],
              iconAnchor: [17.5, 17.5],
            })}
          >
            <Popup>
              <div className="p-2">
                <p className="text-sm font-medium">Nouvelle position</p>
                <p className="text-xs text-gray-600">
                  Lat: {selectedPosition[0].toFixed(6)}
                  <br />
                  Lng: {selectedPosition[1].toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Contrôles de carte */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleLocate}
            className="p-2 hover:bg-gray-100 rounded"
            title="Ma position"
          >
            <Navigation className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-gray-100 rounded"
            title="Recentrer"
          >
            <MapPin className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Légende */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Clients</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Commerçants</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span>Livreurs</span>
        </div>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingLocation
                  ? "Modifier la location"
                  : "Ajouter une location"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom / Commerce *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre nom ou nom du commerce"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="client">Client</option>
                    <option value="merchant">Commerçant</option>
                    <option value="delivery">Livreur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Adresse complète"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+228 XX XX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Description, services offerts, horaires..."
                  />
                </div>

                {!editingLocation && selectedPosition && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <strong>Position:</strong>
                    <br />
                    Latitude: {selectedPosition[0].toFixed(6)}
                    <br />
                    Longitude: {selectedPosition[1].toFixed(6)}
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedPosition(null);
                      setEditingLocation(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingLocation ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Styles pour l'animation pulse */}
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
