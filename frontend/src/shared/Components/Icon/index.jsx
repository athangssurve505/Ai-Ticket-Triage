import "./icon.css";
import * as RemixIcon from "@remixicon/react";

const Icon = ({ name, className = "navbar-icon", size = 24, color }) => {
  const IconComponent = RemixIcon[name];

  if (!IconComponent) return null;

  return (
    <IconComponent
      className={className}
      size={size}
      color={color}
    />
  );
};

export default Icon;