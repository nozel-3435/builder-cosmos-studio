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

// Logo principal LinkaMarket - utilise le vrai logo professionnel
export const LinkaMarketLogo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  variant = "full",
  theme = "light",
}) => {
  const iconSize = sizeClasses[size];
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const greenColor = theme === "dark" ? "#1E6F9F" : "#1E6F9F";

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
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fd9c69c3f1ccd486d8ee7f60471ffc975%2F239198e82d8f4671bfb3d9caaade0653?format=webp&width=800"
          alt="LinkaMarket"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={iconSize}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fd9c69c3f1ccd486d8ee7f60471ffc975%2F239198e82d8f4671bfb3d9caaade0653?format=webp&width=800"
          alt="LinkaMarket"
          className="w-full h-full object-contain"
        />
      </div>
      <span className={`font-bold ${textColor} text-xl`}>
        Linka<span style={{ color: greenColor }}>Market</span>
      </span>
    </div>
  );
};

// Logo LinkaDrop - utilise le vrai logo professionnel
export const LinkaDropLogo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  variant = "full",
  theme = "light",
}) => {
  const iconSize = sizeClasses[size];
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const greenColor = theme === "dark" ? "#1E6F9F" : "#1E6F9F";

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
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fd9c69c3f1ccd486d8ee7f60471ffc975%2F239198e82d8f4671bfb3d9caaade0653?format=webp&width=800"
          alt="LinkaDrop"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={iconSize}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fd9c69c3f1ccd486d8ee7f60471ffc975%2F239198e82d8f4671bfb3d9caaade0653?format=webp&width=800"
          alt="LinkaDrop"
          className="w-full h-full object-contain"
        />
      </div>
      <span className={`font-bold ${textColor} text-xl`}>
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
  const greenColor = theme === "dark" ? "#1E6F9F" : "#1E6F9F";
  const orangeColor = theme === "dark" ? "#E53935" : "#E53935";

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
          <stop offset="0%" stopColor="#1E6F9F" />
          <stop offset="100%" stopColor="#E53935" />
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
        {/* Simple cart icon */}
        <rect x="3" y="11" width="14" height="6" rx="2" fill="white" fillOpacity="0.9" />
        <circle cx="7" cy="19" r="2" fill="white" />
        <circle cx="15" cy="19" r="2" fill="white" />
        <rect x="2" y="6" width="3" height="6" rx="1" fill="white" />
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
