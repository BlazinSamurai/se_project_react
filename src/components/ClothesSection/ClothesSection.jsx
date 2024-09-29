import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, onAddNewClick }) {
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
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
