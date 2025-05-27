import "./ItemCard.css";

import heart from "../../images/Like_button.svg";
import filledHeart from "../../images/Like_button_filled.svg";

//destructored here so we don't have to use props.item
//item is the "cards", and onCardClick is the handleCardClick function
function ItemCard({ currentUser, item, onCardClick, onHeartClick }) {
  // probably should pass in 'isLiked' as prop
  // app is crashing since no one is signed in and there is not
  // 'currentUser
  const isLiked = false;
  // const isLiked = item.likes
  //   ? item.likes.some((id) => id === currentUser.id)
  //   : false;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    // isLiked === item.likes
    //   ? item.likes.some((id) => id === currentUser.id)
    //   : false;
    onHeartClick(item, isLiked);
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
        onClick={handleLike}
        className="card__like-btn"
        src={isLiked ? filledHeart : heart}
        alt="Heart"
        style={cssRules}
      />
    </li>
  );
}

export default ItemCard;
