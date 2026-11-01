import Icon from "../Icon";
import "./button.css";

const Button = ({
   children,
  icon,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
}) => {
  return (
      <button
    type={type}
    className={`btn btn-${variant} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
      {icon && <Icon name={icon} size={20} color={"white"} />}
      <span>{children}</span>
    </button>
  );
};

export default Button;