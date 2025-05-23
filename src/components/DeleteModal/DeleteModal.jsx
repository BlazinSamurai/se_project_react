import "./DeleteModal.css";

function DeleteModal({ activeModal, onCancel, card, onDelete }) {
  const handleCancelClick = () => {
    onCancel(card);
  };

  const handleDeleteClick = () => {
    onDelete(card._id);
  };

  const cssRules = {
    maxWidth: 670,
    height: 290,
    paddingTop: 60,
    paddingRight: 152,
    paddingBottom: 60,
    paddingLeft: 151,
  };
  return (
    <div className={`modal ${activeModal === "delete" && "modal_opened"}`}>
      <div className="modal__content" style={cssRules}>
        <button
          onClick={handleCancelClick}
          type="button"
          className="modal__close modal__close-item"
        ></button>
        <div className="modal__content-delete">
          <p className="modal__text-delete">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
          <button
            onClick={handleDeleteClick}
            type="button"
            className="modal__delete-btn"
          >
            Yes, delete item
          </button>
          <button
            onClick={handleCancelClick}
            type="button"
            className="modal__cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
