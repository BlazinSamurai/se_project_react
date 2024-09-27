// wrapper for the whole application
// therefore, is the parent of other top-level components
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../Context/CurrentTempUnitContext";
import { getItems } from "../../utils/api";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";

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
  });
  const [currentTempUnit, setTempToggle] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleProfileClick = () => {
    setActiveModal("profile");
    console.log("Profile Clicked!");
  };

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") {
      setTempToggle("F");
    } else {
      setTempToggle("C");
    }
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
          {/* its common to rename handlers, setActiveModal in 
        setActiveModal={setActiveModal} to handleAddClick so 
        now its handleAddClick={handleAddClick} */}
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
                />
              }
            />
          </Routes>

          {/* have to pass handleCardClick to the component that 
        contains ItemCard which is main. If you cant remember
        where this is then you can always search it.
        <ItemToFind, ex <ItemCard and itll show you what component 
        it is apart of  */}
          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
        >
          {/* htmlFor and id should match */}
          <label htmlFor="name" className="modal__label modal__label_span">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
            <span className="modal__span-divider"></span>
          </label>
          <label htmlFor="imageUrl" className="modal__label modal__label_span">
            Image{" "}
            <input
              type="text"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
            <span className="modal__span-divider"></span>
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                name="temp"
                className="modal__radio-input"
              />{" "}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                name="temp"
                className="modal__radio-input"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                name="temp"
                className="modal__radio-input"
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
