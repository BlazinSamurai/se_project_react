import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, closeActiveModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  return (
    <ModalWithForm
      buttonText="Sign Up"
      title="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      // onSubmit={handleSubmit}
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
      <label htmlFor="password" className="modal__label modal__label_span">
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
      <label htmlFor="name" className="modal__label modal__label_span">
        Name*{" "}
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
      <label htmlFor="avatarURL" className="modal__label modal__label_span">
        Avatar URL*{" "}
        <input
          type="url"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="avatarURL"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
        <span className="modal__span-divider"></span>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
