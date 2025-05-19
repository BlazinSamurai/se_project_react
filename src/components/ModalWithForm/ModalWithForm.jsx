import React, { useState } from "react";

import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  onSwitchModal,
  loginState,
  signupState,
}) {
  const handleSwitchModal = () => {
    onSwitchModal();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div
        className={` 
          ${loginState && "modal__content modal__content-login"}
          ${!loginState && "modal__content "}
        `}
      >
        <h2 className="modal__title">{title}</h2>
        {/* You can use self closing tags if there are no children */}
        <button onClick={handleClose} type="button" className="modal__close" />
        <form action="" className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__button-container">
            <button
              onClick={handleClose}
              type="submit"
              className="modal__button-text"
            >
              {buttonText}
            </button>
            <div>
              {/* title: Signup */}
              {signupState ? (
                <button
                  onClick={handleSwitchModal}
                  type="button"
                  className="modal__button-text modal__button-login"
                >
                  or Log in
                </button>
              ) : null}
            </div>
            <div>
              {/* title: Log in */}
              {loginState ? (
                <button
                  onClick={handleSwitchModal}
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
