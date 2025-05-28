import "./ClothesSection.css";

import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  onCardLike,
  onAddNewClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__item-btn-group">
        <p className="clothes-section__items-text">Your items</p>
        <button
          onClick={onAddNewClick}
          type="button"
          className="clothes-section__btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          const isOwn = currentUser ? item.owner === currentUser._id : false;
          {
            return (
              isOwn && (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                />
              )
            );
          }
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
