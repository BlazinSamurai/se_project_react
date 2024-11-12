// wrapper for the whole application
// therefore, is the parent of other top-level components
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey, temp } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../Context/CurrentTempUnitContext";
import {
  getItems,
  postItems,
  patchItems,
  putItems,
  deleteItems,
} from "../../utils/api";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";

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
        setClothingItems([item, ...clothingItems]);
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
              path="/"
              element={
                // the name on the left of the operator('=') is what
                // you're passing
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddNewClick={handleAddClick}
                />
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
          onClose={closeActiveModal}
          onCancel={handleCardClick}
          card={selectedCard}
          onDelete={handleDelete}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
