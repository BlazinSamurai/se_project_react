import "./ItemCard.css";

import heart from "../../images/Like_button.svg";

//destructored here so we don't have to use props.item
//item is the "cards", and onCardClick is the handleCardClick function
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const cssRules = {
    width: 18,
    height: 15,
  };

  return (
    <li key={item._id} className="card">
      <h2 className="card__name">{item.name} </h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <img
        src={heart}
        alt="Heart"
        className="card__like-btn"
        style={cssRules}
      />
    </li>
  );
}

export default ItemCard;
