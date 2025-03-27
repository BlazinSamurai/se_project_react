import React, { useState } from "react";

import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  login,
  signup,
  activeModal,
}) {
  const [isLoginModal] = useState(login);
  const [isSignupModal] = useState(signup);

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
        <button onClick={onClose} type="button" className="modal__close" />
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
            <div>
              {/* http://localhost:3000/register 
                title: Signup */}
              {isSignupModal ? (
                <button
                  type="button"
                  className="modal__button-text modal__button-login"
                >
                  or Log in
                </button>
              ) : null}
            </div>
            <div>
              {/* http://localhost:3000/login 
                title: Log in */}
              {isLoginModal ? (
                <button
                  type="button"
                  className="modal__button-text modal__button-register"
                >
                  or Register
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
