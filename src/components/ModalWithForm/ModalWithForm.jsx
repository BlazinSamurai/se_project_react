import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  onSwitchModal,
  loginState,
  signupState,
  editProfileState,
  addItemState,
  switchButtonText,
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
          ${(signupState || addItemState) && "modal__content "}
          ${editProfileState && "modal__content modal__content-editProfile"}
        `}
      >
        <h2 // FORM TITLE
          className={`
            ${editProfileState && "modal__title-editProfile"}
            ${!editProfileState && "modal__title "}`}
        >
          {title}
        </h2>
        <button onClick={handleClose} type="button" className="modal__close" />
        <form // MODAL FORM
          action=""
          className={`
            ${editProfileState && "modal__form modal__form-editProfile"}
            ${!editProfileState && "modal__form"}`}
          onSubmit={onSubmit}
        >
          {children}
          <div // BUTTON CONTAINER
            className={`
              ${
                editProfileState &&
                "modal__button-container modal__button-container-editProfile"
              }
              ${
                addItemState &&
                "modal__button-container modal__button-container-addItem"
              }
              ${!editProfileState && "modal__button-container"}`}
          >
            <button // SUBMIT BUTTON
              onClick={handleClose}
              type="submit"
              // value="disabled"
              disabled={!isValid}
              className={`
                ${
                  editProfileState &&
                  "modal__button-text modal__button-style modal__button-width-editProfile"
                }
                ${
                  addItemState &&
                  "modal__button-text modal__button-style modal__button-width-addItem"
                }
                ${
                  (loginState || signupState) &&
                  "modal__button-text modal__button-style"
                }`}
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
                  {switchButtonText}
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
                  {switchButtonText}
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
