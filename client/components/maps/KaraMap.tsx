import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Store, MapPin, Navigation, Package } from "lucide-react";

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Kara, Togo coordinates and neighborhoods
const KARA_CENTER = {
  lat: 9.5515,
  lng: 1.1812,
};

const KARA_NEIGHBORHOODS = [
  { name: "Centre-ville", lat: 9.5515, lng: 1.1812 },
  { name: "Kpéwa", lat: 9.5625, lng: 1.189 },
  { name: "Tchré", lat: 9.5445, lng: 1.1734 },
  { name: "Ramco", lat: 9.538, lng: 1.1656 },
  { name: "Kassena", lat: 9.5678, lng: 1.1923 },
  { name: "Kétao", lat: 9.5234, lng: 1.1567 },
  { name: "Agbala", lat: 9.5789, lng: 1.2045 },
  { name: "Lama", lat: 9.5123, lng: 1.1456 },
  { name: "Dongoyo", lat: 9.589, lng: 1.2156 },
  { name: "Katanga", lat: 9.5034, lng: 1.1345 },
  { name: "Pierreville", lat: 9.5456, lng: 1.1978 },
  { name: "Adidogomé", lat: 9.5567, lng: 1.2089 },
];

// Sample merchant data with realistic Kara locations
const SAMPLE_MERCHANTS = [
  {
    id: 1,
    name: "Boutique Kara Centre",
    category: "Mode & Vêtements",
    address: "Avenue de l'Indépendance, Centre-ville",
    lat: 9.5515,
    lng: 1.1812,
    rating: 4.5,
    products: 45,
    status: "ouvert",
  },
  {
    id: 2,
    name: "Marché des Saveurs",
    category: "Alimentation",
    address: "Quartier Kpéwa",
    lat: 9.5625,
    lng: 1.189,
    rating: 4.2,
    products: 78,
    status: "ouvert",
  },
  {
    id: 3,
    name: "Tech Solutions Kara",
    category: "Électronique",
    address: "Zone Commerciale Tchré",
    lat: 9.5445,
    lng: 1.1734,
    rating: 4.7,
    products: 32,
    status: "fermé",
  },
  {
    id: 4,
    name: "Pharmacie Ramco",
    category: "Santé & Beauté",
    address: "Carrefour Ramco",
    lat: 9.538,
    lng: 1.1656,
    rating: 4.8,
    products: 156,
    status: "ouvert",
  },
  {
    id: 5,
    name: "Artisanat Kassena",
    category: "Artisanat Local",
    address: "Village Kassena",
    lat: 9.5678,
    lng: 1.1923,
    rating: 4.3,
    products: 23,
    status: "ouvert",
  },
  {
    id: 6,
    name: "Garage Moderne Kétao",
    category: "Automobile",
    address: "Route Nationale, Kétao",
    lat: 9.5234,
    lng: 1.1567,
    rating: 4.1,
    products: 89,
    status: "ouvert",
  },
];

// Custom marker icons
const createCustomIcon = (color: string, iconClass: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
      ">
        ${iconClass}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const merchantIcon = createCustomIcon("#3B82F6", "🏪");
const deliveryIcon = createCustomIcon("#10B981", "🚚");
const userIcon = createCustomIcon("#F59E0B", "👤");

interface KaraMapProps {
  viewMode?: "merchants" | "delivery" | "overview";
  selectedMerchant?: number | null;
  showUserLocation?: boolean;
  onMerchantSelect?: (merchantId: number) => void;
}

const MapController: React.FC<{
  center: [number, number];
  zoom: number;
}> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const KaraMap: React.FC<KaraMapProps> = ({
  viewMode = "overview",
  selectedMerchant = null,
  showUserLocation = true,
  onMerchantSelect,
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    KARA_CENTER.lat,
    KARA_CENTER.lng,
  ]);
  const [mapZoom, setMapZoom] = useState(13);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Get user's current location
  useEffect(() => {
    if (showUserLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // If user is in Kara area, use their actual location
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // Check if user is roughly in Kara area (within ~50km)
          if (
            Math.abs(userLat - KARA_CENTER.lat) < 0.5 &&
            Math.abs(userLng - KARA_CENTER.lng) < 0.5
          ) {
            setUserLocation({ lat: userLat, lng: userLng });
          } else {
            // Default to Centre-ville if not in Kara
            setUserLocation(KARA_CENTER);
          }
        },
        (error) => {
          console.warn("Geolocation error:", error);
          // Default to Centre-ville
          setUserLocation(KARA_CENTER);
        },
      );
    }
  }, [showUserLocation]);

  // Focus on selected merchant
  useEffect(() => {
    if (selectedMerchant) {
      const merchant = SAMPLE_MERCHANTS.find((m) => m.id === selectedMerchant);
      if (merchant) {
        setMapCenter([merchant.lat, merchant.lng]);
        setMapZoom(16);
      }
    }
  }, [selectedMerchant]);

  const filteredMerchants =
    viewMode === "merchants"
      ? SAMPLE_MERCHANTS.filter((m) => m.status === "ouvert")
      : SAMPLE_MERCHANTS;

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full rounded-lg"
        zoomControl={true}
      >
        <MapController center={mapCenter} zoom={mapZoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Merchant Markers */}
        {filteredMerchants.map((merchant) => (
          <Marker
            key={merchant.id}
            position={[merchant.lat, merchant.lng]}
            icon={merchantIcon}
            eventHandlers={{
              click: () => {
                if (onMerchantSelect) {
                  onMerchantSelect(merchant.id);
                }
              },
            }}
          >
            <Popup className="merchant-popup">
              <div className="p-2 min-w-[200px]">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Store className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {merchant.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {merchant.category}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{merchant.address}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < Math.floor(merchant.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {merchant.rating}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          merchant.status === "ouvert"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {merchant.status === "ouvert" ? "Ouvert" : "Fermé"}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <button className="w-full bg-blue-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Voir la boutique
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User Location Marker */}
        {userLocation && showUserLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-amber-100 rounded">
                    <Navigation className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Votre position
                    </h4>
                    <p className="text-sm text-gray-600">Kara, Togo</p>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Delivery Routes (if in delivery mode) */}
        {viewMode === "delivery" && (
          <>
            {/* Sample delivery markers */}
            <Marker position={[9.56, 1.185]} icon={deliveryIcon}>
              <Popup>
                <div className="p-2">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-green-600" />
                    <div>
                      <h4 className="font-medium">Livraison en cours</h4>
                      <p className="text-sm text-gray-600">
                        Vers Quartier Kpéwa
                      </p>
                      <p className="text-xs text-green-600">
                        Arrivée estimée: 15 min
                      </p>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-medium text-gray-900 mb-2 text-sm">Légende</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
              🏪
            </div>
            <span className="text-gray-700">Commerçants</span>
          </div>
          {showUserLocation && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">
                👤
              </div>
              <span className="text-gray-700">Votre position</span>
            </div>
          )}
          {viewMode === "delivery" && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                🚚
              </div>
              <span className="text-gray-700">Livreurs</span>
            </div>
          )}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 z-[1000]">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => {
              setMapCenter([KARA_CENTER.lat, KARA_CENTER.lng]);
              setMapZoom(13);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Centrer sur Kara"
          >
            <MapPin className="h-4 w-4 text-gray-600" />
          </button>
          {userLocation && (
            <button
              onClick={() => {
                setMapCenter([userLocation.lat, userLocation.lng]);
                setMapZoom(15);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Ma position"
            >
              <Navigation className="h-4 w-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KaraMap;
