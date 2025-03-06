import React, { useState } from "react";

import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LogInModal = ({
  isOpen,
  closeActiveModal,
  weatherData,
  onCardClick,
  clothingItems,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    // <div className="login">
    //   <div className="login__main">
    //     <Main
    //       weatherData={weatherData}
    //       onCardClick={onCardClick}
    //       clothingItems={clothingItems}
    //     />
    //   </div>
    //   <div className="login__modal">
    //     <ModalWithForm
    //       buttonText="Log in"
    //       title="Log in"
    //       isOpen={isOpen}
    //       onClose={closeActiveModal}
    //       // onSubmit={handleSubmit}
    //     >
    //       <label htmlFor="email" className="modal__label modal__label_span">
    //         Email*{" "}
    //         <input
    //           type="email"
    //           className="modal__input"
    //           minLength="1"
    //           maxLength="30"
    //           id="email"
    //           placeholder="Email"
    //           value={email}
    //           onChange={handleEmailChange}
    //         />
    //         <span className="modal__span-divider"></span>
    //       </label>
    //       <label htmlFor="password" className="modal__label modal__label_span">
    //         Password*{" "}
    //         <input
    //           type="password"
    //           className="modal__input"
    //           minLength="1"
    //           maxLength="30"
    //           id="password"
    //           placeholder="Password"
    //           value={password}
    //           onChange={handlePasswordChange}
    //         />
    //         <span className="modal__span-divider"></span>
    //       </label>
    //     </ModalWithForm>
    //   </div>
    // </div>
    <div className={`modal ${activeModal === "editProfile" && "modal_opened"}`}>
      <div className="modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-item"
        ></button>
        <div className="modal__content-login">
          <h1 className="modal__title-login"> Log in </h1>
          <label
            htmlFor="email"
            className="modal__label modal__label_span modal__label_padding-remover"
          >
            Email *{" "}
            <input
              type="email"
              className="modal__input"
              minLength="1"
              maxLength="30"
              id="email"
              placeholder="Email"
              value={email}
              // onChange={handleNameChange}
            />
            <span className="modal__span-divider"></span>
          </label>
          <label
            htmlFor="password"
            className="modal__label modal__label_span modal__label_padding-remover"
          >
            Password *{" "}
            <input
              type="password"
              className="modal__input"
              minLength="1"
              id="password"
              placeholder="Password"
              value={password}
              // onChange={handleAvatarChange}
            />
            <span className="modal__span-divider"></span>
          </label>
          <button
            onClick={handleSubmit}
            type="button"
            className="modal__btn-edit-profile"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInModal;
