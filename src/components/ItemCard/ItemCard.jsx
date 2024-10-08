import "./ItemCard.css";

//destructored here so we don't have to use props.item
//item is the "cards", and onCardClick is the handleCardClick function
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li key={item._id} className="card">
      {/* <li className="card"> */}
      <h2 className="card__name">{item.name} </h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
