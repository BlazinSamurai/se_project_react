import "./ItemCard.css";

import heart from "../../images/Like_button.svg";
import filledHeart from "../../images/Like_button_filled.svg";

import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item, isLiked);
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
      <div>
        {isLoggedIn && (
          <img
            onClick={handleLike}
            className="card__like-btn"
            src={isLiked ? filledHeart : heart}
            alt="Heart"
            style={cssRules}
          />
        )}
      </div>
    </li>
  );
}

export default ItemCard;
