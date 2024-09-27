import "./Header.css";

import logo from "../../images/Logo.svg";
import avatar from "../../images/Ellipse 18.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, handleProfileClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      <div className="header__user-container">
        {/* <p className="header__username">Terrence Tegegne</p> */}
        <button
          onClick={handleProfileClick}
          type="button"
          className="header__username"
        >
          Terrence Tegegne
        </button>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
