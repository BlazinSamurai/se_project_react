import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  closeActiveModal,
  handleRegistration,
  onSwitchModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  // Declare a submission handler function. This function just needs
  // to prevent the default browser behavior, and call
  // handleRegistration, passing it the data from the form
  // submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password, name, avatarUrl);
  };

  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      onSwitchModal={onSwitchModal}
      loginState={false}
      signupState={true}
      editProfileState={false}
      addItemState={false}
      switchButtonText="or Log in"
    >
      <label
        htmlFor="Register_email"
        className="modal__label modal__label_span"
      >
        Email*{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="Register_email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <span className="modal__span-divider"></span>
      </label>
      <label
        htmlFor="Register_password"
        className="modal__label modal__label_span"
      >
        Password*{" "}
        <input
          name="password"
          type="password"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="Register_password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <span className="modal__span-divider"></span>
      </label>
      <label htmlFor="Register_name" className="modal__label modal__label_span">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          minLength="1"
          maxLength="30"
          id="Register_name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <span className="modal__span-divider"></span>
      </label>
      <label
        htmlFor="Register_avatarUrl"
        className="modal__label modal__label_span"
      >
        Avatar URL{" "}
        <input
          name="avatarUrl"
          type="url"
          className="modal__input"
          minLength="1"
          id="Register_avatarUrl"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
        />
        <span className="modal__span-divider"></span>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
