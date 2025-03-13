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
}) {
  const [isLoginButton] = useState(login);
  const [isSignupButton] = useState(signup);

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        {/* You can use self closing tags if there are no children */}
        <button onClick={onClose} type="button" className="modal__close" />
        <form action="" className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          <div>
            {isLoginButton ? <button type="button">or Log In</button> : null}
          </div>
          <div>
            {isSignupButton ? <button type="button">or Sign Up</button> : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
