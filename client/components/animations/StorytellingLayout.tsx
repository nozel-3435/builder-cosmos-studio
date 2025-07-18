import React from "react";

interface StorytellingLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const StorytellingLayout: React.FC<StorytellingLayoutProps> = ({
  children,
  className = "",
}) => {
  return <div className={`storytelling-layout ${className}`}>{children}</div>;
};

export default StorytellingLayout;
