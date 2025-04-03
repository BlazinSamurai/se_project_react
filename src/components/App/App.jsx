// wrapper for the whole application
// therefore, is the parent of other top-level components
import React, { useContext, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey, temp } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../Context/CurrentTempUnitContext";
import {
  CurrentUserContext,
  CurrentUserProvider,
} from "../../Context/CurrentUserContext";
import { signUp, signIn, authorize } from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";

// imports all exported members (variables, functions, components, etc.)
// from the specified module and assigns them as properties of a single
// object named api
import * as api from "../../utils/api";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfile/EditProfileModal";
import LogInModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function AppContent() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [selectedCard, setSelectedCard] = useState({
    link: "",
    name: "",
    weather: "",
    _id: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [currentTempUnit, setTempToggle] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  // userData: is typically a temporary state used to store form
  // data during the registration/login process
  const [userData, setUserData] = useState({ username: "", email: "" });
  const { currentUser, isLoggedIn, setCurrentUser, setIsLoggedIn } =
    useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleProfileClick = () => {
    setActiveModal("profile");
  };

  const handleEditProfile = () => {
    setActiveModal("editProfile");
  };

  const openRegistrationModal = () => {
    setActiveModal("register");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") {
      setTempToggle("F");
    } else {
      setTempToggle("C");
    }
  };

  const handleAddItemSubmit = (name, weather, link) => {
    api
      .postItems({ name, weather, link })
      .then((item) => {
        setClothingItems([item.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    api
      .deleteItems(id)
      .then(() => {
        const newClothingItems = clothingItems.filter((item) => item._id != id);
        setClothingItems([...newClothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistration = (email, password, name, avatarUrl) => {
    signUp({ email, password, name, avatarUrl })
      .then(() => {
        console.log("REGISTRATION SUCCESSFUL!");
        navigate("/login");
      })
      .catch(console.error);
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData.user);
    setIsLoggedIn(true);
    setToken(userData.jwt);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  // handleLogin accepts one parameter: an object with two properties.
  const handleLoginSubmit = ({ username, password }) => {
    // If username or password empty, return without sending a request.
    if (!username || !password) {
      return;
    }

    // We pass the username and password as positional arguments. The
    // authorize function is set up to rename `username` to `identifier`
    // before sending a request to the server, because that is what the
    // API is expecting.
    authorize(username, password)
      .then((data) => {
        if (data.jwt) {
          console.log(data.jwt);
          // Save the token to local storage
          // setToken(data.jwt);
          // setUserData(data.user);
          handleLogin(data);

          // After login, instead of navigating always to /profile,
          // navigate to the location that is stored in state. If
          // there is no stored location, we default to
          // redirecting to /profile.
          const redirectPath = location.state?.from?.pathname || "/profile";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  // we can use a useEffect with an empty dependency array to
  // specify code that runs a single time when the component
  // first loads.
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // we need to specify a dependency, a variable which
  // will cause the hook to be executed whenever it is changed
  // These variables can be props or the internal state
  // variables of the current component
  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems([...data]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      setCurrentUser(null); //not a function
      setIsLoggedIn(false); //not a function
      return;
    }

    // console.log(`token?(jwt): ${jwt}`);
    // Call the function, passing it the JWT.
    api
      .getUserInfo(jwt)
      .then((data) => {
        handleLogin(data);
        // console.log(`data from useEffect: ${data}`);
      })
      .catch(console.error);
  }, []);

  return (
    // <CurrentUserContext.Providervalue= {{ currentUser, isLoggedIn, setCurrentUser, setIsLoggedIn }}>
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page_content">
          <Header
            handleAddClick={handleAddClick}
            handleProfileClick={handleProfileClick}
            weatherData={weatherData}
            userData={userData}
          />

          <Routes>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onAddNewClick={handleAddClick}
                    editProfile={handleEditProfile}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              // path="*" often acts as a catch-all route.
              // This means that it will match any URL that
              // doesn't match any other defined routes
              path="*"
              element={
                // condition ? expressionIfTrue : expressionIfFalse
                isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/" />
              }
            />
          </Routes>
          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          closeActiveModal={closeActiveModal}
        />

        {/* they should be rendered similarly to how 
            AddItemModal is rendered (outside the Routes) 
        */}
        <LogInModal
          isOpen={activeModal === "login"}
          closeActiveModal={closeActiveModal}
          handleLoginSubmit={handleLoginSubmit}
          openRegistrationModal={openRegistrationModal}
        />

        <RegisterModal
          isOpen={activeModal === "register"}
          closeActiveModal={closeActiveModal}
          handleRegistration={handleRegistration}
          openLoginModal={openLoginModal}
        />

        <ItemModal
          card={selectedCard}
          activeModal={activeModal}
          onClose={closeActiveModal}
          onDeleteClick={handleDeleteClick}
        />

        <DeleteModal
          activeModal={activeModal}
          onCancel={handleCardClick}
          card={selectedCard}
          onDelete={handleDelete}
        />

        <EditProfileModal
          activeModal={activeModal}
          onClose={closeActiveModal}
        />
      </CurrentTempUnitContext.Provider>
    </div>
    //  </CurrentUserContext.Provider>
  );
}

// Wrap the entire App component
function App() {
  return (
    <CurrentUserProvider>
      <AppContent />
    </CurrentUserProvider>
  );
}

export default App;
