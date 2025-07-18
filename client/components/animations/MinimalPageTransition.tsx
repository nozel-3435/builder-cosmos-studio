import React from "react";

interface MinimalPageTransitionProps {
  children: React.ReactNode;
}

const MinimalPageTransition: React.FC<MinimalPageTransitionProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export default MinimalPageTransition;
