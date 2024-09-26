// wrapper for the whole application
// therefore, is the parent of other top-level components
import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../Context/CurrentTempUnitContext";

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
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setTempToggle] = useState("C");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // pass a empty array the function will only get used once
  // when it first loads
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        console.log(data);
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // the useEffect in the videos
  // useEffect(() => {
  //   getForecastWeather().then((data) => {
  //     const temperature = parseWeatherData(data);
  //     console.log(temperature);
  //     setTemp(temperature);
  //   });
  // }, []);

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") {
      setTempToggle("F");
    } else {
      setTempToggle("C");
    }
  };

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page_content">
          {/* its common to rename handlers, setActiveModal in 
        setActiveModal={setActiveModal} to handleAddClick so 
        now its handleAddClick={handleAddClick} */}
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          {/* have to pass handleCardClick to the component that 
        contains ItemCard which is main. If you cant remember
        where this is then you can always search it.
        <ItemToFind, ex <ItemCard and itll show you what component 
        it is apart of  */}
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          // isOpen={activeModal}
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
