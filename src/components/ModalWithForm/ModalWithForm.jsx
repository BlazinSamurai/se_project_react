import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  loginState,
  signupState,
}) {
  const [login, setLogin] = useState(loginState);
  const [signup, setSignup] = useState(signupState);

  const handleLoginChange = () => {
    setLogin(true);
    setSignup(false);
  };

  const handleSignupChange = () => {
    setLogin(false);
    setSignup(true);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div
        className={` 
          ${login && "modal__content modal__content-login"}
          ${signup && "modal__content "}
          ${!signup && !login && "modal__content"}
        `}
      >
        <h2 className="modal__title">{title}</h2>
        {/* You can use self closing tags if there are no children */}
        <button onClick={handleClose} type="button" className="modal__close" />
        <form action="" className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__button-container">
            {/* {secondButton} */}
            <button
              type="submit"
              className={`modal__button-text 
                ${
                  (signup || login) &&
                  "modal__button-submit modal__button-submit-no-margin"
                }
                ${!signup && !login && "modal__button-submit"}`}
            >
              {buttonText}
            </button>
            <Link to={"/login"}>
              <div>
                {/* http://localhost:3000/register 
                title: Signup */}
                {signup ? (
                  <button
                    onClick={handleLoginChange}
                    type="button"
                    className="modal__button-text modal__button-login"
                  >
                    or Log in
                  </button>
                ) : null}
              </div>
            </Link>
            <Link to="/register">
              <div>
                {/* http://localhost:3000/login 
                title: Log in */}
                {login ? (
                  <button
                    onClick={handleSignupChange}
                    type="button"
                    className="modal__button-text modal__button-register"
                  >
                    or Register
                  </button>
                ) : null}
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
