import React, { useState } from "react";

import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Link } from "react-router-dom";

const LogInModal = ({
  isOpen,
  closeActiveModal,
  handleLogin,
  openRegistrationModal,
  // weatherData,
  // onCardClick,
  // clothingItems,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleSubmit prevents the default browser behavior and calls
  // the login handler.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  const cssRules = {
    paddingBottom: 32,
  };

  return (
    <ModalWithForm
      buttonText="Log in"
      title="Log in"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
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
          value={data.email}
          onChange={handleChange}
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
          value={data.password}
          onChange={handleChange}
        />
        <span className="modal__span-divider"></span>
      </label>
      {/* Can pass in a second button, not sure if this is the better way */}
      {/* <button type="button"> or Register </button> */}
    </ModalWithForm>
  );
};

export default LogInModal;
