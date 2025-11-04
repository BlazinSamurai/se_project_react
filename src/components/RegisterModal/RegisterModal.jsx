import React, { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

//A common regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterModal = ({
  isOpen,
  closeActiveModal,
  handleRegistration,
  onSwitchModal,
}) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [error, setError] = useState({
    input: "",
    inputErrorMessage: "",
  });
  // This is the overall modal validity useState
  const [isValid, setIsValid] = useState(false);

  const emailValidation = (value) => {
    return emailRegex.test(value);
  };

  const passwordValidation = (value) => {
    const minLength = 8;
    const maxLength = 15;
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const correctLength =
      value.length >= minLength && value.length <= maxLength;
    const allowedChars = /^[A-Za-z\d]+$/.test(value);

    if (!allowedChars) {
      setError({
        input: "password",
        inputErrorMessage: `No special characters allowed.`,
      });
      return false;
    } else {
      if (!correctLength) {
        setError({
          input: "password",
          inputErrorMessage: `Password must be 8-15 characters long. Current Length: ${value.length}`,
        });
        return false;
      } else {
        if (!hasUpperCase) {
          setError({
            input: "password",
            inputErrorMessage:
              "Password must have at least 1 upper case letter.",
          });
          return false;
        } else {
          if (!hasNumber) {
            setError({
              input: "password",
              inputErrorMessage: "Password must have at least 1 number.",
            });
            return false;
          } else {
            if (!hasLowerCase) {
              setError({
                input: "password",
                inputErrorMessage:
                  "Password must have at least 1 lower case letter.",
              });
              return false;
            }
          }
        }
      }
    }

    return true;
  };

  const userNameValidation = (value) => {
    const minLength = 8;
    const maxLength = 15;
    const hasLowerCase = /[a-z]/.test(value);
    const correctLength =
      value.length >= minLength && value.length <= maxLength;

    if (!correctLength) {
      setError({
        input: "name",
        inputErrorMessage: `Name must be 8-15 characters long. Current Length: ${value.length}.`,
      });
      return false;
    } else {
      if (!hasLowerCase) {
        setError({
          input: "name",
          inputErrorMessage: `Name must contain a lower case letter.`,
        });
        return false;
      }
    }
    return true;
  };

  const urlValidation = (value) => {
    try {
      new URL(value);
      return true;
    } catch (e) {
      setError({
        input: "url",
        inputErrorMessage: "Please enter a valid URL.",
      });
      return false;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailValidation(email)) {
      setIsEmailValid(true);
      setError({ input: "", inputErrorMessage: "" });
    } else {
      setIsEmailValid(false);
      setError({
        input: "email",
        inputErrorMessage: "Please please enter a valid email.",
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordValidation(e.target.value)) {
      setIsPasswordValid(true);
      setError({ input: "", inputErrorMessage: "" });
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (userNameValidation(e.target.value)) {
      setIsNameValid(true);
      setError({ input: "", inputErrorMessage: "" });
    } else {
      setIsNameValid(false);
    }
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
    if (urlValidation(e.target.value)) {
      setIsUrlValid(true);
      setError({ input: "", inputErrorMessage: "" });
    } else {
      setIsUrlValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isValid && handleRegistration(email, password, name, avatarUrl);
  };

  useEffect(() => {
    if (isEmailValid && isPasswordValid && isNameValid && isUrlValid) {
      setIsValid(true);
      console.log("Tots valid!");
    } else {
      console.log("Tots not valid!");
      setIsValid(false);
    }
  }, [isEmailValid, isPasswordValid, isNameValid, isUrlValid]);
  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      isValid={isValid}
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
          className={!error ? "" : "modal__input"}
          minLength="8"
          maxLength="30"
          id="Register_email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <span className="modal__span-divider"></span>
        {error.input === "email" && (
          <p className="modal__invalid-input">{error.inputErrorMessage}</p>
        )}
      </label>
      <label
        htmlFor="Register_password"
        className="modal__label modal__label_span"
      >
        Password*{" "}
        <input
          name="password"
          type="password"
          className={!error ? "" : "modal__input"}
          minLength="8"
          maxLength="15"
          id="Register_password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <span className="modal__span-divider"></span>
        {error.input === "password" ? (
          <p className="modal__invalid-input">{error.inputErrorMessage}</p>
        ) : (
          <p className="modal__input-req">
            8-15 Characters, 1 Uppercase, 1 Digit.
          </p>
        )}
      </label>
      <label htmlFor="Register_name" className="modal__label modal__label_span">
        Name{" "}
        <input
          name="name"
          type="text"
          className={!error ? "" : "modal__input"}
          minLength="8"
          maxLength="15"
          id="Register_name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="modal__span-divider"></span>
        {error.input === "name" ? (
          <p className="modal__invalid-input">{error.inputErrorMessage}</p>
        ) : (
          <p className="modal__input-req">8-15 Characters and 1 lowercase.</p>
        )}
      </label>
      <label
        htmlFor="Register_avatarUrl"
        className="modal__label modal__label_span"
      >
        Avatar URL{" "}
        <input
          name="avatarUrl"
          type="url"
          className={!error ? "" : "modal__input"}
          minLength="1"
          id="Register_avatarUrl"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
        />
        <span className="modal__span-divider"></span>
        {error.input === "url" ? (
          <p className="modal__invalid-input">{error.inputErrorMessage}</p>
        ) : (
          ""
        )}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
