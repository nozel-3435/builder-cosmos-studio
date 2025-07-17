import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  to,
  label = "Retour",
  className = "",
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`
        inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 
        bg-white border border-gray-300 rounded-lg hover:bg-gray-50 
        transition-all duration-200 shadow-sm hover:shadow
        ${className}
      `}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default BackButton;
