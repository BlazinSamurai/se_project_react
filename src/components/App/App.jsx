// wrapper for the whole application
// therefore, is the parent of other top-level components
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey, temp } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../Context/CurrentTempUnitContext";
import { signUp, signIn } from "../../utils/auth";
import {
  getItems,
  postItems,
  patchItems,
  putItems,
  deleteItems,
  getProfile,
  patchProfile,
} from "../../utils/api";

import { setToken, getToken } from "../../utils/token";

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

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({
    link: "",
    name: "",
    weather: "",
    _id: "",
  });
  const [currentTempUnit, setTempToggle] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") {
      setTempToggle("F");
    } else {
      setTempToggle("C");
    }
  };

  const handleAddItemSubmit = (name, weather, link) => {
    postItems({ name, weather, link })
      .then((item) => {
        setClothingItems([item.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    deleteItems(id)
      .then(() => {
        const newClothingItems = clothingItems.filter((item) => item._id != id);
        setClothingItems([...newClothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const getProfileData = () => {
    getProfile()
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch(console.error);
  };

  const handleLogin = ({ username, password }) => {
    if (!username || !password) {
      return;
    }

    auth
      .authorize(username, password)
      .then((data) => {
        if (data.jwt) {
          // Save the token to local storage
          setToken(data.jwt);
          // setUserData(data.user);
          setIsLoggedIn(true);
          // navigate("/ducks");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRegistration = (email, password, name, avatarUrl) => {
    signUp({ email, password, name, avatarUrl })
      .then((info) => {
        console.log("user registered?");
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Going to have to create a edit profile submit function???
  const handlePatchProfile = (name, avatar) => {
    patchProfile({ name, avatar })
      .then((result) => {
        console.log(result);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // const handleGetProfile = (name, avatar) => {
  //   getProfile()
  //     .then(() => {
  //       console.log(name + avatar);
  //     })
  //     .catch(console.error);
  // };

  // pass a empty array the function will only get used once
  // when it first loads
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
  // These variables can be props or the internal state variables of the current component
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems([...data]);
      })
      .catch(console.error);
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
            weatherData={weatherData}
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
              path="/login"
              element={
                <LogInModal
                  isOpen={true}
                  closeActiveModal={closeActiveModal}
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/register"
              element={
                <RegisterModal
                  isOpen={true}
                  closeActiveModal={closeActiveModal}
                  handleRegistration={handleRegistration}
                />
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
          handlePatchProfile={handlePatchProfile}
          getProfileData={getProfileData}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
