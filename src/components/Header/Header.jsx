import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

import "./Header.css";

import logo from "../../images/Logo.svg";
import avatar from "../../images/Ellipse 18.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  handleProfileClick,
  openLoginModal,
  openRegistrationModal,
  weatherData,
  userData,
}) {
  // You need to destructure the setter functions as well if you want to use them
  const { currentUser, setCurrentUser, setIsLoggedIn } =
    useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to={"/"}>
        <img src={logo} alt="Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {currentUser ? ( //When user is LOGGED IN
        <div className="header__container">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <Link to={"/profile"} className="header__link">
            <div className="header__user-container">
              <button
                onClick={handleProfileClick}
                type="button"
                className="header__username"
              >
                {currentUser.name}
              </button>
              <img
                src={currentUser.avatar}
                alt={"Pic"}
                className="header__avatar"
              />
            </div>
          </Link>
        </div>
      ) : (
        //When user is LOGGED OUT
        <div>
          <button
            onClick={openRegistrationModal}
            type="button"
            // className="header__add-clothes-btn"
          >
            Sign Up
          </button>
          <button
            onClick={openLoginModal}
            type="button"
            // className="header__add-clothes-btn"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
