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

  // handleSubmit prevents the default browser behavior and calls
  // the login handler.
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
      onSwitchModal={onSwitchModal}
      loginState={true}
      signupState={false}
    >
      <label htmlFor="email" className="modal__label modal__label_span">
        Email*{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="login_email"
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
          name="password"
          type="password"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="login_password"
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
//
