import Icon from "../Icon";
import "./button.css";

const Button = ({
  children,
  icon,
  onClick,
  className = "",
  variant = "primary",
}) => {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={20} color={"white"} />}
      <span>{children}</span>
    </button>
  );
};

export default Button;