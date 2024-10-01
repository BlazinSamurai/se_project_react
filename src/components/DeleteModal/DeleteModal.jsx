import "./DeleteModal.css";

import ItemModal from "../ItemModal/ItemModal";
import ItemCard from "../ItemCard/ItemCard";

function DeleteModal({ card, activeModal, onClose, onCancel, onDeleteClick }) {
  console.log(
    "Card info in",
    activeModal,
    ": ",
    card.name,
    ", ",
    card.weather,
    ", ",
    card.imageUrl
  );
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
          onClick={onClose}
          type="button"
          className="modal__close modal__close-item"
        ></button>
        <div className="modal__content-delete">
          <p className="modal__text-delete">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
          {/* TODO - add onClick functionality for delete btn*/}
          <button type="button" className="modal__delete-btn">
            Yes, delete item
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="modal__cancel-btn"
          >
            Cancel
          </button>
          <ItemCard item={card} onCardClick={onCancel} />
          <ItemModal
            card={card}
            activeModal={activeModal}
            onClose={onClose}
            onCancel={onCancel}
            onDeleteClick={onDeleteClick}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
