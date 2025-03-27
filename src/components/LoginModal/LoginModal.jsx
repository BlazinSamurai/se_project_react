import React, { useState } from "react";

import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LogInModal = ({
  isOpen,
  closeActiveModal,
  weatherData,
  onCardClick,
  clothingItems,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const cssRules = {
    paddingBottom: 32,
  };

  return (
    <login>
      <Main
        weatherData={weatherData}
        onCardClick={onCardClick}
        clothingItems={clothingItems}
      />
      <ModalWithForm
        buttonText="Log in"
        title="Log in"
        isOpen={isOpen}
        onClose={closeActiveModal}
        login={true}
        signup={false}
      >
        <label htmlFor="email" className="modal__label modal__label_span">
          Email*{" "}
          <input
            type="email"
            className="modal__input"
            minLength="1"
            maxLength="30"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <span className="modal__span-divider"></span>
        </label>
        <label
          htmlFor="password"
          className="modal__label modal__label_span"
          style={cssRules}
        >
          Password*{" "}
          <input
            type="password"
            className="modal__input"
            minLength="1"
            maxLength="30"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="modal__span-divider"></span>
        </label>
        {/* Can pass in a second button, not sure if this is the better way */}
        {/* <button type="button"> or Register </button> */}
      </ModalWithForm>
    </login>
  );
};

export default LogInModal;
