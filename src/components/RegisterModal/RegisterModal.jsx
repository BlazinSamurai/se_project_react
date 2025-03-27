import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, closeActiveModal, handleRegistration }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    avatarUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Declare a submission handler function. This function just needs
  // to prevent the default browser behavior, and call
  // handleRegistration, passing it the data from the form
  // submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    // <register>
    <ModalWithForm
      buttonText="Next"
      title="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      login={false}
      signup={true}
    >
      <label htmlFor="email" className="modal__label modal__label_span">
        Email*{" "}
        <input
          name="email"
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
      <label htmlFor="password" className="modal__label modal__label_span">
        Password*{" "}
        <input
          name="password"
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
      <label htmlFor="name" className="modal__label modal__label_span">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
        <span className="modal__span-divider"></span>
      </label>
      <label htmlFor="avatarUrl" className="modal__label modal__label_span">
        Avatar URL{" "}
        <input
          name="avatarUrl"
          type="url"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="avatarUrl"
          placeholder="Avatar URL"
          value={data.avatarUrl}
          onChange={handleChange}
        />
        <span className="modal__span-divider"></span>
      </label>
    </ModalWithForm>
    // </register>
  );
};

export default RegisterModal;
