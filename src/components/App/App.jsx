import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../Context/CurrentTempUnitContext";
import {
  CurrentUserContext,
  CurrentUserProvider,
} from "../../Context/CurrentUserContext";
import { signUp, signIn, getUserInfo } from "../../utils/auth";
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
  const [userData] = useState({ username: "", email: "" });
  const { isLoggedIn, setCurrentUser, setIsLoggedIn } =
    useContext(CurrentUserContext);

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

  const openEditProfile = () => {
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

  const handleModalSwitch = (modalType) => {
    setActiveModal(modalType);
  };

  const handleAddItemSubmit = (name, weather, link) => {
    const token = getToken();
    api
      .postItems({ name, weather, link }, token)
      .then((item) => {
        setClothingItems([item.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    const token = getToken();
    api
      .deleteItems(id, token)
      .then(() => {
        const newClothingItems = clothingItems.filter((item) => item._id != id);
        setClothingItems([...newClothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistration = (email, password, name, avatarUrl) => {
    signUp({ email, password, name, avatarUrl })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  };

  const handleLogin = (token, user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setToken(token);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setToken(null);
  };

  const handleEditProfile = (name, avatar) => {
    const token = getToken();
    api
      .patchProfile({ name, avatar }, token)
      .then((info) => {
        setCurrentUser(info);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // handleLogin accepts one parameter: an object with two properties.
  const handleLoginSubmit = ({ email, password }) => {
    // If username or password empty, return without sending a request.
    if (!email || !password) {
      return;
    }

    signIn({ email, password })
      .then((data) => {
        getUserInfo(data.token)
          .then((info) => {
            setCurrentUser(info);
            setIsLoggedIn(true);
            setToken(data.token);
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleCardLike = ({ _id }, isLiked) => {
    const token = getToken();

    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
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
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    } else {
      getUserInfo(jwt)
        .then((data) => {
          handleLogin(jwt, data);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page_content">
          <Header
            handleAddClick={handleAddClick}
            handleProfileClick={handleProfileClick}
            openLoginModal={openLoginModal}
            openRegistrationModal={openRegistrationModal}
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
                    onCardLike={handleCardLike}
                    onAddNewClick={handleAddClick}
                    editProfile={openEditProfile}
                    logOut={handleLogout}
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
                  onCardLike={handleCardLike}
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
          onSwitchModal={() => handleModalSwitch("register")}
        />

        <RegisterModal
          isOpen={activeModal === "register"}
          closeActiveModal={closeActiveModal}
          handleRegistration={handleRegistration}
          onSwitchModal={() => handleModalSwitch("login")}
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
          isOpen={activeModal === "editProfile"}
          changeProfile={handleEditProfile}
          closeActiveModal={closeActiveModal}
        />
      </CurrentTempUnitContext.Provider>
    </div>
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
