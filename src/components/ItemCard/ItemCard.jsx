import "./ItemCard.css";

//destructored here so we don't have to use props.item
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        // onClick is a event handler, like the addEventListeners
        //  and inside the {} the first parameter is an event object
        // before the ()=>{} is was onCardClick which doesn't work
        onClick={
          handleCardClick
          // () => {
          // this is generally not a good idea for performance reasons
          // an reliability issues and is replaced with the function above
          // onCardClick(item);}
        }
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
