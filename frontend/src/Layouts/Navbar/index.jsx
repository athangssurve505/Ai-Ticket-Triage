import Icon from "../../shared/Components/Icon"
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Icon
          name="RiHeadphoneLine"
          className="navbar-icon"
          size={38}
        />

        <h1 className="navbar-title">TriageAI</h1>
      </div>
    </nav>
  );
};

export default Navbar;