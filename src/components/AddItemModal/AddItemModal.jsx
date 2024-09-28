import React from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

// ModalWithForm({ children, buttonText, title, isOpen, onClose })
const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={activeModal === "add-garment"}
      onClose={closeActiveModal}
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
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="temp"
            className="modal__radio-input"
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="temp"
            className="modal__radio-input"
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
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
  );
};

export default AddItemModal;
