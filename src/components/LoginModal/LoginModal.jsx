import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LogInModal = ({
  isOpen,
  closeActiveModal,
  handleLoginSubmit,
  onSwitchModal,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(data);
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
      isValid={true}
      onSwitchModal={onSwitchModal}
      loginState={true}
      signupState={false}
      editProfileState={false}
      addItemState={false}
      switchButtonText="or Register"
    >
      <label htmlFor="Login_email" className="modal__label modal__label_span">
        Email*{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="Login_email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <span className="modal__span-divider"></span>
      </label>
      <label
        htmlFor="Login_password"
        className="modal__label modal__label_span"
        style={cssRules}
      >
        Password*{" "}
        <input
          name="password"
          type="password"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="Login_password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <span className="modal__span-divider"></span>
      </label>
    </ModalWithForm>
  );
};

export default LogInModal;
//
