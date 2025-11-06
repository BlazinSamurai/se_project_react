import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, closeActiveModal }) => {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [weather, setWeather] = useState(null);
  const [isWeatherValid, setIsWeatherValid] = useState(false);
  const [error, setError] = useState({
    input: "",
    inputErrorMessage: "",
  });
  // This is the overall modal validity useState
  const [isValid, setIsValid] = useState(false);

  const nameValidation = (value) => {
    const minLength = 8;
    const maxLength = 15;
    const hasLowerCase = /[a-z]/.test(value);
    const correctLength =
      value.length >= minLength && value.length <= maxLength;

    if (!correctLength) {
      setError({
        input: "name",
        inputErrorMessage: `Name must be 8-15 characters long. Current Length: ${value.length}.`,
      });
      return false;
    } else {
      if (!hasLowerCase) {
        setError({
          input: "name",
          inputErrorMessage: `Name must contain a lower case letter.`,
        });
        return false;
      }
    }
    return true;
  };

  const urlValidation = (value) => {
    try {
      new URL(value);
      return true;
    } catch (e) {
      setError({
        input: "url",
        inputErrorMessage: "Please enter a valid URL.",
      });
      return false;
    }
  };

  const weatherValidation = (value) => {
    if (weather === null) {
      if (value === null) {
        setIsWeatherValid(false);
        setError({
          input: "weather",
          inputErrorMessage: "Please select a weather type option.",
        });
      } else {
        setIsWeatherValid(true);
        setError({ input: "", inputErrorMessage: "" });
      }
    } else {
      setIsWeatherValid(true);
      setError({ input: "", inputErrorMessage: "" });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameValidation(e.target.value)) {
      setIsNameValid(true);
      setError({ input: "", inputErrorMessage: "" });
    } else {
      setIsNameValid(false);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (urlValidation(e.target.value)) {
      setIsUrlValid(true);
      setError({
        input: "",
        inputErrorMessage: "",
      });
    } else {
      setIsUrlValid(false);
    }
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
    weatherValidation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid && onAddItem(name, url, weather);
    setName("");
    setUrl("");
    setWeather(null);
  };

  useEffect(() => {
    if (isNameValid && isUrlValid && isWeatherValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isNameValid, isUrlValid, isWeatherValid]);
  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      isValid={isValid}
      loginState={false}
      signupState={false}
      editProfileState={false}
      addItemState={true}
    >
      <label htmlFor="addItem_name" className="modal__label modal__label_span">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="addItem_name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="modal__span-divider"></span>
        {error.input === "name" && (
          <p className="modal__invalid-input">{error.inputErrorMessage}</p>
        )}
      </label>
      <label
        htmlFor="addItem_imageUrl"
        className="modal__label modal__label_span"
      >
        Image{" "}
        <input
          type="url"
          className="modal__input"
          minLength="1"
          id="addItem_imageUrl"
          placeholder="Image URL"
          value={url}
          onChange={handleUrlChange}
          required
        />
        <span className="modal__span-divider"></span>
        {error.input === "url" && (
          <p className="modal__invalid-input">{error.inputErrorMessage}</p>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="temp"
            className="modal__radio-input"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="temp"
            className="modal__radio-input"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="temp"
            className="modal__radio-input"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />{" "}
          Cold
        </label>
        {error.input === "weather" && (
          <p className="modal__invalid-input">{error.inputErrorMessage}</p>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
