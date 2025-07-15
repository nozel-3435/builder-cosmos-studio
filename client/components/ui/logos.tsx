import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "text";
  theme?: "light" | "dark";
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

// Logo principal LinkaMarket - inspiré de la loupe avec boutique
export const LinkaMarketLogo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  variant = "full",
  theme = "light",
}) => {
  const iconSize = sizeClasses[size];
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const greenColor = theme === "dark" ? "#6FCF97" : "#6FCF97";
  const orangeColor = theme === "dark" ? "#F2994A" : "#F2994A";

  if (variant === "text") {
    return (
      <span className={`font-bold ${textColor} ${className}`}>
        Linka<span style={{ color: greenColor }}>Market</span>
      </span>
    );
  }

  if (variant === "icon") {
    return (
      <div className={`${iconSize} ${className} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Cercle de base de la loupe */}
          <circle
            cx="40"
            cy="40"
            r="30"
            fill="none"
            stroke="#1F2937"
            strokeWidth="6"
          />

          {/* Intérieur de la loupe avec fond clair */}
          <circle cx="40" cy="40" r="24" fill="#F9FAFB" />

          {/* Store/Boutique à l'intérieur */}
          <g transform="translate(28, 28)">
            {/* Stores/Auvents oranges */}
            <rect x="4" y="8" width="4" height="8" rx="2" fill={orangeColor} />
            <rect x="9" y="8" width="4" height="8" rx="2" fill={orangeColor} />
            <rect x="14" y="8" width="4" height="8" rx="2" fill={orangeColor} />
            <rect x="19" y="8" width="4" height="8" rx="2" fill={orangeColor} />

            {/* Panier/container vert */}
            <rect x="6" y="16" width="12" height="8" rx="2" fill={greenColor} />
            <rect x="8" y="18" width="2" height="4" fill="white" />
            <rect x="11" y="18" width="2" height="4" fill="white" />
            <rect x="14" y="18" width="2" height="4" fill="white" />
          </g>

          {/* Manche de la loupe */}
          <line
            x1="62"
            y1="62"
            x2="85"
            y2="85"
            stroke="#1F2937"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Ombre légère */}
          <ellipse cx="50" cy="90" rx="15" ry="3" fill="#00000010" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={iconSize}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="40"
            cy="40"
            r="30"
            fill="none"
            stroke="#1F2937"
            strokeWidth="6"
          />
          <circle cx="40" cy="40" r="24" fill="#F9FAFB" />
          <g transform="translate(28, 28)">
            <rect x="4" y="8" width="4" height="8" rx="2" fill={orangeColor} />
            <rect x="9" y="8" width="4" height="8" rx="2" fill={orangeColor} />
            <rect x="14" y="8" width="4" height="8" rx="2" fill={orangeColor} />
            <rect x="19" y="8" width="4" height="8" rx="2" fill={orangeColor} />
            <rect x="6" y="16" width="12" height="8" rx="2" fill={greenColor} />
            <rect x="8" y="18" width="2" height="4" fill="white" />
            <rect x="11" y="18" width="2" height="4" fill="white" />
            <rect x="14" y="18" width="2" height="4" fill="white" />
          </g>
          <line
            x1="62"
            y1="62"
            x2="85"
            y2="85"
            stroke="#1F2937"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <ellipse cx="50" cy="90" rx="15" ry="3" fill="#00000010" />
        </svg>
      </div>
      <span className={`font-bold ${textColor}`}>
        Linka<span style={{ color: greenColor }}>Market</span>
      </span>
    </div>
  );
};

// Logo LinkaDrop - inspiré de la loupe avec colis
export const LinkaDropLogo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  variant = "full",
  theme = "light",
}) => {
  const iconSize = sizeClasses[size];
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const greenColor = theme === "dark" ? "#6FCF97" : "#6FCF97";

  if (variant === "text") {
    return (
      <span className={`font-bold ${textColor} ${className}`}>
        Linka<span style={{ color: greenColor }}>Drop</span>
      </span>
    );
  }

  if (variant === "icon") {
    return (
      <div className={`${iconSize} ${className} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Cercle de base de la loupe */}
          <circle
            cx="40"
            cy="40"
            r="30"
            fill="none"
            stroke="#1F2937"
            strokeWidth="6"
          />

          {/* Intérieur de la loupe avec fond clair */}
          <circle cx="40" cy="40" r="24" fill="#F9FAFB" />

          {/* Package hexagonal à l'intérieur */}
          <g transform="translate(32, 32)">
            {/* Hexagone vert */}
            <path
              d="M8 4 L14 0 L20 4 L20 12 L14 16 L8 12 Z"
              fill={greenColor}
            />
            {/* Détails du package */}
            <path
              d="M8 4 L14 8 L20 4"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <path d="M14 8 L14 16" fill="none" stroke="white" strokeWidth="2" />
          </g>

          {/* Manche de la loupe */}
          <line
            x1="62"
            y1="62"
            x2="85"
            y2="85"
            stroke="#1F2937"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Ombre légère */}
          <ellipse cx="50" cy="90" rx="15" ry="3" fill="#00000010" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={iconSize}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="40"
            cy="40"
            r="30"
            fill="none"
            stroke="#1F2937"
            strokeWidth="6"
          />
          <circle cx="40" cy="40" r="24" fill="#F9FAFB" />
          <g transform="translate(32, 32)">
            <path
              d="M8 4 L14 0 L20 4 L20 12 L14 16 L8 12 Z"
              fill={greenColor}
            />
            <path
              d="M8 4 L14 8 L20 4"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <path d="M14 8 L14 16" fill="none" stroke="white" strokeWidth="2" />
          </g>
          <line
            x1="62"
            y1="62"
            x2="85"
            y2="85"
            stroke="#1F2937"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <ellipse cx="50" cy="90" rx="15" ry="3" fill="#00000010" />
        </svg>
      </div>
      <span className={`font-bold ${textColor}`}>
        Linka<span style={{ color: greenColor }}>Drop</span>
      </span>
    </div>
  );
};

// Logo compact pour mobile
export const CompactLogo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  theme = "light",
}) => {
  const iconSize = sizeClasses[size];
  const greenColor = theme === "dark" ? "#6FCF97" : "#6FCF97";
  const orangeColor = theme === "dark" ? "#F2994A" : "#F2994A";

  return (
    <div className={`${iconSize} ${className} relative`}>
      <div className="w-full h-full rounded-lg bg-gradient-to-br from-linka-green to-linka-orange flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 24 24" className="w-3/4 h-3/4 text-white">
          {/* Simplified store icon */}
          <path d="M3 7h18l-1 8H4L3 7z" fill="currentColor" fillOpacity="0.8" />
          <rect x="8" y="3" width="2" height="4" fill="currentColor" />
          <rect x="11" y="3" width="2" height="4" fill="currentColor" />
          <rect x="14" y="3" width="2" height="4" fill="currentColor" />
          <circle cx="8" cy="18" r="1" fill="currentColor" />
          <circle cx="16" cy="18" r="1" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

// Logo pour les documents et branding
export const BrandLogo: React.FC<{
  className?: string;
  showTagline?: boolean;
  theme?: "light" | "dark";
}> = ({ className = "", showTagline = false, theme = "light" }) => {
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subtitleColor = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`text-center ${className}`}>
      <LinkaMarketLogo size="xl" variant="full" theme={theme} />
      {showTagline && (
        <div className="mt-2">
          <p className={`text-lg font-medium ${textColor}`}>
            Connecter • Commercer • Livrer
          </p>
          <p className={`text-sm ${subtitleColor} mt-1`}>
            La plateforme de commerce local à Kara, Togo
          </p>
        </div>
      )}
    </div>
  );
};

// Logo de chargement avec animation
export const LoadingLogo: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`${className} flex flex-col items-center justify-center`}>
      <div className="relative">
        <LinkaMarketLogo size="lg" variant="icon" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-linka-green animate-spin"></div>
      </div>
      <p className="mt-3 text-sm text-gray-600 animate-pulse">Chargement...</p>
    </div>
  );
};

// Logo pour favicons et apps
export const FaviconLogo: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient
          id="faviconGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#6FCF97" />
          <stop offset="100%" stopColor="#F2994A" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="url(#faviconGradient)" />
      <g transform="translate(6, 6)">
        {/* Simplified store */}
        <rect
          x="2"
          y="8"
          width="16"
          height="8"
          rx="2"
          fill="white"
          fillOpacity="0.9"
        />
        <rect x="4" y="4" width="2" height="4" rx="1" fill="white" />
        <rect x="7" y="4" width="2" height="4" rx="1" fill="white" />
        <rect x="10" y="4" width="2" height="4" rx="1" fill="white" />
        <rect x="13" y="4" width="2" height="4" rx="1" fill="white" />
        {/* L letter */}
        <text
          x="16"
          y="14"
          fontSize="8"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
        >
          L
        </text>
      </g>
    </svg>
  );
};

export default {
  LinkaMarketLogo,
  LinkaDropLogo,
  CompactLogo,
  BrandLogo,
  LoadingLogo,
  FaviconLogo,
};
