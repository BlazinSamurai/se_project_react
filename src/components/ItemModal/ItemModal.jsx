import "./ItemModal.css";
import defaultImage from "../../images/default_clothing.png";

import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

function ItemModal({ card, activeModal, onClose, onDeleteClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = currentUser ? card.owner === currentUser._id : false;

  const cssRules = {
    width: 498,
    height: 610,
    padding: 0,
  };

  return (
    // The && operator in JavaScript returns the right-hand side operand
    //when the left-hand side operand is true.
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div
        className="modal__content modal__content_type_image"
        style={cssRules}
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-item"
        ></button>
        <img
          src={card.imageUrl || defaultImage}
          alt={card.name}
          className="modal__image"
        />
        <footer className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div>
            {isOwn && (
              <button
                // onClick is the 'MouseEventHandler'
                onClick={onDeleteClick}
                type="button"
                className="modal__delete-text"
              >
                Delete Item
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ItemModal;
