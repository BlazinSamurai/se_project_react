import "./RegisterModal.css";

function RegisterModal({ activeModal, onClose }) {
  const cssRules = {
    maxWidth: 670,
    height: 290,
    paddingTop: 60,
    paddingRight: 152,
    paddingBottom: 60,
    paddingLeft: 151,
  };

  <div className={`modal ${activeModal === "register" && "modal_opened"}`}>
    <div className="modal__content" style={cssRules}>
      <button
        onClick={onClose}
        type="button"
        className="modal__close modal__close-item"
      ></button>
      <div className="modal__content-register">
        <h1 className="modal__text-signup">Sign up</h1>
      </div>
    </div>
  </div>;
}

export default RegisterModal;
