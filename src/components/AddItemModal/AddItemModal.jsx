import { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, closeActiveModal }) => {
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
    onAddItem(name, weather, link);
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      loginState={false}
      signupState={false}
      editProfileState={false}
      addItemState={true}
    >
      {/* htmlFor and id should match, 
          the style below gets passed in
          as the 'child' in ModalWithForm */}
      {/* TODO - ADD SOME VALIDATIONS */}
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
          value={link}
          onChange={handleUrlChange}
          required
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
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
