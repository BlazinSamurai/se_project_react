import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [link, setUrl] = useState("");
  const [weather, setWeather] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(name, link, weather);
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      {/* htmlFor and id should match */}

      {/* TODO - ADD SOME VALIDATIONS */}
      <label htmlFor="name" className="modal__label modal__label_span">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <span className="modal__span-divider"></span>
      </label>
      <label htmlFor="imageUrl" className="modal__label modal__label_span">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="imageUrl"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
        />
        <span className="modal__span-divider"></span>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="temp"
            className="modal__radio-input"
            value="Hot"
            checked={weather === "Hot"}
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
            value="Warm"
            checked={weather === "Warm"}
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
            value="Cold"
            checked={weather === "Cold"}
            onChange={handleWeatherChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
