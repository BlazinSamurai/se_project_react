import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  onSubmit,
}) {
  return (
    //isOpen={activeModal === "add-garment"}
    // <div className={`modal ${isOpen === "add-garment" && "modal_opened"}`}>
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        {/* You can use self closing tags if there are no children */}
        <button onClick={onClose} type="button" className="modal__close" />
        <form action="" className="modal__form" onSubmit={onSubmit}>
          {children}
          <button onClick={onClose} type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
